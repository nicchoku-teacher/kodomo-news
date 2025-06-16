export const config = { runtime: 'nodejs' };

import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'
import { parseStringPromise } from 'xml2js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('https://www3.nhk.or.jp/news/easy/news-list.xml')
    const xml = await response.text()
    const json = await parseStringPromise(xml)
    const items = json.rss.channel[0].item.slice(0, 5)

    const news = items.map((item: any) => ({
      title: item.title[0],
      link: item.link[0],
      pubDate: item.pubDate[0]
    }))

    res.status(200).json({ status: 'ok', news })
  } catch (e) {
    console.error('NHK RSS取得失敗:', e)
    res.status(500).json({ status: 'error', message: 'ニュースの取得に失敗しました。' })
  }
}
