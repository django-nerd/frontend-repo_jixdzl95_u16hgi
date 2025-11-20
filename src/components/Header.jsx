import { useEffect, useState } from 'react'

export default function Header({ theme, onToggleTheme }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <header className="flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        <img src="/flame-icon.svg" alt="Logo" className="w-8 h-8" />
        <h1 className="text-xl font-semibold text-slate-900 dark:text-white">GPA Calculator & Planner</h1>
      </div>
      <div className="flex items-center gap-3">
        <a href="https://jkuat.ac.ke" target="_blank" className="text-sm text-slate-600 dark:text-slate-300 hover:underline">JKUAT</a>
        <button onClick={onToggleTheme} className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/40">
          {mounted && theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </header>
  )
}
