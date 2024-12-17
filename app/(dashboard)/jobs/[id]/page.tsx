import EditJobForm from "@/components/EditJobForm";
import { getSingleJobAction } from "@/utils/action";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

// Dynamic route page
export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await params to extract its value
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["job", id],
    queryFn: () => getSingleJobAction(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditJobForm jobId={id} />
    </HydrationBoundary>
  );
}
