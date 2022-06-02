import {
  Center,
  Flex,
  IconButton,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { ProductsType } from "../types/productsType";

interface PopoverMenuProps {
  header: string;
  data: ProductsType[] | undefined;
  icon?: JSX.Element;
}

const PopoverMenu = ({ header, data, icon }: PopoverMenuProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton aria-label="button" colorScheme="whiteAlpha" icon={icon} />
      </PopoverTrigger>
      <PopoverContent w="400px">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontWeight="bold">{header}</PopoverHeader>
        <PopoverBody>
          {data?.find((elm) => elm.isFavorite)
            ? data?.map(
                (product, key) =>
                  product.isFavorite && (
                    <Center key={key} p="1em">
                      <Flex
                        direction="row"
                        align="center"
                        justify="space-between"
                        w="85%"
                      >
                        <Image w="50px" h="50px" src={product.image} />
                        <Flex align="flex-start" direction="column" w="80%">
                          <Text fontSize="small">{product.title}</Text>
                          <Text fontSize="small" fontWeight="bold">
                            ${product.price}
                          </Text>
                        </Flex>
                      </Flex>
                    </Center>
                  )
              )
            : "There is no item"}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverMenu;
