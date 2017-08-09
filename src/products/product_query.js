const graphql = require('graphql');
const GraphQLObjectType = graphql.GraphQLObjectType;
const GraphQLString = graphql.GraphQLString;
const GraphQLList = graphql.GraphQLList;
const GraphQLInt = graphql.GraphQLInt;
const {
    productType
} = require('./product_input_type')
const products = require('../mock_data');

const hello = {
    type: GraphQLString,
    resolve: function (_, args) {
        return "Hello GraphQL!"
    }
}

const getProducts = {
    type: new GraphQLList(productType),
    resolve: function (_, args) {
        return products
    }
}

module.exports = {
    hello: hello,
    getProducts: getProducts
}