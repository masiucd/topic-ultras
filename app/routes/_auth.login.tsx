// export async function loader({}: Route.LoaderArgs) {
//   // note this is NOT awaited
//   let nonCriticalData = new Promise((res) =>
//     setTimeout(() => "non-critical", 5000)
//   );

//   let criticalData = await new Promise((res) =>
//     setTimeout(() => "critical", 300)
//   );

//   return {nonCriticalData, criticalData};
// }

export default function LoginRoute() {
  return (
    <div>
      <h1>Login</h1>
    </div>
  );
}
