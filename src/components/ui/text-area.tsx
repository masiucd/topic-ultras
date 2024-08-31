import {TextArea as RadixTextArea, type TextAreaProps} from "@radix-ui/themes";

export function TextArea(props: TextAreaProps) {
  return <RadixTextArea size="1" {...props} />;
}

TextArea.displayName = "TextArea";
