import axios, { AxiosResponse } from "axios";

let BASE_URL = "http://127.0.0.1:5000";

async function getUrl(url: string, params: any): Promise<AxiosResponse> {
  const headers = { Accept: 'application/json' };
  try {
    const response = await axios.get(BASE_URL + url, { params, headers });
    return response.data;
  } catch (error: any) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

export default getUrl;