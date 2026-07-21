import { HeroSection } from './components/HeroSection'
import { ExpertiseMarquee } from './components/ExpertiseMarquee'
import { StatementSection } from './components/StatementSection'
import { FocusAreasSection } from './components/FocusAreasSection'
import { ExperienceCarousel } from './components/ExperienceCarousel'
import { SelectedWorkSection } from './components/SelectedWorkSection'
import { IndependentProjectsSection } from './components/IndependentProjectsSection'
import { InsightsSection } from './components/InsightsSection'
import { AboutSection } from './components/AboutSection'
import { SkillsSection } from './components/SkillsSection'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { CopyrightBar } from './components/CopyrightBar'
import { BottomNav } from './components/BottomNav'

function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-2 focus:shadow-nav"
      >
        Skip to main content
      </a>
      <main id="main">
        <HeroSection />
        <ExpertiseMarquee />
        <StatementSection />
        <FocusAreasSection />
        <ExperienceCarousel />
        <SelectedWorkSection />
        <IndependentProjectsSection />
        <InsightsSection />
        <AboutSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
      <CopyrightBar />
      <BottomNav />
    </>
  )
}

export default App
