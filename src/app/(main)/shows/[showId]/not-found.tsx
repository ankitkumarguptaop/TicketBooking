import Link from "next/link";

import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";

export default function ShowNotFound() {
  return (
    <Container className="flex flex-col items-start gap-4 py-24">
      <h1 className="font-heading text-2xl font-bold">Show not found</h1>
      <p className="text-sm text-muted-foreground">This show may have ended, or the link is wrong.</p>
      <Button asChild size="lg">
        <Link href="/">Browse movies</Link>
      </Button>
    </Container>
  );
}
