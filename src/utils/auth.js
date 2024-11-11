import { baseUrl } from "./constants";
import { checkResponse } from "./api";

export const register = ({ email, password, name, avatar }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    body: JSON.stringify({ email, password, name, avatar }),
    headers: {
      "Content-type": "application/json",
    },
  }).then(checkResponse);
};

export const login = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-type": "application/json",
    },
  }).then(checkResponse);
};

export const editUserInfo = ({ newName, newImageUrl }, token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    body: JSON.stringify({ newName, newImageUrl }),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
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
