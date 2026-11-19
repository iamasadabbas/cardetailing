/** Principles, process steps and FAQ content. */

export const principles = [
  {
    title: "Considered Care",
    text: "Every vehicle receives attention based on its surfaces, condition, and selected service.",
    icon: "scan",
  },
  {
    title: "Focused Processes",
    text: "Clear steps and careful preparation help maintain a consistent approach to vehicle care.",
    icon: "layers",
  },
  {
    title: "Quality Materials",
    text: "Products and processes are selected for the needs of the vehicle and the service being performed.",
    icon: "droplet",
  },
  {
    title: "Clear Communication",
    text: "Service scope and recommendations are discussed before work begins.",
    icon: "message",
  },
] as const;

export const processSteps = [
  {
    number: "01",
    title: "Tell Us About Your Vehicle",
    text: "Share your vehicle details and the service you're interested in.",
  },
  {
    number: "02",
    title: "Review Your Options",
    text: "Discuss suitable services, requirements, and a quotation.",
  },
  {
    number: "03",
    title: "Vehicle Care",
    text: "Your chosen detailing work follows the agreed service scope.",
  },
  {
    number: "04",
    title: "Final Review",
    text: "Review the completed service and discuss ongoing care.",
  },
] as const;

export const faqs = [
  {
    q: "How long does a detailing appointment take?",
    a: "The required time depends on vehicle size, condition, and the selected service. An estimate can be discussed when requesting a quote.",
  },
  {
    q: "Do you offer detailing for SUVs and larger vehicles?",
    a: "Service options can be discussed for different vehicle sizes. Share your vehicle details when making an inquiry.",
  },
  {
    q: "Is paint correction suitable for every vehicle?",
    a: "Paint condition and finish must be assessed before selecting a correction process. Not every imperfection can be removed safely.",
  },
  {
    q: "What is the difference between cleaning and detailing?",
    a: "Detailing generally involves more focused attention to vehicle surfaces, materials, and finishing than a routine wash.",
  },
  {
    q: "Can I request multiple services?",
    a: "Yes. You can select a package or describe the services you are interested in through the inquiry form.",
  },
  {
    q: "How do I request a quotation?",
    a: "Use the inquiry section and provide your vehicle details along with the service you would like to discuss.",
  },
] as const;
