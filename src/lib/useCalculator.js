import { useReducer } from 'react'

const initialState = {
  display: '0',
  previous: '',
  pending: null, // { op, value }
  overwrite: true,
  justEvaluated: false,
}

function compute(a, b, op) {
  switch (op) {
    case '+': return a + b
    case '−': return a - b
    case '×': return a * b
    case '÷': return b === 0 ? null : a / b
    default: return b
  }
}

function formatResult(n) {
  if (n === null || !isFinite(n)) return 'Error'
  const rounded = Math.round((n + Number.EPSILON) * 1e12) / 1e12
  if (rounded === 0) return '0'
  const abs = Math.abs(rounded)
  if (abs >= 1e15 || abs < 1e-9) return rounded.toExponential(4)
  return String(rounded)
}

function reducer(state, action) {
  switch (action.type) {
    case 'DIGIT': {
      const { digit } = action
      if (state.display === 'Error') {
        return { ...initialState, display: digit, overwrite: false }
      }
      if (state.overwrite || state.justEvaluated) {
        return {
          ...state,
          display: digit,
          previous: state.justEvaluated ? '' : state.previous,
          overwrite: false,
          justEvaluated: false,
        }
      }
      if (state.display === '0') return { ...state, display: digit }
      if (state.display.length >= 12) return state
      return { ...state, display: state.display + digit }
    }

    case 'DECIMAL': {
      if (state.display === 'Error') {
        return { ...initialState, display: '0.', overwrite: false }
      }
      if (state.overwrite || state.justEvaluated) {
        return {
          ...state,
          display: '0.',
          previous: state.justEvaluated ? '' : state.previous,
          overwrite: false,
          justEvaluated: false,
        }
      }
      if (state.display.includes('.')) return state
      return { ...state, display: state.display + '.' }
    }

    case 'OPERATOR': {
      const op = action.op
      if (state.display === 'Error') return state
      const current = parseFloat(state.display)
      if (state.pending && !state.overwrite) {
        const result = compute(state.pending.value, current, state.pending.op)
        const resultStr = formatResult(result)
        if (resultStr === 'Error') return { ...initialState, display: 'Error' }
        return {
          display: resultStr,
          previous: `${resultStr} ${op}`,
          pending: { op, value: result },
          overwrite: true,
          justEvaluated: false,
        }
      }
      return {
        ...state,
        previous: `${state.display} ${op}`,
        pending: { op, value: current },
        overwrite: true,
        justEvaluated: false,
      }
    }

    case 'EQUALS': {
      if (state.display === 'Error') return state
      if (!state.pending) {
        return {
          ...state,
          previous: `${state.display} =`,
          overwrite: true,
          justEvaluated: true,
        }
      }
      const current = parseFloat(state.display)
      const result = compute(state.pending.value, current, state.pending.op)
      const resultStr = formatResult(result)
      if (resultStr === 'Error') return { ...initialState, display: 'Error' }
      return {
        display: resultStr,
        previous: `${formatResult(state.pending.value)} ${state.pending.op} ${formatResult(current)} =`,
        pending: null,
        overwrite: true,
        justEvaluated: true,
      }
    }

    case 'CLEAR':
      return initialState

    case 'DELETE': {
      if (state.display === 'Error') return initialState
      if (state.overwrite || state.justEvaluated) return state
      if (state.display.length <= 1) {
        return { ...state, display: '0', overwrite: true }
      }
      return { ...state, display: state.display.slice(0, -1) }
    }

    case 'PERCENT': {
      if (state.display === 'Error') return state
      const current = parseFloat(state.display)
      return { ...state, display: formatResult(current / 100), overwrite: true }
    }

    default:
      return state
  }
}

export function useCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return { state, dispatch }
}
