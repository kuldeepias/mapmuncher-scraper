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
    let consecutiveEmptyResponses = 0;
    const maxConsecutiveEmptyResponses = 3; // Stop after 3 consecutive empty responses

    while (hasMoreResults) {
      try {
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

        if (!response.data.places || response.data.places.length === 0) {
          consecutiveEmptyResponses++;
          if (consecutiveEmptyResponses >= maxConsecutiveEmptyResponses) {
            console.log('No more results found after multiple attempts');
            hasMoreResults = false;
            break;
          }
        } else {
          consecutiveEmptyResponses = 0; // Reset counter when we get results
          
          const newPlaces = response.data.places.map((place: any) => ({
            name: place.title || 'N/A',
            address: place.address || 'N/A',
            phone: place.phoneNumber || 'N/A',
            rating: place.rating?.toString() || 'N/A',
            reviews: place.reviewsCount?.toString() || 'N/A',
            website: place.website || ''
          }));

          allPlaces = [...allPlaces, ...newPlaces];
          console.log(`Fetched page ${currentPage + 1}, total results: ${allPlaces.length}`);
        }

        currentPage++;

        // Add a delay between requests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));

      } catch (error: any) {
        if (error.response?.status === 429) {
          // Rate limit hit - wait longer before retrying
          console.log('Rate limit hit, waiting before retrying...');
          await new Promise(resolve => setTimeout(resolve, 5000));
          continue;
        }
        console.error('Error fetching page:', error);
        hasMoreResults = false;
        break;
      }
    }

    return allPlaces;
  } catch (error) {
    console.error('Scraping error:', error);
    throw new Error('Failed to fetch data from Serper.dev');
  }
};