import { baseUrl } from "./constants";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
}

export const getItems = () => {
  return fetch(baseUrl).then(checkResponse);
};

export const postItem = (data) => {
  return fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify({
      _id: data._id,
      name: data.name,
      weather: data.weather,
      imageUrl: data.imageUrl,
    }),
    headers: {
      "Content-type": "application/json",
    },
  }).then(checkResponse);
};

export const deleteItem = (dataID) => {
  return fetch(`${baseUrl}/${dataID}`, {
    method: "DELETE",
  }).then(checkResponse);
};
