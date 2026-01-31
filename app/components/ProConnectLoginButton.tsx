"use client";

import { signIn } from "next-auth/react";

export default function ProConnectLoginButton() {
  return (
    <div className="fr-connect-group">
      <button
        type="button"
        className="fr-connect"
        onClick={() => {
          signIn("proconnect", { callbackUrl: "/" });
        }}
      >
        <span className="fr-connect__login">S'identifier avec</span>
        <span className="fr-connect__brand">ProConnect</span>
      </button>
      <p>
        <a
          href="https://www.proconnect.gouv.fr/"
          target="_blank"
          rel="noopener"
          title="Qu'est-ce que ProConnect ? - nouvelle fenêtre"
        >
          Qu'est-ce que ProConnect ?
        </a>
      </p>
    </div>
  );
}
