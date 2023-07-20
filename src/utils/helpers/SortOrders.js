export const sortedOrders = (orders) => {
  const updatedOrders = orders.map((order) => {
    const createdAt = new Date(
      order.createdAt.seconds * 1000 + order.createdAt.nanoseconds / 1000000
    );
    return { ...order, createdAt };
  });
  const sorted = updatedOrders.sort((a, b) => b.createdAt - a.createdAt);
  return sorted;
};
