"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

interface RenameDAModalProps {
  daId: string;
  currentNom: string;
}

export default function RenameDAModal({ daId, currentNom }: RenameDAModalProps) {
  const router = useRouter();
  const [nom, setNom] = useState(currentNom);
  const [nameError, setNameError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [mounted, setMounted] = useState(false);
  const checkTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const modalId = `rename-da-modal-${daId}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset du formulaire quand la modale se ferme
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleConceal = () => {
      setNom(currentNom);
      setNameError(null);
      setIsChecking(false);
      setIsNameValid(false);
    };

    dialog.addEventListener("dsfr.conceal", handleConceal);
    return () => dialog.removeEventListener("dsfr.conceal", handleConceal);
  }, [currentNom]);

  // Vérification debounced de l'unicité du nom
  useEffect(() => {
    if (checkTimeoutRef.current) clearTimeout(checkTimeoutRef.current);

    setIsNameValid(false);

    const trimmed = nom.trim();

    if (!trimmed) {
      setNameError(null);
      setIsChecking(false);
      return;
    }

    // Si le nom n'a pas changé, pas besoin de vérifier
    if (trimmed.toLowerCase() === currentNom.trim().toLowerCase()) {
      setNameError(null);
      setIsChecking(false);
      return;
    }

    setIsChecking(true);

    checkTimeoutRef.current = setTimeout(async () => {
      try {
        const params = new URLSearchParams({
          nom: trimmed,
          excludeId: daId,
        });
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
  }, [nom, currentNom, daId]);

  const handleSubmit = async () => {
    const trimmed = nom.trim();
    if (!trimmed || !isNameValid || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/da/${daId}/rename`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom: trimmed }),
      });

      if (response.ok) {
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
        router.refresh();
      } else {
        const error = await response.json();
        if (error.nameTaken) {
          setNameError("Un DA avec ce nom existe déjà");
        } else {
          setNameError(error.error || "Erreur lors du renommage");
        }
      }
    } catch {
      setNameError("Erreur réseau");
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasChanged =
    nom.trim().toLowerCase() !== currentNom.trim().toLowerCase();
  const isSubmitDisabled =
    !nom.trim() ||
    !hasChanged ||
    !!nameError ||
    isChecking ||
    isSubmitting ||
    !isNameValid;

  const modalContent = (
    <dialog
      id={modalId}
      className="fr-modal"
      aria-labelledby={`${modalId}-title`}
      ref={dialogRef}
    >
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button
                  aria-controls={modalId}
                  title="Fermer"
                  type="button"
                  className="fr-btn--close fr-btn"
                >
                  Fermer
                </button>
              </div>
              <div className="fr-modal__content">
                <h1
                  id={`${modalId}-title`}
                  className="fr-modal__title"
                >
                  Renommer le Document d&apos;Architecture
                </h1>
                <div
                  className={`fr-input-group${nameError ? " fr-input-group--error" : isNameValid ? " fr-input-group--valid" : ""}`}
                >
                  <label className="fr-label" htmlFor={`${modalId}-nom`}>
                    Nom du projet applicatif
                  </label>
                  <input
                    className={`fr-input${nameError ? " fr-input--error" : isNameValid ? " fr-input--valid" : ""}`}
                    id={`${modalId}-nom`}
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !isSubmitDisabled)
                        handleSubmit();
                    }}
                    aria-describedby={
                      nameError ? `${modalId}-nom-error` : undefined
                    }
                  />
                  {nameError && (
                    <p
                      id={`${modalId}-nom-error`}
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
                    Renommer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );

  return (
    <>
      <button
        data-fr-opened="false"
        aria-controls={modalId}
        type="button"
        className="fr-btn fr-btn--sm fr-btn--tertiary fr-icon-edit-box-line"
        title="Renommer"
      />
      {mounted ? createPortal(modalContent, document.body) : null}
    </>
  );
}
