import { useState } from 'react'

const GRADE_OPTIONS = ['A','B','C','D','E','F']

export default function GPAForm({ onCalculate }) {
  const [rows, setRows] = useState([
    { code: 'SMA101', name: 'Calculus I', credit_hours: 3, grade: 'A', category: 'math' },
    { code: 'SCS101', name: 'Programming I', credit_hours: 3, grade: 'B', category: 'programming' },
  ])
  const [error, setError] = useState('')

  const addRow = () => setRows([...rows, { code: '', name: '', credit_hours: 3, grade: 'B', category: '' }])
  const removeRow = (i) => setRows(rows.filter((_, idx) => idx !== i))
  const update = (i, key, val) => setRows(rows.map((r, idx) => idx === i ? { ...r, [key]: val } : r))

  const submit = async () => {
    setError('')
    // Frontend validation
    const seen = new Set()
    for (const r of rows) {
      if (!r.code || !r.name) return setError('Please fill course code and name for all rows.')
      if (seen.has(r.code.toUpperCase())) return setError(`Duplicate course code: ${r.code}`)
      seen.add(r.code.toUpperCase())
      const ch = Number(r.credit_hours)
      if (!(ch > 0 && ch <= 10)) return setError(`Invalid credit hours for ${r.code}`)
      if (!GRADE_OPTIONS.includes(String(r.grade).toUpperCase())) return setError(`Invalid grade for ${r.code}`)
    }

    const body = { courses: rows.map(r => ({...r, credit_hours: Number(r.credit_hours), grade: String(r.grade).toUpperCase()})) }
    const base = import.meta.env.VITE_BACKEND_URL || ''
    try {
      const res = await fetch(`${base}/api/gpa`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
      })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      onCalculate(data, rows)
    } catch (e) {
      setError(String(e))
    }
  }

  return (
    <div className="space-y-3">
      {error && <div className="p-2 text-sm bg-red-50 text-red-700 border border-red-200 rounded">{error}</div>}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 dark:text-slate-300">
              <th>Code</th><th>Name</th><th>Credits</th><th>Grade</th><th>Category</th><th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-slate-200 dark:border-slate-700/60">
                <td><input value={r.code} onChange={e=>update(i,'code',e.target.value)} className="w-28 px-2 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded"/></td>
                <td><input value={r.name} onChange={e=>update(i,'name',e.target.value)} className="w-48 px-2 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded"/></td>
                <td><input type="number" min="0" max="10" value={r.credit_hours} onChange={e=>update(i,'credit_hours',e.target.value)} className="w-20 px-2 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded"/></td>
                <td>
                  <select value={r.grade} onChange={e=>update(i,'grade',e.target.value)} className="px-2 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded">
                    {GRADE_OPTIONS.map(g => <option key={g}>{g}</option>)}
                  </select>
                </td>
                <td><input value={r.category||''} onChange={e=>update(i,'category',e.target.value)} className="w-36 px-2 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded"/></td>
                <td>
                  <button onClick={()=>removeRow(i)} className="text-red-600 text-xs">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2">
        <button onClick={addRow} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700/40 rounded border border-slate-300 dark:border-slate-600">Add course</button>
        <button onClick={submit} className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-500">Calculate GPA</button>
      </div>
    </div>
  )
}
