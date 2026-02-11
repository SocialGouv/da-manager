import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { checkFormAccess, getFormById } from "@/lib/db/queries/forms";
import {
  getVersionsForForm,
  createNamedVersion,
} from "@/lib/db/queries/versions";

/**
 * GET /api/da/[id]/versions — Liste des versions d'un DA
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

  const versionList = await getVersionsForForm(id);

  return NextResponse.json(versionList);
}

/**
 * POST /api/da/[id]/versions — Créer un snapshot nommé
 */
export async function POST(
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
  if (!access || access === "viewer") {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const body = await request.json();
  const name = body.name?.trim();
  if (!name) {
    return NextResponse.json(
      { error: "Le nom de la version est requis" },
      { status: 400 },
    );
  }

  // Récupérer les données actuelles du DA
  const form = await getFormById(id);
  if (!form) {
    return NextResponse.json({ error: "DA introuvable" }, { status: 404 });
  }

  const version = await createNamedVersion(
    id,
    name,
    form.data,
    session.user.dbUserId,
  );

  return NextResponse.json(version, { status: 201 });
}
