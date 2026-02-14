import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { isFormNameTaken } from "@/lib/db/queries/forms";

/**
 * GET /api/da/check-name?nom=xxx&excludeId=yyy
 * Vérifie si un nom de DA est déjà utilisé.
 */
export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.dbUserId) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const nom = searchParams.get("nom");
  const excludeId = searchParams.get("excludeId") || undefined;

  if (!nom || !nom.trim()) {
    return NextResponse.json({ taken: false });
  }

  const taken = await isFormNameTaken(nom.trim(), excludeId);

  return NextResponse.json({ taken });
}
