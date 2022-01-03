const { GraphQLString, GraphQLID, GraphQLObjectType } = require ('graphql')

const LessonType = new GraphQLObjectType({
  name: 'LessonType',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    level: {type: GraphQLString},
    schedule: {type: GraphQLString},
    coach: {type: GraphQLString},
    training_place: {type: GraphQLString},
  })
})

module.exports = { LessonType }