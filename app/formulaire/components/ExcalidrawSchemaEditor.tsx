"use client";

import { useState, useEffect } from "react";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { useIsDark } from "@codegouvfr/react-dsfr/useIsDark";
import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";
import type {
  Cadre5_ArchitectureActeurs,
  Cadre6_ArchitectureFonctionnelle,
  Cadre7_ArchitectureApplicative,
  Cadre8_ArchitectureTechnique,
  Cadre10_MatricesFlux
} from "@/types/da.types";
import {
  generateCadre5Template,
  generateCadre6Template,
  generateCadre7Template,
  generateCadre8Template,
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
  cadreData: Cadre5_ArchitectureActeurs | Cadre6_ArchitectureFonctionnelle | Cadre7_ArchitectureApplicative | Cadre8_ArchitectureTechnique | Cadre10_MatricesFlux;
  cadreType: 5 | 6 | 7 | 8 | 10;
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
  const { isDark } = useIsDark();
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasBeenFullscreen, setHasBeenFullscreen] = useState(false);

  const generateTemplate = () => {
    let template;
    switch (cadreType) {
      case 5:
        template = generateCadre5Template(cadreData as Cadre5_ArchitectureActeurs);
        break;
      case 6:
        template = generateCadre6Template(cadreData as Cadre6_ArchitectureFonctionnelle);
        break;
      case 7:
        template = generateCadre7Template(cadreData as Cadre7_ArchitectureApplicative);
        break;
      case 8:
        template = generateCadre8Template(cadreData as Cadre8_ArchitectureTechnique);
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

  // Charger les données initiales si elles existent
  useEffect(() => {
    if (excalidrawAPI && !hasGenerated) {
      if (initialData && initialData.trim() !== "") {
        try {
          const parsedData = JSON.parse(initialData);
          excalidrawAPI.updateScene(parsedData);
          setHasGenerated(true);
        } catch (error) {
          console.error("Erreur lors du chargement des données initiales:", error);
        }
      }
    }
  }, [excalidrawAPI, initialData, hasGenerated]);

  // Marquer qu'on est passé en fullscreen au moins une fois
  useEffect(() => {
    if (isFullscreen && !hasBeenFullscreen) {
      setHasBeenFullscreen(true);
    }
  }, [isFullscreen, hasBeenFullscreen]);

  // Re-centrer le schéma quand on change de mode (uniquement après avoir utilisé le fullscreen au moins une fois)
  useEffect(() => {
    if (excalidrawAPI && hasBeenFullscreen) {
      // Petit délai pour laisser le temps au conteneur de se redimensionner
      const timer = setTimeout(() => {
        excalidrawAPI.scrollToContent(excalidrawAPI.getSceneElements(), {
          fitToContent: true,
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isFullscreen, excalidrawAPI, hasBeenFullscreen]);

  // Déterminer quelle donnée initiale utiliser
  const getInitialData = () => {
    if (initialData && initialData.trim() !== "") {
      try {
        return JSON.parse(initialData);
      } catch (e) {
        console.error("Error parsing initial data:", e);
      }
    }
    return undefined;
  };

  const renderToolbar = () => (
    <div
      className="fr-p-2w"
      style={{
        borderBottom: isDark ? "1px solid #444" : "1px solid #ddd",
        backgroundColor: isDark ? "#1e1e1e" : "#f6f6f6",
        position: "relative",
        zIndex: 1
      }}
    >
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
        <Button
          size="small"
          onClick={() => setIsFullscreen(!isFullscreen)}
          iconId={isFullscreen ? "fr-icon-close-line" : "fr-icon-fullscreen-line"}
          priority={isFullscreen ? "secondary" : undefined}
        >
          {isFullscreen ? "Fermer plein écran" : "Plein écran"}
        </Button>
      </div>
    </div>
  );

  // Styles conditionnels selon le mode
  const containerStyle: React.CSSProperties = isFullscreen ? {
    position: "fixed",
    top: "110px",
    left: "280px",
    right: 0,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: isDark ? "#1e1e1e" : "#ffffff",
    display: "flex",
    flexDirection: "column",
    boxShadow: "-4px 0 8px rgba(0, 0, 0, 0.1)",
    borderTop: isDark ? "1px solid #444" : "1px solid #ddd",
  } : {
    height: "800px",
    border: isDark ? "1px solid #444" : "1px solid #ddd",
    marginBottom: "2rem",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div style={containerStyle} onClick={(e) => isFullscreen ? e.stopPropagation() : undefined}>
      {/* Header fullscreen uniquement */}
      {isFullscreen && (
        <div
          style={{
            padding: "1rem 2rem",
            borderBottom: isDark ? "1px solid #444" : "1px solid #ddd",
            backgroundColor: isDark ? "#1e1e1e" : "#f6f6f6",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 className="fr-h3" style={{ margin: 0 }}>
            Édition plein écran - Cadre {cadreType}
          </h3>
          <Button
            priority="tertiary no outline"
            iconId="fr-icon-close-line"
            onClick={() => setIsFullscreen(false)}
            title="Fermer"
          />
        </div>
      )}

      {/* Toolbar */}
      {renderToolbar()}

      {/* Excalidraw - Une seule instance qui reste montée */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <div style={{ height: "100%", width: "100%" }}>
          <Excalidraw
            excalidrawAPI={(api: any) => setExcalidrawAPI(api)}
            initialData={getInitialData()}
            theme={isDark ? "dark" : "light"}
            UIOptions={{
              canvasActions: {
                loadScene: false,
              },
            }}
            langCode="fr-FR"
          />
        </div>
      </div>
    </div>
  );
}
