/**
 * Inquiry submission — integration point.
 *
 * By default this project is a DEMONSTRATION: nothing is sent anywhere and
 * no personal data is stored. To connect a real service, set
 * NEXT_PUBLIC_INQUIRY_ENDPOINT to a form/email endpoint that accepts JSON
 * (e.g. your own API route, Formspree, Basin, a CRM webhook) and review
 * the privacy implications before launch.
 */
export type InquiryPayload = {
  fullName: string;
  email: string;
  phone: string;
  vehicleMake: string;
  vehicleModel: string;
  service: string;
  details: string;
};

export type InquiryResult =
  | { status: "demo" }
  | { status: "sent" }
  | { status: "error"; message: string };

const ENDPOINT = process.env.NEXT_PUBLIC_INQUIRY_ENDPOINT;

export async function submitInquiry(payload: InquiryPayload): Promise<InquiryResult> {
  if (!ENDPOINT) {
    // Demo mode: simulate latency only. The payload is intentionally discarded.
    await new Promise((resolve) => setTimeout(resolve, 900));
    return { status: "demo" };
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Request failed (${res.status})`);
    return { status: "sent" };
  } catch {
    return {
      status: "error",
      message: "Something went wrong while sending your inquiry. Please try again.",
    };
  }
}

export const isDemoMode = !ENDPOINT;
