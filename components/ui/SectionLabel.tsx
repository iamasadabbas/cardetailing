type Props = { index: string; label: string; className?: string };
export function SectionLabel({ label, className = "" }: Props) {
  return <p className={"eyebrow flex items-center gap-3 text-silver " + className} data-reveal="fade"><span className="h-px w-6 bg-accent" aria-hidden="true" /><span>{label}</span></p>;
}
