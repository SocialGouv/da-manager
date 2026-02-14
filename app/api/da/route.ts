import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { createForm, getFormsForUser, isFormNameTaken } from "@/lib/db/queries/forms";
import { initialData } from "@/app/da/initialData";

/**
 * GET /api/da — Liste des DA accessibles par l'utilisateur connecté
 */
export async function GET() {
  const session = await auth();
  if (!session?.user?.dbUserId) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const daList = await getFormsForUser(
    session.user.dbUserId,
    session.user.isAdmin,
  );

  return NextResponse.json(daList);
}

/**
 * POST /api/da — Créer un nouveau DA (admin uniquement)
 */
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.dbUserId) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  if (!session.user.isAdmin) {
    return NextResponse.json(
      { error: "Seuls les administrateurs peuvent créer un DA" },
      { status: 403 },
    );
  }

  let body: { nom?: string } = {};
  try {
    body = await request.json();
  } catch {
    // Corps vide ou invalide, on utilisera les valeurs par défaut
  }

  const nom = body.nom || "Nouveau Document d'Architecture";

  const nameTaken = await isFormNameTaken(nom);
  if (nameTaken) {
    return NextResponse.json(
      { error: "Un DA avec ce nom existe déjà" },
      { status: 409 },
    );
  }

  const data = {
    ...initialData,
    cadre1_ProjetActeurs: {
      ...initialData.cadre1_ProjetActeurs,
      nomDuProjet: nom,
    },
  };

  const form = await createForm(nom, data, session.user.dbUserId);

  return NextResponse.json(form, { status: 201 });
}
