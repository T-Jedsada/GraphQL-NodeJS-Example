const hapi = require('hapi');
const {
    apolloHapi,
    graphiqlHapi
} = require('apollo-server');

const graphql = require('graphql');
const GraphQLSchema = graphql.GraphQLSchema;
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLList = graphql.GraphQLList;
const GraphQLInt = graphql.GraphQLInt;

const products = require('./mock_data');

const server = new hapi.Server();

var voteType = new GraphQLObjectType({
    name: "vote",
    description: "vote of The product",
    fields: () => ({
        star: {
            type: GraphQLInt,
            description: "one_star of the vote",
        },
        men: {
            type: GraphQLInt,
            description: "men of vote",
        },
        women: {
            type: GraphQLInt,
            description: "women of vote",
        }
    })
});

var productType = new GraphQLObjectType({
    name: "products",
    description: "Detail of The product",
    fields: () => ({
        name: {
            type: GraphQLString,
            description: "Name of the product",
        },
        price: {
            type: GraphQLInt,
            description: "price of product",
        },
        category: {
            type: new GraphQLList(GraphQLString),
            description: "category of product",
        },
        vote: {
            type: new GraphQLList(voteType),
            description: "vote of product",
        }
    })
});

var queryType = new GraphQLObjectType({
    name: "queryProduct",
    description: "query of product",
    fields: () => ({
        hey: {
            type: GraphQLString,
            resolve: function (_, args) {
                return "Hello GraphQL!"
            }
        },
        pond: {
            type: new GraphQLList(productType),
            resolve: function (_, args) {
                return products
            }
        }
    })
});

var myGraphQLSchema = new GraphQLSchema({
    query: queryType
});

server.connection({
    host: 'localhost',
    port: 3000,
});

server.register({
    register: apolloHapi,
    options: {
        path: '/graphql',
        apolloOptions: () => ({
            pretty: true,
            schema: myGraphQLSchema,
        }),
    },
});

server.register({
    register: graphiqlHapi,
    options: {
        path: '/graphiql',
        graphiqlOptions: {
            endpointURL: '/graphql',
        },
    },
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});