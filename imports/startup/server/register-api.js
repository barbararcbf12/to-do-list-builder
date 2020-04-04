import { createApolloServer } from 'meteor/apollo'
import { makeExecutableSchema } from 'graphql-tools'
import merge from 'lodash/merge'

import GoalsSchema from '../../api/goals/Goal.graphql'
import GoalsResolvers from '../../api/goals/resolvers'
import ResolutionsSchema from '../../api/resolutions/Resolutions.graphql'
import ResolutionsResolvers from '../../api/resolutions/resolvers'
import UsersSchema from '../../api/users/User.graphql'
import UsersResolvers from '../../api/users/resolvers'

//GraphQL schema as dfgdfg 
const typeDefs = [
    ResolutionsSchema,
    UsersSchema,
    GoalsSchema
]

const resolvers = merge(
    ResolutionsResolvers, 
    UsersResolvers,
    GoalsResolvers
)

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

createApolloServer({ schema })