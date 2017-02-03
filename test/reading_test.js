const asset = require('assert')
const User = require('../src/user')

describe('Reading user out of database', () => {
  let joe
  beforeEach((done) => {
    joe = new User({name: 'Joe'})
    joe.save().then(() => done())
  })

  it('Find all user with a name of "Joe"', (done) => {
    User.find({name: 'Joe'})
      .then((users) => {
        assert(users[0]._id.toString() === joe._id.toString())
        done()
      })
  })
})
