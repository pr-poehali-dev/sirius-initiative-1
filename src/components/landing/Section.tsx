import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { SectionProps } from "@/types"

export default function Section({ id, title, subtitle, content, isActive, showButton, buttonText, onButtonClick }: SectionProps) {
  return (
    <section id={id} className="relative h-screen w-full snap-start flex flex-col justify-center p-8 md:p-16 lg:p-24 scanlines">
      {/* Section index label */}
      <motion.span
        className="absolute top-8 left-8 md:left-16 lg:left-24 text-xs font-mono text-[#FF4D00] tracking-[0.3em] uppercase opacity-60"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 0.6 } : {}}
        transition={{ duration: 0.8 }}
      >
        {id}
      </motion.span>

      {subtitle && (
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {subtitle}
        </motion.div>
      )}

      <motion.h2
        className="glyph-line pl-6 text-4xl md:text-6xl lg:text-[5rem] xl:text-[6rem] font-bold leading-[1.1] tracking-tight max-w-4xl text-white"
        initial={{ opacity: 0, y: 50 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        {title}
      </motion.h2>

      {content && (
        <motion.p
          className="text-base md:text-lg lg:text-xl max-w-2xl mt-8 text-neutral-400 font-mono leading-relaxed pl-6"
          initial={{ opacity: 0, y: 50 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {content}
        </motion.p>
      )}

      {showButton && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 md:mt-16 pl-6"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={onButtonClick}
            className="text-[#FF4D00] bg-transparent border-[#FF4D00] hover:bg-[#FF4D00] hover:text-black transition-all duration-300 font-mono tracking-widest uppercase text-sm rounded-none px-8"
          >
            {buttonText}
            <span className="ml-2 nothing-dot" />
          </Button>
        </motion.div>
      )}

      {/* Bottom decorative line */}
      <motion.div
        className="absolute bottom-8 left-8 md:left-16 lg:left-24 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <div className="w-8 h-px bg-[#FF4D00]" />
        <div className="w-2 h-px bg-neutral-600" />
        <div className="w-2 h-px bg-neutral-600" />
      </motion.div>
    </section>
  )
}