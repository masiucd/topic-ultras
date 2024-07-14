import {Flex} from "@radix-ui/themes";

import {siteData} from "@/site-data";

const CURRENT_YEAR = new Date().getFullYear();
export function MainFooter() {
  return (
    <footer>
      <Flex className="h-20 sm:ml-56">
        <small>
          © {CURRENT_YEAR} {siteData.title}
        </small>
      </Flex>
    </footer>
  );
}
