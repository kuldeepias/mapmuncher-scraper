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
    const response = await axios.post(
      'https://google.serper.dev/search',
      {
        q: `${businessType} in ${location}`,
        type: 'places'
      },
      {
        headers: {
          'X-API-KEY': localStorage.getItem('SERPER_API_KEY') || '',
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.data.places) {
      throw new Error('No results found');
    }

    return response.data.places.map((place: any) => ({
      name: place.title || 'N/A',
      address: place.address || 'N/A',
      phone: place.phoneNumber || 'N/A',
      rating: place.rating?.toString() || 'N/A',
      reviews: place.reviewsCount?.toString() || 'N/A',
      website: place.website || ''
    }));
  } catch (error) {
    console.error('Scraping error:', error);
    throw new Error('Failed to fetch data from Serper.dev');
  }
};