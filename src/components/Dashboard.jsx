import { useMemo } from 'react'

export default function Dashboard({ gpaResult, courses }) {
  const totalCredits = useMemo(()=> courses.reduce((s,c)=> s + Number(c.credit_hours||0), 0), [courses])
  const progress = useMemo(()=> Math.min(100, Math.round((gpaResult.total_credits / Math.max(1,totalCredits)) * 100)), [gpaResult,totalCredits])
  const classification = useMemo(()=> {
    const cg = gpaResult.gpa
    if (cg >= 3.7) return 'First Class Honors'
    if (cg >= 3.3) return 'Second Class Upper'
    if (cg >= 2.7) return 'Second Class Lower'
    if (cg >= 2.0) return 'Pass'
    return 'Fail'
  }, [gpaResult])

  return (
    <section className="grid sm:grid-cols-3 gap-4">
      <Card title="GPA" value={gpaResult.gpa.toFixed(2)} subtitle={`From ${gpaResult.total_credits} credits`} accent="bg-blue-500"/>
      <Card title="Progress" value={`${progress}%`} subtitle="Completed this term" accent="bg-emerald-500"/>
      <Card title="Classification" value={classification} subtitle="Based on JKUAT bands" accent="bg-violet-500"/>
    </section>
  )
}

function Card({ title, value, subtitle, accent }) {
  return (
    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800">
      <div className="flex items-center gap-3">
        <span className={`inline-block w-2 h-8 rounded ${accent}`}></span>
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-300">{title}</p>
          <p className="text-2xl font-semibold text-slate-900 dark:text-white">{value}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}
