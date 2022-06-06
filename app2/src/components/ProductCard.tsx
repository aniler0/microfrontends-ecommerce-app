import {
  Text,
  Flex,
  Image,
  Box,
  Fade,
  Button,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { Heart } from "../Icons";
import ProductAdd from "./ProductAdd";

export interface ProductsType {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  isFavorite: boolean;
  quantity: number;
}

export interface ProductCardProps extends ProductsType {
  setFavorite: (id: number, isFavorite: boolean) => void;
  increaseProduct: (id: number, quantity: number) => void;
  decreaseProduct: (id: number, quantity: number) => void;
}

const ProductCard = ({
  title,
  price,
  image,
  id,
  isFavorite = false,
  setFavorite,
  increaseProduct,
  decreaseProduct,
  quantity = 0,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box
      maxW="sm"
      borderRadius="1rem"
      overflow="hidden"
      w="200px"
      p="2.8rem 1rem"
      height="350px"
      maxHeight="500px"
      position="relative"
      border="1px solid #ebebeb"
      backgroundColor="#fff"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box
        top={3}
        right={3}
        position="absolute"
        sx={{
          "svg:hover": {
            fill: "red",
            path: { strokeWidth: "0px" },
            cursor: "pointer",
          },
          svg: {
            fill: isFavorite && "red",
            path: { strokeWidth: isFavorite && "0px" },
          },
        }}
        onClick={() => setFavorite(id, isFavorite)}
        zIndex={2000}
      >
        <Heart />
      </Box>
      <Flex
        color="#000"
        direction="column"
        justify="space-around"
        h="100%"
        align="center"
      >
        <Image src={image} h="150px" objectFit="fill" w="100%" />
        <Box>
          <Text fontSize="small" fontWeight="light">
            {title}
          </Text>
          <Text
            marginTop="10px"
            textAlign="center"
            fontSize="small"
            fontWeight="bold"
          >
            ${price}
          </Text>
        </Box>
      </Flex>

      <Center>
        {!isOpen ? (
          <Button
            colorScheme="blue"
            size="sm"
            fontWeight="light"
            fontSize="sm"
            onClick={() => {
              onToggle();
              increaseProduct(id, quantity);
            }}
          >
            Add to Cart
          </Button>
        ) : (
          <Fade in={isOpen}>
            <ProductAdd
              quantity={quantity}
              id={id}
              onToggle={onToggle}
              decreaseProduct={() => decreaseProduct(id, quantity)}
              increaseProduct={() => increaseProduct(id, quantity)}
            />
          </Fade>
        )}
      </Center>
    </Box>
  );
};

export default ProductCard;
