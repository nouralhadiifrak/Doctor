import type { Dictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";
import { CalendarIcon, PhoneIcon } from "./Icons";
import { btn } from "./ui";

/** Sticky call / book actions on small screens. */
export function MobileActionBar({ dict }: { dict: Dictionary["nav"] }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        <a href={`tel:${site.phones.office.tel}`} className={`${btn.base} ${btn.outline} !py-3`}>
          <PhoneIcon className="text-base" /> {dict.call}
        </a>
        <a href="#booking" className={`${btn.base} ${btn.primary} !py-3`}>
          <CalendarIcon className="text-base" /> {dict.booking}
        </a>
      </div>
    </div>
  );
}
