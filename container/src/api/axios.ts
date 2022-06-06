import { ProductCardType } from "app2/ProductCard";
import axios from "axios";

const API = axios.create({
  baseURL: "https://fakestoreapi.com/products",
});

export const getProducts = async () => {
  const { data } = await API.get<ProductCardType[]>("/");
  return data;
};
