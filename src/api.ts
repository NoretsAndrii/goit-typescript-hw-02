import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com';

export async function fetchImages<T>(query: string, page: number): Promise<T> {
  const response = await axios.get<T>('/search/photos', {
    params: {
      client_id: 'atRLm6T0r2wFSN24-uwDTljx3r9QG0FnyRG40FvMP9U',
      query: query,
      page: page,
      orientation: 'landscape',
    },
  });
  console.log(response);
  return response.data;
}
