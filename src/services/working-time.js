import timestring from 'timestring'

const lib = {
  toString: (ms) => {
    const DAYS_PER_WEEK = 5
    const HOURS_PER_DAY = 8
    const MINUTES_PER_HOUR = 60
    const SECONDS_PER_MINUTE = 60

    const units = [{
      text: 'w',
      value: SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY * DAYS_PER_WEEK
    }, {
      text: 'd',
      value: SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY
    }, {
      text: 'h',
      value: SECONDS_PER_MINUTE * MINUTES_PER_HOUR
    }, {
      text: 'm',
      value: SECONDS_PER_MINUTE
    }, {
      text: 's',
      value: 1
    }]

    const result = units.reduce((last, unit) => {
      const r = last.value % unit.value
      const a = (last.value - r) / unit.value

      return {
        value: r,
        fragments: [
          ...last.fragments,
          a ? `${a}${unit.text}` : null
        ].filter(Boolean)
      }
    }, {
      fragments: [],
      value: ms
    })

    return result.fragments.join(' ') || '0s'
  },
  toNumber: (timestr = '1000') => {
    const DEFAULT_TIME = '1h'

    try {
      return timestring(timestr)
    } catch (e) {
      return timestring(DEFAULT_TIME)
    }
  }
}

export default lib
