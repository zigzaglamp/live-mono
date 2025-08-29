// apps/viewer/app/live/[id]/page.tsx
import ViewerClient from "@/components/design/ViewerClient";

export default async function LivePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // ✅ Promise 풀어주기
  return <ViewerClient liveId={id} />;
}
