from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
from transformers import pipeline
from tldextract import extract
from concurrent.futures import ThreadPoolExecutor

app = Flask(__name__)
CORS(app)

# Load the classifier model
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli", framework="pt",
                      cache_dir="~/.cache/huggingface")

# Confidence threshold for classification
CONFIDENCE_THRESHOLD = 0.5

def extract_website_content(url):
    """Extracts title, headings, and first 3 paragraphs from a website."""
    try:
        print(f"Fetching URL: {url}")
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
        response = requests.get(url, headers=headers, timeout=40)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")

        title = soup.title.string if soup.title else ""
        headings = [h.get_text(strip=True) for h in soup.find_all(["h1", "h2"])]
        paragraphs = [p.get_text(strip=True) for p in soup.find_all("p")[:3]]  # Extract first 3 paragraphs

        content = title + " " + " ".join(headings) + " " + " ".join(paragraphs)
        print(f"Extracted content: {content[:500]}...")  # Limit log output
        return content
    except requests.exceptions.RequestException as e:
        print(f"Error fetching URL {url}: {e}")
        return ""
    except Exception as e:
        print(f"Error parsing content from URL {url}: {e}")
        return ""

def check_lists(domain, blacklist_urls, whitelist_urls):
    """Checks if the domain exists in blacklist or whitelist in parallel."""
    with ThreadPoolExecutor() as executor:
        future_blacklist = executor.submit(lambda: domain in blacklist_urls)
        future_whitelist = executor.submit(lambda: domain in whitelist_urls)
        return future_blacklist.result(), future_whitelist.result()

@app.route('/classify', methods=['POST'])
def classify_page():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400

        url = data.get("url")
        blacklist = data.get("blacklist", [])
        whitelist = data.get("whitelist", [])
        blacklist_urls = data.get("blacklistUrls", [])
        whitelist_urls = data.get("whitelistUrls", [])

        if not url:
            return jsonify({"error": "URL is required"}), 400
        if not url.startswith("http"):
            url = "https://" + url  # Auto-correct missing scheme

        # Extract clean domain name
        extracted = extract(url)
        domain = f"{extracted.domain}.{extracted.suffix}"
        print(f"[INFO] Checking domain: {domain}")

        # Concurrently check if the domain is blacklisted or whitelisted
        is_blacklisted, is_whitelisted = check_lists(domain, blacklist_urls, whitelist_urls)

        # **Step 1: Immediate Block for Blacklisted URLs**
        if is_blacklisted:
            return jsonify({
                "url": url,
                "predicted_category": "Blocked Site",
                "category_type": "blacklist",
                "score": 1.0,
                "message": f"Blocked: {url} is blacklisted."
            })

        # **Step 2: Immediate Allow for Whitelisted URLs**
        if is_whitelisted:
            return jsonify({
                "url": url,
                "predicted_category": "Trusted Site",
                "category_type": "whitelist",
                "score": 1.0,
                "message": f"Allowed: {url} is whitelisted."
            })

        # **Step 3: Extract Website Content and Classify in Parallel**
        with ThreadPoolExecutor() as executor:
            future_content = executor.submit(extract_website_content, url)
            website_content = future_content.result()

        if not website_content:
            return jsonify({"error": "Could not extract content"}), 500

        categories = blacklist + whitelist
        result = classifier(website_content, candidate_labels=categories, multi_label=True)

        predictions = [
            {"category": label, "score": score}
            for label, score in zip(result["labels"], result["scores"])
            if score > CONFIDENCE_THRESHOLD
        ]

        if not predictions:
            return jsonify({
                "url": url,
                "predicted_category": "unknown",
                "category_type": "unknown",
                "score": 0,
                "message": f"Classification uncertain for {url}. No strong match found."
            })

        # Determine if the site belongs to a blacklisted or whitelisted category
        predicted_categories = [pred["category"] for pred in predictions]
        category_type = (
            "blacklist" if any(cat in blacklist for cat in predicted_categories)
            else "whitelist" if any(cat in whitelist for cat in predicted_categories)
            else "unknown"
        )

        # If blacklisted, block it
        if category_type == "blacklist":
            return jsonify({
                "url": url,
                "predicted_category": predicted_categories,
                "category_type": "blacklist",
                "score": max(pred["score"] for pred in predictions),
                "message": f"Blocked: {url} is categorized as {', '.join(predicted_categories)}, which is blacklisted."
            })

        return jsonify({
            "url": url,
            "predicted_category": predicted_categories,
            "category_type": category_type,
            "score": max(pred["score"] for pred in predictions),
            "message": f"Allowed: {url} is categorized as {', '.join(predicted_categories)}."
        })

    except Exception as e:
        print(f"[ERROR] Internal server error: {e}")
        return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001, debug=True)


# if __name__ == '__main__':
#     port = int(os.getenv("PORT", 5001))  # Render provides a dynamic port
#     app.run(host="0.0.0.0", port=port, debug=False)