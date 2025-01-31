import axios from "axios";

export const baseUrl = "https://api.theperfectboat.com";

// export const baseUrl = 'http://92.168.18.141:3000';

const instance = axios.create({
  baseURL: baseUrl,
});

instance.interceptors.request.use((request) => {
  // let token = sessionStorage.getItem("token");
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OWNkOWQ3ZTg2YTFlYzVhNDE4YzExNiIsImlhdCI6MTczODMzMjYzMiwiZXhwIjoxNzQ2MTA4NjMyfQ.0grvYkxQrb9rLBbXCmNe6WhIfWV0HagS46lchPPpy7g";

  request.headers = {
    Accept: "application/json, text/plain, */*",
    Authorization: `Bearer ${token}`,
  };
  return request;
});

instance.interceptors.response.use(
  (response) => {
    if (response) {
      return response;
    }
  },
  function (error) {
    // *For unAuthorized
    if (error.response.status === 401) {
      sessionStorage.clear();
      // window.location.href="/"
    }
    return Promise.reject(error);
  }
);

export default instance;
