-- Dédupliquer les noms existants avant de créer l'index unique.
-- Les doublons reçoivent un suffixe numérique (ex: "Mon DA (2)", "Mon DA (3)").
DO $$
DECLARE
  rec RECORD;
  counter INTEGER;
BEGIN
  FOR rec IN
    SELECT LOWER(nom) AS lower_nom
    FROM forms
    GROUP BY LOWER(nom)
    HAVING COUNT(*) > 1
  LOOP
    counter := 1;
    FOR rec IN
      SELECT id, nom
      FROM forms
      WHERE LOWER(nom) = rec.lower_nom
      ORDER BY updated_at DESC
    LOOP
      IF counter > 1 THEN
        UPDATE forms
        SET nom = rec.nom || ' (' || counter || ')',
            data = jsonb_set(
              data,
              '{cadre1_ProjetActeurs,nomDuProjet}',
              to_jsonb(rec.nom || ' (' || counter || ')')
            )
        WHERE id = rec.id;
      END IF;
      counter := counter + 1;
    END LOOP;
  END LOOP;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX "forms_nom_unique_lower" ON "forms" (LOWER("nom"));
