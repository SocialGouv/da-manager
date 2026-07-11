"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

export default function ReadonlySidemenu({
  id,
  canEdit,
  projectName,
  pdfUrl,
}: {
  id: string;
  canEdit: boolean;
  projectName: string;
  pdfUrl?: string;
}) {
  const [activeSectionId, setActiveSectionId] = useState<number | null>(null);

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(`cadre-${section.id}`))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idAttr = entry.target.id;
            const num = parseInt(idAttr.replace("cadre-", ""), 10);
            if (!isNaN(num)) {
              setActiveSectionId(num);
            }
          }
        }
      },
      {
        rootMargin: "-20% 0px -70% 0px",
      },
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="fr-col-12 fr-col-md-3">
      <nav
        className="fr-sidemenu fr-sidemenu--sticky-full-height"
        role="navigation"
        aria-labelledby="sidemenu-title"
      >
        <ul className="fr-btns-group fr-mt-2w">
          <li>
            <Link href="/" className="fr-btn fr-btn--sm">
              <span
                className="fr-icon-arrow-left-line"
                aria-hidden="true"
              ></span>
              Retour
            </Link>
          </li>
          {canEdit && (
            <li>
              <Link
                href={`/da/${id}`}
                className="fr-btn fr-btn--sm fr-btn--secondary"
              >
                <span
                  className="fr-icon-edit-line"
                  aria-hidden="true"
                ></span>
                Éditer
              </Link>
            </li>
          )}
          <li>
            <Link
              href={pdfUrl || `/api/export-pdf/${id}`}
              target="_blank"
              className="fr-btn fr-btn--sm fr-btn--tertiary"
            >
              <span
                className="fr-icon-download-line"
                aria-hidden="true"
              ></span>
              PDF
            </Link>
          </li>
        </ul>
        <div className="fr-sidemenu__inner">
          <button
            aria-expanded="false"
            aria-controls="sidemenu-collapse-view"
            type="button"
            className="fr-sidemenu__btn"
          >
            Sommaire
          </button>
          <div className="fr-collapse" id="sidemenu-collapse-view">
            <p
              className="fr-sidemenu__title fr-mb-1w"
              id="sidemenu-title"
            >
              {projectName}
            </p>
            <ul className="fr-sidemenu__list">
              {sections.map((section) => (
                <li className="fr-sidemenu__item" key={section.id}>
                  <a
                    className={`fr-sidemenu__link${activeSectionId === section.id ? " fr-sidemenu__link--active" : ""}`}
                    href={`#cadre-${section.id}`}
                  >
                    {section.id}. {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
