import type { DAData } from "@/types/da.types";
import ReadonlyCadre1 from "./ReadonlyCadre1";
import ReadonlyCadre2 from "./ReadonlyCadre2";
import ReadonlyCadre3 from "./ReadonlyCadre3";
import ReadonlyCadre4 from "./ReadonlyCadre4";
import ReadonlyCadre5 from "./ReadonlyCadre5";
import ReadonlyCadre6 from "./ReadonlyCadre6";
import ReadonlyCadre7 from "./ReadonlyCadre7";
import ReadonlyCadre8 from "./ReadonlyCadre8";
import ReadonlyCadre9 from "./ReadonlyCadre9";
import ReadonlyCadre10 from "./ReadonlyCadre10";
import ReadonlyCadre11 from "./ReadonlyCadre11";
import ReadonlyCadre12 from "./ReadonlyCadre12";

interface ReadonlyDAProps {
  daData: DAData;
}

const sections = [
  { id: 1, title: "Projet - Acteurs" },
  { id: 2, title: "Fonctionnalités - Données" },
  { id: 3, title: "Contraintes - Volumétrie" },
  { id: 4, title: "Exigences Contextuelles" },
  { id: 5, title: "Architecture Acteurs" },
  { id: 6, title: "Architecture Fonctionnelle" },
  { id: 7, title: "Architecture Applicative" },
  { id: 8, title: "Architecture Technique" },
  { id: 9, title: "Serveurs & Composants" },
  { id: 10, title: "Matrices Flux" },
  { id: 11, title: "Dimensionnement" },
  { id: 12, title: "URLs" },
];

export default function ReadonlyDA({ daData }: ReadonlyDAProps) {
  return (
    <div>
      <section id="cadre-1" className="fr-mb-6w">
        <h2 className="fr-h2">1. {sections[0].title}</h2>
        <ReadonlyCadre1 daData={daData} />
      </section>

      <section id="cadre-2" className="fr-mb-6w">
        <h2 className="fr-h2">2. {sections[1].title}</h2>
        <ReadonlyCadre2 daData={daData} />
      </section>

      <section id="cadre-3" className="fr-mb-6w">
        <h2 className="fr-h2">3. {sections[2].title}</h2>
        <ReadonlyCadre3 daData={daData} />
      </section>

      <section id="cadre-4" className="fr-mb-6w">
        <h2 className="fr-h2">4. {sections[3].title}</h2>
        <ReadonlyCadre4 daData={daData} />
      </section>

      <section id="cadre-5" className="fr-mb-6w">
        <h2 className="fr-h2">5. {sections[4].title}</h2>
        <ReadonlyCadre5 daData={daData} />
      </section>

      <section id="cadre-6" className="fr-mb-6w">
        <h2 className="fr-h2">6. {sections[5].title}</h2>
        <ReadonlyCadre6 daData={daData} />
      </section>

      <section id="cadre-7" className="fr-mb-6w">
        <h2 className="fr-h2">7. {sections[6].title}</h2>
        <ReadonlyCadre7 daData={daData} />
      </section>

      <section id="cadre-8" className="fr-mb-6w">
        <h2 className="fr-h2">8. {sections[7].title}</h2>
        <ReadonlyCadre8 daData={daData} />
      </section>

      <section id="cadre-9" className="fr-mb-6w">
        <h2 className="fr-h2">9. {sections[8].title}</h2>
        <ReadonlyCadre9 daData={daData} />
      </section>

      <section id="cadre-10" className="fr-mb-6w">
        <h2 className="fr-h2">10. {sections[9].title}</h2>
        <ReadonlyCadre10 daData={daData} />
      </section>

      <section id="cadre-11" className="fr-mb-6w">
        <h2 className="fr-h2">11. {sections[10].title}</h2>
        <ReadonlyCadre11 daData={daData} />
      </section>

      <section id="cadre-12" className="fr-mb-6w">
        <h2 className="fr-h2">12. {sections[11].title}</h2>
        <ReadonlyCadre12 daData={daData} />
      </section>
    </div>
  );
}
