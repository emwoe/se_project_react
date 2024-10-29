import { baseUrl } from "./constants";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
}

export const register = (data) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    body: JSON.stringify({
      name: data.newname,
      avatar: data.avatarUrl,
      email: data.email,
      password: data.password,
    }),
    headers: {
      "Content-type": "application/json",
    },
  }).then(checkResponse);
};

export const login = (data) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
    headers: {
      "Content-type": "application/json",
    },
  }).then(checkResponse);
};

export const getUserInfo = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
