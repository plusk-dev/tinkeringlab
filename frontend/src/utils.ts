import axios, { AxiosResponse } from "axios";

let BASE_URL = "http://127.0.0.1:5000";

async function getUrl(url: string, params: any): Promise<AxiosResponse> {
  try {
    const response = await axios.get(BASE_URL + url, {
      params, headers: {
        token: getTokenFromStorage()
      }
    });
    return response;
  } catch (error: any) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

async function getVerifiedUrl(url: string, params: any): Promise<AxiosResponse> {
  try {
    const response = await axios.get(BASE_URL + url, {
      params, headers: {
        token: getTokenFromStorage()
      }
    });
    return response;
  } catch (error: any) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

async function postUrl(url: string, params: any): Promise<AxiosResponse> {
  try {
    const response = await axios.post(BASE_URL + url, null, {
      params,
      headers: {
        token: getTokenFromStorage(),
      }
    });
    return response;
  } catch (error: any) {
    throw new Error(`Error fetching data ${error.message}`);
  }
}

async function postUrlWithFile(url: string, params: any): Promise<AxiosResponse> {
  try {
    const response = await axios.post(BASE_URL + url, params, {
      headers: {
        token: getTokenFromStorage(),
        "Content-Type": "multipart/form-data"
      }
    });
    return response;
  } catch (error: any) {
    throw new Error(`Error fetching data ${error.message}`);
  }
}


async function sendDecision(decision: boolean, request_type: string, request_id: number): Promise<number> {
  return postUrl(`/bookings/${request_type}/decision`, {
    decision: decision,
    request_id: request_id
  }).then(response => {
    return response.status;
  })
}

async function verify_token(token: string | null): Promise<AxiosResponse> {
  const headers = {
    'token': token
  };

  const response = await axios.post("http://127.0.0.1:5000/verify_token", {}, { headers });
  return response;
}
async function verify_admin_token(token: string | null): Promise<AxiosResponse> {
  const headers = {
    'token': token
  };

  const response = await axios.post("http://127.0.0.1:5000/verify_token_admin", {}, { headers });
  return response;
}

function getTokenFromStorage(): string | null {
  return localStorage.getItem("token");
}

function setToken(token: string): undefined {
  localStorage.setItem("token", token);
}

function deleteTokenFromStorage(): undefined {
  localStorage.removeItem("token");
}


export {
  getUrl,
  postUrl,
  getTokenFromStorage,
  setToken, verify_token, deleteTokenFromStorage, verify_admin_token, getVerifiedUrl, postUrlWithFile, sendDecision
};