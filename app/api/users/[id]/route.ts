import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { updateUserAdmin, deleteUser, getUserById } from "@/lib/db/queries/users";

/**
 * PUT /api/users/[id] — Modifier un utilisateur (admin uniquement)
 */
export async function PUT(
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

  if (typeof body.isAdmin === "boolean") {
    // Empêcher un admin de se retirer ses propres droits admin
    if (id === session.user.dbUserId && !body.isAdmin) {
      return NextResponse.json(
        { error: "Vous ne pouvez pas retirer vos propres droits administrateur" },
        { status: 400 },
      );
    }

    const updated = await updateUserAdmin(id, body.isAdmin);
    if (!updated) {
      return NextResponse.json(
        { error: "Utilisateur introuvable" },
        { status: 404 },
      );
    }
    return NextResponse.json(updated);
  }

  return NextResponse.json(
    { error: "Aucune modification valide fournie" },
    { status: 400 },
  );
}

/**
 * DELETE /api/users/[id] — Supprimer un utilisateur (admin uniquement)
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
      { error: "Accès réservé aux administrateurs" },
      { status: 403 },
    );
  }

  const { id } = await params;

  // Empêcher un admin de se supprimer lui-même
  if (id === session.user.dbUserId) {
    return NextResponse.json(
      { error: "Vous ne pouvez pas supprimer votre propre compte" },
      { status: 400 },
    );
  }

  const user = await getUserById(id);
  if (!user) {
    return NextResponse.json(
      { error: "Utilisateur introuvable" },
      { status: 404 },
    );
  }

  await deleteUser(id);

  return NextResponse.json({ success: true });
}
