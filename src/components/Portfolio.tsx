import { useEffect, useState } from 'react'
import { AdminProvider } from '../context/AdminContext'
import { PortfolioDataProvider } from '../context/PortfolioDataContext'
import Navbar from './layout/Navbar'
import ParticleBackground from './layout/ParticleBackground'
import HeroSection from './sections/HeroSection'
import MarqueeSection from './sections/MarqueeSection'
import AboutSection from './sections/AboutSection'
import TechStackSection from './sections/TechStackSection'
import ServicesSection from './sections/ServicesSection'
import ProjectsSection from './sections/ProjectsSection'
import MediaSection from './sections/MediaSection'
import StatsSection from './sections/StatsSection'
import HealthcareSection from './sections/HealthcareSection'
import OrganizationsSection from './sections/OrganizationsSection'
import EducationSection from './sections/EducationSection'
import TestimonialsSection from './sections/TestimonialsSection'
import BlogSection from './sections/BlogSection'
import GallerySection from './sections/GallerySection'
import FutureProjectsSection from './sections/FutureProjectsSection'
import ContactSection from './sections/ContactSection'
import CookieConsent from './ui/CookieConsent'
import { visitsApi } from '../lib/api/visits'
import { Link } from 'react-router-dom'

function PortfolioContent() {
  const [tracked, setTracked] = useState(false)
  useEffect(() => {
    if (tracked) return
    setTracked(true)
    visitsApi.track()
  }, [tracked])

  return (
    <PortfolioDataProvider>
      <CookieConsent />
      <div style={{ overflowX: 'clip' }} className="pb-16 md:pb-0">
        <ParticleBackground />
        <Navbar />
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <StatsSection />
        <TechStackSection />
        <ServicesSection />
        <ProjectsSection />
        <MediaSection />
        <HealthcareSection />
        <OrganizationsSection />
        <EducationSection />
        <TestimonialsSection />
        <BlogSection />
        <GallerySection />
        <FutureProjectsSection />
        <ContactSection />

        <footer className="bg-[var(--bg-page)] border-t border-[var(--border-subtle)] px-5 py-8">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[var(--text-muted-30)] text-xs">&copy; {new Date().getFullYear()} Sadiq Baba Idris. All rights reserved.</p>
            <Link
              to="/login"
              className="text-[var(--text-muted-20)] text-xs hover:text-[var(--text-muted)] transition-colors"
            >
              Admin
            </Link>
          </div>
        </footer>
      </div>
    </PortfolioDataProvider>
  )
}

export default function Portfolio() {
  return (
    <AdminProvider>
      <PortfolioContent />
    </AdminProvider>
  )
}
