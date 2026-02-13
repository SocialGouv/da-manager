import type { DAData, SensibiliteDonnees } from "@/types/da.types";
import ReadonlyTable from "./ReadonlyTable";

const CHECKBOX_COLUMNS_MREP = [
  { key: "M" as const, label: "M", type: "checkbox" as const, headerClass: "fr-th--red", totalClass: "fr-td--red" },
  { key: "R" as const, label: "R", type: "checkbox" as const, headerClass: "fr-th--orange", totalClass: "fr-td--orange" },
  { key: "E" as const, label: "E", type: "checkbox" as const, headerClass: "fr-th--yellow", totalClass: "fr-td--yellow" },
  { key: "P" as const, label: "P", type: "checkbox" as const, headerClass: "fr-th--green", totalClass: "fr-td--green" },
];

const TRES_SENSIBLE_ITEMS: { key: keyof SensibiliteDonnees; label: string }[] = [
  { key: "NIR", label: "NIR" },
  { key: "medicales", label: "M\u00e9dicales" },
  { key: "viePrivee", label: "Vie priv\u00e9e" },
  { key: "justice", label: "Justice" },
  { key: "identite", label: "Identit\u00e9" },
  { key: "biometrique", label: "Biom\u00e9trique" },
  { key: "mecanismeFraude", label: "M\u00e9canisme fraude" },
  { key: "faillesVulnerabilite", label: "Architecture s\u00e9curit\u00e9" },
  { key: "patrimoine", label: "Patrimoine" },
  { key: "appartenanceSyndicale", label: "Appartenance syndicale" },
];

const SENSIBLE_ITEMS: { key: keyof SensibiliteDonnees; label: string }[] = [
  { key: "architectureTechnique", label: "Architecture technique" },
  { key: "organisationnel", label: "Organisationnel" },
  { key: "etatCivil", label: "\u00c9tat civil" },
  { key: "adressePostale", label: "Adresse postale" },
  { key: "viePersonnelle", label: "Vie personnelle" },
  { key: "vieProfessionnelle", label: "Vie professionnelle" },
  { key: "mouvementsSalariaux", label: "Mouvements salariaux" },
  { key: "santeEconomique", label: "Sant\u00e9 \u00e9conomique" },
];

const PUBLIC_ITEMS: { key: keyof SensibiliteDonnees; label: string }[] = [
  { key: "editoriaux", label: "\u00c9ditoriaux" },
  { key: "publicationExtranet", label: "Publication Extranet" },
  { key: "campagneDeCom", label: "Campagne de com" },
  { key: "statistiquesPubliables", label: "Statistiques publiables" },
];

export default function ReadonlyCadre2({ daData }: { daData: DAData }) {
  const cadre = daData.cadre2_FonctionnalitesDonnees;
  const sensibilite = cadre.sensibiliteDesDonnees;

  const tresSensibleChecked = TRES_SENSIBLE_ITEMS.filter(
    ({ key }) => sensibilite[key] === "Tr\u00e8s sensible"
  );
  const sensibleChecked = SENSIBLE_ITEMS.filter(
    ({ key }) => sensibilite[key] === "Sensible"
  );
  const publicChecked = PUBLIC_ITEMS.filter(
    ({ key }) => sensibilite[key] !== ""
  );

  return (
    <div>
      {/* Fonctionnalit\u00e9s du SI applicatif */}
      <h3 className="fr-h3">Fonctionnalit&eacute;s du SI applicatif</h3>
      <p className="fr-text--sm">M = Minist&egrave;re, R = R&eacute;seau Interminist&eacute;riel, E = Extranet, P = Public</p>
      <ReadonlyTable
        caption="Fonctionnalit&eacute;s du SI applicatif"
        textColumns={[{ key: "fonctionnalite", label: "Fonctionnalit\u00e9" }]}
        columns={CHECKBOX_COLUMNS_MREP}
        rows={cadre.fonctionnalitesDuSIApplicatif}
        totalLabel="Total fonctionnalit\u00e9s"
      />

      {/* Donn\u00e9es m\u00e9tier du SI Applicatif */}
      <h3 className="fr-h3 fr-mt-6w">Donn&eacute;es m&eacute;tier du SI Applicatif</h3>
      <ReadonlyTable
        caption="Donn&eacute;es m&eacute;tier du SI Applicatif"
        textColumns={[{ key: "donnee", label: "Donn\u00e9e" }]}
        columns={CHECKBOX_COLUMNS_MREP}
        rows={cadre.donneesMetierDuSIApplicatif}
      />

      {/* Fichiers m\u00e9tiers du SI applicatif */}
      <h3 className="fr-h3 fr-mt-6w">Fichiers m&eacute;tiers du SI applicatif</h3>
      <ReadonlyTable
        caption="Fichiers m&eacute;tiers du SI applicatif"
        textColumns={[{ key: "fichier", label: "Fichier" }]}
        columns={CHECKBOX_COLUMNS_MREP}
        rows={cadre.fichiersMetiersDuSIApplicatif}
      />

      {/* R\u00e9f\u00e9rentiel donn\u00e9es (hors SI) */}
      <h3 className="fr-h3 fr-mt-6w">R&eacute;f&eacute;rentiel donn&eacute;es (hors SI)</h3>
      <ReadonlyTable
        caption="R&eacute;f&eacute;rentiel donn&eacute;es (hors SI)"
        textColumns={[
          { key: "referentiel", label: "R\u00e9f\u00e9rentiel" },
          { key: "modeEchange", label: "Mode \u00e9change" },
        ]}
        columns={CHECKBOX_COLUMNS_MREP}
        rows={cadre.referentielsDonneesHorsSI}
      />

      {/* Sensibilit\u00e9 des donn\u00e9es */}
      <h3 className="fr-h3 fr-mt-6w">Sensibilit&eacute; des donn&eacute;es dans le SI Applicatif</h3>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", border: "1px solid #ddd" }}>
        {/* Colonne gauche - Tr\u00e8s sensible */}
        <div>
          <div style={{ backgroundColor: "#ff0000", color: "white", padding: "0.5rem", textAlign: "center", fontWeight: "bold" }}>
            Tr&egrave;s sensible
          </div>
          <div style={{ padding: "0.5rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {tresSensibleChecked.length > 0 ? (
              tresSensibleChecked.map(({ key, label }) => (
                <p key={key} className="fr-text--sm" style={{ margin: 0 }}>
                  &#10003; {label}
                </p>
              ))
            ) : (
              <p className="fr-text--sm" style={{ margin: 0, color: "#666" }}>Aucune</p>
            )}
          </div>
        </div>

        {/* Colonne droite */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Sensible */}
          <div style={{ flex: 1 }}>
            <div style={{ backgroundColor: "#ffff99", padding: "0.5rem", textAlign: "center", fontWeight: "bold" }}>
              Sensible
            </div>
            <div style={{ padding: "0.5rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              {sensibleChecked.length > 0 ? (
                sensibleChecked.map(({ key, label }) => (
                  <p key={key} className="fr-text--sm" style={{ margin: 0 }}>
                    &#10003; {label}
                  </p>
                ))
              ) : (
                <p className="fr-text--sm" style={{ margin: 0, color: "#666" }}>Aucune</p>
              )}
            </div>
          </div>

          {/* Public */}
          <div style={{ flex: 1 }}>
            <div style={{ backgroundColor: "#66cc66", color: "white", padding: "0.5rem", textAlign: "center", fontWeight: "bold" }}>
              Public
            </div>
            <div style={{ padding: "0.5rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              {publicChecked.length > 0 ? (
                publicChecked.map(({ key, label }) => (
                  <p key={key} className="fr-text--sm" style={{ margin: 0 }}>
                    &#10003; {label}
                  </p>
                ))
              ) : (
                <p className="fr-text--sm" style={{ margin: 0, color: "#666" }}>Aucune</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Services utilis\u00e9s par application */}
      <h3 className="fr-h3 fr-mt-6w">Services utilis&eacute;s par application (externes au SI applicatif)</h3>
      <ReadonlyTable
        caption="Services utilis&eacute;s par application"
        textColumns={[
          { key: "service", label: "Service" },
          { key: "modeEchange", label: "Mode \u00e9change" },
        ]}
        columns={CHECKBOX_COLUMNS_MREP}
        rows={cadre.servicesUtilisesParApplication}
      />
    </div>
  );
}
