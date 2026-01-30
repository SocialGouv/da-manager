import Link from "next/link";

export default function Home() {
  return (
    <main className="fr-container fr-my-6w">
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-col-12 fr-col-md-8">
          <h1 className="fr-h1">Formulaire Document d'Architecture (DA)</h1>
          <p className="fr-text--lead">
            Créez et remplissez votre Document d'Architecture de manière structurée avec Next.js et DSFR.
          </p>

          <div className="fr-callout fr-mt-4w">
            <h2 className="fr-callout__title">Fonctionnalités</h2>
            <ul>
              <li>✅ Formulaire typé TypeScript</li>
              <li>✅ 4 cadres complets (Projet, Fonctionnalités, Contraintes, Exigences)</li>
              <li>✅ Interface DSFR conforme</li>
              <li>🚧 Export Word/PDF (à venir)</li>
              <li>🚧 Sauvegarde locale (à venir)</li>
            </ul>
          </div>

          <div className="fr-mt-6w">
            <Link href="/formulaire" className="fr-btn fr-btn--lg">
              Accéder au formulaire
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
