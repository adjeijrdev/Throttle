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
  query GET_ROLES($offset: Int!, $limit: Int!, $search: String!) {
    roles(offset: $offset, limit: $limit, search: $search) {
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
  query GET_ALL_STAFF($offset: Int!, $limit: Int!, $search: String!) {
    staffs(offset: $offset, limit: $limit, search: $search) {
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
  query GET_ALL_VENDORS($offset: Int!, $limit: Int!, $status: Status!) {
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

export const GET_ROLE = gql`
  query GET_ROLE($roleId: ID!) {
    role(roleId: $roleId) {
      _id
      assignTo {
        _id
        userProfile {
          fullName {
            firstName
          }
        }
      }
      description
      name
      updatedAt
      permissions {
        _id
        name
        description
      }
    }
  }
`;

export const GET_STAFF = gql`
  query GET_STAFF($staffId: ID!) {
    staff(id: $staffId) {
      _id
      userProfile {
        contact
        email
        fullName {
          firstName
          surname
          middleName
        }
        gender
        picture
      }

      role {
        _id
        name
        description
      }

      preference {
        enable2FA
        enableEmailNotification
      }

      auditingAndConfirmation {
        lastLogin
      }

      createdAt
    }
  }
`;

export const GET_VENDOR = gql`
  query GET_VENDOR($vendorId: ID!) {
    vendor(id: $vendorId) {
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

      contactDetails {
        email
        phoneNumber
        name
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

      preference {
        enable2FA
        enableEmailNotification
      }
    }
  }
`;

export const GET_ALL_RIDERS = gql`
  query GET_ALL_Riders(
    $offset: Int!
    $limit: Int!
    $status: Status!
    $search: String!
  ) {
    riders(offset: $offset, limit: $limit, status: $status, search: $search) {
      currentPage
      hasNextPage
      totalCount
      data {
        _id
        userProfile {
          dateOfBirth
          fullName
          gender
          nationalIdentification {
            image
            number
            type
          }
          picture
        }

        vehicleInfo {
          registrationNumber
          vehicleType
        }

        professionalDetails {
          driverLicenseNumber
          drivingLicenseImg
          yearsOfDrivingExperience
        }

        preference {
          enable2FA
          enableEmailNotification
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
          additionalPhoneNumber
          email
          emergencyContactName
          emergencyContactNumber
          phoneNumber
          residentailAddress
        }
        createdAt
      }
    }
  }
`;

export const GET_RIDER = gql`
  query GET_RIDER($id: ID!) {
    rider(id: $id) {
      _id
      userProfile {
        dateOfBirth
        fullName
        gender
        nationalIdentification {
          image
          number
          type
        }
        picture
      }

      vehicleInfo {
        registrationNumber
        vehicleType
      }

      professionalDetails {
        driverLicenseNumber
        drivingLicenseImg
        yearsOfDrivingExperience
      }

      preference {
        enable2FA
        enableEmailNotification
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
        additionalPhoneNumber
        email
        emergencyContactName
        emergencyContactNumber
        phoneNumber
        residentailAddress
      }
    }
  }
`;

export const GET_ALL_ORDERS = gql`
  query GET_ALL_ORDERS($offset: Int!, $limit: Int!, $search: String!) {
    orders(offset: $offset, limit: $limit, search: $search) {
      currentPage
      hasNextPage
      totalCount
      totalNumberOfOrders
      totalNumOfOderPlaced
      totalNumOfInTransit
      totalNumberOfAssigned
      totalNumberOfCompleted
      totalNumberOfReturned
      totalNumberOfFailed
      totalNumberOfRejected
      data {
        _id
        assignedTo {
          ... on Rider {
            userProfile {
              fullName
            }
          }

          ... on T3PL {
            businessInfo {
              companyName
            }
          }
        }
        paymentStatus
        deliveryDate
        deliveryFee
        destination
        location {
          lat
          lng
        }
        orderDate
        orderId
        paymentAmount
        paymentNumber
        productDescription
        productImage
        recipientName
        recipientNumber
        rejectedReasons
        source {
          type
          vendorID
        }
        status
        updatedAt
        createdAt
      }
    }
  }
`;

export const GET_ORDER = gql`
  query GET_ORDER($orderId: ID!) {
    order(id: $orderId) {
      _id

      assignedTo {
        ... on Rider {
          userProfile {
            fullName
          }
          contactDetails {
            phoneNumber
            additionalPhoneNumber
          }
          vehicleInfo {
            vehicleType
          }
        }

        ... on T3PL {
          businessInfo {
            companyName
          }
        }
      }

      createdAt
      deliveryDate
      deliveryFee
      destination
      location {
        lat
        lng
      }
      orderDate
      orderId
      paymentAmount
      paymentNumber
      paymentStatus
      productImage
      productDescription
      recipientName
      recipientNumber
      rejectedReasons
      source {
        type
        vendorID
      }
      status
      updatedAt
    }
  }
`;
