import { Suspense } from "react";
import TopicPage from "../components/TopicPage";
import { CircularProgress } from "@mui/material";

export default function Page() {
  return (
    <Suspense fallback={<CircularProgress/>}>
      <TopicPage />
    </Suspense>
  );
}
