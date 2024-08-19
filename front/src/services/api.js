export const API_URL = "http://localhost:3001/api/v1";

export const LOGIN_ENDPOINT = "/user/login";
export const PROFILE_ENDPOINT = "/user/profile";

const fetcher = async (endpoint, content, options) =>
  fetch(API_URL + endpoint, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: options.token ? `Bearer ${options.token}` : null,
    },
    body: content ? JSON.stringify(content) : null,
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
    throw response;
  });

export const getUserProfile = (token) =>
  fetcher(PROFILE_ENDPOINT, null, { method: "POST", token });

export const loginUser = (email, password) =>
  fetcher(LOGIN_ENDPOINT, { email, password }, { method: "POST" });

export const updateUserProfile = (profile, token) =>
  fetcher(PROFILE_ENDPOINT, profile, { method: "PUT", token });

export const fakeNetwork = async (delay, random = true) =>
  new Promise((res) => setTimeout(res, (random ? Math.random() : 1) * delay));
