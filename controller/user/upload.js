const { user } = require('../../models')

module.exports = (req, res) => {
  console.log(req.file)
  res.send('test')
}

