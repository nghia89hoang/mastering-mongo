const assert = require('assert')
const User = require('../src/user')

describe('Reading user out of database', () => {
  let joe, maria, alex, zach
  beforeEach((done) => {
    joe = new User({name: 'Joe'})
    alex = new User({name: 'Alex'})
    maria = new User({name: 'Maria'})
    zach = new User({name: 'Zach'})

    Promise.all([alex.save(), joe.save(), maria.save(), zach.save()])
      .then(() => done())
  })

  it('Find all user with a name of "Joe"', (done) => {
    User.find({name: 'Joe'})
      .then((users) => {
        assert(users[0]._id.toString() === joe._id.toString())
        done()
      })
  })

  it('Find user with particular id', (done) => {
    User.findOne({_id : joe._id})
      .then((user) => {
        assert(user.name === joe.name)
        done()
      })
  })

  it('can skip and limit the result set', (done) => {
    User.find({})
      .sort({name: 1})
      .skip(1)
      .limit(2)
      .then((users) => {
        //not sure about order of users due to parallel save() above
        assert(users.length === 2)
        assert(users[0].name === 'Joe')
        assert(users[1].name === 'Maria')
        done()
      })
  })
})
