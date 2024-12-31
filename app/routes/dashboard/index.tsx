import {Link} from "react-router";

export default function DashboardRoute() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/dashboard/settings">Edit Profile</Link>
    </div>
  );
}
