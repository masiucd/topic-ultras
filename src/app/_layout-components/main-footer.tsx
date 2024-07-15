import {siteData} from "@/site-data";

const CURRENT_YEAR = new Date().getFullYear();
export function MainFooter() {
  return (
    <footer>
      <div className="flex h-20 sm:ml-56">
        <small>
          © {CURRENT_YEAR} {siteData.title}
        </small>
      </div>
    </footer>
  );
}
