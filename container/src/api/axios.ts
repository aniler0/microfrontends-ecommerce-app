import axios from "axios";
import { ProductsType } from "../types/productsType";

const API = axios.create({
  baseURL: "https://fakestoreapi.com/products",
});

export const getProducts = async () => {
  const { data } = await API.get<ProductsType[]>("/");
  return data;
};
