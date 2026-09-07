import { motion } from 'framer-motion'

export default function Display({ display, previous }) {
  const len = display.length
  const sizeClass =
    len > 11 ? 'text-3xl sm:text-4xl'
      : len > 9 ? 'text-4xl sm:text-5xl'
        : len > 7 ? 'text-5xl sm:text-6xl'
          : 'text-6xl sm:text-7xl'

  return (
    <div className="px-2 pt-6 pb-8 min-h-[8.5rem] flex flex-col justify-end">
      <motion.div
        key={previous}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ duration: 0.2 }}
        className="text-right text-slate-400 text-base sm:text-lg font-light min-h-[1.75rem] truncate"
      >
        {previous}
      </motion.div>
      <motion.div
        key={display}
        initial={{ opacity: 0.5, y: -3 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.12 }}
        className={`text-right font-light text-white tabular-nums ${sizeClass} leading-none tracking-tight truncate`}
      >
        {display}
      </motion.div>
    </div>
  )
}
