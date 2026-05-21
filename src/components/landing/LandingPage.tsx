import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Section from './Section'
import DevicesSection from './DevicesSection'
import Layout from './Layout'
import { sections } from './sections'

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPosition = containerRef.current.scrollTop
        const windowHeight = window.innerHeight
        const newActiveSection = Math.floor(scrollPosition / windowHeight)
        setActiveSection(newActiveSection)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const handleNavClick = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth'
      })
    }
  }

  return (
    <Layout>
      {/* Progress bar — Nothing orange */}
      <motion.div
        className="fixed top-[52px] left-0 right-0 h-[2px] bg-[#FF4D00] origin-left z-30 shadow-[0_0_8px_#FF4D00]"
        style={{ scaleX }}
      />

      {/* Right dot navigation */}
      <nav className="fixed top-0 right-0 h-screen flex flex-col justify-center z-30 p-5 gap-1">
        {sections.map((section, index) => (
          <button
            key={section.id}
            className="flex items-center justify-end gap-2 group py-1"
            onClick={() => handleNavClick(index)}
          >
            <motion.span
              className="text-[9px] font-mono tracking-widest uppercase text-[#FF4D00] opacity-0 group-hover:opacity-100 transition-opacity"
              animate={index === activeSection ? { opacity: 0.7 } : {}}
            >
              {section.id}
            </motion.span>
            <div
              className={`transition-all duration-300 rounded-none ${
                index === activeSection
                  ? 'w-4 h-1 bg-[#FF4D00] shadow-[0_0_6px_#FF4D00]'
                  : 'w-2 h-2 bg-neutral-700 rotate-45 hover:bg-neutral-500'
              }`}
            />
          </button>
        ))}
      </nav>

      <div
        ref={containerRef}
        className="h-full overflow-y-auto snap-y snap-mandatory"
      >
        {sections.map((section, index) =>
          section.showDevices ? (
            <DevicesSection key={section.id} isActive={index === activeSection} />
          ) : (
            <Section
              key={section.id}
              {...section}
              isActive={index === activeSection}
            />
          )
        )}
      </div>
    </Layout>
  )
}
