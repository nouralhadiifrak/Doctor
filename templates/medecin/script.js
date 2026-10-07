/* ==========================================================================
   Cabinet médical, one-page template renderer
   Reads window.SITE (config.js), fills every section, and hides any section
   or block whose data is empty. No framework, no build step.
   ========================================================================== */
(function () {
  "use strict";

  var SITE = window.SITE || {};
  var doc = document;
  doc.documentElement.classList.add("js");

  /* ------------------------------------------------------------------------
     Icons: outline set from Tabler Icons (MIT, tabler.io/icons), inlined so
     the site works offline and from file://. Use these names in config.js.
     ------------------------------------------------------------------------ */
  var ICONS = {
    "stethoscope": '<path d="M6 4h-1a2 2 0 0 0 -2 2v3.5a5.5 5.5 0 0 0 11 0v-3.5a2 2 0 0 0 -2 -2h-1"/><path d="M8 15a6 6 0 1 0 12 0v-3"/><path d="M11 3v2"/><path d="M6 3v2"/><path d="M18 10a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>',
    "heart-rate-monitor": '<path d="M3 5a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1l0 -10"/><path d="M7 20h10"/><path d="M9 16v4"/><path d="M15 16v4"/><path d="M7 10h2l2 3l2 -6l1 3h3"/>',
    "vaccine": '<path d="M17 3l4 4"/><path d="M19 5l-4.5 4.5"/><path d="M11.5 6.5l6 6"/><path d="M16.5 11.5l-6.5 6.5h-4v-4l6.5 -6.5"/><path d="M7.5 12.5l1.5 1.5"/><path d="M10.5 9.5l1.5 1.5"/><path d="M3 21l3 -3"/>',
    "baby-carriage": '<path d="M6 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="M16 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="M2 5h2.5l1.632 4.897a6 6 0 0 0 5.693 4.103h2.675a5.5 5.5 0 0 0 0 -11h-.5v6"/><path d="M6 9h14"/><path d="M9 17l1 -3"/><path d="M16 14l1 3"/>',
    "clipboard-heart": '<path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"/><path d="M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2"/><path d="M11.993 16.75l2.747 -2.815a1.9 1.9 0 0 0 0 -2.632a1.775 1.775 0 0 0 -2.56 0l-.183 .188l-.183 -.189a1.775 1.775 0 0 0 -2.56 0a1.899 1.899 0 0 0 0 2.632l2.738 2.825l.001 -.009"/>',
    "activity-heartbeat": '<path d="M3 12h4.5l1.5 -6l4 12l2 -9l1.5 3h4.5"/>',
    "home-heart": '<path d="M21 12l-9 -9l-9 9h2v7a2 2 0 0 0 2 2h6"/><path d="M9 21v-6a2 2 0 0 1 2 -2h2c.39 0 .754 .112 1.061 .304"/><path d="M19 21.5l2.518 -2.58a1.74 1.74 0 0 0 0 -2.413a1.627 1.627 0 0 0 -2.346 0l-.168 .172l-.168 -.172a1.627 1.627 0 0 0 -2.346 0a1.74 1.74 0 0 0 0 2.412l2.51 2.59l0 -.009"/>',
    "file-certificate": '<path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M5 8v-3a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-5"/><path d="M3 14a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/><path d="M4.5 17l-1.5 5l3 -1.5l3 1.5l-1.5 -5"/>',
    "report-medical": '<path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"/><path d="M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2"/><path d="M10 14l4 0"/><path d="M12 12l0 4"/>',
    "lungs": '<path d="M6.081 20c1.612 0 2.919 -1.335 2.919 -2.98v-9.763c0 -.694 -.552 -1.257 -1.232 -1.257c-.205 0 -.405 .052 -.584 .15l-.13 .083c-1.46 1.059 -2.432 2.647 -3.404 5.824c-.42 1.37 -.636 2.962 -.648 4.775c-.012 1.675 1.261 3.054 2.877 3.161l.203 .007"/><path d="M17.92 20c-1.613 0 -2.92 -1.335 -2.92 -2.98v-9.763c0 -.694 .552 -1.257 1.233 -1.257c.204 0 .405 .052 .584 .15l.13 .083c1.46 1.059 2.432 2.647 3.405 5.824c.42 1.37 .636 2.962 .648 4.775c.012 1.675 -1.261 3.054 -2.878 3.161l-.202 .007"/><path d="M9 12a3 3 0 0 0 3 -3a3 3 0 0 0 3 3"/><path d="M12 4v5"/>',
    "first-aid-kit": '<path d="M8 8v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2"/><path d="M4 10a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -8"/><path d="M10 14h4"/><path d="M12 12v4"/>',
    "thermometer": '<path d="M19 5a2.828 2.828 0 0 1 0 4l-8 8h-4v-4l8 -8a2.828 2.828 0 0 1 4 0"/><path d="M16 7l-1.5 -1.5"/><path d="M13 10l-1.5 -1.5"/><path d="M10 13l-1.5 -1.5"/><path d="M7 17l-3 3"/>',
    "microscope": '<path d="M5 21h14"/><path d="M6 18h2"/><path d="M7 18v3"/><path d="M9 11l3 3l6 -6l-3 -3l-6 6"/><path d="M10.5 12.5l-1.5 1.5"/><path d="M17 3l3 3"/><path d="M12 21a6 6 0 0 0 3.715 -10.712"/>',
    "scale": '<path d="M7 20l10 0"/><path d="M6 6l6 -1l6 1"/><path d="M12 3l0 17"/><path d="M9 12l-3 -6l-3 6a3 3 0 0 0 6 0"/><path d="M21 12l-3 -6l-3 6a3 3 0 0 0 6 0"/>',
    "wheelchair": '<path d="M3 16a5 5 0 1 0 10 0a5 5 0 1 0 -10 0"/><path d="M17 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="M19 17a3 3 0 0 0 -3 -3h-3.4"/><path d="M3 3h1a2 2 0 0 1 2 2v6"/><path d="M6 8h11"/><path d="M15 8v6"/>',
    "building-hospital": '<path d="M3 21l18 0"/><path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16"/><path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4"/><path d="M10 9l4 0"/><path d="M12 7l0 4"/>',
    "phone": '<path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"/>',
    "brand-whatsapp": '<path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"/><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1"/>',
    "map-pin": '<path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"/><path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0"/>',
    "clock": '<path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"/><path d="M12 7v5l3 3"/>',
    "star": '<path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873l-6.158 -3.245"/>',
    "calendar-event": '<path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12"/><path d="M16 3l0 4"/><path d="M8 3l0 4"/><path d="M4 11l16 0"/><path d="M8 15h2v2h-2l0 -2"/>',
    "route": '<path d="M3 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/><path d="M19 7a2 2 0 1 0 0 -4a2 2 0 0 0 0 4"/><path d="M11 19h5.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h4.5"/>',
    "car": '<path d="M5 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="M15 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5"/>',
    "parking": '<path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14"/><path d="M10 16v-8h2.667c.736 0 1.333 .895 1.333 2s-.597 2 -1.333 2h-2.667"/>',
    "language": '<path d="M9 6.371c0 4.418 -2.239 6.629 -5 6.629"/><path d="M4 6.371h7"/><path d="M5 9c0 2.144 2.252 3.908 6 4"/><path d="M12 20l4 -9l4 9"/><path d="M19.1 18h-6.2"/><path d="M6.694 3l.793 .582"/>',
    "plus": '<path d="M12 5l0 14"/><path d="M5 12l14 0"/>',
    "menu-2": '<path d="M4 6l16 0"/><path d="M4 12l16 0"/><path d="M4 18l16 0"/>',
    "x": '<path d="M18 6l-12 12"/><path d="M6 6l12 12"/>',
    "arrow-up-right": '<path d="M17 7l-10 10"/><path d="M8 7l9 0l0 9"/>',
    "external-link": '<path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6"/><path d="M11 13l9 -9"/><path d="M15 4h5v5"/>',
    "check": '<path d="M5 12l5 5l10 -10"/>',
    "chevron-down": '<path d="M6 9l6 6l6 -6"/>',
    "alert-triangle": '<path d="M12 9v4"/><path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0"/><path d="M12 16h.01"/>'
  };

  function icon(name) {
    var body = ICONS[name] || ICONS["stethoscope"];
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + body + "</svg>";
  }

  /* ------------------------------------------------------------------------
     Helpers
     ------------------------------------------------------------------------ */
  function $(sel, root) { return (root || doc).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || doc).querySelectorAll(sel)); }

  function isEmpty(v) {
    if (v === null || v === undefined || v === false) return true;
    if (typeof v === "string") return v.trim() === "";
    if (Array.isArray(v)) return v.filter(function (x) { return !isEmpty(x); }).length === 0;
    if (typeof v === "object") return Object.keys(v).every(function (k) { return isEmpty(v[k]); });
    return false;
  }
  function list(v) { return Array.isArray(v) ? v.filter(function (x) { return !isEmpty(x); }) : []; }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function initials(name) {
    var clean = String(name || "").replace(/^(dr|docteur|pr|professeur)\.?\s+/i, "");
    var parts = clean.split(/\s+/).filter(Boolean);
    if (!parts.length) return "";
    var first = parts[0].charAt(0);
    var last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
    return (first + last).toUpperCase();
  }

  function digits(s) { return String(s || "").replace(/[^\d+]/g, ""); }

  function show(el, visible) { if (el) el.hidden = !visible; }

  function setText(key, value) {
    $$('[data-bind="' + key + '"]').forEach(function (el) { el.textContent = value || ""; });
  }

  /* Image with designed fallback: the placeholder stays until the file loads. */
  function mountImage(container, src, alt, placeholderHtml) {
    container.innerHTML = '<div class="placeholder" aria-hidden="true">' + (placeholderHtml || "") + "</div>";
    if (isEmpty(src)) return;
    var img = new Image();
    img.decoding = "async";
    img.alt = alt || "";
    img.onload = function () { container.innerHTML = ""; container.appendChild(img); };
    img.src = src;
  }

  /* ------------------------------------------------------------------------
     Data shortcuts
     ------------------------------------------------------------------------ */
  var id = SITE.identity || {};
  var theme = SITE.theme || {};
  var doctor = SITE.doctor || {};
  var cabinet = SITE.cabinet || {};
  var practical = SITE.practical || {};
  var booking = SITE.booking || {};
  var google = SITE.google || {};
  var seo = SITE.seo || {};
  var legal = SITE.legal || {};

  /* ------------------------------------------------------------------------
     Links (booking behaviour)
     ------------------------------------------------------------------------ */
  var telHref = booking.phone ? "tel:" + digits(booking.phone) : "";
  var waNumber = String(booking.whatsapp || "").replace(/\D/g, "");
  var waHref = waNumber
    ? "https://wa.me/" + waNumber + (booking.whatsappMessage ? "?text=" + encodeURIComponent(booking.whatsappMessage) : "")
    : "";
  var externalHref = booking.externalBookingUrl || "";
  var bookHref = waHref || externalHref || telHref;
  var directionsHref = practical.mapsLink || (practical.address
    ? "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(practical.address)
    : "");

  function wireActions() {
    var map = { book: bookHref, call: telHref, whatsapp: waHref, directions: directionsHref };
    $$("[data-action]").forEach(function (el) {
      var href = map[el.getAttribute("data-action")];
      if (href) {
        el.setAttribute("href", href);
        if (href.indexOf("tel:") === 0) { el.removeAttribute("target"); el.removeAttribute("rel"); }
      } else {
        el.hidden = true;
      }
    });
    var bar = $("[data-action-bar]");
    if (bar) {
      var visible = $$("a", bar).filter(function (a) { return !a.hidden; }).length;
      if (visible === 0) { bar.hidden = true; doc.body.style.setProperty("--bar-h", "0px"); }
      if (visible === 1) bar.setAttribute("data-single", "");
    }
  }

  /* ------------------------------------------------------------------------
     Opening hours (computed in Casablanca time, whatever the visitor's zone)
     ------------------------------------------------------------------------ */
  var DAYS = [
    { key: "lundi", label: "Lundi", short: "Lun" },
    { key: "mardi", label: "Mardi", short: "Mar" },
    { key: "mercredi", label: "Mercredi", short: "Mer" },
    { key: "jeudi", label: "Jeudi", short: "Jeu" },
    { key: "vendredi", label: "Vendredi", short: "Ven" },
    { key: "samedi", label: "Samedi", short: "Sam" },
    { key: "dimanche", label: "Dimanche", short: "Dim" }
  ];
  var TZ = SITE.timezone || "Africa/Casablanca";

  /* "09:00-13:00, 15:00-19:00" or ["09:00-13:00", ...] → [{from, to}] in minutes */
  function parseRanges(value) {
    var raw = Array.isArray(value) ? value : String(value || "").split(/[,;]/);
    return raw.map(function (r) {
      var m = String(r).match(/(\d{1,2})[:hH](\d{2})\s*[-–à]+\s*(\d{1,2})[:hH](\d{2})/);
      if (!m) return null;
      return { from: +m[1] * 60 + +m[2], to: +m[3] * 60 + +m[4] };
    }).filter(Boolean);
  }
  function fmt(min) {
    var h = Math.floor(min / 60), m = min % 60;
    return (h < 10 ? "0" : "") + h + "h" + (m < 10 ? "0" : "") + m;
  }
  function fmtRanges(ranges) {
    return ranges.map(function (r) { return fmt(r.from) + " - " + fmt(r.to); }).join(", ");
  }
  function hoursFor(i) { return parseRanges((practical.hours || {})[DAYS[i].key]); }
  function hasHours() { return DAYS.some(function (d, i) { return hoursFor(i).length; }); }

  function nowInCasablanca() {
    var d = new Date();
    try {
      var parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: TZ, weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23"
      }).formatToParts(d);
      var o = {};
      parts.forEach(function (p) { o[p.type] = p.value; });
      var idx = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(o.weekday);
      if (idx >= 0) return { day: idx, min: (+o.hour % 24) * 60 + +o.minute };
    } catch (e) { /* old browser: fall back to local time */ }
    return { day: (d.getDay() + 6) % 7, min: d.getHours() * 60 + d.getMinutes() };
  }

  function openState() {
    var now = nowInCasablanca();
    var today = hoursFor(now.day);
    for (var i = 0; i < today.length; i++) {
      if (now.min >= today[i].from && now.min < today[i].to) {
        return { open: true, detail: "jusqu'à " + fmt(today[i].to), day: now.day };
      }
    }
    var later = today.filter(function (r) { return r.from > now.min; })[0];
    if (later) return { open: false, detail: "réouvre à " + fmt(later.from), day: now.day };
    for (var k = 1; k <= 7; k++) {
      var di = (now.day + k) % 7, next = hoursFor(di);
      if (next.length) {
        var when = k === 1 ? "demain" : DAYS[di].label.toLowerCase();
        return { open: false, detail: "réouvre " + when + " à " + fmt(next[0].from), day: now.day };
      }
    }
    return { open: false, detail: "", day: now.day };
  }

  /* Groups consecutive days with identical hours: "Lun - Ven : 09h00 - 13h00" */
  function hoursSummary() {
    var groups = [];
    DAYS.forEach(function (d, i) {
      var txt = fmtRanges(hoursFor(i));
      var last = groups[groups.length - 1];
      if (last && last.txt === txt) last.end = i;
      else groups.push({ start: i, end: i, txt: txt });
    });
    return groups.filter(function (g) { return g.txt; }).map(function (g) {
      var days = g.start === g.end ? DAYS[g.start].short : DAYS[g.start].short + " - " + DAYS[g.end].short;
      return days + " : " + g.txt;
    }).join("\n");
  }

  /* ------------------------------------------------------------------------
     Sections
     ------------------------------------------------------------------------ */
  function renderHead() {
    doc.documentElement.style.setProperty("--primary", theme.primaryColor || "");
    doc.documentElement.style.setProperty("--accent", theme.accentColor || "");
    if (!theme.primaryColor) doc.documentElement.style.removeProperty("--primary");
    if (!theme.accentColor) doc.documentElement.style.removeProperty("--accent");

    var title = seo.title || [id.doctorName, id.title, id.neighborhood, id.city].filter(Boolean).join(", ");
    if (title) doc.title = title;
    var desc = $('meta[name="description"]');
    if (desc) desc.setAttribute("content", seo.description || SITE.intro || "");
    var kw = $('meta[name="keywords"]');
    if (kw) kw.setAttribute("content", list(seo.keywords).join(", "));

    // Structured data for search engines (schema.org Physician)
    var ld = {
      "@context": "https://schema.org",
      "@type": "Physician",
      name: id.cabinetName || id.doctorName,
      description: seo.description || SITE.intro,
      telephone: booking.phone || undefined,
      medicalSpecialty: id.title || undefined,
      address: practical.address ? {
        "@type": "PostalAddress",
        streetAddress: practical.address,
        addressLocality: id.city || undefined,
        addressCountry: "MA"
      } : undefined,
      openingHours: DAYS.map(function (d, i) {
        return hoursFor(i).map(function (r) {
          return d.short.slice(0, 2) + " " + fmt(r.from).replace("h", ":") + "-" + fmt(r.to).replace("h", ":");
        });
      }).reduce(function (a, b) { return a.concat(b); }, [])
    };
    var s = doc.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(ld);
    doc.head.appendChild(s);
  }

  function renderHeader() {
    setText("cabinetName", id.cabinetName || id.doctorName);
    setText("brandMark", initials(id.cabinetName || id.doctorName));
  }

  function renderHero() {
    setText("doctorName", id.doctorName);
    var place = [id.neighborhood, id.city].filter(Boolean).join(", ");
    setText("heroEyebrow", [id.title, place].filter(Boolean).join(" · "));
    setText("intro", SITE.intro);
    show($('[data-bind="intro"]'), !isEmpty(SITE.intro));
    show($('[data-bind="heroEyebrow"]'), !!(id.title || place));

    var portrait = $("[data-portrait]");
    var ini = initials(id.doctorName);
    mountImage(portrait, doctor.photo, "Portrait de " + (id.doctorName || "du médecin"),
      ini ? '<span class="placeholder-initials">' + esc(ini) + "</span>" : "");

    renderFacts();
  }

  function renderFacts() {
    var facts = [];
    if (hasHours()) {
      var st = openState();
      var today = hoursFor(st.day);
      facts.push({
        icon: "clock",
        label: "Aujourd'hui",
        value: today.length ? fmtRanges(today) : "Cabinet fermé",
        cls: today.length ? "" : "fact-closed"
      });
    }
    if (id.neighborhood) {
      facts.push({ icon: "map-pin", label: "Quartier", value: id.neighborhood + (id.city ? ", " + id.city : "") });
    }
    if (!isEmpty(google.rating)) {
      var rating = String(google.rating).replace(".", ",");
      var count = google.reviewCount ? " (" + google.reviewCount + " avis)" : "";
      var val = rating + " / 5" + count;
      facts.push({
        icon: "star",
        label: "Note Google",
        value: google.reviewsLink
          ? '<a href="' + esc(google.reviewsLink) + '" target="_blank" rel="noopener">' + esc(val) + "</a>"
          : esc(val),
        html: true
      });
    }
    var el = $("[data-facts]");
    el.style.setProperty("--facts", facts.length || 1);
    el.innerHTML = facts.map(function (f) {
      return '<div class="fact"><span class="icon">' + icon(f.icon) + "</span><div><dt>" + esc(f.label) +
        '</dt><dd class="' + (f.cls || "") + '">' + (f.html ? f.value : esc(f.value)) + "</dd></div></div>";
    }).join("");
    show(el, facts.length > 0);
  }

  function renderConsultations() {
    var items = list(SITE.consultations);
    $("[data-consultations]").innerHTML = items.map(function (c) {
      return '<li class="consult-item reveal">' +
        '<span class="consult-icon"><span class="icon">' + icon(c.icon) + "</span></span>" +
        "<h3>" + esc(c.title) + "</h3>" +
        (c.description ? "<p>" + esc(c.description) + "</p>" : "") +
        "</li>";
    }).join("");
    return items.length > 0;
  }

  function renderDoctor() {
    var bio = Array.isArray(doctor.bio) ? list(doctor.bio) : (doctor.bio ? String(doctor.bio).split(/\n\s*\n/) : []);
    $("[data-bio]").innerHTML = bio.map(function (p) { return "<p>" + esc(p.trim()) + "</p>"; }).join("");
    show($("[data-bio]"), bio.length > 0);

    var meta = [];
    if (!isEmpty(doctor.yearsOfExperience)) {
      var n = parseInt(doctor.yearsOfExperience, 10);
      meta.push("<div><dt>Expérience</dt><dd class=\"meta-number\">" + esc(isNaN(n) ? doctor.yearsOfExperience : n) +
        "<small>" + (n === 1 ? "année d'exercice" : "années d'exercice") + "</small></dd></div>");
    }
    var langs = list(doctor.languages);
    if (langs.length) {
      meta.push("<div><dt>Langues parlées</dt><dd><ul class=\"chips\">" +
        langs.map(function (l) { return "<li>" + esc(l) + "</li>"; }).join("") + "</ul></dd></div>");
    }
    var metaEl = $("[data-doctor-meta]");
    metaEl.innerHTML = meta.join("");
    show(metaEl, meta.length > 0);

    var quals = list(doctor.qualifications);
    $("[data-qualifications]").innerHTML = quals.map(function (q) {
      if (typeof q === "string") q = { title: q };
      return "<li>" +
        (q.year ? '<span class="timeline-year">' + esc(q.year) + "</span>" : "") +
        '<span class="timeline-title">' + esc(q.title) + "</span>" +
        (q.place ? '<span class="timeline-place">' + esc(q.place) + "</span>" : "") +
        "</li>";
    }).join("");
    show($("[data-qualifications-wrap]"), quals.length > 0);
    if (!quals.length) $(".doctor-grid").style.gridTemplateColumns = "1fr";

    return bio.length > 0 || meta.length > 0 || quals.length > 0;
  }

  function renderCabinet() {
    var photos = list(cabinet.photos).map(function (p) { return typeof p === "string" ? { src: p } : p; });
    var gallery = $("[data-gallery]");
    gallery.setAttribute("data-count", Math.min(photos.length, 5));
    gallery.innerHTML = "";
    var icons = ["building-hospital", "stethoscope", "heart-rate-monitor", "first-aid-kit", "clipboard-heart"];
    photos.slice(0, 5).forEach(function (p, i) {
      var fig = doc.createElement("figure");
      fig.className = "gallery-item";
      gallery.appendChild(fig);
      var blocks = i === 0
        ? '<span class="placeholder-block" style="left:12%;top:18%;width:34%;height:46%"></span>' +
          '<span class="placeholder-block" style="left:52%;top:30%;width:30%;height:34%;opacity:.6"></span>'
        : '<span class="placeholder-block" style="left:16%;top:24%;width:44%;height:40%;opacity:.7"></span>';
      mountImage(fig, p.src, p.alt || ("Photo du cabinet " + (i + 1)),
        blocks + '<span class="placeholder-icon">' + icon(icons[i % icons.length]) + "</span>");
    });
    show(gallery, photos.length > 0);

    var eq = list(cabinet.equipment);
    $("[data-equipment]").innerHTML = eq.map(function (e) {
      return '<li><span class="icon">' + icon("check") + "</span><span>" + esc(e) + "</span></li>";
    }).join("");
    show($("[data-equipment-wrap]"), eq.length > 0);
    if (!photos.length || !eq.length) $(".cabinet-layout").style.gridTemplateColumns = "1fr";

    return photos.length > 0 || eq.length > 0;
  }

  function renderHours() {
    var wrap = $("[data-hours-wrap]");
    if (!hasHours()) { show(wrap, false); return false; }
    var st = openState();
    $("[data-hours]").innerHTML = DAYS.map(function (d, i) {
      var r = hoursFor(i);
      var isToday = i === st.day;
      return '<tr class="' + (isToday ? "is-today" : "") + (r.length ? "" : " is-closed-day") + '"' +
        (isToday ? ' aria-current="date"' : "") + ">" +
        '<th scope="row">' + d.label + (isToday ? '<span class="today-tag">Aujourd\'hui</span>' : "") + "</th>" +
        "<td>" + (r.length ? fmtRanges(r) : "Fermé") + "</td></tr>";
    }).join("");

    var status = $("[data-status]");
    status.className = "status " + (st.open ? "is-open" : "is-closed");
    status.innerHTML = (st.open ? "Ouvert" : "Fermé") +
      (st.detail ? ' <span class="status-detail">' + esc(st.detail) + "</span>" : "");
    return true;
  }

  function renderPractical() {
    var hours = renderHours();

    var rows = [];
    function row(ic, label, value) {
      if (isEmpty(value) || value === true) return;
      rows.push('<div class="info-row"><span class="info-icon"><span class="icon">' + icon(ic) +
        "</span></span><div><dt>" + esc(label) + "</dt><dd>" + esc(value) + "</dd></div></div>");
    }
    row("map-pin", "Adresse", practical.address);
    row("route", "Accès", practical.access);
    row("parking", "Stationnement", practical.parking);
    row("home-heart", "Visites à domicile", practical.homeVisits);
    $("[data-info-list]").innerHTML = rows.join("");
    show($("[data-info-list]"), rows.length > 0);

    var mapEl = $("[data-map]");
    if (practical.mapsEmbedUrl) {
      mapEl.innerHTML = '<iframe src="' + esc(practical.mapsEmbedUrl) + '" loading="lazy" ' +
        'referrerpolicy="no-referrer-when-downgrade" allowfullscreen ' +
        'title="Plan d\'accès au cabinet"></iframe>';
    }
    show(mapEl, !!practical.mapsEmbedUrl);
    show($(".infos-side"), !!(practical.mapsEmbedUrl || directionsHref));
    if (!practical.mapsEmbedUrl && !directionsHref) $(".infos-grid").style.gridTemplateColumns = "1fr";

    var ins = list(SITE.insurance);
    $("[data-insurance]").innerHTML = ins.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("");
    show($("[data-insurance-wrap]"), ins.length > 0);

    return hours || rows.length > 0 || !!practical.mapsEmbedUrl || ins.length > 0;
  }

  function renderFaq() {
    var items = list(SITE.faq).filter(function (f) { return f.question && f.answer; });
    var root = $("[data-faq]");
    root.innerHTML = items.map(function (f, i) {
      var b = "faq-btn-" + i, p = "faq-panel-" + i;
      return '<div class="acc-item">' +
        '<h3><button class="acc-trigger" type="button" id="' + b + '" aria-expanded="false" aria-controls="' + p + '">' +
        "<span>" + esc(f.question) + '</span><span class="acc-sign"><span class="icon">' + icon("plus") + "</span></span>" +
        "</button></h3>" +
        '<div class="acc-panel" id="' + p + '" role="region" aria-labelledby="' + b + '" inert>' +
        "<div><p>" + esc(f.answer) + "</p></div></div></div>";
    }).join("");

    $$(".acc-trigger", root).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.closest(".acc-item");
        var panel = doc.getElementById(btn.getAttribute("aria-controls"));
        var open = btn.getAttribute("aria-expanded") !== "true";
        btn.setAttribute("aria-expanded", String(open));
        item.classList.toggle("is-open", open);
        if (open) panel.removeAttribute("inert"); else panel.setAttribute("inert", "");
      });
    });
    return items.length > 0;
  }

  function renderContact() {
    var cards = [];
    if (telHref) cards.push({ href: telHref, icon: "phone", label: "Téléphone", value: booking.phone, hint: "Appeler" });
    if (waHref) cards.push({
      href: waHref, icon: "brand-whatsapp", label: "WhatsApp",
      value: booking.whatsappDisplay || booking.phone || "+" + waNumber, hint: "Écrire un message", ext: true
    });
    if (practical.address) cards.push({
      href: directionsHref, icon: "map-pin", label: "Adresse", value: practical.address, hint: "Voir l'itinéraire", ext: true
    });
    if (externalHref) cards.push({
      href: externalHref, icon: "calendar-event", label: "Rendez-vous en ligne",
      value: booking.externalBookingLabel || "Réserver un créneau", hint: "Ouvrir la page", ext: true
    });

    var el = $("[data-contact]");
    el.style.setProperty("--cols", Math.max(1, Math.min(cards.length, 4)));
    el.innerHTML = cards.map(function (c) {
      var tag = c.href ? "a" : "div";
      var attrs = c.href ? ' href="' + esc(c.href) + '"' + (c.ext ? ' target="_blank" rel="noopener"' : "") : "";
      return "<li><" + tag + ' class="contact-card"' + attrs + ">" +
        '<span class="icon">' + icon(c.icon) + "</span>" +
        '<span class="contact-label">' + esc(c.label) + "</span>" +
        '<span class="contact-value">' + esc(c.value) + "</span>" +
        (c.href ? '<span class="contact-hint">' + esc(c.hint) + ' <span class="icon">' + icon("arrow-up-right") + "</span></span>" : "") +
        "</" + tag + "></li>";
    }).join("");
    return cards.length > 0;
  }

  function renderFooter() {
    setText("address", practical.address);
    show($('.site-footer [data-bind="address"]'), !!practical.address);
    var summary = hoursSummary();
    var fh = $("[data-footer-hours]");
    fh.textContent = summary;
    show(fh, !!summary);

    setText("disclaimer", legal.disclaimer);
    show($('[data-bind="disclaimer"]'), !!legal.disclaimer);
    setText("emergency", legal.emergency);
    show($("[data-emergency]"), !!legal.emergency);

    var name = id.cabinetName || id.doctorName || "";
    $("[data-copyright]").textContent = "© " + new Date().getFullYear() + (name ? " " + name : "");
  }

  /* Hide a section and its nav link when it has no content. */
  function section(name, hasContent) {
    var s = $('[data-section="' + name + '"]');
    show(s, hasContent);
    $$('[data-nav-for="' + name + '"]').forEach(function (a) { show(a.parentElement, hasContent); });
  }

  /* ------------------------------------------------------------------------
     Behaviour
     ------------------------------------------------------------------------ */
  function setupIcons() {
    $$("[data-icon]").forEach(function (el) { el.innerHTML = icon(el.getAttribute("data-icon")); });
  }

  function setupMenu() {
    var btn = $("[data-menu-toggle]");
    var nav = $("[data-nav]");
    var label = $("[data-menu-label]");
    var glyph = $(".icon", btn);
    function set(open) {
      btn.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      label.textContent = open ? "Fermer le menu" : "Ouvrir le menu";
      glyph.innerHTML = icon(open ? "x" : "menu-2");
    }
    btn.addEventListener("click", function () { set(btn.getAttribute("aria-expanded") !== "true"); });
    $$("a", nav).forEach(function (a) { a.addEventListener("click", function () { set(false); }); });
    doc.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") { set(false); btn.focus(); }
    });
    window.matchMedia("(min-width: 1080px)").addEventListener("change", function () { set(false); });
  }

  function setupHeaderState() {
    var header = $("[data-header]");
    var sentinel = $(".top-sentinel");
    if (!("IntersectionObserver" in window) || !sentinel) return;
    new IntersectionObserver(function (entries) {
      header.classList.toggle("is-scrolled", !entries[0].isIntersecting);
    }).observe(sentinel);
  }

  function setupReveal() {
    var els = $$(".reveal");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (el, i) {
      if (el.classList.contains("consult-item")) el.style.transitionDelay = (i % 3) * 70 + "ms";
      io.observe(el);
    });
  }

  /* ------------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------------ */
  function init() {
    renderHead();
    setupIcons();
    renderHeader();
    renderHero();
    section("consultations", renderConsultations());
    section("medecin", renderDoctor());
    section("cabinet", renderCabinet());
    section("infos", renderPractical());
    section("faq", renderFaq());
    section("contact", renderContact());
    renderFooter();
    wireActions();
    setupMenu();
    setupHeaderState();
    setupReveal();

    // Keep "Ouvert / Fermé" and today's hours accurate while the page stays open.
    setInterval(function () { renderHours(); renderFacts(); }, 60 * 1000);
  }

  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", init);
  else init();
})();
