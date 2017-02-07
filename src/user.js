const mongoose = require('mongoose')
const PostSchema = require('./post')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => {
        return name.length > 2
      },
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  posts: [PostSchema],// just asub document example
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
})
// care fat arrow func
UserSchema.virtual('postCount').get(function() {
  return this.posts.length
})

UserSchema.pre('remove', function(next) {
  const BlogPost = mongoose.model('blogPost')
  BlogPost.remove({_id: {$in: this.blogPosts} })
    .then(() => next())
})

const User = mongoose.model('user', UserSchema)

module.exports = User
