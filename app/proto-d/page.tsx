import { Hero } from "@/app/components/hero";
import { AboutThreePacks } from "@/app/components/proto/about-three-packs";
import { PackSelectorTabsV2 } from "@/app/components/proto/pack-selector-tabs-v2";
import { RulesSection } from "@/app/components/rules-section";
import { InstallSection } from "@/app/components/install-section";
import { DownloadsSection } from "@/app/components/downloads-section";
import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site-footer";
import { allPacks, allSkillsWithTechnical } from "@/lib/content";

// Proto D — refined tabs (feedback on proto-c): lead with the question,
// not the pack name, and make the active tab unmistakable.
export default function ProtoD() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <AboutThreePacks />
        <PackSelectorTabsV2 packs={allPacks} />
        <RulesSection />
        <InstallSection />
        <DownloadsSection packs={allPacks} allSkills={allSkillsWithTechnical} />
      </main>
      <SiteFooter />
    </>
  );
}
