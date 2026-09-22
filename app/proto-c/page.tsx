import { Hero } from "@/app/components/hero";
import { AboutThreePacks } from "@/app/components/proto/about-three-packs";
import { PackSelectorTabs } from "@/app/components/proto/pack-selector-tabs";
import { RulesSection } from "@/app/components/rules-section";
import { InstallSection } from "@/app/components/install-section";
import { DownloadsSection } from "@/app/components/downloads-section";
import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site-footer";
import { allPacks, allSkillsWithTechnical } from "@/lib/content";

// Proto C — "Selector / tabs": all 3 stacks behind a segmented control
// instead of a static grid. Keeps the page shorter, scales cleanly if a
// 4th stack is ever added.
export default function ProtoC() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <AboutThreePacks />
        <PackSelectorTabs packs={allPacks} />
        <RulesSection />
        <InstallSection />
        <DownloadsSection packs={allPacks} allSkills={allSkillsWithTechnical} />
      </main>
      <SiteFooter />
    </>
  );
}
