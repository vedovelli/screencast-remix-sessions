import { z } from "zod";
import { Form } from "~/form";
import { type ActionArgs, redirect } from "@remix-run/node";
import { commitSession, getSession } from "~/session.server";

export async function action({ request }: ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  const formData = await request.formData();
  const email = formData.get("email");
  const name = formData.get("name");

  session.set("name", name);
  session.set("email", email);

  const commitedSession = await commitSession(session)
  
  return redirect("/signup/address", {
    headers: {
      "Set-Cookie": commitedSession
    },
  });
}

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});

const values: z.infer<typeof schema> = {
  email: "vedovelli@gmail.com",
  name: "Fabio Vedovelli",
};

export default function () {
  return <Form schema={schema} values={values} />;
}
