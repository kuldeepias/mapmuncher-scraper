import axios from 'axios';

interface BusinessData {
  name: string;
  address: string;
  phone: string;
  rating: string;
  reviews: string;
  website?: string;
}

export const scrapeGoogleMaps = async (businessType: string, location: string): Promise<BusinessData[]> => {
  try {
    const response = await axios.post('https://api.crawl4ai.com/google-maps', {
      query: `${businessType} in ${location}`,
      limit: 100
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('crawl4ai_api_key')}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.results.map((item: any) => ({
      name: item.name || 'N/A',
      address: item.address || 'N/A',
      phone: item.phone || 'N/A',
      rating: item.rating || 'N/A',
      reviews: item.reviews || '0',
      website: item.website || ''
    }));
  } catch (error) {
    console.error('Scraping error:', error);
    throw new Error('Failed to scrape data');
  }
};