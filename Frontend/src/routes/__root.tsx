/**
 * ROOT LAYOUT FILE (__root.tsx)
 * This wraps EVERY page in your app (the outermost layout)
 * All pages will be nested inside the RootLayout component below
 * The filename "__root.tsx" is special - DO NOT rename it
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { RootShell } from "@/components/layout/RootShell";
import { NotFoundPage } from "@/pages/404Page";
import { ErrorPage } from "@/pages/ErrorPage";

import appCss from "../styles.css?url";
import logoUrl from "@/assets/logo.png";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
      head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Bynixx Pathways" },
      { name: "description", content: "Bynixx Pathways Platform" },
      { name: "author", content: "Bynixx" },
      { property: "og:title", content: "Bynixx Pathways" },
      { property: "og:description", content: "Bynixx Pathways Platform" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Bynixx" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        href: logoUrl,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootLayout,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorPage,
});


function RootLayout() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
