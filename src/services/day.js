import dayjs from 'dayjs'
import objectSupport from 'dayjs/plugin/objectSupport'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(objectSupport)
dayjs.extend(timezone)
dayjs.extend(utc)

// dayjs.tz.setDefault(dayjs.tz.guess())
dayjs.tz.setDefault('Asia/Bangkok')

export default dayjs.tz
