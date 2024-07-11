import {Flex} from "@radix-ui/themes";

import {siteData} from "@/site-data";

const CURRENT_YEAR = new Date().getFullYear();
export function MainFooter() {
  return (
    <footer>
      <Flex className="mx-auto h-20 w-full max-w-6xl border-4">
        <small>
          © {CURRENT_YEAR} {siteData.title}
        </small>
      </Flex>
    </footer>
  );
}
