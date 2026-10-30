import type { Locale } from "./config";

const en = {
  nav: {
    boat: "The boat",
    availability: "Availability",
    where: "Where we sail",
    contact: "Contact",
    book: "Book",
    whatsapp: "WhatsApp",
    area: "Malta & around",
  },
  hero: {
    eyebrow: "Malta · Comino · Gozo",
    titleLine1: "Sail the most beautiful",
    titleLine2: "bays of Malta",
    subtitle:
      "A full day of sailing between the Blue Lagoon, wild coastlines and open-sea sunsets. Food prepared on board, skipper included.",
    cta: "SEE AVAILABILITY",
    photoLabel:
      "Add the main photo here: public/images/hero.png (sailing boat / Malta sea, landscape, high resolution)",
    infoDuration: "Duration",
    infoDurationValue: "Half or full day",
    infoPeople: "People",
    infoPeopleValue: "Up to 8",
    infoPrice: "Price",
    infoPriceValue: "From €50 to €80/hour",
    infoCta: "See availability",
  },
  boat: {
    eyebrow: "Our boat",
    title: "A sailing boat ready for your days at sea",
    photos: [
      "Boat photo - exterior view",
      "Boat photo - under sail",
      "Boat photo - cockpit",
      "Boat photo - on board with guests",
      "Boat photo - cabin / interior",
      "Boat photo - detail",
    ],
  },
  included: {
    eyebrow: "What's included",
    title: "Everything is taken care of, you just enjoy the day",
    subtitle:
      "The price you see is the price you pay: no hidden extras, no surprises at the end of the day.",
    items: [
      {
        titolo: "Experienced skipper",
        testo:
          "You sail with a licensed skipper who knows these waters. No sailing experience needed.",
      },
      {
        titolo: "Food prepared on board",
        testo:
          "Lunch, dinner or aperitivo, cooked fresh on board depending on the time you choose.",
      },
      {
        titolo: "Drinks and water",
        testo: "Cold drinks and drinking water on board throughout the trip.",
      },
      {
        titolo: "Fuel and mooring",
        testo: "Fuel and mooring fees are already included in the price.",
      },
      {
        titolo: "Return to the departure port",
        testo:
          "We bring you back to the port we left from, in the evening or during the day as agreed.",
      },
    ],
  },
  availability: {
    eyebrow: "Book",
    title: "Upcoming available trips",
    error: "Could not load availability. Please try again later.",
    legend: "Days with availability",
    prevMonth: "Previous month",
    nextMonth: "Next month",
    pastDate: "Past date.",
    noSlots: "No trip scheduled for this date.",
    requestWhatsapp: "Request this date on WhatsApp",
    weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    months: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ],
  },
  slot: {
    maxPeople: "max",
    people: "people",
    bookNow: "Book now",
    whatsapp: "WhatsApp",
    unavailable: "Not available",
    types: {
      mattina: "Morning",
      pomeriggio: "Afternoon",
      giornata_intera: "Full day",
    },
  },
  destinations: {
    eyebrow: "Where we sail",
    title: "The most beautiful waters of Malta and around",
    places: [
      {
        nome: "Comino - Blue Lagoon",
        descrizione: "Crystal-clear turquoise water, the most loved spot.",
      },
      {
        nome: "Gozo",
        descrizione: "Wild coastline, coves and sea caves to explore by boat.",
      },
      {
        nome: "Valletta",
        descrizione: "The capital's skyline seen from the sea, at sunset.",
      },
      {
        nome: "Dingli Cliffs",
        descrizione: "Malta's highest cliffs, spectacular from the open sea.",
      },
    ],
  },
  booking: {
    back: "Back to availability",
    unavailable:
      "This trip is no longer available. Go back to the home page to pick another date.",
    errorGeneric: "Please fill in all required fields.",
    errorTaken:
      "This trip has just been booked by someone else. Please pick another date.",
    name: "Full name",
    phone: "Phone",
    email: "Email",
    people: "Number of people",
    notes: "Notes (optional)",
    disclaimer:
      "This is a booking request: no online payment, we will contact you to confirm.",
    submit: "Send booking request",
    thanksTitle: "Request sent!",
    thanksText:
      "We have received your booking request. We will contact you shortly to confirm the date and details.",
    thanksCta: "Back to home",
  },
  footer: {
    tagline:
      "Booking without online payment, the balance is agreed directly with us.",
    whatsapp: "Message us on WhatsApp",
  },
  whatsapp: {
    // I segnaposto {tipo} {data} {orario} vengono sostituiti in lib/format.ts.
    // Devono restare stringhe (non funzioni): il dizionario viene passato
    // dai Server Component ai Client Component e le funzioni non sono serializzabili.
    slotMessage:
      "Hi! I'm interested in the {tipo} sailing trip on {data} ({orario}). Is it still available?",
    dateRequest:
      "Hi! I'd like to book a sailing day on {data}, but I don't see availability on the website. Would it be possible to arrange it?",
  },
};

const it: typeof en = {
  nav: {
    boat: "La barca",
    availability: "Disponibilità",
    where: "Dove navighiamo",
    contact: "Contatti",
    book: "Prenota",
    whatsapp: "WhatsApp",
    area: "Malta e dintorni",
  },
  hero: {
    eyebrow: "Malta · Comino · Gozo",
    titleLine1: "Naviga tra le baie",
    titleLine2: "più belle di Malta",
    subtitle:
      "Una giornata in barca a vela tra Blue Lagoon, coste selvagge e tramonti in mare aperto. Cibo preparato a bordo, skipper incluso.",
    cta: "SCOPRI LE DISPONIBILITÀ",
    photoLabel:
      "Aggiungi qui la foto principale: public/images/hero.png (barca a vela / mare di Malta, orizzontale, alta risoluzione)",
    infoDuration: "Durata",
    infoDurationValue: "Mezza o giornata intera",
    infoPeople: "Persone",
    infoPeopleValue: "Fino a 8",
    infoPrice: "Prezzo",
    infoPriceValue: "Da 50 a 80 €/ora",
    infoCta: "Vedi disponibilità",
  },
  boat: {
    eyebrow: "La nostra barca",
    title: "Una barca a vela pronta per le tue giornate in mare",
    photos: [
      "Foto barca - vista esterna",
      "Foto barca - a vele spiegate",
      "Foto barca - pozzetto",
      "Foto barca - a bordo con ospiti",
      "Foto barca - cabina / interni",
      "Foto barca - dettaglio",
    ],
  },
  included: {
    eyebrow: "Cosa è incluso",
    title: "Pensiamo a tutto noi, tu goditi la giornata",
    subtitle:
      "Il prezzo che vedi è quello che paghi: nessun extra nascosto, nessuna sorpresa a fine giornata.",
    items: [
      {
        titolo: "Skipper esperto",
        testo:
          "Navighi con uno skipper abilitato che conosce queste acque. Non serve alcuna esperienza di vela.",
      },
      {
        titolo: "Cibo preparato a bordo",
        testo:
          "Pranzo, cena o aperitivo, cucinati al momento a bordo in base all'orario che scegli.",
      },
      {
        titolo: "Bevande e acqua",
        testo: "Bibite fresche e acqua potabile a bordo per tutta l'uscita.",
      },
      {
        titolo: "Carburante e ormeggio",
        testo: "Carburante e spese di ormeggio sono già compresi nel prezzo.",
      },
      {
        titolo: "Rientro al porto di partenza",
        testo:
          "Ti riportiamo al porto da cui siamo partiti, in serata o in giornata come concordato.",
      },
    ],
  },
  availability: {
    eyebrow: "Prenota",
    title: "Prossime uscite disponibili",
    error: "Errore nel caricamento delle disponibilità. Riprova più tardi.",
    legend: "Giorni con disponibilità",
    prevMonth: "Mese precedente",
    nextMonth: "Mese successivo",
    pastDate: "Data passata.",
    noSlots: "Nessuna uscita programmata per questa data.",
    requestWhatsapp: "Richiedi questa data su WhatsApp",
    weekdays: ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
    months: [
      "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
      "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre",
    ],
  },
  slot: {
    maxPeople: "max",
    people: "persone",
    bookNow: "Prenota ora",
    whatsapp: "WhatsApp",
    unavailable: "Non disponibile",
    types: {
      mattina: "Mattina",
      pomeriggio: "Pomeriggio",
      giornata_intera: "Giornata intera",
    },
  },
  destinations: {
    eyebrow: "Dove navighiamo",
    title: "Le acque più belle di Malta e dintorni",
    places: [
      {
        nome: "Comino - Blue Lagoon",
        descrizione: "Acque cristalline color turchese, la meta più amata.",
      },
      {
        nome: "Gozo",
        descrizione: "Coste selvagge, calette e grotte marine da scoprire in barca.",
      },
      {
        nome: "Valletta",
        descrizione: "Il profilo della capitale visto dal mare, al tramonto.",
      },
      {
        nome: "Dingli Cliffs",
        descrizione: "Le scogliere più alte di Malta, spettacolari dal largo.",
      },
    ],
  },
  booking: {
    back: "Torna alle disponibilità",
    unavailable:
      "Questa uscita non è più disponibile. Torna alla home per scegliere un'altra data.",
    errorGeneric: "Compila tutti i campi obbligatori.",
    errorTaken:
      "Questa uscita è appena stata prenotata da qualcun altro. Scegli un'altra data.",
    name: "Nome e cognome",
    phone: "Telefono",
    email: "Email",
    people: "Numero persone",
    notes: "Note (opzionale)",
    disclaimer:
      "Questa è una richiesta di prenotazione: nessun pagamento online, ti contatteremo per confermare.",
    submit: "Invia richiesta di prenotazione",
    thanksTitle: "Richiesta inviata!",
    thanksText:
      "Abbiamo ricevuto la tua richiesta di prenotazione. Ti contatteremo al più presto per confermare data e dettagli.",
    thanksCta: "Torna alla home",
  },
  footer: {
    tagline:
      "Prenotazione senza pagamento online, il saldo si concorda direttamente con noi.",
    whatsapp: "Scrivici su WhatsApp",
  },
  whatsapp: {
    slotMessage:
      "Ciao! Sono interessato/a alla giornata in barca a vela di {tipo} del {data} ({orario}). È ancora disponibile?",
    dateRequest:
      "Ciao! Vorrei prenotare una giornata in barca a vela per il {data}, ma non vedo disponibilità sul sito. È possibile organizzarla?",
  },
};

const es: typeof en = {
  nav: {
    boat: "El barco",
    availability: "Disponibilidad",
    where: "Dónde navegamos",
    contact: "Contacto",
    book: "Reservar",
    whatsapp: "WhatsApp",
    area: "Malta y alrededores",
  },
  hero: {
    eyebrow: "Malta · Comino · Gozo",
    titleLine1: "Navega por las bahías",
    titleLine2: "más bonitas de Malta",
    subtitle:
      "Un día entero navegando entre la Blue Lagoon, costas salvajes y atardeceres en mar abierto. Comida preparada a bordo, patrón incluido.",
    cta: "VER DISPONIBILIDAD",
    photoLabel:
      "Añade aquí la foto principal: public/images/hero.png (velero / mar de Malta, horizontal, alta resolución)",
    infoDuration: "Duración",
    infoDurationValue: "Medio día o día completo",
    infoPeople: "Personas",
    infoPeopleValue: "Hasta 8",
    infoPrice: "Precio",
    infoPriceValue: "Desde 50 a 80 €/hora",
    infoCta: "Ver disponibilidad",
  },
  boat: {
    eyebrow: "Nuestro barco",
    title: "Un velero listo para tus días en el mar",
    photos: [
      "Foto del barco - vista exterior",
      "Foto del barco - a vela",
      "Foto del barco - bañera",
      "Foto del barco - a bordo con invitados",
      "Foto del barco - camarote / interior",
      "Foto del barco - detalle",
    ],
  },
  included: {
    eyebrow: "Qué incluye",
    title: "Nos ocupamos de todo, tú solo disfruta del día",
    subtitle:
      "El precio que ves es el que pagas: sin extras ocultos ni sorpresas al final del día.",
    items: [
      {
        titolo: "Patrón con experiencia",
        testo:
          "Navegas con un patrón titulado que conoce estas aguas. No hace falta experiencia previa.",
      },
      {
        titolo: "Comida preparada a bordo",
        testo:
          "Comida, cena o aperitivo, cocinados al momento a bordo según el horario que elijas.",
      },
      {
        titolo: "Bebidas y agua",
        testo: "Bebidas frías y agua potable a bordo durante toda la salida.",
      },
      {
        titolo: "Combustible y amarre",
        testo: "El combustible y las tasas de amarre ya están incluidos en el precio.",
      },
      {
        titolo: "Regreso al puerto de salida",
        testo:
          "Te llevamos de vuelta al puerto del que salimos, por la tarde o durante el día según lo acordado.",
      },
    ],
  },
  availability: {
    eyebrow: "Reservar",
    title: "Próximas salidas disponibles",
    error: "No se ha podido cargar la disponibilidad. Inténtalo más tarde.",
    legend: "Días con disponibilidad",
    prevMonth: "Mes anterior",
    nextMonth: "Mes siguiente",
    pastDate: "Fecha pasada.",
    noSlots: "No hay ninguna salida programada para esta fecha.",
    requestWhatsapp: "Solicita esta fecha por WhatsApp",
    weekdays: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
    months: [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
    ],
  },
  slot: {
    maxPeople: "máx",
    people: "personas",
    bookNow: "Reservar ahora",
    whatsapp: "WhatsApp",
    unavailable: "No disponible",
    types: {
      mattina: "Mañana",
      pomeriggio: "Tarde",
      giornata_intera: "Día completo",
    },
  },
  destinations: {
    eyebrow: "Dónde navegamos",
    title: "Las aguas más bonitas de Malta y alrededores",
    places: [
      {
        nome: "Comino - Blue Lagoon",
        descrizione: "Aguas turquesas cristalinas, el sitio más querido.",
      },
      {
        nome: "Gozo",
        descrizione: "Costa salvaje, calas y cuevas marinas para descubrir en barco.",
      },
      {
        nome: "Valletta",
        descrizione: "El perfil de la capital visto desde el mar, al atardecer.",
      },
      {
        nome: "Dingli Cliffs",
        descrizione: "Los acantilados más altos de Malta, espectaculares desde el mar.",
      },
    ],
  },
  booking: {
    back: "Volver a la disponibilidad",
    unavailable:
      "Esta salida ya no está disponible. Vuelve a la página principal para elegir otra fecha.",
    errorGeneric: "Rellena todos los campos obligatorios.",
    errorTaken:
      "Esta salida acaba de ser reservada por otra persona. Elige otra fecha.",
    name: "Nombre y apellidos",
    phone: "Teléfono",
    email: "Email",
    people: "Número de personas",
    notes: "Notas (opcional)",
    disclaimer:
      "Esto es una solicitud de reserva: sin pago online, te contactaremos para confirmar.",
    submit: "Enviar solicitud de reserva",
    thanksTitle: "¡Solicitud enviada!",
    thanksText:
      "Hemos recibido tu solicitud de reserva. Te contactaremos lo antes posible para confirmar la fecha y los detalles.",
    thanksCta: "Volver al inicio",
  },
  footer: {
    tagline:
      "Reserva sin pago online, el importe se acuerda directamente con nosotros.",
    whatsapp: "Escríbenos por WhatsApp",
  },
  whatsapp: {
    // "de {tipo}" si evita: "mañana" significa sia mattina che domani.
    slotMessage:
      "¡Hola! Me interesa la salida en velero del {data} ({orario}) - turno de {tipo}. ¿Sigue disponible?",
    dateRequest:
      "¡Hola! Me gustaría reservar un día en velero para el {data}, pero no veo disponibilidad en la web. ¿Sería posible organizarlo?",
  },
};

const DIZIONARI = { en, it, es };

export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
  return DIZIONARI[locale];
}
