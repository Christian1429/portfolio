import {
  HeroSection,
  DemoViewSection,
  AboutSection,
  SkillsSection,
  ExperienceSection,
  EducationSection,
  ProjectsSection,
  CertificationsSection,
  AchievementsSection,
  ServicesSection,
  BlogSection,
  ContactSection,
} from '@/components/sections';

async function PortfolioContent() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <DemoViewSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <CertificationsSection />
      <AchievementsSection />
      <ServicesSection />
      <BlogSection />
      <ContactSection />
    </>
  );
}

export default PortfolioContent;
