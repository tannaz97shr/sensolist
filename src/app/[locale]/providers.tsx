"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "../../lib/store";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }
  return (
    <SessionProvider>
      <Provider store={storeRef.current}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}
