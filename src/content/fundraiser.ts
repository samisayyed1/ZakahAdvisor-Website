/**
 * Public fundraising copy.
 *
 * Source of truth: "Zakah Advisor Fundraiser Landing Page.docx".
 * Passages have been split into UI-sized blocks, but substantive wording —
 * especially anything religious, financial or numerical — is unchanged.
 *
 * Rules for editing this file:
 *  - Never add statistics, endorsements, scholars, ratings or donor counts that
 *    are not in the approved source.
 *  - Never restate a religious position in stronger terms than the source does.
 *  - Qur'anic and Hadith text lives in ./scripture.ts and is extracted, not typed.
 */

export type DonorFear = {
  id: string;
  question: string;
  detail: string;
};

/**
 * The source document carries an unfinished editorial marker where this section
 * belongs ("WRITE Donor biggest fears list"), and the 2026-08-27 internal notes
 * assign the same section as an open action. These five concerns are drawn only
 * from problems already established elsewhere in the fundraiser copy and in the
 * 38-question donor checklist. No new Fiqh claim is introduced here.
 */
export const donorFears: DonorFear[] = [
  {
    id: "calculation",
    question: "What if I calculated it wrong?",
    detail:
      "Inventory valued at retail instead of wholesale, a property treated as rental rather than resale, a crypto holding priced at buy-in instead of the spot price on your due date — each is a quiet arithmetic error with a religious consequence.",
  },
  {
    id: "deductions",
    question: "How much of it actually leaves the building?",
    detail:
      "Administrative fees and marketing costs are rarely printed next to the donate button. Most donors cannot name the percentage deducted from their Zakah before it moves.",
  },
  {
    id: "categories",
    question: "Did it reach an eligible category?",
    detail:
      "Zakah belongs to eight categories defined by Allah. General infrastructure, offices and public works are not among them, yet funds are routinely absorbed by them.",
  },
  {
    id: "visibility",
    question: "Can I trace where it ended up?",
    detail:
      "Between the click and the recipient sit intermediaries, partners and reporting gaps. Very few donors can follow their own payment to the end of the chain.",
  },
  {
    id: "outstanding",
    question: "If I got it wrong, is my obligation still owed?",
    detail:
      "A miscalculated or misdirected payment does not quietly resolve itself. The concern that part of the third pillar remains outstanding is what keeps careful donors awake.",
  },
];

export type Threat = {
  index: string;
  id: string;
  title: string;
  paragraphs: string[];
  closing?: string;
};

export const threats: Threat[] = [
  {
    index: "01",
    id: "charity-black-box",
    title: "The Charity Black Box",
    paragraphs: [
      "You calculate your Zakah down to the exact decimal. You find an emotional video online of children in need. You click donate. But what happens to your money next?",
      "The harsh reality is that billions of dollars are pumped into the charity sector annually, yet funds are routinely diluted. Many well-meaning Muslims are completely unaware that their Zakah is being siphoned off by exorbitant “administrative fees” or hidden marketing costs.",
      "Sometimes, your obligatory 2.5% is diverted to build general community infrastructure—like administrative offices or public wells—instead of being handed directly to the eight eligible categories defined by Allah.",
    ],
    closing:
      "If an organisation is using your Zakah to pay for corporate retreats, bloated executive salaries, or vague “awareness campaigns,” your third pillar is in severe jeopardy.",
  },
  {
    index: "02",
    id: "modern-financial-gap",
    title: "The Modern Financial Gap",
    paragraphs: [
      "The days of counting physical gold dinars and livestock are over. We live in an era of unprecedented financial complexity.",
      "Today, Muslims hold wealth in long-term dividend stocks, flipped real estate, and layered business inventories. The rules of Zakah remain divine, but applying classical Fiqh to modern asset structures requires rigorous, scholarly precision.",
    ],
    closing:
      "Are you applying the correct wholesale valuation to your retail inventory? Are you mistakenly paying Zakah on bad debts you will never recover? Are you holding unpurified digital assets? A single mathematical error in these areas does not just mean you made a mistake—it means you have either stolen from your own pocket or stolen from those in need.",
  },
];

/** The four modern-asset classes named in Threat 2, for the supporting panel. */
export const modernAssets = [
  {
    label: "Business inventory",
    note: "Wholesale replacement cost, not retail markup.",
  },
  {
    label: "Property held for resale",
    note: "Current market valuation, not the historical purchase price.",
  },
  {
    label: "Recoverable and bad debts",
    note: "Two different treatments, routinely conflated.",
  },
  {
    label: "Digital assets and portfolios",
    note: "Valued on your Zakah due date, not your buy-in date.",
  },
] as const;

export type Capability = {
  id: string;
  icon: "audit" | "precision" | "transparency" | "independence";
  title: string;
  arabicName?: string;
  body: string;
};

/**
 * The four operating principles from the body of the fundraiser document.
 * These are distinct from the formal four-pillar charity assessment
 * methodology in `auditPillars` below — do not merge the two frameworks.
 */
export const capabilities: Capability[] = [
  {
    id: "forensic-auditing",
    icon: "audit",
    title: "Forensic Charity Auditing",
    body: "We strip away the emotional marketing. We dig into public tax returns, transparency reports, and governance structures. We verify end-to-end compliance with the 8 Quranic categories and expose administrative bloat.",
  },
  {
    id: "financial-precision",
    icon: "precision",
    title: "Modern Financial Precision",
    body: "We translate complex jurisprudence into exact, accessible modern applications. Our educational tools and detailed guides teach you exactly how to calculate Zakah on dynamic portfolios and modern tax structures with absolute Shariah precision.",
  },
  {
    id: "total-transparency",
    icon: "transparency",
    title: "Total Transparency",
    arabicName: "Amanah",
    body: "We publish our audit methodologies, scholarly sources, and rating metrics openly. We expect total transparency from the charities we evaluate, and we lead by example.",
  },
  {
    id: "zero-bias",
    icon: "independence",
    title: "Zero Institutional Bias",
    arabicName: "Ikhlas",
    body: "We are entirely independent. We accept absolutely no commissions, kickbacks, or institutional funding from the charities we audit. Our loyalty is strictly to Allah ﷻ, and then to you, the donor.",
  },
];

export type AuditPillar = {
  number: string;
  title: string;
  body: string;
};

/**
 * The formal four-pillar charity assessment methodology, taken from FAQ 3.
 *
 * REVIEW DEPENDENCY: the 2026-08-27 internal meeting assigned Sheikh Nabil to
 * revise this methodology description for clarity and accuracy. The wording
 * below is the currently approved public wording and is intentionally held in
 * one place so a revision is a single-object edit. No "pending review" notice is
 * shown to visitors — the existing product does not require one.
 */
export const auditPillars: AuditPillar[] = [
  {
    number: "01",
    title: "Regulatory Compliance",
    body: "Legal status and tax returns.",
  },
  {
    number: "02",
    title: "Financial Accountability",
    body: "Tracking exact revenue distribution to expose high overheads.",
  },
  {
    number: "03",
    title: "Zakah Policy Compliance",
    body: "Evaluating against 30 strict Shariah metrics.",
  },
  {
    number: "04",
    title: "Governance & Leadership",
    body: "Ensuring institutional transparency.",
  },
];

export type SupportTier = {
  /** Stable identifier; also the analytics value and the env-var suffix. */
  id: "10" | "25" | "50" | "100" | "200";
  amount: number;
  /** How the amount reads in the UI, e.g. "$200+". */
  amountLabel: string;
  name: string;
  /** Marks the campaign entry point. Not a popularity claim. */
  entryPoint?: boolean;
  impact: string;
  rewards: string[];
};

export const supportTiers: SupportTier[] = [
  {
    id: "10",
    amount: 10,
    amountLabel: "$10",
    name: "The Foundation",
    entryPoint: true,
    impact:
      "Your contribution sustains our core digital infrastructure, keeping our dynamic Zakah calculators and educational hubs online and free for millions of Muslims globally.",
    rewards: [
      "A PDF copy of our 38 questions checklist “What your charity isn’t telling you: The Ultimate Zakah Self Audit”",
    ],
  },
  {
    id: "25",
    amount: 25,
    amountLabel: "$25",
    name: "The Educator",
    impact:
      "You directly sponsor the research and publication of our deep-dive resources, such as our self-audit reports and modern Fiqh breakdowns, curing the financial illiteracy in our Ummah.",
    rewards: [
      "Our 174 page publication “Is your Zakah Valid? 37 Mistakes Most Muslims Make (And how to fix them)”",
      "The 38 questions checklist",
    ],
  },
  {
    id: "50",
    amount: 50,
    amountLabel: "$50",
    name: "The Vanguard",
    impact:
      "You are the backbone of our operation. This tier directly funds our forensic auditing team and Shariah Advisory Board, allowing us to launch deep investigations into global charities and publish public ratings.",
    rewards: ["The Book", "Nominate a Charity for our next audit"],
  },
  {
    id: "100",
    amount: 100,
    amountLabel: "$100",
    name: "The Guardian",
    impact:
      "At this level, you help us scale our auditing technology, allowing us to evaluate hundreds of additional charities per year and expand our reach into non-English speaking demographics.",
    rewards: [
      "The Book",
      "Nominate a Charity",
      "1 hour with a Zakah Advisor Verified Scholar to answer your questions",
    ],
  },
  {
    id: "200",
    amount: 200,
    amountLabel: "$200+",
    name: "The Visionary",
    impact:
      "You secure our complete independence. Your major contribution ensures we never have to compromise our integrity or seek institutional funding. You are actively shaping the future of global Islamic finance.",
    rewards: [
      "All of the above",
      "Join a special WhatsApp group to discuss the mission of Zakah Advisor with the Zakah Guardians",
    ],
  },
];

export type FaqItem = {
  id: string;
  question: string;
  /** Rendered as sequential paragraphs. */
  answer: string[];
  /** Optional structured list rendered after the answer. */
  list?: { title: string; body: string }[];
};

export const faqs: FaqItem[] = [
  {
    id: "why-us",
    question:
      "Why should I donate to Zakah Advisor instead of giving this Sadaqah directly to the poor?",
    answer: [
      "Giving to the poor is a beautiful act of worship. However, supporting Zakah Advisor is an investment in systemic change. For every $100 you give to us, you are enabling us to protect and correctly route tens of thousands of dollars in Zakah that might otherwise be lost to administrative bloat or invalid causes. You are securing the third pillar for the entire Ummah.",
    ],
  },
  {
    id: "is-it-zakah",
    question: "Is my donation to Zakah Advisor considered Zakah?",
    answer: [
      "No. Your donation to us is purely Sadaqah Jariyah (continuous charity). We do not accept Zakah funds for our operations. Zakah has strict categories, and our operational costs do not fall into them. This ensures your obligatory charity goes where it belongs, while your voluntary charity builds the system that protects it.",
      "If you wish to give Zakah, find a verified charity on Madinah.com.",
    ],
  },
  {
    id: "how-we-audit",
    question: "How do you audit these charities?",
    answer: [
      "We use a rigorous 4-pillar methodology:",
    ],
    list: auditPillars.map((pillar) => ({
      title: pillar.title,
      body: pillar.body,
    })),
  },
  {
    id: "affiliation",
    question: "Are you affiliated with any specific charity?",
    answer: [
      "Absolutely not. Our core value is Ikhlas (sincerity/independence). We operate completely autonomously, which gives us the freedom to praise charities that do phenomenal work and publicly call out practices that contradict the Shariah.",
    ],
  },
];

/**
 * Attribution for the $200 billion figure, exactly as supplied. No hyperlink is
 * rendered: no verified URL for this article exists in the source material.
 */
export const zakahEstimateSource =
  "“Analysis: A faith-based aid revolution in the Muslim world?” IRINnews, 1 June 2012.";
