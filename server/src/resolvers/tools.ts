import { IResolvers } from "graphql-tools";


const tools = [
    { id: 0, name: "Table Saw", brand: "Saw Stop"},
    {id: 1, name: "Planer", brand: "Delta"}
];

const resolverMap: IResolvers = {
    Query: {
        tools(_: void, args: void): any {
            return tools;
        }
    }
}

export default resolverMap;