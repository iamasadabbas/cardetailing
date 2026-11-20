"use client";

import { useRef, useState, type FormEvent } from "react";
import { AnimatePresence, m } from "motion/react";
import { AlertCircle, ChevronDown, Info, Loader2, RotateCcw } from "lucide-react";
import { serviceOptions } from "@/data/inquiry";
import { useInquiry } from "@/components/InquiryProvider";
import { submitInquiry, isDemoMode, type InquiryPayload } from "@/lib/inquiry";
import { Button } from "@/components/ui/Button";

type FieldName = keyof InquiryPayload;
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "submitting" | "demo" | "sent" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s.-]{6,20}$/;

const empty: Omit<InquiryPayload, "service"> = {
  fullName: "",
  email: "",
  phone: "",
  vehicleMake: "",
  vehicleModel: "",
  details: "",
};

function validate(v: InquiryPayload): Errors {
  const e: Errors = {};
  if (v.fullName.trim().length < 2) e.fullName = "Please enter your full name.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address, e.g. name@example.com.";
  if (v.phone.trim() && !PHONE_RE.test(v.phone.trim())) e.phone = "Please enter a valid phone number or leave it empty.";
  if (!v.vehicleMake.trim()) e.vehicleMake = "Please enter the vehicle make.";
  if (!v.vehicleModel.trim()) e.vehicleModel = "Please enter the vehicle model.";
  if (!v.service) e.service = "Please choose a service, or select “Not Sure Yet”.";
  if (v.details.length > 1500) e.details = "Please keep additional details under 1,500 characters.";
  return e;
}

const order: FieldName[] = ["fullName", "email", "phone", "vehicleMake", "vehicleModel", "service", "details"];

export function ContactForm() {
  const { service, setService, requestId } = useInquiry();
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const statusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const payload: InquiryPayload = { ...values, service };

  const update = (name: Exclude<FieldName, "service">, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (touched[name]) {
      const next = validate({ ...payload, [name]: value });
      setErrors((e) => ({ ...e, [name]: next[name] }));
    }
  };

  const blur = (name: FieldName) => {
    setTouched((t) => ({ ...t, [name]: true }));
    const next = validate(payload);
    setErrors((e) => ({ ...e, [name]: next[name] }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next = validate(payload);
    setErrors(next);
    setTouched(Object.fromEntries(order.map((k) => [k, true])));
    const firstInvalid = order.find((k) => next[k]);
    if (firstInvalid) {
      const field = formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`);
      field?.focus({ preventScroll: true });
      field?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }
    setStatus("submitting");
    const result = await submitInquiry(payload);
    if (result.status === "error") {
      setErrorMessage(result.message);
      setStatus("error");
    } else {
      setStatus(result.status);
    }
    window.setTimeout(() => statusRef.current?.focus(), 50);
  };

  const reset = () => {
    setValues(empty);
    setService("");
    setErrors({});
    setTouched({});
    setStatus("idle");
    window.setTimeout(() => formRef.current?.querySelector<HTMLElement>('[name="fullName"]')?.focus(), 50);
  };

  const fieldProps = (name: Exclude<FieldName, "service">) => ({
    id: `f-${name}`,
    name,
    value: values[name],
    onChange: (ev: { target: { value: string } }) => update(name, ev.target.value),
    onBlur: () => blur(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `f-${name}-error` : undefined,
    className: "field-input",
  });

  const done = status === "demo" || status === "sent";

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y relative border-t border-line/60 bg-charcoal">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Intro column */}
          <div className="lg:col-span-6 xl:col-span-5">
            <h2
              id="contact-title"
              className="display-tight text-[clamp(2.05rem,8.8vw,3.25rem)] md:text-[clamp(3rem,5.6vw,4.5rem)] lg:text-[clamp(2.6rem,3.5vw,3.6rem)]"
              data-reveal
            >
              Ready to plan
              <br />
              <span className="text-silver/55">your vehicle&rsquo;s care?</span>
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-silver" data-reveal>
              Tell us what your vehicle needs and explore the detailing options that could be right for you.
            </p>

            <ol className="mt-12 hidden space-y-5 border-t border-line pt-8 sm:block" data-reveal>
              {[
                ["Share", "Your vehicle and the service you have in mind."],
                ["Discuss", "Suitable options, requirements and a quotation."],
                ["Confirm", "An agreed scope before any work begins."],
              ].map(([t, d], i) => (
                <li key={t} className="grid grid-cols-[2.5rem_6rem_1fr] items-baseline gap-2 text-sm">
                  <span className="text-[0.7rem] font-semibold tracking-[0.18em] text-accent tabular-nums">0{i + 1}</span>
                  <span className="font-display font-semibold tracking-[0.1em] uppercase">{t}</span>
                  <span className="text-silver">{d}</span>
                </li>
              ))}
            </ol>

            {isDemoMode && (
              <p className="mt-10 flex max-w-md items-start gap-3 border border-line p-4 text-sm leading-relaxed text-silver" data-reveal>
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  <strong className="block font-semibold text-bone">Preview the quote request experience</strong>
                  This demonstration shows how customers can request a quote. Your completed website can connect enquiries directly to your email or WhatsApp.
                  <span className="mt-2 block text-xs">Demo only — no enquiry is sent.</span>
                </span>
              </p>
            )}
          </div>

          {/* Form column */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="relative border border-line bg-ink p-6 sm:p-10 xl:p-12" data-reveal>
              <span className="absolute top-0 left-0 h-[3px] w-20 bg-accent" aria-hidden="true" />
              <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
                <h3
                  id="inquiry-form-title"
                  tabIndex={-1}
                  className="font-display text-xl font-semibold tracking-tight uppercase focus:outline-none"
                >
                  Request a quote
                </h3>
                <p className="text-xs text-silver">
                  <span className="text-accent">*</span> Required
                </p>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                {done ? (
                  <m.div
                    key="done"
                    ref={statusRef}
                    tabIndex={-1}
                    role="status"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="py-6 focus:outline-none"
                  >
                    <span className="mb-6 flex h-12 w-12 items-center justify-center border border-accent text-accent">
                      <Info className="h-5 w-5" aria-hidden="true" />
                    </span>
                    {status === "demo" ? (
                      <>
                        <p className="font-display text-2xl font-semibold tracking-tight uppercase">Demo completed successfully</p>
                        <p className="mt-4 max-w-md leading-relaxed text-silver">
                          This was a demonstration submission. No enquiry was sent. Your live website can be connected to receive customer requests.
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="font-display text-2xl font-semibold tracking-tight uppercase">Inquiry sent</p>
                        <p className="mt-4 max-w-md leading-relaxed text-silver">
                          Thank you. Your inquiry has been received and you will be contacted about the next steps.
                        </p>
                      </>
                    )}
                    <Button type="button" variant="ghost" size="md" arrow={false} className="mt-8" onClick={reset}>
                      <span className="inline-flex items-center gap-2">
                        <RotateCcw className="h-4 w-4" aria-hidden="true" /> Start a new inquiry
                      </span>
                    </Button>
                  </m.div>
                ) : (
                  <m.form
                    key="form"
                    ref={formRef}
                    noValidate
                    onSubmit={onSubmit}
                    aria-describedby="inquiry-form-title"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2"
                  >
                    <Field label="Full Name" name="fullName" required error={errors.fullName} className="sm:col-span-2">
                      <input type="text" autoComplete="name" placeholder="Your full name" {...fieldProps("fullName")} />
                    </Field>
                    <Field label="Email Address" name="email" required error={errors.email}>
                      <input type="email" inputMode="email" autoComplete="email" placeholder="name@example.com" {...fieldProps("email")} />
                    </Field>
                    <Field label="Phone Number" name="phone" hint="Optional" error={errors.phone}>
                      <input type="tel" inputMode="tel" autoComplete="tel" placeholder="Optional" {...fieldProps("phone")} />
                    </Field>
                    <Field label="Vehicle Make" name="vehicleMake" required error={errors.vehicleMake}>
                      <input type="text" placeholder="e.g. Porsche" {...fieldProps("vehicleMake")} />
                    </Field>
                    <Field label="Vehicle Model" name="vehicleModel" required error={errors.vehicleModel}>
                      <input type="text" placeholder="e.g. 911 Carrera" {...fieldProps("vehicleModel")} />
                    </Field>

                    <Field label="Interested Service" name="service" required error={service ? undefined : errors.service} className="sm:col-span-2">
                      <div className="relative">
                        <select
                          id="f-service"
                          name="service"
                          value={service}
                          onChange={(ev) => setService(ev.target.value as typeof service)}
                          onBlur={() => blur("service")}
                          aria-invalid={errors.service && !service ? true : undefined}
                          aria-describedby={errors.service && !service ? "f-service-error" : undefined}
                          className={`field-input ${service ? "" : "text-[#a6a5a1]"}`}
                        >
                          <option value="" disabled>
                            Select a service
                          </option>
                          {serviceOptions.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                        {requestId > 0 && (
                          <span
                            key={requestId}
                            aria-hidden="true"
                            className="anim-flash pointer-events-none absolute inset-0 bg-accent/15"
                          />
                        )}
                        <ChevronDown className="pointer-events-none absolute top-1/2 right-1 h-4 w-4 -translate-y-1/2 text-silver" aria-hidden="true" />
                      </div>
                    </Field>

                    <Field label="Additional Details" name="details" hint="Optional" error={errors.details} className="sm:col-span-2">
                      <textarea
                        rows={4}
                        placeholder="Vehicle condition, areas of concern, preferred timing…"
                        maxLength={1600}
                        {...fieldProps("details")}
                      />
                    </Field>

                    <div className="flex flex-col gap-5 pt-2 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={status === "submitting"}
                        aria-disabled={status === "submitting"}
                        arrow={false}
                        className="w-full sm:w-auto"
                      >
                        {status === "submitting" ? (
                          <span className="inline-flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Checking…
                          </span>
                        ) : (
                          "Submit Inquiry"
                        )}
                      </Button>
                      <p className="text-xs leading-relaxed text-silver sm:max-w-[15rem] sm:text-right">
                        {isDemoMode
                          ? "Demo only — no enquiry is sent."
                          : "Your details are only used to respond to this inquiry."}
                      </p>
                    </div>

                    {status === "error" && (
                      <div
                        ref={statusRef}
                        tabIndex={-1}
                        role="alert"
                        className="flex items-start gap-3 border border-[#ff7a59]/50 p-4 text-sm text-bone sm:col-span-2"
                      >
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#ff7a59]" aria-hidden="true" />
                        {errorMessage}
                      </div>
                    )}
                  </m.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  required,
  hint,
  error,
  className = "",
  children,
}: {
  label: string;
  name: FieldName;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={`f-${name}`} className="flex items-baseline justify-between text-[0.68rem] font-semibold tracking-[0.2em] text-bone/90 uppercase">
        <span>
          {label}
          {required && (
            <span className="ml-1 text-accent" aria-hidden="true">
              *
            </span>
          )}
          {required && <span className="sr-only"> (required)</span>}
        </span>
        {hint && <span className="font-normal tracking-[0.12em] text-silver normal-case">{hint}</span>}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <m.p
            id={`f-${name}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-1.5 overflow-hidden pt-2 text-[0.8rem] text-[#ff8f73]"
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {error}
          </m.p>
        )}
      </AnimatePresence>
    </div>
  );
}
