"use client";
import type {PropsWithChildren} from "react";
import {useFormState, useFormStatus} from "react-dom";

import {searchFood} from "@/actions/search-food";
import {cn} from "@/lib/cn";
import {Button} from "@/shared/components/ui/button";

// TODO save state in url params
export function SearchFood() {
  let [foodResult, action] = useFormState(searchFood, null);
  return (
    <div>
      <div>SearchFood</div>
      <FoodForm action={action} />
      {foodResult !== null ? (
        <>
          {foodResult.success ? (
            <>
              <div>
                <p>{foodResult.result?.name}</p>
                <p>{foodResult.result?.description}</p>
              </div>
            </>
          ) : (
            <div>
              <p>
                There was no result for <strong>{foodResult.search}</strong>.
              </p>
            </div>
          )}
        </>
      ) : (
        <p>Search for a food</p>
      )}
    </div>
  );
}

function FoodForm({
  action,
}: {
  // eslint-disable-next-line no-unused-vars
  action: (formData: FormData) => void;
}) {
  return (
    <form
      action={action}
      className="flex flex-col border border-blue-400 md:w-full md:max-w-xl"
    >
      <input
        type="text"
        datatype="text"
        placeholder="Search for food"
        name="food"
        required
      />
      <SubmitButton>
        <span>search</span>
      </SubmitButton>
    </form>
  );
}

type SubmitButtonProps = {
  className?: string;
};
function SubmitButton({
  className,
  children,
}: PropsWithChildren<SubmitButtonProps>) {
  let {pending} = useFormStatus();
  return (
    <Button
      isDisabled={pending}
      className={cn("font-semibold capitalize", className)}
      type="submit"
    >
      {children}
    </Button>
  );
}
