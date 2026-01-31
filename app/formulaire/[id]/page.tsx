"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import type { DAData } from "@/types/da.types";
import { initialData } from "../initialData";
import Cadre1ProjetActeurs from "../components/Cadre1ProjetActeurs";
import Cadre2FonctionnalitesDonnees from "../components/Cadre2FonctionnalitesDonnees";
import Cadre3ContraintesVolumetrie from "../components/Cadre3ContraintesVolumetrie";
import Cadre4ExigencesContextuelles from "../components/Cadre4ExigencesContextuelles";
import Cadre5ArchitectureActeurs from "../components/Cadre5ArchitectureActeurs";
import Cadre6ArchitectureFonctionnelle from "../components/Cadre6ArchitectureFonctionnelle";
import Cadre7ArchitectureApplicative from "../components/Cadre7ArchitectureApplicative";
import Cadre8ArchitectureTechnique from "../components/Cadre8ArchitectureTechnique";
import Cadre9ServeursComposants from "../components/Cadre9ServeursComposants";
import Cadre10MatricesFlux from "../components/Cadre10MatricesFlux";
import Cadre11Dimensionnement from "../components/Cadre11Dimensionnement";
import Cadre12URLsAnnexe from "../components/Cadre12URLsAnnexe";

export default function FormulaireDA() {
  const params = useParams();
  const router = useRouter();
  const daId = params.id as string;

  const [daData, setDAData] = useState<DAData>(initialData);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadDA = async () => {
      if (!daId) {
        router.push("/");
        return;
      }

      if (daId === "new") {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/da/${daId}.json`);
        if (response.ok) {
          const data = await response.json();
          setDAData(data);
          console.log(`✅ DA ${daId} chargé avec succès !`);
          setIsLoading(false);
        } else {
          console.error(`❌ DA ${daId} introuvable`);
          router.push("/");
        }
      } catch (error) {
        console.error("❌ Erreur lors du chargement du DA:", error);
        router.push("/");
      }
    };

    loadDA();
  }, [daId, router]);

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
    { id: 12, title: "URLs & Annexe" },
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
          <div className="fr-col-12 fr-col-md-4">
            <nav
              className="fr-sidemenu fr-sidemenu--sticky-full-height"
              role="navigation"
              aria-labelledby="sidemenu-title"
            >
              <div className="fr-sidemenu__inner">
                <ul className="fr-btns-group fr-mt-2w">
                  <li>
                    <Link href="/" className="fr-btn">
                      <span
                        className="fr-icon-arrow-left-line"
                        aria-hidden="true"
                      ></span>
                      Retour à la liste des DA
                    </Link>
                  </li>
                </ul>
                <button
                  aria-expanded="false"
                  aria-controls="sidemenu-collapse-1"
                  type="button"
                  className="fr-sidemenu__btn"
                >
                  Dans cette rubrique
                </button>
                <div className="fr-collapse" id="sidemenu-collapse-1">
                  <p
                    className="fr-sidemenu__title fr-mb-1w"
                    id="sidemenu-title"
                  >
                    {daData.cadre1_ProjetActeurs.nomDuProjet ||
                      "Document d'Architecture"}
                  </p>
                  <ul className="fr-sidemenu__list">{renderMenuItems()}</ul>
                </div>
              </div>
            </nav>
          </div>
          <div className="content-editorial fr-col-12 fr-col-md-8">
            <h1 className="fr-h1">
              {daId && daId !== "new"
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
            <nav className="fr-stepper" role="navigation" aria-label="Étapes">
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
            </nav>

            <div className="fr-mt-4w">
              {currentStep === 1 && (
                <Cadre1ProjetActeurs daData={daData} setDAData={setDAData} />
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
