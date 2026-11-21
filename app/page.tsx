import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Development } from "@/components/sections/Development";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { profile, siteMeta } from "@/data/profile";
import { siteUrl } from "@/lib/site";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "Computer Engineer",
    description: siteMeta.description,
    url: siteUrl,
    email: `mailto:${profile.email}`,
    telephone: profile.phone.tel,
    address: { "@type": "PostalAddress", addressLocality: "Riyadh", addressCountry: "SA" },
    sameAs: [profile.linkedin, profile.github],
    knowsAbout: ["Artificial Intelligence", "Data Engineering", "Intelligent Systems", "Edge AI", "Large Language Models"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Development />
      <Education />
      <Contact />
    </>
  );
}
