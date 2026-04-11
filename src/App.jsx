import { lazy, Suspense } from 'react'
import HeroSection from './HeroSection'
import './ThingsILove.css'

const Projects = lazy(() => import('./Projects'))
const Publications = lazy(() => import('./Publications'))
const Awards = lazy(() => import('./Awards'))
const ThingsILove = lazy(() => import('./ThingsILove'))

function App() {
  return (
    <main>
      <HeroSection />
      <Suspense fallback={null}>
        <Projects />
        <Publications />
        <Awards />
        <ThingsILove />
      </Suspense>
    </main>
  )
}

export default App
