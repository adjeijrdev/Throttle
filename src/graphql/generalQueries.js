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
          userProfile {
            fullName {
              firstName
              surname
              middleName
            }
          }
        }
        permissions {
          _id
        }
      }
    }
  }
`;

export const GET_ALL_STAFFS = gql`
  query GET_ALL_STAFF($offset: Int!, $limit: Int!) {
    staffs(offset: $offset, limit: $limit) {
      currentPage
      hasNextPage
      totalCount
      data {
        _id
        createdAt
        userProfile {
          contact
          email
          gender
          picture
          fullName {
            firstName
            middleName
            surname
          }
        }
        role {
          _id
          name
          description
        }
      }
    }
  }
`;

export const GET_ALL_VENDORS = gql`
  query GET_ALL_VENDORS($offset: Int!,$limit: Int!,$status: Status!
  ) {
    vendors(offset: $offset, limit: $limit, status: $status) {
      currentPage
      hasNextPage
      totalCount

      data {
        _id
        role
        status
        businessInfo {
          areaOfOperation
          businessAddress
          businessDescription
          businessRegistrationNumber
          businessType
          companyName
          logo
          webApplicationDomainName
          yearsInOpertion
        }
        financialDetails {
          bankAccountDetails {
            accountNumber
            bankName
            recipientName
          }
          mobileMoneyAccount {
            phoneNumber
            recipientName
          }
        }
        contactDetails {
          email
          phoneNumber
          name
        }
      }
    }
  }
`;
