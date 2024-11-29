import {Outlet} from "react-router";
import PageWrapper from "~/components/page-wrapper";

export default function AuthLayout() {
  return (
    <PageWrapper>
      <Outlet />
    </PageWrapper>
  );
}
