import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  getFormById,
  updateFormData,
  deleteForm,
  checkFormAccess,
  isFormNameTaken,
} from "@/lib/db/queries/forms";
import type { DAData } from "@/types/da.types";
import { createEditLog } from "@/lib/db/queries/editLogs";
import { createAutoSaveVersion } from "@/lib/db/queries/versions";

/**
 * GET /api/da/[id] — Récupérer un DA (avec vérification d'accès)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.dbUserId) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const { id } = await params;

  const access = await checkFormAccess(
    id,
    session.user.dbUserId,
    session.user.isAdmin,
  );
  if (!access) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const form = await getFormById(id);
  if (!form) {
    return NextResponse.json({ error: "DA introuvable" }, { status: 404 });
  }

  return NextResponse.json({
    id: form.id,
    nom: form.nom,
    data: form.data,
    createdAt: form.createdAt,
    updatedAt: form.updatedAt,
    access,
  });
}

/**
 * PUT /api/da/[id] — Mettre à jour les données d'un DA
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.dbUserId) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const { id } = await params;

  const access = await checkFormAccess(
    id,
    session.user.dbUserId,
    session.user.isAdmin,
  );
  if (!access) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }
  if (access === "viewer") {
    return NextResponse.json(
      { error: "Vous n'avez pas les droits d'édition sur ce DA" },
      { status: 403 },
    );
  }

  const form = await getFormById(id);
  if (!form) {
    return NextResponse.json({ error: "DA introuvable" }, { status: 404 });
  }

  const body = (await request.json()) as {
    data: DAData;
    updatedAt?: string;
  };
  if (!body.data) {
    return NextResponse.json(
      { error: "Les données du DA sont requises" },
      { status: 400 },
    );
  }

  // Vérifier l'unicité du nom
  const nom =
    body.data.cadre1_ProjetActeurs?.nomDuProjet || "Document d'Architecture";
  const nameTaken = await isFormNameTaken(nom, id);
  if (nameTaken) {
    return NextResponse.json(
      { error: "Un DA avec ce nom existe déjà", nameTaken: true },
      { status: 409 },
    );
  }

  // Optimistic locking : vérifier que le document n'a pas été modifié entre-temps
  const expectedUpdatedAt = body.updatedAt
    ? new Date(body.updatedAt)
    : undefined;

  const updated = await updateFormData(id, body.data, expectedUpdatedAt);

  if (!updated) {
    return NextResponse.json(
      {
        error: "Ce document a été modifié par un autre utilisateur.",
        conflict: true,
      },
      { status: 409 },
    );
  }

  // Loguer la modification (léger, sans données JSON)
  try {
    await createEditLog(id, session.user.dbUserId);
  } catch (error) {
    console.error("Erreur lors de la création du log d'édition:", error);
  }

  // Créer une version auto-save (throttlée côté serveur)
  try {
    await createAutoSaveVersion(id, body.data, session.user.dbUserId);
  } catch (error) {
    console.error("Erreur lors de la création de la version auto-save:", error);
  }

  return NextResponse.json({
    id: updated.id,
    nom: updated.nom,
    updatedAt: updated.updatedAt,
  });
}

/**
 * DELETE /api/da/[id] — Supprimer un DA (admin uniquement)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.dbUserId) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  if (!session.user.isAdmin) {
    return NextResponse.json(
      { error: "Seuls les administrateurs peuvent supprimer un DA" },
      { status: 403 },
    );
  }

  const { id } = await params;

  const form = await getFormById(id);
  if (!form) {
    return NextResponse.json({ error: "DA introuvable" }, { status: 404 });
  }

  await deleteForm(id);

  return NextResponse.json({ success: true });
}
