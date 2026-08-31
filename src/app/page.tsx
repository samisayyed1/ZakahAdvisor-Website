import { Header } from "@/components/fundraiser/Header";
import { Hero } from "@/components/fundraiser/Hero";
import { WhyItMatters } from "@/components/fundraiser/WhyItMatters";
import { DonorFears } from "@/components/fundraiser/DonorFears";
import { Threats } from "@/components/fundraiser/Threats";
import { Solution } from "@/components/fundraiser/Solution";
import { RatingExample } from "@/components/fundraiser/RatingExample";
import { AuditMethodology } from "@/components/fundraiser/AuditMethodology";
import { Capabilities } from "@/components/fundraiser/Capabilities";
import { Independence } from "@/components/fundraiser/Independence";
import { GuardianCampaign } from "@/components/fundraiser/GuardianCampaign";
import { SupportTiers } from "@/components/fundraiser/SupportTiers";
import { Faq } from "@/components/fundraiser/Faq";
import { FinalCall } from "@/components/fundraiser/FinalCall";
import { Footer } from "@/components/fundraiser/Footer";
import { StickyCta } from "@/components/fundraiser/StickyCta";
import { faqs } from "@/content/fundraiser";
import { site, siteUrl } from "@/content/site";

/**
 * Structured data.
 *
 * Every value here is either a constant of the organisation or copy that is
 * already visible on the page. No AggregateRating, Review, donor count,
 * registration number, address or founder is asserted — none of those exist in
 * the approved source material.
 */
function StructuredData() {
  const organisation = {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: site.name,
    url: `${siteUrl}/`,
    description: site.description,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/brand/logo-horizontal.svg`,
      caption: site.name,
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: `${siteUrl}/`,
    name: site.name,
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": `${siteUrl}/#organization` },
  };

  const webPage = {
    "@type": "WebPage",
    "@id": `${siteUrl}/#webpage`,
    url: `${siteUrl}/`,
    name: site.title,
    description: site.description,
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#organization` },
    inLanguage: "en",
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${siteUrl}/#faq`,
    isPartOf: { "@id": `${siteUrl}/#webpage` },
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: [
          ...faq.answer,
          ...(faq.list ?? []).map((item) => `${item.title} — ${item.body}`),
        ].join(" "),
      },
    })),
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [organisation, website, webPage, faqPage],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output only; no user-supplied content reaches this node.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export default function FundraiserPage() {
  return (
    <>
      <StructuredData />
      <Header />

      <main id="main">
        <Hero />
        <WhyItMatters />
        <DonorFears />
        <Threats />
        <Solution />
        <RatingExample />
        <AuditMethodology />
        <Capabilities />
        <Independence />
        <GuardianCampaign />
        <SupportTiers />
        <Faq />
        <FinalCall />
      </main>

      <Footer />
      <StickyCta />
    </>
  );
}
