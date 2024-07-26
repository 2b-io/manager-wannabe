import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(timezone)

dayjs.tz.setDefault(dayjs.tz.guess())

export default dayjs
