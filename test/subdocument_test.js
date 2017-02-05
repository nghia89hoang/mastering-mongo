const assert = require('assert')
const User = require('../src/user')

describe('Subdocuments', () => {

  it('can create a subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{title: 'Post title'}]
    })
    joe.save()
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user.posts[0].title === 'Post title')
        done()
      })
  })
  
})
