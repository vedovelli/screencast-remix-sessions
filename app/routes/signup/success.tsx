import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { destroySession, getSession } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  return json(
    {
      data: session.data,
    },
    {
      headers: {
        "Set-cookie": await destroySession(session),
      },
    }
  );
}

export default function () {
  const { data } = useLoaderData<typeof loader>();

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
