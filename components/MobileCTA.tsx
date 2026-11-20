import { ButtonLink } from "@/components/ui/Button";
import "./MobileCTA.css";

export function MobileCTA() {
  return (
    <>
      <div className="mobile-cta-space" aria-hidden="true" />
      <nav className="mobile-cta-bar" aria-label="Mobile quick actions">
        <ButtonLink href="#services" variant="ghost" size="md">View Services</ButtonLink>
        <ButtonLink href="#contact" size="md">Get a Quote</ButtonLink>
      </nav>
    </>
  );
}
