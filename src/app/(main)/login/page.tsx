import {PageWrapper} from "@/_components/page-wrapper";
import {H1} from "@/_components/ui/typography";

import Form from "./form";

export default function LoginPage() {
  return (
    <PageWrapper>
      <div className="my-5">
        <H1>Login</H1>
      </div>
      <div className="max-w-xl">
        <Form />
      </div>
    </PageWrapper>
  );
}
