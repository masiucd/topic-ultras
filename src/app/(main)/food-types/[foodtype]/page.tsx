export default function FoodTypeSlugPage({
  params: {foodtype},
}: {
  params: {foodtype: string};
}) {
  //TODO get food data by food type
  return (
    <div>
      <h1>{foodtype}</h1>
    </div>
  );
}
