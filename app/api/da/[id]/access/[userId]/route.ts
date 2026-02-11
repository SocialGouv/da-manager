import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { revokeAccess } from "@/lib/db/queries/form-access";

/**
 * DELETE /api/da/[id]/access/[userId] — Révoquer l'accès d'un utilisateur à un DA (admin uniquement)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; userId: string }> },
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

  const { id, userId } = await params;

  await revokeAccess(id, userId);

  return NextResponse.json({ success: true });
}
