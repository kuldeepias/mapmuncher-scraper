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
    let allPlaces: BusinessData[] = [];
    let currentPage = 0;
    let hasMoreResults = true;

    while (hasMoreResults) {
      const response = await axios.post(
        'https://google.serper.dev/search',
        {
          q: `${businessType} in ${location}`,
          type: 'places',
          page: currentPage
        },
        {
          headers: {
            'X-API-KEY': localStorage.getItem('SERPER_API_KEY') || '',
            'Content-Type': 'application/json'
          }
        }
      );

      // If no places or serpapi_pagination is null/undefined, we've reached the end
      if (!response.data.places || response.data.places.length === 0 || !response.data.serpapi_pagination) {
        hasMoreResults = false;
        break;
      }

      const newPlaces = response.data.places.map((place: any) => ({
        name: place.title || 'N/A',
        address: place.address || 'N/A',
        phone: place.phoneNumber || 'N/A',
        rating: place.rating?.toString() || 'N/A',
        reviews: place.reviewsCount?.toString() || 'N/A',
        website: place.website || ''
      }));

      allPlaces = [...allPlaces, ...newPlaces];
      currentPage++;

      // Add a small delay between requests to avoid rate limiting
      if (hasMoreResults) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return allPlaces;
  } catch (error) {
    console.error('Scraping error:', error);
    throw new Error('Failed to fetch data from Serper.dev');
  }
};