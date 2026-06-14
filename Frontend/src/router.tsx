/**
 * ROUTER SETUP FILE
 * Configures TanStack Router with React Query for data management
 * This file initializes the entire routing system for the app
 * Do NOT rename or move this file - it's referenced in vite.config.ts
 */

import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
