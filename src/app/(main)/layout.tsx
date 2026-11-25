import { Suspense } from "react";

import { SessionEventsListener, SessionGuard, SessionRestorer } from "@/features/restore-session";
import { Header } from "@/widgets/header";

export default function MainLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      {/* Renders nothing; Suspense only keeps its query out of the static shell. */}
      <Suspense fallback={null}>
        <SessionRestorer />
      </Suspense>
      {/* Live "signed out from another device" events; renders nothing. */}
      <Suspense fallback={null}>
        <SessionEventsListener />
      </Suspense>
      {/* The guard reads the pathname, which is request data on dynamic routes. */}
      <Suspense fallback={null}>
        <SessionGuard />
      </Suspense>
      <Header />
      <main className="flex flex-1 flex-col pb-16">{children}</main>
    </>
  );
}
