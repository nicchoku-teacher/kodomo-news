
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Teacher() {
  const router = useRouter()
  const [news, setNews] = useState<any[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/fetchNews')
      .then(res => res.json())
      .then(data => {
        if (data.status !== 'ok') setError(data.message)
        else setNews(data.news.map((n: any) => ({ ...n, keep: true })))
      })
  }, [])

  const confirm = () => {
    const selected = news.filter(n => n.keep)
    router.push({ pathname: '/kids', query: { data: JSON.stringify(selected) } })
  }

  if (error) return <p>{error}</p>

  return (
    <div style={{ padding: 20 }}>
      <h2>先生用ニュース選び</h2>
      {news.map((item, index) => (
        <div key={index} style={{ marginBottom: 20 }}>
          <p>{item.title}</p>
          <button onClick={() => {
            const copy = [...news]
            copy[index].keep = !copy[index].keep
            setNews(copy)
          }}>
            {item.keep ? '✅ 残す' : '❌ スキップ'}
          </button>
        </div>
      ))}
      <button onClick={confirm}>決定</button>
    </div>
  )
}
