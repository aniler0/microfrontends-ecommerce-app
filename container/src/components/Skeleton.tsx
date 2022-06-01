import { Center, Spinner } from "@chakra-ui/react";

const SkeletonLoading = () => {
  return (
    <Center
      maxW="sm"
      borderRadius="1rem"
      overflow="hidden"
      w="200px"
      p="2rem"
      height="350px"
      maxHeight="500px"
      position="relative"
      border="1px solid #ebebeb"
      backgroundColor="#fff"
    >
      <Spinner size="xl" />
    </Center>
  );
};

export default SkeletonLoading;
