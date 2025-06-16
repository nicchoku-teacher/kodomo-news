
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Kids() {
  const router = useRouter()
  const [list, setList] = useState<any[]>([])
  const [i, setI] = useState(0)

  useEffect(() => {
    if (router.query.data) {
      setList(JSON.parse(router.query.data as string))
    }
  }, [router.query.data])

  if (!list.length) return <p>ニュースがありません。</p>

  const news = list[i]

  return (
    <div style={{ padding: 20 }}>
      <h2>今日のニュース</h2>
      <p>{news.title}</p>
      <a href={news.link} target="_blank" rel="noreferrer">くわしく見る</a>
      <div style={{ marginTop: 20 }}>
        <button disabled={i === 0} onClick={() => setI(i - 1)}>もどる</button>
        <button disabled={i === list.length - 1} onClick={() => setI(i + 1)}>すすむ</button>
      </div>
    </div>
  )
}
