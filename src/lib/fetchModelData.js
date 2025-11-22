function fetchModel(url) {
  return new Promise(function (resolve, reject) {
    const serverUrl = "http://localhost:8081/api" + url;

    fetch(serverUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          reject({
            status: response.status,
            statusText: response.statusText,
          });
        }
      })
      .then((data) => {
        resolve({ data: data });
      })
      .catch((error) => {
        reject({
          status: 500,
          statusText: error.message || "Network Error",
        });
      });
  });
}

export default fetchModel;