import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import GPAForm from './components/GPAForm'
import Dashboard from './components/Dashboard'
import Advisor from './components/Advisor'

function App() {
  const [theme, setTheme] = useState('light')
  const [gpaResult, setGpaResult] = useState(null)
  const [courses, setCourses] = useState([])

  useEffect(()=>{
    document.documentElement.classList.toggle('dark', theme==='dark')
  }, [theme])

  const onCalculate = (result, rows) => {
    setGpaResult(result)
    setCourses(rows)
  }

  const profile = useMemo(()=> ({ user_id: 'demo-user', name: 'Demo Student', program: 'Software Engineering', target_class: 'Second Class Upper' }), [])
  const semesters = useMemo(()=> ([{ term: 'Current', courses }]), [courses])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-5xl mx-auto px-4">
        <Header theme={theme} onToggleTheme={() => setTheme(theme==='dark'?'light':'dark')} />

        <main className="grid lg:grid-cols-3 gap-6 pb-10">
          <section className="lg:col-span-2 space-y-4">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Enter Courses</h2>
              <GPAForm onCalculate={onCalculate} />
            </div>

            {gpaResult && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Dashboard</h2>
                  <Dashboard gpaResult={gpaResult} courses={courses} />
                </div>
              </div>
            )}
          </section>

          <aside className="space-y-4">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Tips</h3>
              <ul className="list-disc pl-5 text-sm text-slate-700 dark:text-slate-300 space-y-1">
                <li>Double-check credit hours for each unit.</li>
                <li>Avoid duplicate entries for the same course code.</li>
                <li>Use your official transcript to confirm grades.</li>
              </ul>
            </div>
            {gpaResult && <Advisor profile={profile} semesters={semesters} />}
          </aside>
        </main>

        <footer className="py-6 text-center text-xs text-slate-500 dark:text-slate-400">
          Built for academic planning and GPA tracking.
        </footer>
      </div>
    </div>
  )
}

export default App
