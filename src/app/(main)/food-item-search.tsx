import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

export function FoodItemSearch(props: {
  type: string;
  htmlFor: string;
  placeholder?: string;
  label: string;
}) {
  return (
    <>
      <Label htmlFor={props.htmlFor}>{props.label}</Label>
      <Input
        type={props.type}
        id={props.htmlFor}
        placeholder={props.placeholder}
      />
    </>
  );
}
