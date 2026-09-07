import { motion } from 'framer-motion'
import { useCalculator } from '../lib/useCalculator.js'
import CalcButton from './CalcButton.jsx'
import Display from './Display.jsx'

const BUTTONS = [
  { label: 'C',  action: { type: 'CLEAR' },                variant: 'function' },
  { label: '⌫',  action: { type: 'DELETE' },              variant: 'function' },
  { label: '%',  action: { type: 'PERCENT' },             variant: 'function' },
  { label: '÷',  action: { type: 'OPERATOR', op: '÷' },   variant: 'operator' },

  { label: '7',  action: { type: 'DIGIT', digit: '7' },   variant: 'number' },
  { label: '8',  action: { type: 'DIGIT', digit: '8' },   variant: 'number' },
  { label: '9',  action: { type: 'DIGIT', digit: '9' },   variant: 'number' },
  { label: '×',  action: { type: 'OPERATOR', op: '×' },   variant: 'operator' },

  { label: '4',  action: { type: 'DIGIT', digit: '4' },   variant: 'number' },
  { label: '5',  action: { type: 'DIGIT', digit: '5' },   variant: 'number' },
  { label: '6',  action: { type: 'DIGIT', digit: '6' },   variant: 'number' },
  { label: '−',  action: { type: 'OPERATOR', op: '−' },   variant: 'operator' },

  { label: '1',  action: { type: 'DIGIT', digit: '1' },   variant: 'number' },
  { label: '2',  action: { type: 'DIGIT', digit: '2' },   variant: 'number' },
  { label: '3',  action: { type: 'DIGIT', digit: '3' },   variant: 'number' },
  { label: '+',  action: { type: 'OPERATOR', op: '+' },   variant: 'operator' },

  { label: '0',  action: { type: 'DIGIT', digit: '0' },   variant: 'number', wide: true },
  { label: '.',  action: { type: 'DECIMAL' },             variant: 'number' },
  { label: '=',  action: { type: 'EQUALS' },              variant: 'equals' },
]

export default function Calculator() {
  const { state, dispatch } = useCalculator()

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-[400px] rounded-[2rem] bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/50 p-5 sm:p-6"
    >
      <Display display={state.display} previous={state.previous} />
      <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
        {BUTTONS.map((btn, i) => (
          <CalcButton
            key={i}
            label={btn.label}
            variant={btn.variant}
            wide={btn.wide}
            onClick={() => dispatch(btn.action)}
          />
        ))}
      </div>
    </motion.div>
  )
}
