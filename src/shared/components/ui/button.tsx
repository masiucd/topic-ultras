import {Button as RadixButton, type ButtonProps} from "@radix-ui/themes";

export default function Button(props: ButtonProps) {
  return (
    <RadixButton asChild {...props}>
      <button className={props.className}>{props.children}</button>
    </RadixButton>
  );
}
