"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function CreateDAModal() {
  const router = useRouter();
  const [nom, setNom] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const checkTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Reset du formulaire quand la modale se ferme
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleConceal = () => {
      setNom("");
      setNameError(null);
      setIsChecking(false);
      setIsNameValid(false);
    };

    dialog.addEventListener("dsfr.conceal", handleConceal);
    return () => dialog.removeEventListener("dsfr.conceal", handleConceal);
  }, []);

  // Vérification debounced de l'unicité du nom
  useEffect(() => {
    if (checkTimeoutRef.current) clearTimeout(checkTimeoutRef.current);

    setIsNameValid(false);

    if (!nom.trim()) {
      setNameError(null);
      setIsChecking(false);
      return;
    }

    setIsChecking(true);

    checkTimeoutRef.current = setTimeout(async () => {
      try {
        const params = new URLSearchParams({ nom: nom.trim() });
        const res = await fetch(`/api/da/check-name?${params}`);
        if (res.ok) {
          const { taken } = await res.json();
          if (taken) {
            setNameError("Un DA avec ce nom existe déjà");
            setIsNameValid(false);
          } else {
            setNameError(null);
            setIsNameValid(true);
          }
        }
      } catch {
        // Silencieux en cas d'erreur réseau
      } finally {
        setIsChecking(false);
      }
    }, 500);

    return () => {
      if (checkTimeoutRef.current) clearTimeout(checkTimeoutRef.current);
    };
  }, [nom]);

  const handleSubmit = async () => {
    if (!nom.trim() || !isNameValid || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/da", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom: nom.trim() }),
      });

      if (response.ok) {
        // Fermer la modale via l'API DSFR
        const dialogEl = dialogRef.current;
        if (
          dialogEl &&
          typeof window !== "undefined" &&
          (window as unknown as Record<string, unknown>).dsfr
        ) {
          (
            (window as unknown as Record<string, unknown>)
              .dsfr as CallableFunction
          )(dialogEl).modal.conceal();
        }
        // Rafraîchir la liste des DA
        router.refresh();
      } else {
        const error = await response.json();
        if (error.nameTaken) {
          setNameError("Un DA avec ce nom existe déjà");
        } else {
          setNameError(error.error || "Erreur lors de la création");
        }
      }
    } catch {
      setNameError("Erreur réseau");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSubmitDisabled =
    !nom.trim() || !!nameError || isChecking || isSubmitting || !isNameValid;

  return (
    <>
      <button
        data-fr-opened="false"
        aria-controls="create-da-modal"
        type="button"
        className="fr-btn"
      >
        <span className="fr-icon-add-line" aria-hidden="true"></span>
        Créer un nouveau DA
      </button>

      <dialog
        id="create-da-modal"
        className="fr-modal"
        aria-labelledby="create-da-modal-title"
        ref={dialogRef}
      >
        <div className="fr-container fr-container--fluid fr-container-md">
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
              <div className="fr-modal__body">
                <div className="fr-modal__header">
                  <button
                    aria-controls="create-da-modal"
                    title="Fermer"
                    type="button"
                    className="fr-btn--close fr-btn"
                  >
                    Fermer
                  </button>
                </div>
                <div className="fr-modal__content">
                  <h1
                    id="create-da-modal-title"
                    className="fr-modal__title"
                  >
                    Créer un nouveau Document d&apos;Architecture
                  </h1>
                  <div
                    className={`fr-input-group${nameError ? " fr-input-group--error" : isNameValid ? " fr-input-group--valid" : ""}`}
                  >
                    <label className="fr-label" htmlFor="create-da-nom">
                      Nom du projet applicatif
                    </label>
                    <input
                      className={`fr-input${nameError ? " fr-input--error" : isNameValid ? " fr-input--valid" : ""}`}
                      id="create-da-nom"
                      type="text"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !isSubmitDisabled)
                          handleSubmit();
                      }}
                      aria-describedby={
                        nameError ? "create-da-nom-error" : undefined
                      }
                    />
                    {nameError && (
                      <p
                        id="create-da-nom-error"
                        className="fr-error-text"
                      >
                        {nameError}
                      </p>
                    )}
                    {isChecking && (
                      <p className="fr-info-text">
                        Vérification du nom...
                      </p>
                    )}
                    {isNameValid && !isChecking && (
                      <p className="fr-valid-text">Nom disponible</p>
                    )}
                  </div>
                </div>
                <div className="fr-modal__footer">
                  <div className="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg">
                    <button
                      type="button"
                      className="fr-btn"
                      disabled={isSubmitDisabled}
                      onClick={handleSubmit}
                    >
                      Créer le DA
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
