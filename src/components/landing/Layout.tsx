import { ReactNode } from 'react'
import { Squares } from "./squares-background"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen overflow-hidden bg-[#0A0A0A] relative">
      {/* Nothing OS grid background */}
      <div className="absolute inset-0 z-10">
        <Squares
          direction="diagonal"
          speed={0.3}
          squareSize={48}
          borderColor="#1C1C1C"
          hoverFillColor="#FF4D0008"
        />
      </div>

      {/* Top header bar */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-8 md:px-16 py-5 border-b border-[#1C1C1C]">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#FF4D00] shadow-[0_0_8px_#FF4D00]" />
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-white/70">Nothing Device Expert</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] shadow-[0_0_6px_#FF4D00]" />
        </div>
      </div>

      <div className="relative z-20 h-full pt-[52px]">
        {children}
      </div>
    </div>
  )
}
