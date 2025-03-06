interface Quote {
  q: string;  // quote text
  a: string;  // author
  h: string;  // HTML format
}

export class QuoteService {
  private static readonly API_URL = 'https://zenquotes.io/api/random';
  private static cache: string[] = [];
  private static readonly CACHE_SIZE = 10;
  private static quotes: string[] = [];

  static async fetchQuote(): Promise<string> {
    try {
      // Try to use cached quote first
      if (this.cache.length > 0) {
        return this.cache.pop()!;
      }

      // If cache is empty, fetch new quotes
      const response = await fetch(this.API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }

      const data: Quote[] = await response.json();
      
      // Cache the quote
      const quote = data[0].q;
      this.cache.push(quote);

      return quote;
    } catch (error) {
      console.error('Error fetching quote:', error);
      return "Stay focused and motivated!";
    }
  }

  static async prefetchQuotes(): Promise<void> {
    try {
      while (this.cache.length < this.CACHE_SIZE) {
        const response = await fetch(this.API_URL);
        const data: Quote[] = await response.json();
        this.cache.push(data[0].q);
        // Respect API rate limits
        await new Promise(resolve => setTimeout(resolve, 6000));
      }
    } catch (error) {
      console.error('Error prefetching quotes:', error);
    }

    this.quotes = ["Sample quote 1", "Sample quote 2"];
  }
}

export default QuoteService; 