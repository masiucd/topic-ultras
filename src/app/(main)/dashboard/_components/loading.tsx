import {Flex, Skeleton} from "@radix-ui/themes";

export default function Loading() {
  return (
    <Flex direction="column" width="350px" gap="4">
      <Skeleton className="h-2 w-10/12 rounded-md bg-gray-400" />
      <Skeleton className="h-2 w-8/12 rounded-md bg-gray-400" />
      <Skeleton className="h-2 w-6/12 rounded-md bg-gray-400" />
      <Skeleton className="h-2 w-6/12 rounded-md bg-gray-400" />
      <Skeleton className="h-2 w-8/12 rounded-md bg-gray-400" />
      <Skeleton className="h-2 w-4/12 rounded-md bg-gray-400" />
      <Skeleton className="h-2 w-10/12 rounded-md bg-gray-400" />
      <Skeleton className="h-2 w-8/12 rounded-md bg-gray-400" />
      <Skeleton className="h-2 w-6/12 rounded-md bg-gray-400" />
      <Skeleton className="h-2 w-10/12 rounded-md bg-gray-400" />
      <Skeleton className="h-2 w-8/12 rounded-md bg-gray-400" />
    </Flex>
  );
}
