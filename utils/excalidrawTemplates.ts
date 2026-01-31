import { nanoid } from "nanoid";
import type {
  Cadre5_ArchitectureActeurs,
  Cadre6_ArchitectureFonctionnelle,
  Cadre7_ArchitectureApplicative,
  Cadre8_ArchitectureTechnique,
  Cadre10_MatricesFlux
} from "@/types/da.types";
// @ts-ignore - Excalidraw types
type ExcalidrawElement = any;

/**
 * Génère un template Excalidraw pour le Cadre 5 - Architecture Acteurs
 */
export function generateCadre5Template(data: Cadre5_ArchitectureActeurs) {
  const elements: ExcalidrawElement[] = [];
  const centerX = 500;
  const centerY = 300;

  // 1. Système central (rectangle bleu)
  const systemId = nanoid();
  elements.push({
    type: "rectangle",
    id: systemId,
    x: centerX - 100,
    y: centerY - 50,
    width: 200,
    height: 100,
    angle: 0,
    backgroundColor: "#a5d8ff",
    strokeColor: "#1971c2",
    strokeWidth: 2,
    strokeStyle: "solid",
    roughness: 1,
    opacity: 100,
    fillStyle: "solid",
    strokeSharpness: "sharp",
    seed: Math.floor(Math.random() * 1000000),
    version: 1,
    versionNonce: 1,
    isDeleted: false,
    groupIds: [],
    boundElements: [],
    updated: Date.now(),
    link: null,
    locked: false,
  } as any);

  // 2. Texte du système central
  elements.push({
    type: "text",
    id: nanoid(),
    x: centerX - 80,
    y: centerY - 10,
    width: 160,
    height: 25,
    angle: 0,
    backgroundColor: "transparent",
    strokeColor: "#1971c2",
    strokeWidth: 1,
    strokeStyle: "solid",
    roughness: 1,
    opacity: 100,
    fillStyle: "solid",
    strokeSharpness: "sharp",
    seed: Math.floor(Math.random() * 1000000),
    version: 1,
    versionNonce: 1,
    isDeleted: false,
    groupIds: [],
    boundElements: [],
    updated: Date.now(),
    link: null,
    locked: false,
    text: "Système Information",
    fontSize: 16,
    fontFamily: 1,
    textAlign: "center",
    verticalAlign: "middle",
    baseline: 18,
    containerId: null,
    originalText: "Système Information",
  } as any);

  // 3. Acteurs consommateurs (côté gauche)
  data.acteursConsommateurs.forEach((actor, i) => {
    const y = 100 + (i * 140);
    const isHuman = actor.type === "Humain (IHM)";
    const actorId = nanoid();

    // Shape (ellipse pour humain, rectangle pour SI)
    if (isHuman) {
      elements.push({
        type: "ellipse",
        id: actorId,
        x: 50,
        y: y,
        width: 120,
        height: 80,
        angle: 0,
        backgroundColor: "#ffc9c9",
        strokeColor: "#fa5252",
        strokeWidth: 2,
        strokeStyle: "solid",
        roughness: 1,
        opacity: 100,
        fillStyle: "solid",
        strokeSharpness: "sharp",
        seed: Math.floor(Math.random() * 1000000),
        version: 1,
        versionNonce: 1,
        isDeleted: false,
        groupIds: [],
        boundElements: [],
        updated: Date.now(),
        link: null,
        locked: false,
      } as any);
    } else {
      elements.push({
        type: "rectangle",
        id: actorId,
        x: 50,
        y: y,
        width: 120,
        height: 80,
        angle: 0,
        backgroundColor: "#b2f2bb",
        strokeColor: "#2f9e44",
        strokeWidth: 2,
        strokeStyle: "solid",
        roughness: 1,
        opacity: 100,
        fillStyle: "solid",
        strokeSharpness: "sharp",
        seed: Math.floor(Math.random() * 1000000),
        version: 1,
        versionNonce: 1,
        isDeleted: false,
        groupIds: [],
        boundElements: [],
        updated: Date.now(),
        link: null,
        locked: false,
      } as any);
    }

    // Texte de l'acteur
    elements.push({
      type: "text",
      id: nanoid(),
      x: 60,
      y: y + 28,
      width: 100,
      height: 25,
      angle: 0,
      backgroundColor: "transparent",
      strokeColor: "#000000",
      strokeWidth: 1,
      strokeStyle: "solid",
      roughness: 1,
      opacity: 100,
      fillStyle: "solid",
      strokeSharpness: "sharp",
      seed: Math.floor(Math.random() * 1000000),
      version: 1,
      versionNonce: 1,
      isDeleted: false,
      groupIds: [],
      boundElements: [],
      updated: Date.now(),
      link: null,
      locked: false,
      text: actor.nom || "Acteur",
      fontSize: 14,
      fontFamily: 1,
      textAlign: "center",
      verticalAlign: "middle",
      baseline: 18,
      containerId: null,
      originalText: actor.nom || "Acteur",
    } as any);

    // Flèche vers le système
    elements.push({
      type: "arrow",
      id: nanoid(),
      x: 170,
      y: y + 40,
      width: centerX - 270,
      height: centerY - y,
      angle: 0,
      backgroundColor: "transparent",
      strokeColor: "#000000",
      strokeWidth: 2,
      strokeStyle: "solid",
      roughness: 1,
      opacity: 100,
      fillStyle: "solid",
      strokeSharpness: "round",
      seed: Math.floor(Math.random() * 1000000),
      version: 1,
      versionNonce: 1,
      isDeleted: false,
      groupIds: [],
      boundElements: [],
      updated: Date.now(),
      link: null,
      locked: false,
      startBinding: null,
      endBinding: null,
      lastCommittedPoint: null,
      startArrowhead: null,
      endArrowhead: "arrow",
      points: [[0, 0], [centerX - 270, centerY - y]],
    } as any);
  });

  // 4. Acteurs fournisseurs (côté droit)
  data.acteursFournisseurs.forEach((actor, i) => {
    const y = 100 + (i * 140);
    const isHuman = actor.type === "Humain (IHM)";
    const actorId = nanoid();

    // Shape
    if (isHuman) {
      elements.push({
        type: "ellipse",
        id: actorId,
        x: 830,
        y: y,
        width: 120,
        height: 80,
        angle: 0,
        backgroundColor: "#ffc9c9",
        strokeColor: "#fa5252",
        strokeWidth: 2,
        strokeStyle: "solid",
        roughness: 1,
        opacity: 100,
        fillStyle: "solid",
        strokeSharpness: "sharp",
        seed: Math.floor(Math.random() * 1000000),
        version: 1,
        versionNonce: 1,
        isDeleted: false,
        groupIds: [],
        boundElements: [],
        updated: Date.now(),
        link: null,
        locked: false,
      } as any);
    } else {
      elements.push({
        type: "rectangle",
        id: actorId,
        x: 830,
        y: y,
        width: 120,
        height: 80,
        angle: 0,
        backgroundColor: "#b2f2bb",
        strokeColor: "#2f9e44",
        strokeWidth: 2,
        strokeStyle: "solid",
        roughness: 1,
        opacity: 100,
        fillStyle: "solid",
        strokeSharpness: "sharp",
        seed: Math.floor(Math.random() * 1000000),
        version: 1,
        versionNonce: 1,
        isDeleted: false,
        groupIds: [],
        boundElements: [],
        updated: Date.now(),
        link: null,
        locked: false,
      } as any);
    }

    // Texte de l'acteur
    elements.push({
      type: "text",
      id: nanoid(),
      x: 840,
      y: y + 28,
      width: 100,
      height: 25,
      angle: 0,
      backgroundColor: "transparent",
      strokeColor: "#000000",
      strokeWidth: 1,
      strokeStyle: "solid",
      roughness: 1,
      opacity: 100,
      fillStyle: "solid",
      strokeSharpness: "sharp",
      seed: Math.floor(Math.random() * 1000000),
      version: 1,
      versionNonce: 1,
      isDeleted: false,
      groupIds: [],
      boundElements: [],
      updated: Date.now(),
      link: null,
      locked: false,
      text: actor.nom || "Acteur",
      fontSize: 14,
      fontFamily: 1,
      textAlign: "center",
      verticalAlign: "middle",
      baseline: 18,
      containerId: null,
      originalText: actor.nom || "Acteur",
    } as any);

    // Flèche depuis le système
    elements.push({
      type: "arrow",
      id: nanoid(),
      x: centerX + 100,
      y: centerY,
      width: 730 - centerX,
      height: y + 40 - centerY,
      angle: 0,
      backgroundColor: "transparent",
      strokeColor: "#000000",
      strokeWidth: 2,
      strokeStyle: "solid",
      roughness: 1,
      opacity: 100,
      fillStyle: "solid",
      strokeSharpness: "round",
      seed: Math.floor(Math.random() * 1000000),
      version: 1,
      versionNonce: 1,
      isDeleted: false,
      groupIds: [],
      boundElements: [],
      updated: Date.now(),
      link: null,
      locked: false,
      startBinding: null,
      endBinding: null,
      lastCommittedPoint: null,
      startArrowhead: null,
      endArrowhead: "arrow",
      points: [[0, 0], [730 - centerX, y + 40 - centerY]],
    } as any);
  });

  return {
    type: "excalidraw",
    version: 2,
    source: "https://excalidraw.com",
    elements: elements,
    appState: {
      viewBackgroundColor: "#ffffff",
      currentItemStrokeColor: "#000000",
      currentItemBackgroundColor: "transparent",
      currentItemFillStyle: "solid",
      currentItemStrokeWidth: 2,
      currentItemRoughness: 1,
      currentItemOpacity: 100,
      gridSize: null,
      colorPalette: {},
    },
    scrollToContent: true,
  };
}

/**
 * Génère un template Excalidraw pour le Cadre 6 - Architecture Fonctionnelle
 */
export function generateCadre6Template(data: Cadre6_ArchitectureFonctionnelle) {
  const elements: ExcalidrawElement[] = [];
  const startX = 100;
  const startY = 100;
  const blockWidth = 200;
  const blockHeight = 100;
  const spacing = 80;

  // Séparer les blocs IHM et WS/API
  const blocsIHM = data.blocsFonctionnels.filter(b => b.typeActeurs === "IHM");
  const blocsAPI = data.blocsFonctionnels.filter(b => b.typeActeurs === "WS/API");

  // Titre IHM
  elements.push({
    type: "text",
    id: nanoid(),
    x: startX + 50,
    y: 30,
    width: 150,
    height: 30,
    angle: 0,
    backgroundColor: "transparent",
    strokeColor: "#1971c2",
    strokeWidth: 1,
    strokeStyle: "solid",
    roughness: 1,
    opacity: 100,
    fillStyle: "solid",
    strokeSharpness: "sharp",
    seed: Math.floor(Math.random() * 1000000),
    version: 1,
    versionNonce: 1,
    isDeleted: false,
    groupIds: [],
    boundElements: [],
    updated: Date.now(),
    link: null,
    locked: false,
    text: "Interface (IHM)",
    fontSize: 18,
    fontFamily: 1,
    textAlign: "center",
    verticalAlign: "middle",
    baseline: 18,
    containerId: null,
    originalText: "Interface (IHM)",
  } as any);

  // Blocs IHM
  blocsIHM.forEach((bloc, i) => {
    const y = startY + (i * (blockHeight + spacing));
    const blockId = nanoid();

    // Rectangle du bloc
    elements.push({
      type: "rectangle",
      id: blockId,
      x: startX,
      y: y,
      width: blockWidth,
      height: blockHeight,
      angle: 0,
      backgroundColor: "#ffd43b",
      strokeColor: "#fab005",
      strokeWidth: 2,
      strokeStyle: "solid",
      roughness: 1,
      opacity: 100,
      fillStyle: "solid",
      strokeSharpness: "sharp",
      seed: Math.floor(Math.random() * 1000000),
      version: 1,
      versionNonce: 1,
      isDeleted: false,
      groupIds: [],
      boundElements: [],
      updated: Date.now(),
      link: null,
      locked: false,
    } as any);

    // Nom du bloc
    elements.push({
      type: "text",
      id: nanoid(),
      x: startX + 10,
      y: y + 20,
      width: blockWidth - 20,
      height: 25,
      angle: 0,
      backgroundColor: "transparent",
      strokeColor: "#000000",
      strokeWidth: 1,
      strokeStyle: "solid",
      roughness: 1,
      opacity: 100,
      fillStyle: "solid",
      strokeSharpness: "sharp",
      seed: Math.floor(Math.random() * 1000000),
      version: 1,
      versionNonce: 1,
      isDeleted: false,
      groupIds: [],
      boundElements: [],
      updated: Date.now(),
      link: null,
      locked: false,
      text: bloc.nom,
      fontSize: 14,
      fontFamily: 1,
      textAlign: "center",
      verticalAlign: "middle",
      baseline: 18,
      containerId: null,
      originalText: bloc.nom,
    } as any);

    // Usages (plus petit)
    if (bloc.usages) {
      elements.push({
        type: "text",
        id: nanoid(),
        x: startX + 10,
        y: y + 50,
        width: blockWidth - 20,
        height: 40,
        angle: 0,
        backgroundColor: "transparent",
        strokeColor: "#495057",
        strokeWidth: 1,
        strokeStyle: "solid",
        roughness: 1,
        opacity: 100,
        fillStyle: "solid",
        strokeSharpness: "sharp",
        seed: Math.floor(Math.random() * 1000000),
        version: 1,
        versionNonce: 1,
        isDeleted: false,
        groupIds: [],
        boundElements: [],
        updated: Date.now(),
        link: null,
        locked: false,
        text: bloc.usages.substring(0, 50) + (bloc.usages.length > 50 ? "..." : ""),
        fontSize: 10,
        fontFamily: 1,
        textAlign: "center",
        verticalAlign: "middle",
        baseline: 10,
        containerId: null,
        originalText: bloc.usages.substring(0, 50) + (bloc.usages.length > 50 ? "..." : ""),
      } as any);
    }

    // Flèche vers API si on n'est pas au dernier
    if (i < blocsIHM.length - 1 || blocsAPI.length > 0) {
      elements.push({
        type: "arrow",
        id: nanoid(),
        x: startX + blockWidth,
        y: y + blockHeight / 2,
        width: 150,
        height: 0,
        angle: 0,
        backgroundColor: "transparent",
        strokeColor: "#495057",
        strokeWidth: 2,
        strokeStyle: "solid",
        roughness: 1,
        opacity: 100,
        fillStyle: "solid",
        strokeSharpness: "round",
        seed: Math.floor(Math.random() * 1000000),
        version: 1,
        versionNonce: 1,
        isDeleted: false,
        groupIds: [],
        boundElements: [],
        updated: Date.now(),
        link: null,
        locked: false,
        startBinding: null,
        endBinding: null,
        lastCommittedPoint: null,
        startArrowhead: null,
        endArrowhead: "arrow",
        points: [[0, 0], [150, 0]],
      } as any);
    }
  });

  // Titre WS/API
  if (blocsAPI.length > 0) {
    elements.push({
      type: "text",
      id: nanoid(),
      x: startX + blockWidth + 200,
      y: 30,
      width: 150,
      height: 30,
      angle: 0,
      backgroundColor: "transparent",
      strokeColor: "#1971c2",
      strokeWidth: 1,
      strokeStyle: "solid",
      roughness: 1,
      opacity: 100,
      fillStyle: "solid",
      strokeSharpness: "sharp",
      seed: Math.floor(Math.random() * 1000000),
      version: 1,
      versionNonce: 1,
      isDeleted: false,
      groupIds: [],
      boundElements: [],
      updated: Date.now(),
      link: null,
      locked: false,
      text: "Services (WS/API)",
      fontSize: 18,
      fontFamily: 1,
      textAlign: "center",
      verticalAlign: "middle",
      baseline: 18,
      containerId: null,
      originalText: "Services (WS/API)",
    } as any);

    // Blocs WS/API
    blocsAPI.forEach((bloc, i) => {
      const y = startY + (i * (blockHeight + spacing));
      const x = startX + blockWidth + 250;

      // Rectangle du bloc
      elements.push({
        type: "rectangle",
        id: nanoid(),
        x: x,
        y: y,
        width: blockWidth,
        height: blockHeight,
        angle: 0,
        backgroundColor: "#a5d8ff",
        strokeColor: "#1971c2",
        strokeWidth: 2,
        strokeStyle: "solid",
        roughness: 1,
        opacity: 100,
        fillStyle: "solid",
        strokeSharpness: "sharp",
        seed: Math.floor(Math.random() * 1000000),
        version: 1,
        versionNonce: 1,
        isDeleted: false,
        groupIds: [],
        boundElements: [],
        updated: Date.now(),
        link: null,
        locked: false,
      } as any);

      // Nom du bloc
      elements.push({
        type: "text",
        id: nanoid(),
        x: x + 10,
        y: y + 20,
        width: blockWidth - 20,
        height: 25,
        angle: 0,
        backgroundColor: "transparent",
        strokeColor: "#000000",
        strokeWidth: 1,
        strokeStyle: "solid",
        roughness: 1,
        opacity: 100,
        fillStyle: "solid",
        strokeSharpness: "sharp",
        seed: Math.floor(Math.random() * 1000000),
        version: 1,
        versionNonce: 1,
        isDeleted: false,
        groupIds: [],
        boundElements: [],
        updated: Date.now(),
        link: null,
        locked: false,
        text: bloc.nom,
        fontSize: 14,
        fontFamily: 1,
        textAlign: "center",
        verticalAlign: "middle",
        baseline: 18,
        containerId: null,
        originalText: bloc.nom,
      } as any);

      // Usages
      if (bloc.usages) {
        elements.push({
          type: "text",
          id: nanoid(),
          x: x + 10,
          y: y + 50,
          width: blockWidth - 20,
          height: 40,
          angle: 0,
          backgroundColor: "transparent",
          strokeColor: "#495057",
          strokeWidth: 1,
          strokeStyle: "solid",
          roughness: 1,
          opacity: 100,
          fillStyle: "solid",
          strokeSharpness: "sharp",
          seed: Math.floor(Math.random() * 1000000),
          version: 1,
          versionNonce: 1,
          isDeleted: false,
          groupIds: [],
          boundElements: [],
          updated: Date.now(),
          link: null,
          locked: false,
          text: bloc.usages.substring(0, 50) + (bloc.usages.length > 50 ? "..." : ""),
          fontSize: 10,
          fontFamily: 1,
          textAlign: "center",
          verticalAlign: "middle",
          baseline: 10,
          containerId: null,
          originalText: bloc.usages.substring(0, 50) + (bloc.usages.length > 50 ? "..." : ""),
        } as any);
      }
    });
  }

  return {
    type: "excalidraw",
    version: 2,
    source: "https://excalidraw.com",
    elements: elements,
    appState: {
      viewBackgroundColor: "#ffffff",
      currentItemStrokeColor: "#000000",
      currentItemBackgroundColor: "transparent",
      currentItemFillStyle: "solid",
      currentItemStrokeWidth: 2,
      currentItemRoughness: 1,
      currentItemOpacity: 100,
      gridSize: null,
      colorPalette: {},
    },
    scrollToContent: true,
  };
}

/**
 * Génère un template Excalidraw pour le Cadre 7 - Architecture Applicative
 */
export function generateCadre7Template(data: Cadre7_ArchitectureApplicative) {
  const elements: ExcalidrawElement[] = [];
  const startX = 100;
  const startY = 100;
  const pileWidth = 250;
  const componentHeight = 50;
  const pilePadding = 20;
  const pileSpacing = 100;

  data.pilesComposants.forEach((pile, pileIndex) => {
    const x = startX + (pileIndex * (pileWidth + pileSpacing));
    let currentY = startY;

    // Titre de la pile (fonctionnalité)
    elements.push({
      type: "text",
      id: nanoid(),
      x: x,
      y: currentY,
      width: pileWidth,
      height: 30,
      angle: 0,
      backgroundColor: "transparent",
      strokeColor: "#1971c2",
      strokeWidth: 1,
      strokeStyle: "solid",
      roughness: 1,
      opacity: 100,
      fillStyle: "solid",
      strokeSharpness: "sharp",
      seed: Math.floor(Math.random() * 1000000),
      version: 1,
      versionNonce: 1,
      isDeleted: false,
      groupIds: [],
      boundElements: [],
      updated: Date.now(),
      link: null,
      locked: false,
      text: pile.fonctionnalite || `Pile ${pileIndex + 1}`,
      fontSize: 16,
      fontFamily: 1,
      textAlign: "center",
      verticalAlign: "middle",
      baseline: 18,
      containerId: null,
      originalText: pile.fonctionnalite || `Pile ${pileIndex + 1}`,
    } as any);

    currentY += 50;

    // Conteneur de la pile
    const totalPileHeight = pilePadding * 2 + (pile.composants.length * componentHeight) + ((pile.composants.length - 1) * 10);
    elements.push({
      type: "rectangle",
      id: nanoid(),
      x: x,
      y: currentY,
      width: pileWidth,
      height: totalPileHeight,
      angle: 0,
      backgroundColor: "#f8f9fa",
      strokeColor: "#868e96",
      strokeWidth: 2,
      strokeStyle: "solid",
      roughness: 1,
      opacity: 100,
      fillStyle: "solid",
      strokeSharpness: "sharp",
      seed: Math.floor(Math.random() * 1000000),
      version: 1,
      versionNonce: 1,
      isDeleted: false,
      groupIds: [],
      boundElements: [],
      updated: Date.now(),
      link: null,
      locked: false,
    } as any);

    // Composants dans la pile
    let componentY = currentY + pilePadding;
    pile.composants.forEach((composant, compIndex) => {
      // Rectangle du composant
      elements.push({
        type: "rectangle",
        id: nanoid(),
        x: x + 10,
        y: componentY,
        width: pileWidth - 20,
        height: componentHeight,
        angle: 0,
        backgroundColor: "#74c0fc",
        strokeColor: "#1971c2",
        strokeWidth: 2,
        strokeStyle: "solid",
        roughness: 1,
        opacity: 100,
        fillStyle: "solid",
        strokeSharpness: "sharp",
        seed: Math.floor(Math.random() * 1000000),
        version: 1,
        versionNonce: 1,
        isDeleted: false,
        groupIds: [],
        boundElements: [],
        updated: Date.now(),
        link: null,
        locked: false,
      } as any);

      // Texte du composant
      elements.push({
        type: "text",
        id: nanoid(),
        x: x + 20,
        y: componentY + 12,
        width: pileWidth - 40,
        height: 25,
        angle: 0,
        backgroundColor: "transparent",
        strokeColor: "#000000",
        strokeWidth: 1,
        strokeStyle: "solid",
        roughness: 1,
        opacity: 100,
        fillStyle: "solid",
        strokeSharpness: "sharp",
        seed: Math.floor(Math.random() * 1000000),
        version: 1,
        versionNonce: 1,
        isDeleted: false,
        groupIds: [],
        boundElements: [],
        updated: Date.now(),
        link: null,
        locked: false,
        text: composant,
        fontSize: 12,
        fontFamily: 1,
        textAlign: "center",
        verticalAlign: "middle",
        baseline: 12,
        containerId: null,
        originalText: composant,
      } as any);

      componentY += componentHeight + 10;
    });
  });

  return {
    type: "excalidraw",
    version: 2,
    source: "https://excalidraw.com",
    elements: elements,
    appState: {
      viewBackgroundColor: "#ffffff",
      currentItemStrokeColor: "#000000",
      currentItemBackgroundColor: "transparent",
      currentItemFillStyle: "solid",
      currentItemStrokeWidth: 2,
      currentItemRoughness: 1,
      currentItemOpacity: 100,
      gridSize: null,
      colorPalette: {},
    },
    scrollToContent: true,
  };
}

/**
 * Génère un template Excalidraw pour le Cadre 8 - Architecture Technique
 */
export function generateCadre8Template(data: Cadre8_ArchitectureTechnique) {
  const elements: ExcalidrawElement[] = [];

  // Couche Présentation
  elements.push({
    type: "rectangle",
    id: nanoid(),
    x: 100,
    y: 80,
    width: 800,
    height: 120,
    angle: 0,
    backgroundColor: "#ffd43b",
    strokeColor: "#fab005",
    strokeWidth: 2,
    strokeStyle: "solid",
    roughness: 1,
    opacity: 100,
    fillStyle: "solid",
    strokeSharpness: "sharp",
    seed: Math.floor(Math.random() * 1000000),
    version: 1,
    versionNonce: 1,
    isDeleted: false,
    groupIds: [],
    boundElements: [],
    updated: Date.now(),
    link: null,
    locked: false,
  } as any);

  elements.push({
    type: "text",
    id: nanoid(),
    x: 120,
    y: 120,
    width: 760,
    height: 40,
    angle: 0,
    backgroundColor: "transparent",
    strokeColor: "#000000",
    strokeWidth: 1,
    strokeStyle: "solid",
    roughness: 1,
    opacity: 100,
    fillStyle: "solid",
    strokeSharpness: "sharp",
    seed: Math.floor(Math.random() * 1000000),
    version: 1,
    versionNonce: 1,
    isDeleted: false,
    groupIds: [],
    boundElements: [],
    updated: Date.now(),
    link: null,
    locked: false,
    text: "Couche Présentation (Front-end, IHM)",
    fontSize: 18,
    fontFamily: 1,
    textAlign: "center",
    verticalAlign: "middle",
    baseline: 18,
    containerId: null,
    originalText: "Couche Présentation (Front-end, IHM)",
  } as any);

  // Couche Application
  elements.push({
    type: "rectangle",
    id: nanoid(),
    x: 100,
    y: 240,
    width: 800,
    height: 120,
    angle: 0,
    backgroundColor: "#74c0fc",
    strokeColor: "#1971c2",
    strokeWidth: 2,
    strokeStyle: "solid",
    roughness: 1,
    opacity: 100,
    fillStyle: "solid",
    strokeSharpness: "sharp",
    seed: Math.floor(Math.random() * 1000000),
    version: 1,
    versionNonce: 1,
    isDeleted: false,
    groupIds: [],
    boundElements: [],
    updated: Date.now(),
    link: null,
    locked: false,
  } as any);

  elements.push({
    type: "text",
    id: nanoid(),
    x: 120,
    y: 280,
    width: 760,
    height: 40,
    angle: 0,
    backgroundColor: "transparent",
    strokeColor: "#000000",
    strokeWidth: 1,
    strokeStyle: "solid",
    roughness: 1,
    opacity: 100,
    fillStyle: "solid",
    strokeSharpness: "sharp",
    seed: Math.floor(Math.random() * 1000000),
    version: 1,
    versionNonce: 1,
    isDeleted: false,
    groupIds: [],
    boundElements: [],
    updated: Date.now(),
    link: null,
    locked: false,
    text: "Couche Application (Back-end, APIs, Services)",
    fontSize: 18,
    fontFamily: 1,
    textAlign: "center",
    verticalAlign: "middle",
    baseline: 18,
    containerId: null,
    originalText: "Couche Application (Back-end, APIs, Services)",
  } as any);

  // Couche Données
  elements.push({
    type: "rectangle",
    id: nanoid(),
    x: 100,
    y: 400,
    width: 800,
    height: 120,
    angle: 0,
    backgroundColor: "#b2f2bb",
    strokeColor: "#2f9e44",
    strokeWidth: 2,
    strokeStyle: "solid",
    roughness: 1,
    opacity: 100,
    fillStyle: "solid",
    strokeSharpness: "sharp",
    seed: Math.floor(Math.random() * 1000000),
    version: 1,
    versionNonce: 1,
    isDeleted: false,
    groupIds: [],
    boundElements: [],
    updated: Date.now(),
    link: null,
    locked: false,
  } as any);

  elements.push({
    type: "text",
    id: nanoid(),
    x: 120,
    y: 440,
    width: 760,
    height: 40,
    angle: 0,
    backgroundColor: "transparent",
    strokeColor: "#000000",
    strokeWidth: 1,
    strokeStyle: "solid",
    roughness: 1,
    opacity: 100,
    fillStyle: "solid",
    strokeSharpness: "sharp",
    seed: Math.floor(Math.random() * 1000000),
    version: 1,
    versionNonce: 1,
    isDeleted: false,
    groupIds: [],
    boundElements: [],
    updated: Date.now(),
    link: null,
    locked: false,
    text: "Couche Données (BDD, Storage, Cache)",
    fontSize: 18,
    fontFamily: 1,
    textAlign: "center",
    verticalAlign: "middle",
    baseline: 18,
    containerId: null,
    originalText: "Couche Données (BDD, Storage, Cache)",
  } as any);

  // Flèches entre les couches
  elements.push({
    type: "arrow",
    id: nanoid(),
    x: 500,
    y: 200,
    width: 0,
    height: 40,
    angle: 0,
    backgroundColor: "transparent",
    strokeColor: "#495057",
    strokeWidth: 3,
    strokeStyle: "solid",
    roughness: 1,
    opacity: 100,
    fillStyle: "solid",
    strokeSharpness: "round",
    seed: Math.floor(Math.random() * 1000000),
    version: 1,
    versionNonce: 1,
    isDeleted: false,
    groupIds: [],
    boundElements: [],
    updated: Date.now(),
    link: null,
    locked: false,
    startBinding: null,
    endBinding: null,
    lastCommittedPoint: null,
    startArrowhead: null,
    endArrowhead: "arrow",
    points: [[0, 0], [0, 40]],
  } as any);

  elements.push({
    type: "arrow",
    id: nanoid(),
    x: 500,
    y: 360,
    width: 0,
    height: 40,
    angle: 0,
    backgroundColor: "transparent",
    strokeColor: "#495057",
    strokeWidth: 3,
    strokeStyle: "solid",
    roughness: 1,
    opacity: 100,
    fillStyle: "solid",
    strokeSharpness: "round",
    seed: Math.floor(Math.random() * 1000000),
    version: 1,
    versionNonce: 1,
    isDeleted: false,
    groupIds: [],
    boundElements: [],
    updated: Date.now(),
    link: null,
    locked: false,
    startBinding: null,
    endBinding: null,
    lastCommittedPoint: null,
    startArrowhead: null,
    endArrowhead: "arrow",
    points: [[0, 0], [0, 40]],
  } as any);

  return {
    type: "excalidraw",
    version: 2,
    source: "https://excalidraw.com",
    elements: elements,
    appState: {
      viewBackgroundColor: "#ffffff",
      currentItemStrokeColor: "#000000",
      currentItemBackgroundColor: "transparent",
      currentItemFillStyle: "solid",
      currentItemStrokeWidth: 2,
      currentItemRoughness: 1,
      currentItemOpacity: 100,
      gridSize: null,
      colorPalette: {},
    },
    scrollToContent: true,
  };
}

export function generateCadre10Template(data: Cadre10_MatricesFlux) {
  // TODO: À implémenter plus tard
  return {
    type: "excalidraw",
    version: 2,
    source: "https://excalidraw.com",
    elements: [],
    appState: { viewBackgroundColor: "#ffffff" },
    scrollToContent: true,
  };
}
