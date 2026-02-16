import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getUserById } from "@/lib/db/queries/users";
import { getSharedDAsForUser } from "@/lib/db/queries/form-access";
import { getEditLogsForUser } from "@/lib/db/queries/editLogs";

/**
 * GET /api/users/[id]/activity — Activité d'un utilisateur (admin uniquement)
 */
export async function GET(
  _request: Request,
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

  const user = await getUserById(id);
  if (!user) {
    return NextResponse.json(
      { error: "Utilisateur introuvable" },
      { status: 404 },
    );
  }

  const [sharedDAs, editLogs] = await Promise.all([
    getSharedDAsForUser(id),
    getEditLogsForUser(id),
  ]);

  return NextResponse.json({
    user: {
      id: user.id,
      givenName: user.givenName,
      usualName: user.usualName,
      email: user.email,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
    },
    sharedDAs,
    editLogs,
  });
}
