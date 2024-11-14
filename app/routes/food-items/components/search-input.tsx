import {type Location, useNavigate} from "@remix-run/react";

import {Input} from "~/components/ui/input";

export function SearchInput(props: {location: Location; name: string | null}) {
  let navigate = useNavigate();
  let {location, name} = props;
  return (
    <Input
      type="text"
      placeholder="Search food items"
      defaultValue={name ?? undefined}
      onChange={(e) => {
        let search = new URLSearchParams(location.search);
        search.set("name", e.target.value);
        if (search.get("page")) {
          search.delete("page");
        }
        navigate(`${location.pathname}?${search.toString()}`);
        if (e.target.value === "") {
          search.delete("name");
          navigate(`${location.pathname}?${search.toString()}`);
        }
      }}
    />
  );
}
