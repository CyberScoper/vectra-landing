import { useState, useEffect, lazy, Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import LoadingScreen from './components/LoadingScreen'
import CustomCursor from './components/CustomCursor'
import Hero from './sections/Hero'
import Footer from './sections/Footer'
import { useTheme } from './hooks/useTheme'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { LocaleProvider } from './hooks/useLocale'

// Lazy load sections for better performance
const Features = lazy(() => import('./sections/Features'))
const Pricing = lazy(() => import('./sections/Pricing'))
const WhyUs = lazy(() => import('./sections/WhyUs'))
const Download = lazy(() => import('./sections/Download'))
const FAQ = lazy(() => import('./sections/FAQ'))

function AppContent() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const { theme, toggleTheme } = useTheme()

  useSmoothScroll()

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="noise-overlay">
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen progress={progress} />}
      </AnimatePresence>

      {!loading && (
        <>
          <CustomCursor />
          <ScrollProgress />
          <Navbar theme={theme} toggleTheme={toggleTheme} />

          <main className="grid-pattern">
            <Hero />

            <Suspense fallback={<SectionLoader />}>
              <Features />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <WhyUs />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <Pricing />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <Download />
            </Suspense>

            <Suspense fallback={<SectionLoader />}>
              <FAQ />
            </Suspense>
          </main>

          <Footer />
        </>
      )}
    </div>
  )
}

function SectionLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function App() {
  return (
    <LocaleProvider>
      <AppContent />
    </LocaleProvider>
  )
}

export default App
