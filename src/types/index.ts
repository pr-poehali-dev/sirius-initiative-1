import type { ReactNode } from "react"

export interface DeviceSpec {
  display: string
  processor: string
  camera: string
  battery: string
  ram: string
  price: string
}

export interface Device {
  id: string
  name: string
  year: string
  brand: 'nothing' | 'cmf'
  tagline: string
  specs: DeviceSpec
}

export interface Section {
  id: string
  title: string
  subtitle?: ReactNode
  content?: string
  showButton?: boolean
  buttonText?: string
  showDevices?: boolean
}

export interface SectionProps extends Section {
  isActive: boolean
}