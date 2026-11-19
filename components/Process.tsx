import Image from "next/image";
import workshop from "@/public/images/production/process.webp";
import { processSteps } from "@/data/content";

export function Process() {
  return (
    <section id="process" className="workshop-section" aria-labelledby="process-title">
      <div className="workshop-image"><Image src={workshop} alt="Concept image of an unbranded technician finishing a black coupe in the studio" fill sizes="(min-width: 768px) 80vw, 100vw" /></div>
      <div className="container-x workshop-content">
        <h2 id="process-title">Inside the process.</h2>
        <ol>{processSteps.map(step => (
          <li key={step.number}><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>
        ))}</ol>
      </div>
    </section>
  );
}
