"use client";

import { useState } from "react";
import { Hero } from "@/app/components/hero";
import { About } from "@/app/components/about";
import { StackPromptPicker } from "@/app/components/proto/stack-prompt-picker";
import { PackSelectorTabsControlled } from "@/app/components/proto/pack-selector-tabs-controlled";
import { RulesSection } from "@/app/components/rules-section";
import { InstallSection } from "@/app/components/install-section";
import { DownloadsSection } from "@/app/components/downloads-section";
import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site-footer";
import { allSkills, packs } from "@/lib/content";

// Proto E — a free-text "what are you trying to figure out?" prompt above
// the (now-production) tab picker. Answering highlights the matched stack
// and scrolls to it, but never hides the other two — a wrong guess is a
// one-click recovery, not a dead end. The match itself is a local
// keyword-score mock (see mock-classify-stack.ts), not a real model call,
// per the "prototype the interaction first" decision. Not yet promoted to
// the real homepage — proto-d's tab picker was (see PackSelector).
export default function ProtoE() {
  const [activeSlug, setActiveSlug] = useState(packs[0].slug);

  const handleMatch = (slug: string) => {
    setActiveSlug(slug);
    requestAnimationFrame(() => {
      document.getElementById("stacks")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <StackPromptPicker packs={packs} onMatch={handleMatch} />
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="mb-10 max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                The three stacks
              </span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Pick a question, install a pack.
              </h2>
            </div>
            <PackSelectorTabsControlled
              packs={packs}
              activeSlug={activeSlug}
              onSelect={setActiveSlug}
            />
          </div>
        </section>
        <RulesSection />
        <InstallSection />
        <DownloadsSection packs={packs} allSkills={allSkills} />
      </main>
      <SiteFooter />
    </>
  );
}
