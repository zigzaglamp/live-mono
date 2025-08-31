// apps/viewer/app/schedule/page.tsx

import ScheduleClient from "@features/ScheduleClient";
import { daysStrip, categories } from "@/components/data";

export default function SchedulePage() {
  return (
    <>
      <ScheduleClient daysStrip={daysStrip} categories={categories} />
    </>
  );
}
