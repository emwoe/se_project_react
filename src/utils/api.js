export const getItems = () => {
  return fetch("http://localhost:3001/items").then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

export const postItem = (data) => {
  return fetch("http://localhost:3001/items", {
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
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

export const deleteItem = (data) => {
  return fetch(`http://localhost:3001/items/${data._id}`, {
    method: "DELETE",
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};
