// Datos públicos del estudio. Completá o modificá solamente este archivo.
// Dejá "" en los datos pendientes: la web no mostrará enlaces vacíos.
export const contacto = {
  // Teléfono con código de país. Puede incluir espacios y el signo +.
  telefono: "",

  // Número de WhatsApp con código de país; puede ser distinto del teléfono.
  whatsapp: "",
  mensajeWhatsapp: "Hola, quisiera realizar una consulta.",

  // URL completa del perfil público de Instagram.
  instagram: "",

  email: "",
  direccion: "",
  horarios: "",
};

// Los enlaces se generan automáticamente; no hace falta editarlos.
const digitos = (numero) => numero.replace(/\D/g, "");
const numeroTelefono = digitos(contacto.telefono);
const numeroWhatsapp = digitos(contacto.whatsapp);

export const enlacesContacto = {
  telefono: numeroTelefono ? `tel:+${numeroTelefono}` : null,
  whatsapp: numeroWhatsapp
    ? `https://wa.me/${numeroWhatsapp}${
        contacto.mensajeWhatsapp.trim()
          ? `?text=${encodeURIComponent(contacto.mensajeWhatsapp)}`
          : ""
      }`
    : null,
  instagram: contacto.instagram.trim() || null,
  email: contacto.email.trim() ? `mailto:${contacto.email.trim()}` : null,
};

// Contactos públicos facilitados por el estudio.
export const profesionales = [
  { nombre: "Dra. Alfonsina Corrales Arbelo", telefono: "093 661 833", enlace: "tel:+59893661833", whatsapp: "https://wa.me/59893661833" },
  { nombre: "Dra. Ana Pérez Pérez", telefono: "098 745 630", enlace: "tel:+59898745630", whatsapp: "https://wa.me/59898745630" },
];
