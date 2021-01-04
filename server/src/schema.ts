import 'graphql-import-node';
import * as typeDefs from "./schemas/tools.graphql";
import { makeExecutableSchema } from "graphql-tools";
import resolvers from "./resolvers/tools"
import { GraphQLSchema } from "graphql";

const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers
});

export default schema;