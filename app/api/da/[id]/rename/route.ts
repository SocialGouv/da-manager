import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getFormById, isFormNameTaken, renameForm } from "@/lib/db/queries/forms";

/**
 * PATCH /api/da/[id]/rename — Renommer un DA (admin uniquement)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.dbUserId) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  if (!session.user.isAdmin) {
    return NextResponse.json(
      { error: "Seuls les administrateurs peuvent renommer un DA" },
      { status: 403 },
    );
  }

  const { id } = await params;

  const form = await getFormById(id);
  if (!form) {
    return NextResponse.json({ error: "DA introuvable" }, { status: 404 });
  }

  const body = (await request.json()) as { nom?: string };
  const nom = body.nom?.trim();

  if (!nom) {
    return NextResponse.json(
      { error: "Le nom est requis" },
      { status: 400 },
    );
  }

  const nameTaken = await isFormNameTaken(nom, id);
  if (nameTaken) {
    return NextResponse.json(
      { error: "Un DA avec ce nom existe déjà", nameTaken: true },
      { status: 409 },
    );
  }

  const updated = await renameForm(id, nom);
  if (!updated) {
    return NextResponse.json(
      { error: "Erreur lors du renommage" },
      { status: 500 },
    );
  }

  return NextResponse.json({
    id: updated.id,
    nom: updated.nom,
    updatedAt: updated.updatedAt,
  });
}
