"use client"
import { type MotionValue, motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import {
  type ComponentProps,
  createContext,
  type HTMLAttributes,
  type MouseEventHandler,
  type ReactNode,
  type TouchEventHandler,
  useContext,
  useState,
} from "react"

interface ImageComparisonContextType {
  sliderPosition: number
  setSliderPosition: (pos: number) => void
  motionSliderPosition: MotionValue<number>
  mode: "hover" | "drag"
}

const ImageComparisonContext = createContext<ImageComparisonContextType | undefined>(undefined)

const useImageComparisonContext = () => {
  const context = useContext(ImageComparisonContext)
  if (!context) throw new Error("Must be used within Comparison")
  return context
}

export type ComparisonProps = HTMLAttributes<HTMLDivElement> & {
  mode?: "hover" | "drag"
}

export const Comparison = ({ className = "", mode = "drag", ...props }: ComparisonProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const motionValue = useMotionValue(50)
  const motionSliderPosition = useSpring(motionValue, { bounce: 0, duration: 0 })
  const [sliderPosition, setSliderPosition] = useState(50)

  const handleDrag = (domRect: DOMRect, clientX: number) => {
    if (!isDragging && mode === "drag") return
    const x = clientX - domRect.left
    const percentage = Math.min(Math.max((x / domRect.width) * 100, 0), 100)
    motionValue.set(percentage)
    setSliderPosition(percentage)
  }

  const handleMouseDrag: MouseEventHandler<HTMLDivElement> = e => {
    handleDrag(e.currentTarget.getBoundingClientRect(), e.clientX)
  }

  const handleTouchDrag: TouchEventHandler<HTMLDivElement> = e => {
    const touches = Array.from(e.touches)
    handleDrag(e.currentTarget.getBoundingClientRect(), touches[0]?.clientX ?? 0)
  }

  return (
    <ImageComparisonContext.Provider value={{ sliderPosition, setSliderPosition, motionSliderPosition, mode }}>
      <div
        className={`relative isolate w-full select-none overflow-hidden ${className}`}
        onMouseDown={() => mode === "drag" && setIsDragging(true)}
        onMouseLeave={() => mode === "drag" && setIsDragging(false)}
        onMouseMove={handleMouseDrag}
        onMouseUp={() => mode === "drag" && setIsDragging(false)}
        onTouchEnd={() => mode === "drag" && setIsDragging(false)}
        onTouchMove={handleTouchDrag}
        onTouchStart={() => mode === "drag" && setIsDragging(true)}
        {...props}
      />
    </ImageComparisonContext.Provider>
  )
}

export type ComparisonItemProps = ComponentProps<typeof motion.div> & {
  position: "left" | "right"
}

export const ComparisonItem = ({ className = "", position, ...props }: ComparisonItemProps) => {
  const { motionSliderPosition } = useImageComparisonContext()
  const leftClipPath = useTransform(motionSliderPosition, v => `inset(0 0 0 ${v}%)`)
  const rightClipPath = useTransform(motionSliderPosition, v => `inset(0 ${100 - v}% 0 0)`)
  return (
    <motion.div
      className={`absolute inset-0 h-full w-full ${className}`}
      style={{ clipPath: position === "left" ? leftClipPath : rightClipPath }}
      {...props}
    />
  )
}

export type ComparisonHandleProps = ComponentProps<typeof motion.div> & {
  children?: ReactNode
}

export const ComparisonHandle = ({ className = "", children, ...props }: ComparisonHandleProps) => {
  const { motionSliderPosition, mode } = useImageComparisonContext()
  const left = useTransform(motionSliderPosition, v => `${v}%`)
  return (
    <motion.div
      className={`-translate-x-1/2 absolute top-0 z-50 flex h-full w-16 items-center justify-center ${mode === "drag" ? "cursor-grab active:cursor-grabbing" : ""} ${className}`}
      style={{ left }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
