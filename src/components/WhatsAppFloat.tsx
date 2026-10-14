import type { Dictionary } from "@/i18n/dictionaries";
import { whatsappUrl } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";

/** Floating WhatsApp button, kept above the mobile Call / Book bar. */
export function WhatsAppFloat({ dict }: { dict: Dictionary["nav"] }) {
  return (
    <a
      href={whatsappUrl(dict.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dict.whatsapp}
      title={dict.whatsapp}
      className="group fixed bottom-24 end-4 z-40 grid size-14 place-items-center rounded-full bg-[#25d366] text-[1.75rem] text-white shadow-xl shadow-black/25 transition hover:scale-105 hover:bg-[#1ebe5b] lg:bottom-6 lg:end-6"
    >
      <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-[#25d366] opacity-30 [animation-duration:2.5s]" />
      <WhatsAppIcon className="relative" />
    </a>
  );
}
