import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Device } from "@/types"

const devices: Device[] = [
  {
    id: 'phone4apro',
    name: 'Phone (4a) Pro',
    year: '2026',
    brand: 'nothing',
    tagline: 'Металл. 140x зум. Glyph Display.',
    image: '',
    specs: {
      display: '6.83" AMOLED, 1–144Hz, 5000 nits, Gorilla Glass 7i',
      processor: 'Snapdragon 7 Gen 4',
      camera: '50MP Sony LYT700c (OIS) + 50MP перископ 3.5x + 8MP UW / 32MP фронт',
      battery: '5080 mAh, 50W · IP68 · алюминиевый корпус',
      ram: '8 / 12 GB RAM · 128 / 256 GB',
      price: 'от £449 / ~42 000 ₽',
    }
  },
  {
    id: 'phone4a',
    name: 'Phone (4a)',
    year: '2026',
    brand: 'nothing',
    tagline: 'Glyph Bar. Тройная камера. Nothing OS 4.1.',
    image: '',
    specs: {
      display: '6.78" AMOLED, 120Hz, 1224×2720, Gorilla Glass 7i',
      processor: 'Snapdragon 7s Gen 4',
      camera: '50MP (OIS) + 50MP перископ 3.5x + 8MP UW / 32MP фронт',
      battery: '5080 mAh, 50W · IP65',
      ram: '8 / 12 GB RAM · 128 / 256 GB',
      price: 'от £349 / ~32 000 ₽',
    }
  },
  {
    id: 'phone3',
    name: 'Phone (3)',
    year: '2025',
    brand: 'nothing',
    tagline: 'Первый настоящий флагман. Glyph Matrix.',
    image: '',
    specs: {
      display: '6.67" AMOLED, 120Hz, 1.5K (2800×1260), 4500 nits',
      processor: 'Snapdragon 8s Gen 4',
      camera: '4×50MP (OIS + перископ 3x + UW) / 50MP фронт',
      battery: '5150 mAh, 65W + 15W беспр.',
      ram: '12 / 16 GB RAM · 256 / 512 GB',
      price: 'от $799 / ~75 000 ₽',
    }
  },
  {
    id: 'phone3apro',
    name: 'Phone (3a) Pro',
    year: '2025',
    brand: 'nothing',
    tagline: 'Перископ в среднем классе. Мощная камера.',
    image: '',
    specs: {
      display: '6.77" AMOLED, 120Hz, 1080×2392, 3000 nits',
      processor: 'Snapdragon 7s Gen 3',
      camera: '50MP (OIS) + 8MP UW + 50MP перископ 3x / 50MP фронт',
      battery: '5000 mAh, 50W + 7.5W обр.',
      ram: '12 GB RAM · 256 GB',
      price: 'от $409 / ~38 000 ₽',
    }
  },
  {
    id: 'phone3a',
    name: 'Phone (3a)',
    year: '2025',
    brand: 'nothing',
    tagline: 'Доступность. Три камеры. Nothing OS 3.',
    image: '',
    specs: {
      display: '6.77" AMOLED, 120Hz, 1080×2392, 3000 nits',
      processor: 'Snapdragon 7s Gen 3',
      camera: '50MP (OIS) + 8MP UW + 50MP теле / 32MP фронт',
      battery: '5000 mAh, 45W',
      ram: '8 / 12 GB RAM · 128 / 256 GB',
      price: 'от $379 / ~34 000 ₽',
    }
  },
  {
    id: 'phone2',
    name: 'Phone (2)',
    year: '2023',
    brand: 'nothing',
    tagline: 'Флагман. Мощь. Glyph Interface 2.0.',
    image: '',
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
    id: 'phone2aplus',
    name: 'Phone (2a) Plus',
    year: '2024',
    brand: 'nothing',
    tagline: 'Больше мощи. Тот же дизайн.',
    image: '',
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
    id: 'phone2a',
    name: 'Phone (2a)',
    year: '2024',
    brand: 'nothing',
    tagline: 'Доступность без компромиссов.',
    image: '',
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
    id: 'phone1',
    name: 'Phone (1)',
    year: '2022',
    brand: 'nothing',
    tagline: 'Первый. Прозрачный. Культовый.',
    image: '',
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
    id: 'cmfphone2',
    name: 'CMF Phone 2',
    year: '2025',
    brand: 'cmf',
    tagline: 'Металл. Glyph Strip. Ещё доступнее.',
    image: '',
    specs: {
      display: '6.67" AMOLED, 120Hz, 1080×2400, 2000 nits',
      processor: 'Dimensity 7300 Pro',
      camera: '50MP (OIS) + 2MP / 16MP фронт',
      battery: '5000 mAh, 33W · алюминиевый корпус',
      ram: '6 / 8 GB RAM · 128 / 256 GB',
      price: 'от £199 / ~18 000 ₽',
    }
  },
  {
    id: 'cmfphone1',
    name: 'CMF Phone 1',
    year: '2024',
    brand: 'cmf',
    tagline: 'CMF by Nothing. Первый. Стиль по цене.',
    image: '',
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
  const [selected, setSelected] = useState<string>('phone4apro')
  const active = devices.find(d => d.id === selected) ?? devices[0]

  return (
    <section className="relative h-screen w-full snap-start flex flex-col justify-center p-8 md:p-12 lg:p-20 scanlines overflow-hidden">
      <motion.span
        className="absolute top-8 left-8 md:left-12 lg:left-20 text-xs font-mono text-[#FF4D00] tracking-[0.3em] uppercase opacity-60"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 0.6 } : {}}
        transition={{ duration: 0.8 }}
      >
        devices
      </motion.span>

      <motion.h2
        className="glyph-line pl-6 text-2xl md:text-4xl font-bold tracking-tight text-white mb-4"
        style={{ fontFamily: "'Space Mono', monospace" }}
        initial={{ opacity: 0, y: 40 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        Все модели.
      </motion.h2>

      {/* Device tabs */}
      <motion.div
        className="flex flex-wrap gap-1.5 pl-6 mb-5"
        initial={{ opacity: 0, y: 20 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        {devices.map(d => (
          <button
            key={d.id}
            onClick={() => setSelected(d.id)}
            className={`px-3 py-1 text-[10px] font-mono tracking-widest uppercase border transition-all duration-200 rounded-none ${
              selected === d.id
                ? 'border-[#FF4D00] text-[#FF4D00] bg-[#FF4D00]/10 shadow-[0_0_10px_#FF4D0033]'
                : 'border-neutral-800 text-neutral-600 hover:border-neutral-500 hover:text-neutral-300'
            }`}
          >
            {d.name}
          </button>
        ))}
      </motion.div>

      {/* Main content: specs + photo */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          className="pl-6 flex gap-8 items-start"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {/* Specs */}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-xl md:text-2xl font-bold text-white font-mono">
                {active.name}
              </span>
              <span className="text-xs font-mono text-neutral-600 tracking-widest">{active.year}</span>
            </div>
            <p className="text-xs text-[#FF4D00] font-mono tracking-wide mb-4">{active.tagline}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(Object.keys(specLabels) as (keyof Device['specs'])[]).map((key, i) => (
                <motion.div
                  key={key}
                  className="border border-[#1C1C1C] bg-white/[0.02] px-3 py-2"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.04 }}
                >
                  <div className="text-[9px] font-mono text-neutral-600 tracking-widest uppercase mb-0.5">
                    {specLabels[key]}
                  </div>
                  <div className={`text-xs font-mono leading-snug ${key === 'price' ? 'text-[#FF4D00]' : 'text-white'}`}>
                    {active.specs[key]}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>


        </motion.div>
      </AnimatePresence>

      {/* Bottom decorative line */}
      <motion.div
        className="absolute bottom-8 left-8 md:left-12 lg:left-20 flex items-center gap-3"
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