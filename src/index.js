const Hapi = require("hapi")
const GraphQL = require("hapi-graphql")
const graphql = require('graphql');
const fetchSchema = require('fetch-graphql-schema');
const fs = require('fs');

const GraphQLSchema = graphql.GraphQLSchema;
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLList = graphql.GraphQLList;
const GraphQLInt = graphql.GraphQLInt;

const productSchema = require('./products/product_schema');

const server = new Hapi.Server();

server.connection({
    port: 3000
});

server.register({
    register: GraphQL,
    options: {
        query: (req) => ({
            pretty: true,
            graphiql: true,
            formatError: error => ({
                message: error.message,
                locations: error.locations,
                stack: error.stack
            }),
            schema: productSchema
        }),
        route: {
            path: '/graphql',
            config: {}
        }
    }
}, () => {
    server.start(() => console.log('Server running at:', server.info.uri))
    fetchSchema('http://localhost:3000/graphql')
        .then(schemaJSON => {
            fs.writeFile('schema.json', schemaJSON, function (err) {
                if (err) return console.log(err);
                console.log('write file schema.json successfully...');
            });
        });
});