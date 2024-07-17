import 'dotenv/config'
import express from 'express'

const main = async () => {
  const app = express()

  const PORT = process.env.PORT_API || 3001

  app.listen(PORT, () => {
    console.log(`Started at :${PORT}`)
  })
}

main()
