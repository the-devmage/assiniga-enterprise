export const sortBooks = (newSales) => {
  const updatedBooks = [];

  newSales.forEach((order) => {
    order.cart.forEach((sale) => {
      // Create a custom identifier using name and size
      const productIdentifier = `${sale.name}-${sale.size}`;

      const existingProductIndex = updatedBooks.findIndex(
        (book) => book.productIdentifier === productIdentifier
      );

      if (existingProductIndex !== -1) {
        // Update the existing product
        const quantity = parseFloat(sale.cartQuantity);
        const price = parseFloat(sale.price);

        if (!isNaN(quantity) && !isNaN(price)) {
          updatedBooks[existingProductIndex].quantity += quantity;
          updatedBooks[existingProductIndex].price += quantity * price;
        }
        // Skip the entry if data is invalid
        return;
      }

      // Add the new product
      const quantity = parseFloat(sale.cartQuantity);
      const price = parseFloat(sale.price);

      if (!isNaN(quantity) && !isNaN(price)) {
        updatedBooks.push({
          id: sale.id,
          name: sale.name,
          size: sale.size,
          productIdentifier: productIdentifier, // Use custom identifier
          quantity: quantity,
          price: quantity * price,
        });
      }
      // Skip the entry if data is invalid
    });
  });

  return updatedBooks;
};
