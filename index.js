import 'dotenv/config'
import linebot from 'linebot'
import commandExrates from './commands/exrate.js'
import commandWda from './commands/wda.js'
import commandCourse from './commands/course.js'
import commandCafe from './commands/cafe.js'

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
})

bot.on('message', (event) => {
  // 一層一層 debug 看哪裡出錯
  console.log(1)
  if (event.message.type === 'text') {
    // console.log(2)
    if (event.message.text === '匯率') {
      commandExrates(event)
    } else if (event.message.text === '職訓') {
      // console.log(3)
      commandWda(event)
    }
  } else if (event.message.type === 'location') {
    commandCafe(event)
    console.log(4)
  }
})

bot.on('postback', (event) => {
  if (event.postback.data === 'course') {
    commandCourse(event)
  }
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
