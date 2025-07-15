import { gql } from "@apollo/client";

export const GET_PERMISSIONS = gql`
  query GET_PERMISSIONS {
    permissions {
      _id
      name
      description
    }
  }
`;

export const GET_ROLES = gql`
  query GET_ROLES($offset: Int!, $limit: Int!) {
    roles(offset: $offset, limit: $limit) {
      currentPage
      hasNextPage
      totalCount
      data {
        _id
        name
        description
        updatedAt
        assignTo {
          _id
        }
        permissions {
          _id
        }
      }
    }
  }
`;
