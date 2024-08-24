import {Flex, Skeleton} from "@radix-ui/themes";

// TODO
export default function ProfileLoading() {
  return (
    <Flex direction="column" maxWidth="350px">
      <Skeleton className="h-2 rounded-md bg-gray-400" />
    </Flex>
  );
}
