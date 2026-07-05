import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useThemeStore } from './lib/store/themeStore'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './admin/components/guards/ProtectedRoute'
import AdminLayout from './admin/components/layout/AdminLayout'
import ToastProvider from './admin/components/ui/Toast'

/* Auth pages */
import LoginPage from './admin/pages/auth/LoginPage'
import ForgotPasswordPage from './admin/pages/auth/ForgotPasswordPage'
import ResetPasswordPage from './admin/pages/auth/ResetPasswordPage'

/* Admin pages */
import DashboardPage from './admin/pages/dashboard/DashboardPage'
import HeroEditPage from './admin/pages/hero/HeroEditPage'
import AboutEditPage from './admin/pages/about/AboutEditPage'
import ProjectListPage from './admin/pages/projects/ProjectListPage'
import ProjectCreatePage from './admin/pages/projects/ProjectCreatePage'
import ProjectEditPage from './admin/pages/projects/ProjectEditPage'
import OrganizationsPage from './admin/pages/organizations/OrganizationsPage'
import TestimonialsPage from './admin/pages/testimonials/TestimonialsPage'
import BlogListPage from './admin/pages/blog/BlogListPage'
import BlogCreatePage from './admin/pages/blog/BlogCreatePage'
import BlogEditPage from './admin/pages/blog/BlogEditPage'
import FutureProjectsPage from './admin/pages/futureProjects/FutureProjectsPage'
import GalleryListPage from './admin/pages/gallery/GalleryListPage'
import TechStackPage from './admin/pages/techStack/TechStackPage'
import ServicesPage from './admin/pages/services/ServicesPage'
import MediaEditPage from './admin/pages/media/MediaEditPage'
import HealthcareListPage from './admin/pages/healthcare/HealthcareListPage'
import ContactMessagesPage from './admin/pages/contact/ContactMessagesPage'
import SettingsPage from './admin/pages/settings/SettingsPage'

/* Error pages */
import NotFoundPage from './admin/pages/errors/NotFoundPage'
import UnauthorizedPage from './admin/pages/errors/UnauthorizedPage'

/* Portfolio */
import Portfolio from './components/Portfolio'
import BlogDetailPage from './components/sections/BlogDetailPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false, staleTime: 30000 },
  },
})

function ThemeSync() {
  const theme = useThemeStore((s) => s.theme)
  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])
  return null
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeSync />
      <BrowserRouter>
        <ToastProvider />
        <Routes>
          {/* Public auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

          {/* Protected admin routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="hero" element={<HeroEditPage />} />
              <Route path="about" element={<AboutEditPage />} />
              <Route path="projects" element={<ProjectListPage />} />
              <Route path="projects/create" element={<ProjectCreatePage />} />
              <Route path="projects/edit/:id" element={<ProjectEditPage />} />
              <Route path="organizations" element={<OrganizationsPage />} />
              <Route path="testimonials" element={<TestimonialsPage />} />
              <Route path="blog" element={<BlogListPage />} />
              <Route path="blog/create" element={<BlogCreatePage />} />
              <Route path="blog/edit/:id" element={<BlogEditPage />} />
              <Route path="future-projects" element={<FutureProjectsPage />} />
              <Route path="gallery" element={<GalleryListPage />} />
              <Route path="tech-stack" element={<TechStackPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="media" element={<MediaEditPage />} />
              <Route path="healthcare" element={<HealthcareListPage />} />
              <Route path="contact" element={<ContactMessagesPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Route>

          {/* Error routes */}
          <Route path="/401" element={<UnauthorizedPage />} />
          <Route path="/404" element={<NotFoundPage />} />

          {/* Blog detail */}
          <Route path="/blog/:slug" element={<BlogDetailPage />} />

          {/* Portfolio — catch-all */}
          <Route path="*" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
