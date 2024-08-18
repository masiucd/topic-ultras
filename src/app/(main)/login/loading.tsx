import {H1} from "@/components/typography";
import {Flex, Skeleton} from "@radix-ui/themes";

export default function LoginLoading() {
  return <Loading />;
}

function Loading() {
  return (
    <Flex
      direction="column"
      gap="3"
      className="animate-pulse  mx-auto w-full"
      maxWidth="700px"
      flexGrow="1"
      justify="center"
    >
      <Skeleton
        height="20px"
        className="rounded-md shadow-md bg-gray-800 w-8/12"
      />
      <Skeleton
        height="20px"
        className="rounded-md shadow-md bg-gray-800 w-6/12"
      />

      <Skeleton
        height="20px"
        className="rounded-md shadow-md bg-gray-800 w-11/12"
      />
      <Skeleton
        height="20px"
        className="rounded-md shadow-md bg-gray-800 w-8/12"
      />
      <Skeleton
        height="20px"
        className="rounded-md shadow-md bg-gray-800 w-3/12"
      />
      <Skeleton
        height="20px"
        className="rounded-md shadow-md bg-gray-800 w-4/12"
      />
      <Skeleton
        height="20px"
        className="rounded-md shadow-md bg-gray-800 w-3/12"
      />
      <Skeleton
        height="20px"
        className="rounded-md shadow-md bg-gray-800 w-8/12"
      />
      <Skeleton
        height="20px"
        className="rounded-md shadow-md bg-gray-800 w-10/12"
      />
    </Flex>
  );
}
