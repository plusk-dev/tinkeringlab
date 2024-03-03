import axios, { AxiosResponse } from "axios";

let BASE_URL = "http://127.0.0.1:5000";

async function getUrl(url: string, params: any): Promise<AxiosResponse> {
  try {
    const response = await axios.get(BASE_URL + url, { params });
    console.log("HI"+ response)
    return response;
  } catch (error: any) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

async function postUrl(url: string, params: any): Promise<AxiosResponse> {
  try {
    const response = await axios.post(BASE_URL + url, null, {
      params
    });
    return response;
  } catch (error: any) {
    throw new Error(`Error fetching data ${error.message}`);
  }
}

function getTokenFromStorage(): string | null {
  return localStorage.getItem("token");
}

function setToken(token: string): undefined {
  localStorage.setItem("token", token);
}


export {
  getUrl,
  postUrl,
  getTokenFromStorage,
  setToken
};