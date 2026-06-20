import { lazy, Suspense } from 'react'
import HeroSection from './HeroSection'
import './ThingsILove.css'

const Projects = lazy(() => import('./Projects'))
const Publications = lazy(() => import('./Publications'))
const Awards = lazy(() => import('./Awards'))
const Companies = lazy(() => import('./Companies'))
const Footer = lazy(() => import('./Footer'))
// Hidden for now — restore by re-adding <ThingsILove /> below.
// const ThingsILove = lazy(() => import('./ThingsILove'))

function App() {
  return (
    <main>
      <HeroSection />
      <Suspense fallback={null}>
        <Projects />
        <Publications />
        <Companies />
        <Awards />
        {/* <ThingsILove /> */}
        <Footer />
      </Suspense>
    </main>
  )
}

export default App
