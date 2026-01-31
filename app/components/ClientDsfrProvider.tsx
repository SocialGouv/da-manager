"use client";

import { useEffect, useState } from "react";
import { DsfrProviderBase, StartDsfrOnHydration } from "@codegouvfr/react-dsfr/next-app-router/DsfrProvider";
import Link from "next/link";
import { defaultColorScheme } from "../defaultColorScheme";

export function ClientDsfrProvider({
  lang,
  children,
}: {
  lang: string;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <DsfrProviderBase
      lang={lang}
      Link={Link}
      defaultColorScheme={defaultColorScheme}
    >
      {children}
    </DsfrProviderBase>
  );
}
