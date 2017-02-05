const assert = require('assert')
const User = require('../src/user')

describe('Updating records', () => {
  let joe
  beforeEach((done ) => {
    joe = new User({name: 'Joe', postCount : 0})
    joe.save()
      .then(() => done())
  })

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1)
        assert(users[0].name === 'Alex')
        done()
      })
  }

  it('Instance type using set n save', (done) => {
    joe.set('name', 'Alex')
    // persist record to database
    assertName(joe.save(), done)
  })

  it('A model instance can update', (done) => {
    assertName(joe.update({name: 'Alex'}), done)
  })

  it('A model class can update', (done) => {
    assertName(User.update({name: 'Joe'}, {name: 'Alex'}), done)
  })

  it('A model class can update one record', (done) => {
    assertName(User.findOneAndUpdate({name: 'Joe'}, {name: 'Alex'}), done)
  })

  it('A model class can find a record with an Id and update', (done) => {
    assertName(User.findByIdAndUpdate(joe._id, {name: 'Alex'}), done)
  })

  it('A user can have their postCount increment by 1', (done) => {
    User.update({name: 'Joe'}, {$inc: {postCount: 1}})
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user.postCount === joe.postCount + 1)
        done()
      })
  })

  it('disallows invalid records from being saved', (done) => {
    const user = new User({name: 'Al'})
    user.save()
      .catch((validationResult) => {
        const {message} = validationResult.errors.name
        assert(message === 'Name must be longer than 2 characters.')
        done()
      })
  })
})
