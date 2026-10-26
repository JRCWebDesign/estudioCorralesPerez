import { useEffect, useState } from "react";
import { contacto, enlacesContacto, profesionales } from "./config/contacto.js";
import { especialidades, resumenes } from "./config/servicios.js";
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
  { id: "juridico", title: "Áreas jurídicas", Icon: Scales, description: "Asesoramiento y representación en familia, laboral, administrativo y otras áreas del Derecho." },
  { id: "notarial", title: "Servicios notariales", Icon: Scroll, description: "Seguridad jurídica en operaciones, contratos y actos de particulares y empresas." },
  { id: "gestiones", title: "Gestiones", Icon: HouseLine, description: "Trámites ante organismos públicos e instituciones privadas en Florida y Montevideo." },
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
          Asesoramiento jurídico con compromiso y cercanía.
          <br />
          Atención personalizada en Montevideo.
          <br />
          Consultas online en todo el país.
        </p>
        <p className="hero-subtitle">
          Jurídico · Notarial · Gestiones
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
        {areas.map(({ id, title, Icon, description }) => (
          <article className="service-card" key={id}>
            <div className="service-icon">
              <Icon size={48} weight="thin" />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
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
        <div className="navy-band">
        <section id="estudio" className="content-section section-inner reveal">
          <p className="eyebrow">El estudio</p>
          <h2>
            Alfonsina Corrales Arbelo
            <br />
            Ana Pérez Pérez
          </h2>
          <p>Asesoramiento jurídico y notarial con compromiso y cercanía. Escuchamos cada situación y te acompañamos con soluciones adaptadas a tu caso, un trato personalizado y un lenguaje claro.</p>
        </section>
        </div>
        <div className="navy-band">
        <section id="juridico" className="content-section section-inner reveal">
          <p className="eyebrow">Áreas jurídicas</p>
          <h2>Asesoramiento para cada situación</h2>
          <p>Cada situación requiere un análisis particular. Te acompañamos con orientación jurídica clara, responsable y fundada.</p>
          <div className="specialties">
            {especialidades.map(({ id, title }) => (
              <article id={id} key={id} className="specialty">
                <h3>{title}</h3>
                <p>{resumenes[id]}</p>
              </article>
            ))}
          </div>
        </section>
        </div>
        <section id="notarial" className="content-section section-inner reveal">
          <p className="eyebrow">Servicios notariales</p>
          <h2>Seguridad jurídica y atención personalizada</h2>
          <p>Asesoramiento a particulares y empresas en sus operaciones y actos notariales.</p>
          <ul className="service-list">
            <li>Inmuebles, automotores y arrendamientos</li>
            <li>Poderes y certificaciones de firmas</li>
            <li>Hipotecas y garantías</li>
            <li>Sociedades y contratos sociales</li>
            <li>Testamentos y capitulaciones</li>
            <li>Certificados, trámites y administración de propiedades</li>
          </ul>
        </section>
        <div className="navy-band">
        <section id="gestiones" className="content-section section-inner reveal">
          <p className="eyebrow">Gestiones</p>
          <h2>Tus trámites, con acompañamiento</h2>
          <p>Trámites ante organismos públicos e instituciones privadas en Florida y Montevideo.</p>
          <ul className="service-list">
            <li>Documentos ante DGR y procuración de expedientes</li>
            <li>Partidas, legalizaciones y apostillas</li>
            <li>Gestiones públicas y privadas y rúbricas de libros societarios</li>
          </ul>
        </section>
        </div>
        <div className="contact-band">
        <section id="contacto" className="content-section section-inner reveal">
          <p className="eyebrow">Contacto</p>
          <h2>Contactá al estudio</h2>
          <p>Atención presencial en Montevideo y consultas online en todo el país.</p>
          <div className="professional-grid">{profesionales.map(({ nombre, whatsapp }) => (
            <article className="professional-card" key={nombre}>
              <h3>{nombre}</h3>
              <a className="button professional-contact" href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label={`Contactar por WhatsApp a ${nombre}`}>
                <FontAwesomeIcon icon={faWhatsapp} /> Contactar por WhatsApp
              </a>
            </article>
          ))}</div>
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
            null
          )}
        </section>
        </div>
      </main>
      <footer className="site-footer section-inner">
        <p className="footer-info">
          <strong>Estudio Corrales Pérez</strong>
          <span>Jurídico · Notarial · Gestiones</span>
          <span>Montevideo · Atención presencial y online</span>
        </p>
        <p className="footer-credit">
          © {new Date().getFullYear()} · Diseño y desarrollo · <a href="https://www.jrcweb.tech/" target="_blank" rel="noopener noreferrer">JRC</a>
        </p>
        <a className="footer-top" href="#inicio">Volver al inicio ↑</a>
      </footer>
    </>
  );
}
