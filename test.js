fetch("http://localhost:8080/products")
  .then((response) => {
    const totalCount = response.headers.get("X-Total-Count");
    if (totalCount) {
      console.log("X-Total-Count header exists:", totalCount);
    } else {
      console.log("X-Total-Count header does not exist");
    }
  })
  .catch((error) => console.error("Error:", error));
