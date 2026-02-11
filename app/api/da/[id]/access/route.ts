import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  getFormAccessList,
  grantAccess,
  getUsersWithoutAccess,
} from "@/lib/db/queries/form-access";

/**
 * GET /api/da/[id]/access — Liste des accès d'un DA (admin uniquement)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.dbUserId) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  if (!session.user.isAdmin) {
    return NextResponse.json(
      { error: "Accès réservé aux administrateurs" },
      { status: 403 },
    );
  }

  const { id } = await params;

  const accessList = await getFormAccessList(id);
  const availableUsers = await getUsersWithoutAccess(id);

  return NextResponse.json({ accessList, availableUsers });
}

/**
 * POST /api/da/[id]/access — Accorder un accès à un DA (admin uniquement)
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.dbUserId) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  if (!session.user.isAdmin) {
    return NextResponse.json(
      { error: "Accès réservé aux administrateurs" },
      { status: 403 },
    );
  }

  const { id } = await params;
  const body = await request.json();

  if (!body.userId) {
    return NextResponse.json(
      { error: "L'identifiant de l'utilisateur est requis" },
      { status: 400 },
    );
  }

  const role = body.role === "viewer" ? "viewer" : "editor";
  const access = await grantAccess(id, body.userId, role);

  return NextResponse.json(access, { status: 201 });
}
