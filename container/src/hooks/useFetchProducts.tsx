import { useEffect, useState } from "react";
import { getProducts } from "../api/axios";
import { ProductsType } from "../types/productsType";

const useFetchProducts = () => {
  const [data, setData] = useState<ProductsType[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const res = await getProducts();
      setData(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { isLoading, data, setData };
};

export default useFetchProducts;
