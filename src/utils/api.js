import { baseUrl } from "./constants";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
}

export const getItems = () => {
  return fetch(`${baseUrl}/items`).then(checkResponse);
};

export const postItem = (data, token) => {
  return fetch(`${baseUrl}/users`, {
    method: "POST",
    body: JSON.stringify({
      _id: data._id,
      name: data.name,
      weather: data.weather,
      imageUrl: data.imageUrl,
    }),
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const deleteItem = (dataID, token) => {
  return fetch(`${baseUrl}/users/${dataID}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
