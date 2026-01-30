"use client";

import { useState } from "react";
import type { DAData } from "@/types/da.types";
import { initialData } from "./initialData";
import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import { Button } from "@codegouvfr/react-dsfr/Button";
import Cadre1ProjetActeurs from "./components/Cadre1ProjetActeurs";
import Cadre2FonctionnalitesDonnees from "./components/Cadre2FonctionnalitesDonnees";
import Cadre3ContraintesVolumetrie from "./components/Cadre3ContraintesVolumetrie";
import Cadre4ExigencesContextuelles from "./components/Cadre4ExigencesContextuelles";
import Cadre5ArchitectureActeurs from "./components/Cadre5ArchitectureActeurs";
import Cadre6ArchitectureFonctionnelle from "./components/Cadre6ArchitectureFonctionnelle";
import Cadre7ArchitectureApplicative from "./components/Cadre7ArchitectureApplicative";
import Cadre8ArchitectureTechnique from "./components/Cadre8ArchitectureTechnique";
import Cadre9ServeursComposants from "./components/Cadre9ServeursComposants";
import Cadre10MatricesFlux from "./components/Cadre10MatricesFlux";
import Cadre11Dimensionnement from "./components/Cadre11Dimensionnement";
import Cadre12URLsAnnexe from "./components/Cadre12URLsAnnexe";

export default function FormulaireDA() {
  const [daData, setDAData] = useState<DAData>(initialData);
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Fonction pour charger les données d'exemple
  const loadExampleData = async () => {
    try {
      const response = await fetch('/example-data.json');
      const exampleData = await response.json();
      setDAData(exampleData);
      alert('Données d\'exemple chargées avec succès !');
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      alert('Erreur lors du chargement des données d\'exemple');
    }
  };

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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <main className="fr-container fr-my-6w">
      <h1 className="fr-h1">Formulaire Document d&apos;Architecture (DA)</h1>
      <p className="fr-text--sm fr-mb-2w">
        Remplissez tous les champs du Document d&apos;Architecture
      </p>

      <div className="fr-mb-4w">
        <button
          className="fr-btn fr-btn--secondary fr-btn--sm"
          onClick={loadExampleData}
        >
          📋 Charger des données d&apos;exemple
        </button>
      </div>

      {/* Stepper */}
      <Stepper
        currentStep={currentStep}
        stepCount={12}
        title={steps[currentStep - 1].title}
        nextTitle={currentStep < 12 ? steps[currentStep].title : undefined}
      />

      {/* Content */}
      <div className="fr-mt-4w">
        {/* ================================================================= */}
        {/* CADRE 1: PROJET - ACTEURS */}
        {/* ================================================================= */}
        {currentStep === 1 && <Cadre1ProjetActeurs daData={daData} setDAData={setDAData} />}

        {/* ================================================================= */}
        {/* CADRE 2: FONCTIONNALITÉS - DONNÉES */}
        {/* ================================================================= */}
        {currentStep === 2 && <Cadre2FonctionnalitesDonnees daData={daData} setDAData={setDAData} />}

        {/* ================================================================= */}
        {/* CADRE 3: CONTRAINTES - VOLUMÉTRIE */}
        {/* ================================================================= */}
        {currentStep === 3 && <Cadre3ContraintesVolumetrie daData={daData} setDAData={setDAData} />}

        {/* ================================================================= */}
        {/* CADRE 4: EXIGENCES CONTEXTUELLES */}
        {/* ================================================================= */}
        {currentStep === 4 && <Cadre4ExigencesContextuelles daData={daData} setDAData={setDAData} />}

        {/* ================================================================= */}
        {/* CADRE 5: ARCHITECTURE ACTEURS */}
        {/* ================================================================= */}
        {currentStep === 5 && <Cadre5ArchitectureActeurs daData={daData} setDAData={setDAData} />}

        {/* ================================================================= */}
        {/* CADRE 6: ARCHITECTURE FONCTIONNELLE */}
        {/* ================================================================= */}
        {currentStep === 6 && <Cadre6ArchitectureFonctionnelle daData={daData} setDAData={setDAData} />}

        {/* ================================================================= */}
        {/* CADRE 7: ARCHITECTURE APPLICATIVE */}
        {/* ================================================================= */}
        {currentStep === 7 && <Cadre7ArchitectureApplicative daData={daData} setDAData={setDAData} />}

        {/* ================================================================= */}
        {/* CADRE 8: ARCHITECTURE TECHNIQUE */}
        {/* ================================================================= */}
        {currentStep === 8 && <Cadre8ArchitectureTechnique daData={daData} setDAData={setDAData} />}

        {/* ================================================================= */}
        {/* CADRE 9: SERVEURS & COMPOSANTS */}
        {/* ================================================================= */}
        {currentStep === 9 && <Cadre9ServeursComposants daData={daData} setDAData={setDAData} />}

        {/* ================================================================= */}
        {/* CADRE 10: MATRICES FLUX */}
        {/* ================================================================= */}
        {currentStep === 10 && <Cadre10MatricesFlux daData={daData} setDAData={setDAData} />}

        {/* ================================================================= */}
        {/* CADRE 11: DIMENSIONNEMENT */}
        {/* ================================================================= */}
        {currentStep === 11 && <Cadre11Dimensionnement daData={daData} setDAData={setDAData} />}

        {/* ================================================================= */}
        {/* CADRE 12: URLs & ANNEXE */}
        {/* ================================================================= */}
        {currentStep === 12 && <Cadre12URLsAnnexe daData={daData} setDAData={setDAData} />}
      </div>

      {/* Navigation buttons */}
      <div className="fr-mt-4w fr-mb-4w" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          priority="secondary"
          iconId="fr-icon-arrow-left-line"
          iconPosition="left"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          Précédent
        </Button>
        <Button
          priority="secondary"
          iconId="fr-icon-arrow-right-line"
          iconPosition="right"
          onClick={handleNext}
          disabled={currentStep === 12}
        >
          Suivant
        </Button>
      </div>

      {/* Debug: Afficher les données actuelles */}
      <details className="fr-mt-6w">
        <summary className="fr-text--sm">Voir les données JSON (debug)</summary>
        <pre
          className="fr-text--xs"
          style={{ maxHeight: "400px", overflow: "auto", background: "#f6f6f6", padding: "1rem" }}
        >
          {JSON.stringify(daData, null, 2)}
        </pre>
      </details>
    </main>
  );
}
