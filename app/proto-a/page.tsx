import { Hero } from "@/app/components/hero";
import { AboutThreePacks } from "@/app/components/proto/about-three-packs";
import { PackSectionGrid3 } from "@/app/components/proto/pack-section-grid3";
import { RulesSection } from "@/app/components/rules-section";
import { InstallSection } from "@/app/components/install-section";
import { DownloadsSection } from "@/app/components/downloads-section";
import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site-footer";
import { allPacks, allSkillsWithTechnical } from "@/lib/content";

// Proto A — "Third card, same grid": straightforward extension of the
// existing pattern. Lowest-risk, most consistent with current design.
export default function ProtoA() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <AboutThreePacks />
        <PackSectionGrid3 packs={allPacks} />
        <RulesSection />
        <InstallSection />
        <DownloadsSection packs={allPacks} allSkills={allSkillsWithTechnical} />
      </main>
      <SiteFooter />
    </>
  );
}
