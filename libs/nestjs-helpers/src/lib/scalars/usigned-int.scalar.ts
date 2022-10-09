import {
  GraphQLError,
  GraphQLInt,
  GraphQLScalarType,
} from 'graphql';

export const GraphQLUInt = new GraphQLScalarType({
  name: 'UInt',
  description:
    'The `UInt` scalar type represents non-fractional unsigned whole ' +
    'numeric values.',

  serialize(outputValue) {
    const num = GraphQLInt.serialize(outputValue);

    if (num < 0) {
      throw new GraphQLError(`UInt cannot represent negative value: ${num}`);
    }
    return num;
  },

  parseValue(inputValue) {
    const num = GraphQLInt.parseValue(inputValue);

    if (num < 0) {
      throw new GraphQLError(`UInt cannot represent negative value: ${num}`);
    }

    return num;
  },

  parseLiteral(valueNode) {
    const num = GraphQLInt.parseLiteral(valueNode);

    if (num < 0) {
      throw new GraphQLError(`UInt cannot represent negative value: ${num}`);
    }

    return num;
  },
});

export const UInt = GraphQLUInt;
