import axios from 'axios'
// node 內建的檔案系統功能，不需要 npm 安裝
// import fs from 'node:fs'
// import template from '../templates/cafe.js'
import { distance } from './distance.js'

export default async (event) => {
  try {
    const { data } = await axios.get('https://cafenomad.tw/api/v1.2/cafes/taipei')
    const result = data
      .map((value) => {
        value.distance = distance(
          value.latitude,
          value.longitude,
          event.message.latitude,
          event.message.longitude,
          'k',
        )
        return value
      })
      .sort((a, b) => {
        return a.distance - b.distance
      })
      .slice(0, 3)
      .map((value) => {
        return `${value.name}: ${value.address}, 距離 ${value.distance}公里`
      })

    console.log(result)

    await event.reply(result)
  } catch (error) {
    console.error(error)
  }
}
