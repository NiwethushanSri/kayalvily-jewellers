import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: `Terms of Use | ${site.name}` };

type Section = { title: string; points?: string[]; text?: string[] };

const sections: Section[] = [
  {
    title: "1. Customer Information",
    points: [
      "Customers must provide accurate and complete information when requesting product prices, making enquiries or placing orders.",
      "Personal information provided by customers will be used for processing enquiries, fulfilling orders, arranging deliveries and communicating with customers.",
      "Customer information will be handled in accordance with our Privacy Policy and applicable data protection laws.",
      "We will not sell customers' personal information to third parties.",
    ],
  },
  {
    title: "2. Pricing",
    points: [
      "All prices displayed on our website are quoted in Sri Lankan Rupees (LKR), unless otherwise stated.",
      "Kayalvily Jewellers reserves the right to change product prices without prior notice.",
      "We make every effort to ensure that product descriptions, prices and other information displayed on our website are accurate.",
      "If a pricing error is identified, we will contact the customer to explain the error and discuss the available options, including cancellation and any applicable refund.",
      "Product prices may vary depending on gold market rates, product weight, craftsmanship, design and other applicable charges.",
      "The actual weight of a jewellery item may differ slightly from the weight displayed on the website.",
      "Any changes to confirmed orders will be communicated to the customer.",
    ],
  },
  {
    title: "3. Ordering",
    points: [
      "Customers may place orders or submit product enquiries through the methods available on our website.",
      "Upon confirmation of an order, customers will receive an order reference number or confirmation.",
      "All orders are subject to product availability.",
      "Kayalvily Jewellers reserves the right to decline an order where a product is unavailable or an order cannot reasonably be fulfilled.",
      "Customers will be notified if an order cannot be processed.",
    ],
  },
  {
    title: "4. Order Cancellation",
    points: [
      "Customers who wish to cancel an order should contact Kayalvily Jewellers as soon as possible.",
      "Cancellation requests should be submitted in writing, including by email or another officially designated written communication channel.",
      "Cancellation requests made on the same day as order confirmation will be considered, subject to the status of the order and applicable consumer protection laws.",
      "Orders involving customised, personalised or specially manufactured jewellery may be subject to additional cancellation conditions, where permitted by law.",
      "Any applicable refund will be processed in accordance with our Refund and Cancellation Policy and relevant legal requirements.",
    ],
  },
  {
    title: "5. Payment",
    points: [
      "Payment methods and instructions will be provided during the ordering process.",
      "Customers must ensure that all payment information supplied is accurate.",
      "Orders may be processed only after the required payment or payment confirmation has been received, depending on the agreed payment arrangement.",
      "Kayalvily Jewellers reserves the right to verify payments before processing or dispatching orders.",
      "For further information, please refer to our Payment and Delivery Policy.",
    ],
  },
  {
    title: "6. Product Information",
    points: [
      "We make every effort to display accurate photographs, descriptions and specifications of our jewellery.",
      "Product images are provided for illustrative purposes. Actual colours, sizes, finishes and appearances may vary slightly.",
      "Product weights and measurements are approximate unless expressly confirmed.",
      "Gold prices and applicable making charges may vary according to current market conditions.",
      "Customers are encouraged to confirm product details before finalising an order.",
    ],
  },
  {
    title: "7. Copyright and Intellectual Property",
    points: [
      "All original website content, jewellery designs, photographs, graphics, logos, icons, layouts and other materials belonging to Kayalvily Jewellers are protected by applicable intellectual property laws.",
      "No website content may be copied, reproduced, distributed, modified or commercially exploited without our prior written permission, except where permitted by law.",
      "Unauthorised extraction, data mining or commercial use of product information from our website is prohibited.",
    ],
  },
  {
    title: "8. Third-Party Links",
    points: [
      "Our website may contain links to third-party websites or services for customer convenience.",
      "Kayalvily Jewellers is not responsible for the content, privacy practices or policies of third-party websites.",
      "Customers are encouraged to review the applicable terms and privacy policies before using external websites.",
    ],
  },
  {
    title: "9. Cookies and Analytics",
    points: [
      "Our website may use cookies and similar technologies to improve website functionality, understand visitor interactions and enhance customer experience.",
      "Where applicable, we may use services such as Google Analytics and Google advertising technologies to analyse website traffic and assess marketing performance.",
      "Any use of cookies and personal information will be subject to our Cookie Policy, Privacy Policy and applicable legal requirements.",
    ],
  },
  {
    title: "10. Severability",
    text: [
      "If any provision of these Terms of Use is found to be invalid, unlawful or unenforceable by a competent court, that provision shall be treated as severable without affecting the validity or enforceability of the remaining provisions.",
    ],
  },
  {
    title: "11. Waiver",
    text: [
      "Failure by Kayalvily Jewellers to exercise or enforce any right under these Terms of Use shall not constitute a waiver of that right.",
      "Any waiver must be expressly acknowledged in writing.",
    ],
  },
  {
    title: "12. Amendments to Terms and Conditions",
    text: [
      "Kayalvily Jewellers reserves the right to amend or update these Terms of Use from time to time.",
      "Updated Terms of Use will be published on our website.",
      "Any changes affecting existing confirmed orders will be handled in accordance with applicable law and the terms agreed at the time of purchase.",
    ],
  },
  {
    title: "13. Governing Law and Jurisdiction",
    text: [
      "These Terms of Use shall be governed by and interpreted in accordance with the laws of Sri Lanka.",
      "Any disputes arising from the use of this website or services provided by Kayalvily Jewellers shall be subject to the jurisdiction of the competent courts of Sri Lanka, subject to applicable consumer protection laws.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <nav className="breadcrumb container" aria-label="Breadcrumb">
        <Link href="/">Home</Link> &gt; <span>Terms of Use</span>
      </nav>
      <section className="about-hero">
        <div className="container">
          <h1>Terms of Use</h1>
          <p>
            By accessing or using the {site.name} website and any services provided through it, you agree to be bound by
            these Terms of Use. Please read them carefully before making an enquiry or placing an order.
          </p>
        </div>
      </section>

      <section className="terms-section">
        <div className="container terms-grid">
          {sections.map((s) => (
            <article className="terms-card" key={s.title}>
              <h2>{s.title}</h2>
              {s.text?.map((t) => (
                <p key={t}>{t}</p>
              ))}
              {s.points && (
                <ul>
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
        <div className="container terms-sign">
          <strong>{site.name}</strong>
          <span>Elegance, Tradition &amp; Timeless Beauty</span>
        </div>
      </section>
    </>
  );
}
