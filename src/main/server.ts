import app from './config/app'

const port = 3000

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`)
})
