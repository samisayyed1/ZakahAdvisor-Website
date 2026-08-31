"use client";

import { useState } from "react";

import { ChevronIcon } from "@/components/brand/Icons";
import { Section, SectionHeading } from "@/components/ui/Section";
import { faqs } from "@/content/fundraiser";
import { track } from "@/lib/analytics";

/**
 * FAQ accordion.
 *
 * Each trigger is a real <button> with aria-expanded and aria-controls, and
 * each panel is a labelled region. Opening animates the grid row from 0fr to
 * 1fr, so nothing is measured, nothing jumps, and the base layer neutralises
 * the transition entirely under prefers-reduced-motion.
 */
export function Faq() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <Section id="faq" tone="surface" labelledBy="faq-title">
      <div className="za-shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)] lg:gap-20">
          <SectionHeading
            eyebrow="Questions"
            id="faq-title"
            title="Frequently asked questions"
            className="lg:sticky lg:top-28 lg:self-start"
          />

          <div className="border-t border-za-hairline">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              const panelId = `faq-panel-${faq.id}`;
              const buttonId = `faq-button-${faq.id}`;

              return (
                <div key={faq.id} className="border-b border-za-hairline">
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => {
                        const next = isOpen ? null : faq.id;
                        setOpenId(next);
                        if (next) {
                          track({ name: "faq_opened", question: faq.question });
                        }
                      }}
                      className="flex w-full items-start justify-between gap-6 py-6 text-left"
                    >
                      <span className="font-display text-[1.0625rem] leading-snug font-semibold text-za-text sm:text-[1.125rem]">
                        {faq.question}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-za-hairline text-za-green transition-transform duration-300 ease-[var(--ease-za)] ${
                          isOpen ? "rotate-180 border-za-green/40" : ""
                        }`}
                      >
                        <ChevronIcon className="size-4" />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    // `inert` keeps collapsed answers out of the accessibility
                    // tree and the tab order without `display: none`, which
                    // would kill the open/close transition.
                    inert={!isOpen}
                    className={`grid transition-[grid-template-rows] duration-300 ease-[var(--ease-za)] ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="pb-7">
                        {faq.answer.map((paragraph, index) => (
                          <p
                            key={paragraph.slice(0, 32)}
                            className={`za-measure text-[0.9375rem] leading-relaxed text-za-muted ${
                              index > 0 ? "mt-4" : ""
                            }`}
                          >
                            {paragraph}
                          </p>
                        ))}

                        {faq.list ? (
                          <ol className="za-measure mt-5 flex flex-col gap-3">
                            {faq.list.map((item, index) => (
                              <li
                                key={item.title}
                                className="flex gap-3 text-[0.9375rem] leading-relaxed"
                              >
                                <span
                                  aria-hidden="true"
                                  className="font-display font-bold text-za-gold-ink tabular-nums"
                                >
                                  {index + 1}.
                                </span>
                                <span className="text-za-muted">
                                  <span className="font-semibold text-za-text">
                                    {item.title}
                                  </span>{" "}
                                  — {item.body}
                                </span>
                              </li>
                            ))}
                          </ol>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
