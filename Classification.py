from flask import Flask, request, jsonify # type: ignore
from flask_cors import CORS # type: ignore
import requests # type: ignore
from bs4 import BeautifulSoup # type: ignore
from transformers import pipeline
from tldextract import extract # type: ignore

app = Flask(__name__)
CORS(app)

# Load the classifier model
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli", framework="pt",
                      cache_dir="~/.cache/huggingface")

CONFIDENCE_THRESHOLD = 0.5 # Set a confidence threshold for classification


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
        paragraphs = [p.get_text(strip=True) for p in soup.find_all("p")[:3]]

        content = " ".join(filter(None, [title] + headings + paragraphs))
        return content if content.strip() else "undefined"
    except Exception as e:
        print(f"Error fetching/parsing content from {url}: {e}")
        return "undefined"


@app.route('/classify', methods=['POST'])
def classify_page():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400

        url = data.get("url")
        blacklist = data.get("blacklist", [])
        whitelist = data.get("whitelist", [])
        blacklist_urls = set(data.get("blacklistUrls", []))
        whitelist_urls = set(data.get("whitelistUrls", []))

        if not url:
            return jsonify({"error": "URL is required"}), 400
        if not url.startswith("http"):
            url = "https://" + url  # Auto-correct missing scheme

        extracted = extract(url)
        domain = f"{extracted.domain}.{extracted.suffix}"
        print(f"[INFO] Checking domain: {domain}")

        # Check if the domain is blacklisted or whitelisted
        if domain in blacklist_urls:
            return jsonify({"url": url, "predicted_category": "Blocked Site",
                            "category_type": "blacklist", "score": 1.0,
                            "message": f"Blocked: {url} is blacklisted."})

        if domain in whitelist_urls:
            return jsonify({"url": url, "predicted_category": "Trusted Site",
                            "category_type": "whitelist", "score": 1.0,
                            "message": f"Allowed: {url} is whitelisted."})

        # Extract website content (now correctly calling the function)
        website_content = extract_website_content(url)
        if website_content == "undefined":
            return jsonify({"url": url, "predicted_category": "undefined",
                            "category_type": "undefined", "score": 0,
                            "message": f"Classification failed: Could not extract valid content from {url}."})

        # Classify content
        categories = blacklist + whitelist
        result = classifier(website_content, candidate_labels=categories, multi_label=True)

        predictions = [{"category": label, "score": score}
                       for label, score in zip(result["labels"], result["scores"])
                       if score > CONFIDENCE_THRESHOLD]

        if not predictions:
            return jsonify({"url": url, "predicted_category": "undefined",
                            "category_type": "undefined", "score": 0,
                            "message": f"Classification uncertain for {url}. No strong match found."})

        predicted_categories = [pred["category"] for pred in predictions]
        category_type = ("blacklist" if any(cat in blacklist for cat in predicted_categories)
                         else "whitelist" if any(cat in whitelist for cat in predicted_categories)
                         else "undefined")

        if category_type == "blacklist":
            return jsonify({"url": url, "predicted_category": predicted_categories,
                            "category_type": "blacklist", "score": max(pred["score"] for pred in predictions),
                            "message": f"Blocked: {url} is categorized as {', '.join(predicted_categories)}, which is blacklisted."})

        return jsonify({"url": url, "predicted_category": predicted_categories,
                        "category_type": category_type, "score": max(pred["score"] for pred in predictions),
                        "message": f"Allowed: {url} is categorized as {', '.join(predicted_categories)}."})

    except Exception as e:
        print(f"[ERROR] Internal server error: {e}")
        return jsonify({"url": url if 'url' in locals() else "unknown",
                        "predicted_category": "undefined",
                        "category_type": "undefined", "score": 0,
                        "message": "Internal server error occurred."}), 500


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001, debug=True)
