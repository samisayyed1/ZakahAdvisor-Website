/**
 * Legal Disclaimers & Terms of Use.
 *
 * Source of truth: "Zakah Advisor Legal Disclaimers & Terms of Use.docx".
 * Wording is reproduced verbatim; only paragraph breaks and section numbering
 * have been made explicit for the web. Do not reword any of this for tone,
 * brevity or conversion.
 */

export type LegalSection = {
  id: string;
  number: number;
  title: string;
  paragraphs: string[];
};

export const legalIntro = {
  title: "Zakah Advisor Legal Disclaimers & Terms of Use",
  headingId: "interpretation",
  headingTitle: "Interpretation and Definitions",
  paragraphs: [
    "For the purposes of these disclaimers, “Company”, “We”, “Us”, or “Our” refers to Zakah Advisor (accessible from www.zakahadvisor.org). “Service” refers to the Website and all its associated educational materials, calculators, and podcasts. “You” refers to the individual or entity accessing the Service.",
  ],
};

export const legalSections: LegalSection[] = [
  {
    id: "educational-guidance-only",
    number: 1,
    title: "Educational and Religious Guidance Only (No Professional Financial Advice)",
    paragraphs: [
      "Zakah Advisor is dedicated to providing rigorous Islamic educational content, charity assessments, and Zakah calculation tools. However, the information provided on this Service is for general educational and religious guidance only.",
      "We are not engaged in rendering certified legal, accounting, or tax advice. Zakah regulations differ widely among international tax authorities. Our guidance should never be used as a substitute for consultation with a licensed Certified Public Accountant (CPA), tax attorney, or financial advisor in your specific jurisdiction.",
    ],
  },
  {
    id: "charity-ratings",
    number: 2,
    title: "Charity Ratings and Public Information",
    paragraphs: [
      "Our charity audits and ratings are conducted with the utmost rigour, utilising publicly available financial records, transparency reports, and operational data. We present this data to empower donors to make informed decisions.",
      "Because we rely on public documentation, we cannot guarantee real-time accuracy if a charity fails to publish up-to-date records. If a charitable organisation believes our information is outdated or incorrect, we welcome them to submit official, factual documentation for review. We are committed to updating our records to reflect the most accurate, verifiable reality of an organisation’s operations.",
    ],
  },
  {
    id: "scholarly-differences",
    number: 3,
    title: "Scholarly Differences (Ikhtilaf) and Evolving Jurisprudence",
    paragraphs: [
      "Islamic jurisprudence (Fiqh) regarding modern financial assets—such as equities, retirement funds, and business holdings—is dynamic and often contains valid differences of scholarly opinion (Ikhtilaf). While we strive to present the most thoroughly researched and widely accepted scholarly views, the Service does not claim absolute authority over personal religious rulings (Fatwas). Donors are encouraged to consult their local scholars for highly specific or complex personal wealth scenarios.",
    ],
  },
  {
    id: "views-expressed",
    number: 4,
    title: "Views Expressed Disclaimer",
    paragraphs: [
      "Zakah Advisor frequently hosts guest scholars, authors, and financial experts across our articles, master guides, and podcasts. The views and opinions expressed by these guests are strictly their own and do not necessarily reflect the official policy or position of Zakah Advisor.",
    ],
  },
  {
    id: "accuracy",
    number: 5,
    title: "Accuracy, Errors, and Omissions",
    paragraphs: [
      "We treat the Amanah (trust) of our research with the highest level of care. However, given the rapidly changing nature of global financial regulations, tax laws, and charity operations, errors or delays in information can occur. All information on the Service is provided “as is”, with no guarantee of absolute completeness or timeliness. Zakah Advisor assumes no responsibility or liability for any errors, omissions, or the direct results obtained from the use of this information.",
    ],
  },
  {
    id: "fair-use",
    number: 6,
    title: "Fair Use Disclaimer",
    paragraphs: [
      "In the course of auditing charities or providing educational commentary, Zakah Advisor may utilise copyrighted material (such as charity logos or snippets of financial reports) that has not been specifically authorised by the copyright owner. We make this material available under the principles of “fair use” strictly for criticism, comment, educational reporting, and research.",
    ],
  },
  {
    id: "limitation-of-liability",
    number: 7,
    title: "Limitation of Liability",
    paragraphs: [
      "In no event shall Zakah Advisor, its scholars, directors, or employees be liable for any direct, indirect, special, consequential, or incidental damages arising out of or in connection with the use of the Service. You agree that any decisions made regarding charitable donations or financial calculations based on our platform are executed at your own discretion and risk.",
    ],
  },
  {
    id: "external-links",
    number: 8,
    title: "External Links",
    paragraphs: [
      "Our Service may contain links to third-party charity websites, research portals, or governmental financial pages. We do not maintain or control these external sites and cannot guarantee the accuracy, relevance, or safety of their content.",
    ],
  },
];
