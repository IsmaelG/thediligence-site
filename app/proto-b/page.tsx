import { Hero } from "@/app/components/hero";
import { AboutAddon } from "@/app/components/proto/about-addon";
import { PackSection } from "@/app/components/pack-section";
import { TechnicalAddonBanner } from "@/app/components/proto/technical-addon-banner";
import { RulesSection } from "@/app/components/rules-section";
import { InstallSection } from "@/app/components/install-section";
import { DownloadsSection } from "@/app/components/downloads-section";
import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site-footer";
import { packs, allPacks, allSkillsWithTechnical, technicalDiligenceStack } from "@/lib/content";

// Proto B — "Add-on framing, not a peer": technicaldd is designed to chain
// after the other two stacks, not stand alone, so it keeps Company/Product
// as the two primary cards (unchanged production PackSection) and presents
// Technical Diligence Stack as a distinct "go deeper" banner below.
export default function ProtoB() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <AboutAddon />
        <PackSection packs={packs} />
        <TechnicalAddonBanner pack={technicalDiligenceStack} />
        <RulesSection />
        <InstallSection />
        <DownloadsSection packs={allPacks} allSkills={allSkillsWithTechnical} />
      </main>
      <SiteFooter />
    </>
  );
}
