import { gql, TypePolicy } from '@apollo/client';

export interface IOrderCount {
  state: string;
  count: number;
}
export const ORDER_COUNT_FRAGMENT_GQL = gql`
  fragment OrderCountFragment on OrderCount {
    state
    count
  }
`;

export const ORDER_COUNT_TYPE_POLICY: TypePolicy = {
  keyFields: ['state'],
};
