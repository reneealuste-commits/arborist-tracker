'use client'

import { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import ArboristApp from '@/components/ArboristApp'

export default function Home() {
  const { data: session, status } = useSession()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, []) 

  if (!mounted) return null

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🌲</div>
          <div className="text-gray-600">Laen...</div>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="text-6xl mb-4">🌲</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Arborist Planner</h1>
          <p className="text-gray-600 mb-6 text-sm">Arborist'i tööde ja liidide haldamine</p>
          <button
            onClick={() => signIn('github')}
            className="w-full bg-black text-white rounded-lg py-3 font-semibold hover:bg-gray-800 transition-colors mb-3 flex items-center justify-center gap-2"
          >
            🐙 Logi sisse GitHub'iga
          </button>
          <button
            onClick={() => signIn()}
            className="w-full border border-gray-300 text-gray-700 rounded-lg py-3 font-semibold hover:bg-gray-50 transition-colors"
          >
            📧 Logi sisse emailiga
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <ArboristApp session={session} />
      <button
        onClick={() => signOut()}
        className="fixed bottom-4 right-4 text-xs px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-100"
      >
        Logi välja
      </button>
    </>
  )
}
