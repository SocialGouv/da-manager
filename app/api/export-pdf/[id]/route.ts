import { NextRequest, NextResponse } from "next/server";
import { renderToStream } from "@react-pdf/renderer";
import { createElement } from "react";
import { DADocument } from "./pdf-template";
import { promises as fs } from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Charger les données du DA
    const filePath = path.join(process.cwd(), `public/da/${id}.json`);
    const fileContents = await fs.readFile(filePath, "utf8");
    const daData = JSON.parse(fileContents);

    // Générer le PDF
    const stream = await renderToStream(
      createElement(DADocument, { data: daData }) as any
    );

    // Retourner le PDF
    return new NextResponse(stream as any, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="DA-${daData.cadre1_ProjetActeurs.nomDuProjet || id}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la génération du PDF:", error);
    return NextResponse.json(
      { error: "Erreur lors de la génération du PDF" },
      { status: 500 }
    );
  }
}
