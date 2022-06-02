import { lazy, Suspense } from "react";
import { Center, SimpleGrid } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import useFetchProducts from "./hooks/useFetchProducts";
import { Skeleton } from "./constants/Skeleton";
import SkeletonLoading from "./components/Skeleton";

const ProductCard = lazy(() => import("app2/ProductCard"));

const App = () => {
  const { isLoading, data, setData } = useFetchProducts();
  const addFavorite = (id: string, isFavorite: boolean) => {
    setData(
      data.map((item: any) =>
        item.id === id ? { ...item, isFavorite: !isFavorite } : item
      )
    );
  };

  return (
    <>
      <Navbar data={data} />
      <Center backgroundColor="#ffffff" margin="0" p="4em" marginTop="50px">
        <SimpleGrid columns={[1, 2, 5]} spacing={3} w="80%" alignItems="center">
          {!isLoading && data.length !== 0
            ? data.map((product, key) => (
                <Suspense key={key} fallback={<SkeletonLoading />}>
                  <ProductCard addFavorite={addFavorite} {...product} />
                </Suspense>
              ))
            : Skeleton.map((skeleton, key) => <SkeletonLoading key={key} />)}
        </SimpleGrid>
      </Center>
    </>
  );
};

export default App;
