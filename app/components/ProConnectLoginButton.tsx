"use client";

import { ProConnectButton } from "@codegouvfr/react-dsfr/ProConnectButton";
import { signIn } from "next-auth/react";

export default function ProConnectLoginButton() {
  return (
    <ProConnectButton
      onClick={() => {
        signIn("proconnect", { callbackUrl: "/" });
      }}
    />
  );
}
