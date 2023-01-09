import { createForm } from "remix-forms";
import {
  Form as FrameworkForm,
  useActionData,
  useSubmit,
  useTransition as useNavigation,
} from "@remix-run/react";

const Form = createForm({
  component: FrameworkForm,
  useNavigation,
  useSubmit,
  useActionData,
});

export { Form };
