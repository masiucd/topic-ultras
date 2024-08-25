"use client"; // Error boundaries must be Client Components

import {Box, Button, Card, Flex} from "@radix-ui/themes";
import {useEffect} from "react";

import {H4, P} from "@/components/typography";

export default function Error({
  error,
  reset,
}: {
  error: Error & {digest?: string};
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <Box maxWidth="500px" className="shadow-xl">
      <Card className="h-full">
        <Flex direction="column" gap="3">
          <H4 size="4" className="flex items-center gap-2">
            Error
          </H4>
          <P>
            An error occurred while trying to load the contact information. Please try again later.
          </P>
          <Flex>
            <Button
              variant="surface"
              onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
              }
            >
              Try again
            </Button>
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
}
