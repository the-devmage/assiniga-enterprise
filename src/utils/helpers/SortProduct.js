import { useProduct } from "../../context/ProductContext";
export function Sort(products, sortBy) {
  const { all, building, plumbing, electrical, searchQuery } = useProduct();
  let sortedProducts;
  if (all) sortedProducts = products;
  if (building)
    sortedProducts = products.filter(
      (product) => product.category === "building"
    );
  if (plumbing)
    sortedProducts = products.filter(
      (product) => product.category === "plumbing"
    );
  if (electrical)
    sortedProducts = products.filter(
      (product) => product.category === "electrical"
    );
  if (searchQuery) {
    sortedProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery)
    );
  }
  return sortedProducts;
}
