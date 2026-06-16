import { createFileRoute } from "@tanstack/react-router";
import { SignUpPage } from "@/pages/auth/SignUpPage";

export const Route = createFileRoute("/signup")({
  component: SignUpPage,
  head: () => ({
    meta: [
      { title: "Sign Up - Bynixx Pathways" },
      { name: "description", content: "Create your Bynixx Pathways account" },
    ],
  }),
});
