import { AboutActivity } from "@/components/about/about-activity";
import { AboutArchitecture } from "@/components/about/about-architecture";
import { AboutCollab } from "@/components/about/about-collab";
import { AboutIntro } from "@/components/about/about-intro";
import { AboutSkills } from "@/components/about/about-skills";
import { AboutWork } from "@/components/about/about-work";
import type { Activity } from "@/types/activityType";
import type { About } from "@/types/aboutType";
import type { Skill } from "@/types/skillType";

interface AboutPageProps {
  aboutData: About;
  skillsData: Skill[];
  activity: Activity;
  /** Number of commits in this repository, shown in the case study's outcome. */
  commitTotal: number;
  /** Names for the orbiting plaques on the 3D badge. */
  plaques: string[];
}

export default function AboutPage({ aboutData, skillsData, activity, commitTotal, plaques }: AboutPageProps) {
  return (
    <main className="relative min-h-[60vh] overflow-x-clip">
      {/* Ambient glow behind the hero, in the site's two accent hues */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[60px] right-[6%] size-[520px] rounded-full bg-emerald-500/15 blur-[80px] dark:bg-emerald-500/20" />
        <div className="absolute top-[380px] -right-[8%] size-[480px] rounded-full bg-indigo-500/15 blur-[80px] dark:bg-indigo-500/25" />
      </div>

      <AboutIntro about={aboutData} plaques={plaques} />
      <AboutWork />
      <AboutArchitecture commitTotal={commitTotal} />
      <AboutSkills skills={skillsData} />
      <AboutActivity activity={activity} />
      <AboutCollab about={aboutData} />
    </main>
  );
}
