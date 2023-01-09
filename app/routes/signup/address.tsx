import { z } from "zod";
import { Form } from "~/form";
import { type ActionArgs, redirect } from "@remix-run/node";
import { commitSession, getSession } from "~/session.server";

export async function action({ request }: ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();

  session.set("street", formData.get("street"));
  session.set("number", formData.get("number"));
  session.set("zip", formData.get("zip"));

  return redirect("/signup/success", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

const schema = z.object({
  street: z.string().min(2),
  number: z.string().min(1),
  zip: z.string().min(2),
});

const values: z.infer<typeof schema> = {
  street: "Rua Cinco",
  number: "6",
  zip: "09000-150",
};

export default function () {
  return <Form schema={schema} values={values} />;
}
