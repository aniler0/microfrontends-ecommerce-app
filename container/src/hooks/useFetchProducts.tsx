import { ProductCardType } from "app2/ProductCard";
import { useEffect, useState } from "react";
import { getProducts } from "../api/axios";

const useFetchProducts = () => {
  const [data, setData] = useState<ProductCardType[]>([]);
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

  return { isLoading, data };
};

export default useFetchProducts;
