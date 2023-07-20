import {
  useEffect,
  useState,
  createContext,
  useContext,
  useReducer,
} from "react";
import useFetch from "../hooks/useFetch";
import { productReducer } from "./productReducer";

const FetchedProduct = createContext();

export default function ProductContext({ children }) {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState();
  const [productState, productDispatch] = useReducer(productReducer, {
    all: true,
    building: false,
    plumbing: false,
    electrical: false,
    searchQuery: "",
  });

  //  fetching products
  const collectionName = "products";
  const { data, loading } = useFetch(collectionName);

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  //  fetching orders
  const ordersCollection = "orders";
  const { data: orderData, loading: orderLoading } = useFetch(ordersCollection);
  useEffect(() => {
    if (orderData) {
      setOrders(orderData);
    }
  }, [orderData]);

  return (
    <FetchedProduct.Provider
      value={{
        ...productState,
        productDispatch,
        products,
        loading,
        orders,
        orderLoading,
      }}
    >
      {children}
    </FetchedProduct.Provider>
  );
}

export function useProduct() {
  return useContext(FetchedProduct);
}
