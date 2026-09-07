import { motion } from 'framer-motion'

const VARIANT_STYLES = {
  number: 'bg-white/[0.06] hover:bg-white/[0.12] text-white border-white/[0.08]',
  function: 'bg-white/[0.03] hover:bg-white/[0.07] text-sky-300 border-white/[0.05]',
  operator: 'bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 border-sky-400/20',
  equals:
    'bg-gradient-to-br from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white border-sky-400/30 shadow-lg shadow-sky-500/25',
}

export default function CalcButton({ label, onClick, variant = 'number', wide = false }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      className={[
        wide ? 'col-span-2' : '',
        VARIANT_STYLES[variant],
        'h-16 sm:h-20',
        'rounded-2xl sm:rounded-3xl',
        'text-2xl sm:text-3xl font-medium',
        'backdrop-blur-md border',
        'flex items-center justify-center',
        'transition-colors duration-150',
        'focus:outline-none',
      ].join(' ')}
    >
      {label}
    </motion.button>
  )
}
