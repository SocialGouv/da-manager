"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import type { DAData } from "@/types/da.types";
import { initialData } from "../initialData";
import Cadre1ProjetActeurs from "../_components/Cadre1ProjetActeurs";
import Cadre2FonctionnalitesDonnees from "../_components/Cadre2FonctionnalitesDonnees";
import Cadre3ContraintesVolumetrie from "../_components/Cadre3ContraintesVolumetrie";
import Cadre4ExigencesContextuelles from "../_components/Cadre4ExigencesContextuelles";
import Cadre5ArchitectureActeurs from "../_components/Cadre5ArchitectureActeurs";
import Cadre6ArchitectureFonctionnelle from "../_components/Cadre6ArchitectureFonctionnelle";
import Cadre7ArchitectureApplicative from "../_components/Cadre7ArchitectureApplicative";
import Cadre8ArchitectureTechnique from "../_components/Cadre8ArchitectureTechnique";
import Cadre9ServeursComposants from "../_components/Cadre9ServeursComposants";
import Cadre10MatricesFlux from "../_components/Cadre10MatricesFlux";
import Cadre11Dimensionnement from "../_components/Cadre11Dimensionnement";
import Cadre12URLsAnnexe from "../_components/Cadre12URLsAnnexe";

type SaveStatus = "idle" | "saving" | "saved" | "error" | "conflict" | "name_taken";

export default function FormulaireDA() {
  const params = useParams();
  const router = useRouter();
  const daId = params.id as string;

  const [daData, setDAData] = useState<DAData>(initialData);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [formId, setFormId] = useState<string | null>(null);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<string | null>(null);
  const lastUpdatedAtRef = useRef<string | null>(null);
  const saveStatusRef = useRef<SaveStatus>("idle");

  // Refs pour l'auto-save
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstLoad = useRef(true);

  // Charger le DA
  useEffect(() => {
    const loadDA = async () => {
      if (!daId) {
        router.push("/");
        return;
      }

      if (daId === "new") {
        // Créer un nouveau DA via l'API
        try {
          const response = await fetch("/api/da", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nom: "Nouveau Document d'Architecture" }),
          });
          if (response.ok) {
            const newForm = await response.json();
            // Rediriger vers le DA créé
            router.replace(`/da/${newForm.id}`);
            return;
          } else {
            const error = await response.json();
            console.error("Erreur lors de la création du DA:", error);
            alert(error.error || "Erreur lors de la création du DA");
            router.push("/");
            return;
          }
        } catch (error) {
          console.error("Erreur lors de la création du DA:", error);
          router.push("/");
          return;
        }
      }

      // Charger un DA existant depuis l'API
      try {
        const response = await fetch(`/api/da/${daId}`);
        if (response.ok) {
          const result = await response.json();
          let data = result.data as DAData;

          // Migration: convert old cadre11 resource format (object) to new format (array)
          if (
            data.cadre11_Dimensionnement
              ?.justificationsAllocationsRessourcesMaterielles &&
            !Array.isArray(
              data.cadre11_Dimensionnement
                .justificationsAllocationsRessourcesMaterielles,
            )
          ) {
            const old = data.cadre11_Dimensionnement
              .justificationsAllocationsRessourcesMaterielles as any;
            data = {
              ...data,
              cadre11_Dimensionnement: {
                ...data.cadre11_Dimensionnement,
                justificationsAllocationsRessourcesMaterielles: [
                  {
                    nom: "",
                    detailsHypotheses: [
                      old.detailsCalculs,
                      old.nombreCPU,
                      old.nombreServeurs,
                    ]
                      .filter(Boolean)
                      .join("\n"),
                    nombreCPU: "",
                    nombreServeurs: "",
                  },
                ],
              },
            };
          }

          setDAData(data);
          setFormId(result.id);
          setLastUpdatedAt(result.updatedAt);
          lastUpdatedAtRef.current = result.updatedAt;
          isFirstLoad.current = true;
          setIsLoading(false);
        } else if (response.status === 403) {
          alert("Vous n'avez pas accès à ce document.");
          router.push("/");
        } else {
          console.error(`DA ${daId} introuvable`);
          router.push("/");
        }
      } catch (error) {
        console.error("Erreur lors du chargement du DA:", error);
        router.push("/");
      }
    };

    loadDA();
  }, [daId, router]);

  // Auto-save debounced
  const saveToServer = useCallback(
    async (data: DAData) => {
      if (!formId) return;

      setSaveStatus("saving");
      saveStatusRef.current = "saving";
      try {
        const response = await fetch(`/api/da/${formId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data, updatedAt: lastUpdatedAtRef.current }),
        });

        if (response.ok) {
          const result = await response.json();
          setLastUpdatedAt(result.updatedAt);
          lastUpdatedAtRef.current = result.updatedAt;
          setSaveStatus("saved");
          saveStatusRef.current = "saved";
          // Revenir à "idle" après 3 secondes
          setTimeout(() => {
            setSaveStatus("idle");
            saveStatusRef.current = "idle";
          }, 3000);
        } else if (response.status === 409) {
          const errorBody = await response.json();
          if (errorBody.nameTaken) {
            setSaveStatus("name_taken");
            saveStatusRef.current = "name_taken";
          } else {
            setSaveStatus("conflict");
            saveStatusRef.current = "conflict";
          }
        } else {
          setSaveStatus("error");
          saveStatusRef.current = "error";
        }
      } catch {
        setSaveStatus("error");
        saveStatusRef.current = "error";
      }
    },
    [formId],
  );

  // Déclencher l'auto-save quand daData change
  useEffect(() => {
    // Ne pas sauvegarder au premier chargement
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    if (!formId) return;

    // Stopper l'auto-save en cas de conflit
    if (saveStatusRef.current === "conflict") return;

    // Annuler le timeout précédent
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Programmer une sauvegarde dans 2 secondes
    saveTimeoutRef.current = setTimeout(() => {
      saveToServer(daData);
    }, 2000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [daData, formId, saveToServer]);

  const steps = [
    { id: 1, title: "Projet - Acteurs" },
    { id: 2, title: "Fonctionnalités - Données" },
    { id: 3, title: "Contraintes - Volumétrie" },
    { id: 4, title: "Exigences Contextuelles" },
    { id: 5, title: "Architecture Acteurs" },
    { id: 6, title: "Architecture Fonctionnelle" },
    { id: 7, title: "Architecture Applicative" },
    { id: 8, title: "Architecture Technique" },
    { id: 9, title: "Serveurs & Composants" },
    { id: 10, title: "Matrices Flux" },
    { id: 11, title: "Dimensionnement" },
    { id: 12, title: "URLs" },
  ];

  const handleNext = () => {
    if (currentStep < 12) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleMenuItemClick = (stepId: number) => {
    return (e: React.MouseEvent) => {
      e.preventDefault();
      setCurrentStep(stepId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  };

  const renderSaveStatus = () => {
    switch (saveStatus) {
      case "saving":
        return (
          <span className="fr-text--xs" style={{ color: "#666" }}>
            Sauvegarde en cours...
          </span>
        );
      case "saved":
        return (
          <span className="fr-text--xs" style={{ color: "#18753c" }}>
            <span
              className="fr-icon-check-line fr-icon--sm"
              aria-hidden="true"
            ></span>{" "}
            Sauvegardé
          </span>
        );
      case "error":
        return (
          <span className="fr-text--xs" style={{ color: "#ce0500" }}>
            <span
              className="fr-icon-error-line fr-icon--sm"
              aria-hidden="true"
            ></span>{" "}
            Erreur de sauvegarde
          </span>
        );
      case "name_taken":
        return (
          <span className="fr-text--xs" style={{ color: "#ce0500" }}>
            <span
              className="fr-icon-error-line fr-icon--sm"
              aria-hidden="true"
            ></span>{" "}
            Nom déjà utilisé
          </span>
        );
      case "conflict":
        return (
          <div
            className="fr-alert fr-alert--error fr-alert--sm"
            style={{ marginTop: "0.5rem" }}
          >
            <p>
              Ce document a été modifié par un autre utilisateur.
            </p>
            <button
              type="button"
              className="fr-btn fr-btn--sm fr-btn--secondary fr-mt-1w"
              onClick={() => window.location.reload()}
            >
              Recharger
            </button>
          </div>
        );
      default:
        // Placeholder invisible pour éviter le décalage du menu
        return (
          <span className="fr-text--xs" style={{ visibility: "hidden" }}>
            &nbsp;
          </span>
        );
    }
  };

  const renderMenuItems = () => {
    return steps.map((step) => (
      <li className="fr-sidemenu__item" key={step.id}>
        <a
          aria-current={currentStep === step.id ? "true" : "false"}
          type="link"
          id={`sidemenu-item-${step.id}`}
          href="#"
          className="fr-sidemenu__link"
          onClick={handleMenuItemClick(step.id)}
        >
          {step.id} . {step.title}
        </a>
      </li>
    ));
  };

  return (
    <main id="content" className="fr-main" role="main">
      <div className="fr-container">
        <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-3">
            <nav
              className="fr-sidemenu fr-sidemenu--sticky-full-height"
              role="navigation"
              aria-labelledby="sidemenu-title"
            >
              <ul className="fr-btns-group fr-mt-2w">
                <li>
                  <Link href="/" className="fr-btn fr-btn--sm">
                    <span
                      className="fr-icon-arrow-left-line"
                      aria-hidden="true"
                    ></span>
                    Retour
                  </Link>
                </li>
                {formId && (
                  <li>
                    <Link
                      href={`/api/export-pdf/${formId}`}
                      target="_blank"
                      className="fr-btn fr-btn--sm fr-btn--tertiary"
                    >
                      <span
                        className="fr-icon-download-line"
                        aria-hidden="true"
                      ></span>
                      PDF
                    </Link>
                  </li>
                )}
              </ul>
              <div className="fr-sidemenu__inner">
                <button
                  aria-expanded="false"
                  aria-controls="sidemenu-collapse-1"
                  type="button"
                  className="fr-sidemenu__btn"
                >
                  Sommaire
                </button>
                <div className="fr-collapse" id="sidemenu-collapse-1">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p
                      className="fr-sidemenu__title fr-mb-1w"
                      id="sidemenu-title"
                    >
                      {daData.cadre1_ProjetActeurs.nomDuProjet ||
                        "Document d'Architecture"}
                    </p>
                  </div>
                  <div className="fr-mb-1w">{renderSaveStatus()}</div>
                  <ul className="fr-sidemenu__list">{renderMenuItems()}</ul>
                </div>
              </div>
            </nav>
          </div>
          <div className="content-editorial fr-col-12 fr-col-md-9 fr-mt-2w">
            <h1 className="fr-h1">
              {formId
                ? `${daData.cadre1_ProjetActeurs.nomDuProjet || "Document d'Architecture"}`
                : "Formulaire Document d'Architecture (DA)"}
            </h1>
            <p className="fr-text--sm fr-mb-2w">
              Remplissez tous les champs du Document d&apos;Architecture
            </p>

            {isLoading && (
              <div className="fr-callout fr-callout--info fr-mb-4w">
                <p className="fr-callout__text">Chargement du DA...</p>
              </div>
            )}
            <div className="fr-stepper">
              <h2 className="fr-stepper__title">
                {steps[currentStep - 1].title}
                <span className="fr-stepper__state">
                  Étape {currentStep} sur 12
                </span>
              </h2>
              <div
                className="fr-stepper__steps"
                data-fr-current-step={currentStep}
                data-fr-steps={12}
              ></div>
              {currentStep < 12 && (
                <p className="fr-stepper__details">
                  <span className="fr-text--bold">Étape suivante :</span>{" "}
                  {steps[currentStep].title}
                </p>
              )}
            </div>

            <div className="fr-mt-4w">
              {currentStep === 1 && (
                <Cadre1ProjetActeurs daData={daData} setDAData={setDAData} formId={formId} />
              )}
              {currentStep === 2 && (
                <Cadre2FonctionnalitesDonnees
                  daData={daData}
                  setDAData={setDAData}
                />
              )}
              {currentStep === 3 && (
                <Cadre3ContraintesVolumetrie
                  daData={daData}
                  setDAData={setDAData}
                />
              )}
              {currentStep === 4 && (
                <Cadre4ExigencesContextuelles
                  daData={daData}
                  setDAData={setDAData}
                />
              )}
              {currentStep === 5 && (
                <Cadre5ArchitectureActeurs
                  daData={daData}
                  setDAData={setDAData}
                />
              )}
              {currentStep === 6 && (
                <Cadre6ArchitectureFonctionnelle
                  daData={daData}
                  setDAData={setDAData}
                />
              )}
              {currentStep === 7 && (
                <Cadre7ArchitectureApplicative
                  daData={daData}
                  setDAData={setDAData}
                />
              )}
              {currentStep === 8 && (
                <Cadre8ArchitectureTechnique
                  daData={daData}
                  setDAData={setDAData}
                />
              )}
              {currentStep === 9 && (
                <Cadre9ServeursComposants
                  daData={daData}
                  setDAData={setDAData}
                />
              )}
              {currentStep === 10 && (
                <Cadre10MatricesFlux daData={daData} setDAData={setDAData} />
              )}
              {currentStep === 11 && (
                <Cadre11Dimensionnement daData={daData} setDAData={setDAData} />
              )}
              {currentStep === 12 && (
                <Cadre12URLsAnnexe daData={daData} setDAData={setDAData} />
              )}
            </div>

            <div
              className="fr-mt-4w fr-mb-4w"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <button
                className="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-arrow-left-line"
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                Précédent
              </button>
              <button
                className="fr-btn fr-btn--secondary fr-btn--icon-right fr-icon-arrow-right-line"
                type="button"
                onClick={handleNext}
                disabled={currentStep === 12}
              >
                Suivant
              </button>
            </div>

            <details className="fr-mt-6w">
              <summary className="fr-text--sm">
                Voir les données JSON (debug)
              </summary>
              <pre
                className="fr-text--xs"
                style={{
                  maxHeight: "400px",
                  overflow: "auto",
                  background: "#f6f6f6",
                  padding: "1rem",
                }}
              >
                {JSON.stringify(daData, null, 2)}
              </pre>
            </details>
          </div>
        </div>
      </div>
    </main>
  );
}
