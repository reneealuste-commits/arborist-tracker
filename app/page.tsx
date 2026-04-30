'use client'
import dynamic from 'next/dynamic'

const ArboristApp = dynamic(() => import('../../components/ArboristApp'), {
  ssr: false,
  loading: () => (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:48}}>🌲</div>
        <div style={{marginTop:8,color:'#666'}}>Laen...</div>
      </div>
    </div>
  )
})

export default function Home() {
  return <ArboristApp />
}
