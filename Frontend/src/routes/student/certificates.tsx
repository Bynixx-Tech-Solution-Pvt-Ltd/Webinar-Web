/**
 * STUDENT CERTIFICATES ROUTE - /student/certificates
 */

import { createFileRoute } from "@tanstack/react-router";
import { StudentCertificatesPage } from "@/pages/student/StudentCertificatesPage";

export const Route = createFileRoute("/student/certificates")({
  component: StudentCertificatesPage,
  head: () => ({
    meta: [
      { title: "Certificates - Bynixx Pathways" },
      { name: "description", content: "View, download, and share your earned certificates" },
    ],
  }),
});
