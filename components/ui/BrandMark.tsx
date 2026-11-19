import { siteConfig } from "@/data/siteConfig";

type Props = {
  className?: string;
  /** show the KAVERO wordmark next to the symbol */
  withWordmark?: boolean;
  /** show the tagline under the wordmark */
  withTagline?: boolean;
};

/** Original KAVERO symbol: a constructed "K" whose lower leg carries the accent. */
export function BrandSymbol({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect x="5" y="5" width="4.5" height="22" fill="currentColor" />
      <path d="M12 16 L22.2 5 H27.6 L17.4 16 Z" fill="currentColor" />
      <path d="M12 16 H17.4 L27.6 27 H22.2 Z" fill="#FF6238" />
    </svg>
  );
}

export function BrandMark({ className = "", withWordmark = true, withTagline = false }: Props) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <BrandSymbol className="h-7 w-7 shrink-0 text-bone" />
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.15rem] font-bold tracking-[0.34em] text-bone">
            {siteConfig.name}
          </span>
          {withTagline && (
            <span className="mt-1.5 text-[0.58rem] font-medium tracking-[0.3em] text-silver uppercase">
              Auto Detailing Studio
            </span>
          )}
        </span>
      )}
    </span>
  );
}
