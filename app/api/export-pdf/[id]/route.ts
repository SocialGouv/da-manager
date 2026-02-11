import { NextRequest, NextResponse } from "next/server";
import { renderToStream } from "@react-pdf/renderer";
import { createElement } from "react";
import { DADocument } from "./pdf-template";
import { auth } from "@/auth";
import { getFormById, checkFormAccess } from "@/lib/db/queries/forms";
import type { DAData } from "@/types/da.types";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    if (!session?.user?.dbUserId) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const { id } = await params;

    // Vérifier l'accès
    const access = await checkFormAccess(
      id,
      session.user.dbUserId,
      session.user.isAdmin,
    );
    if (!access) {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    // Charger les données du DA depuis la DB
    const form = await getFormById(id);
    if (!form) {
      return NextResponse.json({ error: "DA introuvable" }, { status: 404 });
    }

    const daData = form.data as DAData;

    // Générer le PDF
    const stream = await renderToStream(
      createElement(DADocument, { data: daData }) as any,
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
      { status: 500 },
    );
  }
}
