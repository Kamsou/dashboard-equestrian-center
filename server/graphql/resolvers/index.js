const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql')
const { LessonType } = require('../types')
const Lesson = require('../../models/Lesson')

// Add Lesson
const addLesson = {
  name: 'addLesson',
  type: LessonType,
  args: {
    name: { type: GraphQLString },
    level: { type: GraphQLString },
    schedule: { type: GraphQLString },
    coach: { type: GraphQLString },
    training_place: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    const lesson = new Lesson({
      name: args.name,
      level: args.level,
      schedule: args.schedule,
      coach: args.coach,
      training_place: args.training_place
    })
    const new_lesson = await lesson.save()

    return new_lesson
  }
}

// Delete Lesson
const deleteLesson = {
  name: 'deleteLesson',
  type: LessonType,
  args: { id: { type: GraphQLID } },
  resolve: async (parent, args) => {
    const deleted_lesson = await Lesson.findByIdAndDelete(args.id)

    return deleted_lesson
  }
}

// Update Lesson
const updateLesson = {
  name: 'deleteLesson',
  type: LessonType,
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    level: { type: GraphQLString },
    schedule: { type: GraphQLString },
    coach: { type: GraphQLString },
    training_place: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    const updated_lesson = await Lesson.findByIdAndUpdate(args.id, {
      name: args.name,
      level: args.level,
      schedule: args.schedule,
      coach: args.coach,
      training_place: args.training_place,
    })

    return updated_lesson
  }
}

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    addLesson,
    deleteLesson,
    updateLesson
  }
})

module.exports = RootMutation