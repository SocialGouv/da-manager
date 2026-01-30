"use client";

import { useState, useEffect } from "react";
import { Button } from "@codegouvfr/react-dsfr/Button";
import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";
import type {
  Cadre5_ArchitectureActeurs,
  Cadre6_ArchitectureFonctionnelle,
  Cadre10_MatricesFlux
} from "@/types/da.types";
import {
  generateCadre5Template,
  generateCadre6Template,
  generateCadre10Template
} from "@/utils/excalidrawTemplates";

// Import dynamique d'Excalidraw pour éviter les problèmes SSR
const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
    loading: () => <div>Chargement de l'éditeur...</div>,
  }
);

interface ExcalidrawSchemaEditorProps {
  cadreData: Cadre5_ArchitectureActeurs | Cadre6_ArchitectureFonctionnelle | Cadre10_MatricesFlux;
  cadreType: 5 | 6 | 10;
  initialData?: string; // JSON du schéma Excalidraw existant
  onSave: (schemaData: string, imageData: string) => void;
  onCancel: () => void;
}

export default function ExcalidrawSchemaEditor({
  cadreData,
  cadreType,
  initialData,
  onSave,
  onCancel
}: ExcalidrawSchemaEditorProps) {
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);
  const [hasGenerated, setHasGenerated] = useState(false);

  const generateTemplate = () => {
    let template;
    switch (cadreType) {
      case 5:
        template = generateCadre5Template(cadreData as Cadre5_ArchitectureActeurs);
        break;
      case 6:
        template = generateCadre6Template(cadreData as Cadre6_ArchitectureFonctionnelle);
        break;
      case 10:
        template = generateCadre10Template(cadreData as Cadre10_MatricesFlux);
        break;
      default:
        template = { elements: [], appState: { viewBackgroundColor: "#ffffff" } };
    }

    if (excalidrawAPI) {
      excalidrawAPI.updateScene(template);
      setHasGenerated(true);
    }
  };

  const handleSave = async () => {
    if (!excalidrawAPI) return;

    try {
      const elements = excalidrawAPI.getSceneElements();
      const appState = excalidrawAPI.getAppState();
      const files = excalidrawAPI.getFiles();

      // Sauvegarder le JSON pour édition future
      const jsonData = JSON.stringify({
        type: "excalidraw",
        version: 2,
        source: "https://excalidraw.com",
        elements,
        appState: {
          viewBackgroundColor: appState.viewBackgroundColor,
          currentItemStrokeColor: appState.currentItemStrokeColor,
          currentItemBackgroundColor: appState.currentItemBackgroundColor,
        },
      });

      // Exporter en PNG pour affichage
      const exportToBlob = (await import("@excalidraw/excalidraw")).exportToBlob;
      const blob = await exportToBlob({
        elements,
        appState,
        files,
        mimeType: "image/png",
      });

      // Convertir le blob en base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        onSave(jsonData, base64data);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("❌ Erreur lors de la sauvegarde du schéma:", error);
    }
  };

  // Charger les données initiales si elles existent (pour les mises à jour après le mount)
  useEffect(() => {
    if (excalidrawAPI && initialData && initialData.trim() !== "" && !hasGenerated) {
      try {
        const parsedData = JSON.parse(initialData);
        excalidrawAPI.updateScene(parsedData);
        setHasGenerated(true);
      } catch (error) {
        console.error("Erreur lors du chargement des données initiales:", error);
      }
    }
  }, [excalidrawAPI, initialData, hasGenerated]);

  return (
    <div style={{ height: "800px", border: "1px solid #ddd", marginBottom: "2rem", overflow: "hidden" }}>
      <div className="fr-p-2w" style={{ borderBottom: "1px solid #ddd", backgroundColor: "#f6f6f6" }}>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
          <Button
            size="small"
            onClick={generateTemplate}
            iconId="fr-icon-refresh-line"
          >
            Générer le template depuis les données
          </Button>
          <Button
            size="small"
            priority="primary"
            onClick={handleSave}
            iconId="fr-icon-save-line"
          >
            Sauvegarder le schéma
          </Button>
          {!hasGenerated && !initialData && (
            <span className="fr-text--sm fr-text--bold" style={{ color: "#666" }}>
              👈 Cliquez sur "Générer le template" pour commencer
            </span>
          )}
        </div>
      </div>
      <div style={{ height: "calc(100% - 70px)" }}>
        <Excalidraw
          excalidrawAPI={(api: any) => setExcalidrawAPI(api)}
          initialData={initialData && initialData.trim() !== "" ? JSON.parse(initialData) : undefined}
          UIOptions={{
            canvasActions: {
              loadScene: false,
            },
          }}
          langCode="fr-FR"
        />
      </div>
    </div>
  );
}
