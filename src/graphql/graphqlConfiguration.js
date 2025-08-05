import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  useLazyQuery,
} from "@apollo/client";
import { debounce } from "lodash";
import { useEffect } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const httpLink = new HttpLink({
  uri: `${BASE_URL}/graphql`,
  credentials: "include",
});

export const graphqlConfiguration = new ApolloClient({
  link: httpLink,

  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          roles: {
            keyArgs: false,
          },
          RolePositiveResult: {
            fields: {
              data: {
                keyArgs: false,
                read(existing = [], { args }) {
                  const { offset = 0, limit = Infinity } = args || {};
                  return existing.slice(offset, offset + limit);
                },
                merge(existing = [], incoming, { args: { offset = 0 } }) {
                  const merged = existing.slice(0);
                  for (let i = 0; i < incoming.length; ++i) {
                    merged[offset + i] = incoming[i];
                  }
                  return merged;
                },
              },
            },
          },

          staffs: {
            keyArgs: false,
          },

          StaffPositiveResult: {
            fields: {
              data: {
                keyArgs: false,
                read(existing = [], { args }) {
                  const { offset = 0, limit = Infinity } = args || {};
                  return existing.slice(offset, offset + limit);
                },
                merge(existing = [], incoming, { args: { offset = 0 } }) {
                  const merged = existing.slice(0);
                  for (let i = 0; i < incoming.length; ++i) {
                    merged[offset + i] = incoming[i];
                  }
                  return merged;
                },
              },
            },
          },

          // Staff type normalization
          Staff: {
            keyFields: ["_id"],
          },

          Role: {
            keyFields: ["_id"], // Normalize by _id
            fields: {
              assignTo: {
                // Merge staff assignments array
                merge(existing = [], incoming) {
                  return incoming || existing;
                },
              },
              permissions: {
                // Merge permissions array
                merge(existing = [], incoming) {
                  return incoming || existing;
                },
              },
            },
          },

          // vendors: {
          //   keyArgs: false,
          // },
          // VendorPositiveResult: {
          //   fields: {
          //     data: {
          //       keyArgs: false,
          //       read(existing = [], { args }) {
          //         const { offset = 0, limit = Infinity} = args || {};
          //         return existing.slice(offset, offset + limit);
          //       },
          //       merge(existing = [], incoming, { args: { offset = 0 } }) {
          //         const merged = existing.slice(0);
          //         for (let i = 0; i < incoming.length; ++i) {
          //           merged[offset + i] = incoming[i];
          //         }
          //         return merged;
          //       },
          //     },
          //   },
          // },
        },
      },
    },
  }),
});

export const removeSingleRoleFromCache = (roleId) => {
  graphqlConfiguration.cache.evict({ id: `Role:${roleId}` });
  graphqlConfiguration.cache.gc();
};

export const removeSingleStaffFromCache = (staffId) => {
  graphqlConfiguration.cache.evict({ id: `Staff:${staffId}` });
  graphqlConfiguration.cache.gc();
};

export const clearCache = async () => {
  graphqlConfiguration.clearStore()
};

export const removeSingleVendrFromCache = (vendorId) => {
  graphqlConfiguration.cache.evict({ id: `Vendor:${vendorId}` });
  graphqlConfiguration.cache.gc();
};


export const removeSingleRiderFromCache = (riderId) =>{
    graphqlConfiguration.cache.evict({ id: `Rider:${riderId}` });
  graphqlConfiguration.cache.gc();
}

export function useSearch(query, roleOffset = 0, itemsPerPage = 20) {
  const [search, { data, loading, error, fetchMore }] = useLazyQuery(query, {
    variables: {
      offset: roleOffset,
      limit: itemsPerPage,
      search: "",
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    search({
      variables: {
        offset: roleOffset,
        limit: itemsPerPage,
        search: "",
      },
    });
  }, [search, roleOffset, itemsPerPage]);

  const debouncedSearch = debounce((searchTerm) => {
    if (searchTerm.length ) {
      search({
        variables: {
          offset: roleOffset,
          limit: itemsPerPage,
          search: searchTerm,
        },
      });
    }
  }, 300);

  return { debouncedSearch, data, loading, error, fetchMore };
}



export function useSearchB(query, roleOffset = 0, itemsPerPage = 20, status) {
  const [search, { data, loading, error, fetchMore }] = useLazyQuery(query, {
    variables: {
      offset: roleOffset,
      limit: itemsPerPage,
      search: "",
      status: status,

    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    search({
      variables: {
        offset: roleOffset,
        limit: itemsPerPage,
        search: "",
        status: status,

      },
    });
  }, [search, roleOffset, itemsPerPage]);

  const debouncedSearch = debounce((searchTerm) => {
    if (searchTerm.length) {
      search({
        variables: {
          offset: roleOffset,
          limit: itemsPerPage,
          search: searchTerm,
        status: status,

        },
      });
    }
  }, 300);

  return { debouncedSearch, data, loading, error, fetchMore };
}

