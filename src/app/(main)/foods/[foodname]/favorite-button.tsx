import {Tooltip} from "@radix-ui/themes";
import * as R from "remeda";

import {Icons} from "@/components/ui/icons";
import {SubmitButton} from "@/components/ui/submit-button";

import {addOrRemoveFavoriteFood} from "./actions";
import {getFavoriteFoods} from "./dao";

export async function FavoriteButton({
  userId,
  foodId,
  foodName,
}: {
  userId: number;
  foodId: number;
  foodName: string;
}) {
  let favoriteFoods = await getFavoriteFoods(userId, foodId);
  let favoriteFood = R.find(favoriteFoods, (ff) => ff.foodId === foodId && ff.userId === userId);

  return (
    <Tooltip content={favoriteFood ? `Unfavorite ${foodName}` : `Add ${foodName} to favorites`}>
      <form action={addOrRemoveFavoriteFood}>
        <input type="hidden" name="food-id" value={foodId} />
        <input type="hidden" name="user-id" value={userId} />
        <input type="hidden" name="food-name" value={foodName} />
        <input type="hidden" name="is-favorite" value={favoriteFood ? "true" : "false"} />
        <SubmitButton variant={favoriteFood ? "solid" : "soft"}>
          <Icons.Star />
        </SubmitButton>
      </form>
    </Tooltip>
  );
}
