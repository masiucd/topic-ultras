import {Flex, Skeleton} from "@radix-ui/themes";

export default function LoginLoading() {
  return <Loading />;
}

function Loading() {
  return (
    <Flex
      direction="column"
      gap="3"
      className="mx-auto  w-full animate-pulse"
      maxWidth="700px"
      flexGrow="1"
      justify="center"
    >
      <Skeleton
        height="20px"
        className="w-8/12 rounded-md bg-gray-800 shadow-md"
      />
      <Skeleton
        height="20px"
        className="w-6/12 rounded-md bg-gray-800 shadow-md"
      />

      <Skeleton
        height="20px"
        className="w-11/12 rounded-md bg-gray-800 shadow-md"
      />
      <Skeleton
        height="20px"
        className="w-8/12 rounded-md bg-gray-800 shadow-md"
      />
      <Skeleton
        height="20px"
        className="w-3/12 rounded-md bg-gray-800 shadow-md"
      />
      <Skeleton
        height="20px"
        className="w-4/12 rounded-md bg-gray-800 shadow-md"
      />
      <Skeleton
        height="20px"
        className="w-3/12 rounded-md bg-gray-800 shadow-md"
      />
      <Skeleton
        height="20px"
        className="w-8/12 rounded-md bg-gray-800 shadow-md"
      />
      <Skeleton
        height="20px"
        className="w-10/12 rounded-md bg-gray-800 shadow-md"
      />
    </Flex>
  );
}
