export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch("http://localhost:8080/products/" + id);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter, sort, pagination) {
  // filter = {"category":"smartphone"}
  // TODO : on server we will support multi values
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    const totalItems = data.items; // Correct field for the total count

    resolve({
      data: {
        products: data, // Assuming data.items contains the products
        totalItems: +totalItems, // Make sure totalItems is treated as a number
      },
    });
  });
}
