import { useEffect, useState } from "react";
import { contacto, enlacesContacto } from "./config/contacto.js";
import {
  ArrowRight,
  HouseLine,
  List,
  Scales,
  Scroll,
  X,
} from "@phosphor-icons/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const areas = [
  { id: "juridico", title: "Servicios jurídicos", Icon: Scales },
  { id: "notarial", title: "Sector notarial", Icon: Scroll },
  {
    id: "propiedades",
    title: "Administración de propiedades",
    Icon: HouseLine,
  },
];

function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const mobile = window.matchMedia("(max-width: 760px)");
    const previousOverflow = document.body.style.overflow;
    if (mobile.matches) document.body.style.overflow = "hidden";
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    const closeOnDesktop = () => {
      if (!mobile.matches) setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    mobile.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
      mobile.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  return (
    <header className="site-header">
      {open && (
        <button
          className="menu-backdrop"
          aria-label="Cerrar menú"
          onClick={() => setOpen(false)}
          tabIndex={-1}
        />
      )}
      <div className="header-inner">
        <a
          className="wordmark"
          href="#inicio"
          aria-label="Estudio Corrales Pérez, inicio"
        >
          <span className="brand-full">
            <span>Estudio</span>Corrales Pérez
          </span>
          <span className="brand-monogram" aria-hidden="true">
            CP
          </span>
        </a>
        <button
          className="menu-toggle"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <List size={26} />}
        </button>
        <nav
          id="navigation"
          className={open ? "navigation is-open" : "navigation"}
          aria-label="Navegación principal"
        >
          <p className="mobile-menu-label">Navegación</p>
          {[
            ["inicio", "Inicio"],
            ["estudio", "El estudio"],
            ["servicios", "Servicios"],
            ["contacto", "Contacto"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {label}
              <ArrowRight
                className="mobile-menu-arrow"
                size={20}
                weight="light"
              />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

const assetUrl = (path) => `${import.meta.env.BASE_URL}assets/${path}`;

const heroLayers = [
  { name: "background", file: "5.png" },
  { name: "corrales", file: "corrales.png" },
  { name: "building", file: "4.png" },
  { name: "perez", file: "perez.png" },
];

function Hero() {
  const [introReady, setIntroReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const loadImage = (file) =>
      new Promise((resolve) => {
        const image = new Image();
        image.onload = resolve;
        image.onerror = resolve;
        image.src = file;
      });
    const files = heroLayers.map(({ file }) =>
      assetUrl(`client-originals/${file}`),
    );
    if (window.matchMedia("(max-width: 760px)").matches) {
      files.push(
        assetUrl("hero-mobile-photo.png"),
        assetUrl("hero-mobile-building.png"),
      );
    }
    Promise.all(files.map(loadImage)).then(() => {
      if (!cancelled) setIntroReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="inicio"
      className={introReady ? "hero is-ready" : "hero"}
      aria-labelledby="hero-title"
    >
      <h1 id="hero-title" className="visually-hidden">
        Estudio Corrales Pérez
      </h1>
      <div className="hero-artwork" aria-hidden="true">
        <div className="hero-canvas">
          {heroLayers.map(({ name, file }) => (
            <picture key={name} className={`hero-layer hero-layer-${name}`}>
              {(name === "background" || name === "building") && (
                <source
                  media="(max-width: 760px)"
                  srcSet={
                    name === "background"
                      ? assetUrl("hero-mobile-photo.png")
                      : assetUrl("hero-mobile-building.png")
                  }
                />
              )}
              <img
                src={assetUrl(`client-originals/${file}`)}
                alt=""
                width={
                  name === "corrales" ? 1664 : name === "perez" ? 995 : 2160
                }
                height={
                  name === "corrales" ? 236 : name === "perez" ? 233 : 1215
                }
                fetchPriority={name === "background" ? "high" : "auto"}
              />
            </picture>
          ))}
        </div>
      </div>
      <div className="hero-actions section-inner">
        <p className="hero-description">
          Presentación del estudio a completar.
          <br />
          Servicios jurídicos y notariales.
          <br />
          Administración de propiedades.
        </p>
        <p className="hero-subtitle">
          Jurídico · Notarial · Administración de propiedades
        </p>
        <a className="button hero-button" href="#contacto">
          Contactar <ArrowRight size={23} weight="light" />
        </a>
      </div>
      <a
        className="mobile-contact-shortcut"
        href={enlacesContacto.whatsapp || "#contacto"}
        target={enlacesContacto.whatsapp ? "_blank" : undefined}
        rel={enlacesContacto.whatsapp ? "noopener noreferrer" : undefined}
        aria-label={
          enlacesContacto.whatsapp
            ? "Contactar por WhatsApp"
            : "Ver medios de contacto del estudio"
        }
      >
        <FontAwesomeIcon icon={faWhatsapp} />
      </a>
    </section>
  );
}

function Services() {
  return (
    <section id="servicios" className="services section-inner">
      <div className="section-heading">
        <span className="gold-rule" />
        <h2>Tres áreas, un mismo estudio</h2>
      </div>
      <div className="service-grid">
        {areas.map(({ id, title, Icon }) => (
          <article className="service-card" key={id}>
            <div className="service-icon">
              <Icon size={48} weight="thin" />
            </div>
            <h3>{title}</h3>
            <p>Información a completar</p>
            <span className="gold-rule" />
            <a href={`#${id}`}>
              Conocer más <ArrowRight size={19} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <section id="estudio" className="content-section section-inner reveal">
          <p className="eyebrow">El estudio</p>
          <h2>
            Alfonsina Corrales Arbelo
            <br />
            Ana Pérez Pérez
          </h2>
          <p>Presentación del estudio a completar.</p>
        </section>
        {areas.map(({ id, title }) => (
          <section
            id={id}
            className="content-section section-inner reveal"
            key={id}
          >
            <p className="eyebrow">Nuestras áreas</p>
            <h2>{title}</h2>
            <p>Información de los servicios a completar.</p>
          </section>
        ))}
        <section id="contacto" className="content-section section-inner reveal">
          <p className="eyebrow">Contacto</p>
          <h2>Contactá al estudio</h2>
          {Object.values(enlacesContacto).some(Boolean) ||
          contacto.direccion ||
          contacto.horarios ? (
            <div className="contact-details">
              {enlacesContacto.telefono && (
                <p>
                  Teléfono:{" "}
                  <a href={enlacesContacto.telefono}>{contacto.telefono}</a>
                </p>
              )}
              {enlacesContacto.whatsapp && (
                <p>
                  <a
                    href={enlacesContacto.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp: {contacto.whatsapp}
                  </a>
                </p>
              )}
              {enlacesContacto.email && (
                <p>
                  Correo: <a href={enlacesContacto.email}>{contacto.email}</a>
                </p>
              )}
              {enlacesContacto.instagram && (
                <p>
                  <a
                    href={enlacesContacto.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </p>
              )}
              {contacto.direccion && <p>Dirección: {contacto.direccion}</p>}
              {contacto.horarios && <p>Horarios: {contacto.horarios}</p>}
            </div>
          ) : (
            <p>Datos de contacto a completar.</p>
          )}
        </section>
      </main>
      <footer className="site-footer section-inner">
        Estudio Corrales Pérez
        <span>Jurídico · Notarial · Administración de propiedades</span>
      </footer>
    </>
  );
}
