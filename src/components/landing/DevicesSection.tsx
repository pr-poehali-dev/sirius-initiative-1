import { useState } from "react"
import { motion } from "framer-motion"
import type { Device } from "@/types"

const devices: Device[] = [
  {
    id: 'phone1',
    name: 'Phone (1)',
    year: '2022',
    brand: 'nothing',
    tagline: 'Первый. Прозрачный. Культовый.',
    specs: {
      display: '6.55" OLED, 120Hz, 1080×2400',
      processor: 'Snapdragon 778G+',
      camera: '50MP + 50MP / 16MP фронт',
      battery: '4500 mAh, 33W',
      ram: '8 / 12 GB RAM · 128 / 256 GB',
      price: 'от ~25 000 ₽',
    }
  },
  {
    id: 'phone2',
    name: 'Phone (2)',
    year: '2023',
    brand: 'nothing',
    tagline: 'Флагман. Мощь. Glyph 2.0.',
    specs: {
      display: '6.7" LTPO OLED, 1–120Hz, 1080×2412',
      processor: 'Snapdragon 8+ Gen 1',
      camera: '50MP (OIS) + 50MP / 32MP фронт',
      battery: '4700 mAh, 45W + 15W беспр.',
      ram: '8 / 12 GB RAM · 128 / 256 / 512 GB',
      price: 'от ~45 000 ₽',
    }
  },
  {
    id: 'phone2a',
    name: 'Phone (2a)',
    year: '2024',
    brand: 'nothing',
    tagline: 'Доступность без компромиссов.',
    specs: {
      display: '6.7" AMOLED, 120Hz, 1080×2412',
      processor: 'Dimensity 7200 Pro',
      camera: '50MP (OIS) + 50MP / 32MP фронт',
      battery: '5000 mAh, 45W',
      ram: '8 / 12 GB RAM · 128 / 256 GB',
      price: 'от ~30 000 ₽',
    }
  },
  {
    id: 'phone2aplus',
    name: 'Phone (2a) Plus',
    year: '2024',
    brand: 'nothing',
    tagline: 'Больше мощи. Тот же дизайн.',
    specs: {
      display: '6.7" AMOLED, 120Hz, 1080×2412',
      processor: 'Dimensity 7350 Pro',
      camera: '50MP (OIS) + 50MP / 50MP фронт',
      battery: '5000 mAh, 50W',
      ram: '12 GB RAM · 256 GB',
      price: 'от ~38 000 ₽',
    }
  },
  {
    id: 'cmfphone1',
    name: 'CMF Phone 1',
    year: '2024',
    brand: 'cmf',
    tagline: 'CMF by Nothing. Стиль по цене.',
    specs: {
      display: '6.67" AMOLED, 120Hz, 1080×2400',
      processor: 'Dimensity 7300',
      camera: '50MP (OIS) + 2MP / 16MP фронт',
      battery: '5000 mAh, 33W',
      ram: '6 / 8 GB RAM · 128 / 256 GB',
      price: 'от ~18 000 ₽',
    }
  },
]

const specLabels: Record<keyof Device['specs'], string> = {
  display: 'Дисплей',
  processor: 'Процессор',
  camera: 'Камера',
  battery: 'Батарея',
  ram: 'Память',
  price: 'Цена',
}

export default function DevicesSection({ isActive }: { isActive: boolean }) {
  const [selected, setSelected] = useState<string>('phone1')
  const active = devices.find(d => d.id === selected) ?? devices[0]

  return (
    <section className="relative h-screen w-full snap-start flex flex-col justify-center p-8 md:p-16 lg:p-24 scanlines overflow-hidden">
      <motion.span
        className="absolute top-8 left-8 md:left-16 lg:left-24 text-xs font-mono text-[#FF4D00] tracking-[0.3em] uppercase opacity-60"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 0.6 } : {}}
        transition={{ duration: 0.8 }}
      >
        devices
      </motion.span>

      <motion.h2
        className="glyph-line pl-6 text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8"
        style={{ fontFamily: "'Space Mono', monospace" }}
        initial={{ opacity: 0, y: 40 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        Все модели.
      </motion.h2>

      {/* Device tabs */}
      <motion.div
        className="flex flex-wrap gap-2 pl-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        {devices.map(d => (
          <button
            key={d.id}
            onClick={() => setSelected(d.id)}
            className={`px-4 py-1.5 text-xs font-mono tracking-widest uppercase border transition-all duration-200 rounded-none ${
              selected === d.id
                ? 'border-[#FF4D00] text-[#FF4D00] bg-[#FF4D00]/10 shadow-[0_0_10px_#FF4D0033]'
                : 'border-neutral-700 text-neutral-500 hover:border-neutral-500 hover:text-neutral-300'
            }`}
          >
            {d.brand === 'cmf' ? 'CMF ' : ''}{d.name}
          </button>
        ))}
      </motion.div>

      {/* Specs card */}
      <motion.div
        key={active.id}
        className="pl-6 max-w-2xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-baseline gap-4 mb-1">
          <span className="text-2xl md:text-3xl font-bold text-white font-mono">
            {active.brand === 'cmf' ? 'CMF ' : 'Nothing '}{active.name}
          </span>
          <span className="text-xs font-mono text-neutral-600 tracking-widest">{active.year}</span>
        </div>
        <p className="text-sm text-[#FF4D00] font-mono tracking-wide mb-6">{active.tagline}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(Object.keys(specLabels) as (keyof Device['specs'])[]).map((key, i) => (
            <motion.div
              key={key}
              className="border border-[#1C1C1C] bg-white/[0.02] px-4 py-3"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
            >
              <div className="text-[10px] font-mono text-neutral-600 tracking-widest uppercase mb-1">
                {specLabels[key]}
              </div>
              <div className={`text-sm font-mono ${key === 'price' ? 'text-[#FF4D00]' : 'text-white'}`}>
                {active.specs[key]}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

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
