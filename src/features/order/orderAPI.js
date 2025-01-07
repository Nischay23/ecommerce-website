export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders/" + order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrders(sort, pagination) {
  let queryString = new URLSearchParams({
    ...sort,
    ...pagination,
  }).toString();

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `http://localhost:8080/orders?${queryString}`
      );
      const ordersData = await response.json();
      resolve({
        data: { orders: ordersData.data, totalOrders: ordersData.items },
      });
    } catch (error) {
      reject(error);
    }
  });
}
