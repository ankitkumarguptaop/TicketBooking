"use client";

import { useEffect } from "react";

import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";

type Props = {
  error: unknown;
  retry: () => void;
};

export default function MainError({ error, retry }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex flex-col items-start gap-4 py-24">
      <h1 className="font-heading text-2xl font-bold">We couldn’t load this page</h1>
      <p className="text-sm text-muted-foreground">Check your connection and try again.</p>
      <Button size="lg" onClick={retry}>
        Try again
      </Button>
    </Container>
  );
}
