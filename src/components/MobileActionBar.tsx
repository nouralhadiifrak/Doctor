import type { Dictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";
import { CalendarIcon, PhoneIcon } from "./Icons";
import { BrandButton } from "./BrandButton";

/** Sticky call / book actions on small screens. */
export function MobileActionBar({ dict }: { dict: Dictionary["nav"] }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        <BrandButton variant="outline" href={`tel:${site.phones.office.tel}`} icon={<PhoneIcon />} className="!py-3">
          {dict.call}
        </BrandButton>
        <BrandButton href="#booking" icon={<CalendarIcon />} className="!py-3">
          {dict.booking}
        </BrandButton>
      </div>
    </div>
  );
}
