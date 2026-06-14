import { createFileRoute } from "@tanstack/react-router";
import { ReviewsPage } from "@/pages/mentor/ReviewsPage";

export const Route = createFileRoute("/mentor/reviews")({ component: ReviewsPage });
