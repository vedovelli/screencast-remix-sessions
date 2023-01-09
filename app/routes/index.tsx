import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="font-semibold text-center pt-12 text-2xl">
      <h1>Remix.run - Sessions</h1>
      <Link to={`/signup`} className="underline text-blue-500">
        Sign Up
      </Link>
    </div>
  );
}
