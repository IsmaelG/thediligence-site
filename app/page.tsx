import { About } from "@/app/components/about";
import { DownloadsSection } from "@/app/components/downloads-section";
import { Hero } from "@/app/components/hero";
import { InstallSection } from "@/app/components/install-section";
import { PackSelector } from "@/app/components/pack-selector";
import { RulesSection } from "@/app/components/rules-section";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { allSkills, packs } from "@/lib/content";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <PackSelector packs={packs} />
        <RulesSection />
        <InstallSection />
        <DownloadsSection packs={packs} allSkills={allSkills} />
      </main>
      <SiteFooter />
    </>
  );
}
