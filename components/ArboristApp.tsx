'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { supabase } from '@/lib/supabase'

export default function ArboristApp({ session }: { session: any }) {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState('dashboard')

  useEffect(() => {
    loadJobs()
  }, [session])

  const loadJobs = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('date', { ascending: true })

      if (error) throw error
      setJobs(data || [])
    } catch (err) {
      console.error('Error loading jobs:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">🌲</div>
          <div className="text-gray-600">Laen...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🌲</span>
            <span className="font-bold text-gray-900 text-sm uppercase tracking-tight">Arborist Planner</span>
          </div>
          <div className="text-xs text-gray-500">
            Tere, {session?.user?.name || session?.user?.email}!
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 flex">
          {[
            { id: 'dashboard', label: '🗓 Töölaud' },
            { id: 'jobs', label: '🪚 Tööd' },
            { id: 'leads', label: '🎯 Liidid' },
            { id: 'webmail', label: '📧 Postkast' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                page === item.id
                  ? 'text-black border-b-2 border-black -mb-px'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {page === 'dashboard' && (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h1 className="text-2xl font-bold mb-2">Oodatud!</h1>
            <p className="text-gray-600">Andmebaas on ühendatud. Nüüd saate oma töid salvestada ja igal pool neile juurde pääseda.</p>
            <p className="text-sm text-gray-400 mt-4">Tööd salvestatakse Supabase'i. Versel käib reaalajas sünkroonimine.</p>
          </div>
        )}

        {page === 'jobs' && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h1 className="text-xl font-bold mb-4">Tööd ({jobs.length})</h1>
            {jobs.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Töid pole veel. Alusta + nupu abil!</p>
            ) : (
              <div className="divide-y">
                {jobs.map((job) => (
                  <div key={job.id} className="py-3 flex justify-between">
                    <div>
                      <div className="font-semibold">{job.client_name}</div>
                      <div className="text-sm text-gray-500">{job.address}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{job.price} €</div>
                      <div className="text-xs text-gray-400">{job.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {page === 'leads' && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <p className="text-gray-600">Liidide haldus tuleb peagi</p>
          </div>
        )}

        {page === 'webmail' && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="text-3xl mb-2">📧</div>
            <p className="text-gray-600">Postkasti integratsioon tuleb peagi</p>
          </div>
        )}
      </main>
    </div>
  )
}
