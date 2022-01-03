const { LessonType } = require('../types')
const { GraphQLObjectType, GraphQLList, GraphQLID } = require('graphql')
const Lesson = require('../../models/Lesson')

const lessons = {
  name: 'Lessons',
  type: GraphQLList(LessonType),
  resolve: async (parent, args) => {
    const lessons = await Lesson.find()
    return lessons
  }
}

const singleLesson = {
  name: 'singleLesson',
  type: LessonType,
  args: { id: { type: GraphQLID } },
  resolve: async (parent, args) => {
    const lesson = await Lesson.findById(args.id)
    return lesson
  }
}

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    lessons,
    singleLesson
  }
})

module.exports = RootQuery