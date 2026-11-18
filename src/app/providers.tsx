"use client";

import { useState, type ReactNode } from "react";
import { Provider } from "react-redux";

import { Toaster } from "@/shared/ui/sonner";

import { makeStore } from "./store";

type Props = {
  children: ReactNode;
};

export function Providers({ children }: Props) {
  // Lazy initial state: one store per browser session (and per server request),
  // never a module-level singleton shared between users on the server.
  const [store] = useState(makeStore);

  return (
    <Provider store={store}>
      {children}
      <Toaster richColors position="top-center" />
    </Provider>
  );
}
