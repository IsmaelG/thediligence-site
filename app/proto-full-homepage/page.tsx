import { About } from "@/app/components/about";
import { DownloadsSection } from "@/app/components/downloads-section";
import { Hero } from "@/app/components/hero";
import { InstallSection } from "@/app/components/install-section";
import { MapSection } from "@/app/components/map-section";
import { RulesSection } from "@/app/components/rules-section";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { allSkills, packs } from "@/lib/content";

// Full-page preview of the real homepage with "the three stacks"
// (PackSelector) swapped out for the new map section — every other
// component is the real, unmodified one. Preview-only: app/page.tsx (the
// live homepage) is untouched; this route exists to review the map in its
// actual future context before it's promoted.
export default function ProtoFullHomepage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <MapSection />
        <RulesSection />
        <InstallSection />
        <DownloadsSection packs={packs} allSkills={allSkills} />
      </main>
      <SiteFooter />
    </>
  );
}
