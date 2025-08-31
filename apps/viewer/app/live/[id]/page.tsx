// apps/viewer/app/live/[id]/page.tsx

import ViewerClient from "@features/ViewerClient";

export default async function LivePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ViewerClient liveId={id} />;
}
