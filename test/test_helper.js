const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

before((done) => {
  const url = 'mongodb://localhost/users_test'
  mongoose.connect(url)
  mongoose.connection
    .once('open', () => {done()})
    .on('error', (error) => {
      console.warn('Warning', error)
    })
})

// Hook: function that will be executed before any test get executed inside the suit
beforeEach((done) => {
  const { users, comments, blogposts } = mongoose.connection.collections
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done()
      })
    })
  })
  // Promise.all([users.drop(), comments.drop(), blogposts.drop()])
  //   .then(() => done())
})
