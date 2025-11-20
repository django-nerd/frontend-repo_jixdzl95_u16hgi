import { useEffect, useState } from 'react'

export default function Advisor({ profile, semesters }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!profile || !semesters?.length) return
    const base = import.meta.env.VITE_BACKEND_URL || ''
    const body = { profile, semesters }
    fetch(`${base}/api/advice`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)})
      .then(async r => { if(!r.ok) throw new Error(await r.text()); return r.json() })
      .then(setData)
      .catch(e => setError(String(e)))
  }, [profile, semesters])

  if (error) return <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded">{error}</div>
  if (!data) return null

  return (
    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800 space-y-2">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">AI Academic Advisor</h3>
      <ul className="list-disc pl-5 text-sm text-slate-700 dark:text-slate-200 space-y-1">
        {data.insights.map((t,i)=>(<li key={i}>{t}</li>))}
      </ul>
      <div className="pt-2">
        <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">Recommendations</p>
        <ul className="list-disc pl-5 text-sm text-slate-700 dark:text-slate-200 space-y-1">
          {data.recommendations.map((t,i)=>(<li key={i}>{t}</li>))}
        </ul>
      </div>
    </div>
  )
}
