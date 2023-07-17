export const cartSum = (cart) => {
  const totalQuantity = cart.reduce(
    (total, product) => total + Number(product.cartQuantity),
    0
  );

  const totalPrice = cart
    .reduce(
      (total, product) => total + Number(product.cartQuantity * product.price),
      0
    )
    .toFixed(2);
  return { totalQuantity, totalPrice };
};
