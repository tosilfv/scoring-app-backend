const app = require('./app')
const config = require('./util/config')

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT || 5000}`)
})
