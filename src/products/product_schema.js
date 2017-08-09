const graphql = require('graphql');
const GraphQLSchema = graphql.GraphQLSchema;
const GraphQLObjectType = graphql.GraphQLObjectType;

const {
    hello,
    getProducts
} = require('./product_query');

const queryProduct = new GraphQLObjectType({
    name: "queryProduct",
    description: "query of product",
    fields: {
        hello: hello,
        getProducts: getProducts
    }
});

const ProductSchema = new GraphQLSchema({
    query: queryProduct
});

module.exports = ProductSchema