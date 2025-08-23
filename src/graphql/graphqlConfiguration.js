import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  useLazyQuery,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { debounce } from "lodash";
import { useEffect } from "react";
import { useMemo } from "react";
import { Observable } from "@apollo/client/utilities";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import axios from "axios";

let isRefreshing = false;
let pendingRequests = [];

const resolvePendingRequests = () => {
  pendingRequests.forEach((cb) => cb());
  pendingRequests = [];
};

const rejectPendingRequests = (error) => {
  pendingRequests.forEach((cb) => cb(error));
  pendingRequests = [];
};
const httpLink = new HttpLink({
  uri: `${BASE_URL}/graphql`,
  credentials: "include",
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        switch (err.extensions?.code) {
          case "UNAUTHENTICATED":
          case "EXPIRED_ACCESS_TOKEN":
            if (!isRefreshing) {
              isRefreshing = true;

              // Refresh token - this will automatically set new cookies
              axios
                .post(
                  `${BASE_URL}/auth/refreshToken`,
                  {},
                  {
                    withCredentials: true,
                  }
                )
                .then(() => {
                  console.log("errrrrrro working");
                  resolvePendingRequests();
                  isRefreshing = false;
                })
                .catch((error) => {
                  rejectPendingRequests(error);
                  isRefreshing = false;

                  if (
                    error.response?.status === 401 &&
                    error.response.data.errorCode === "EXPIRED_REFRESH_TOKEN"
                  ) {
                    // Redirect to login
                    window.location.href = "/login";
                  }
                });
            }

            // Return a new observable that waits for the token refresh
            return new Observable((observer) => {
              pendingRequests.push(() => {
                forward(operation).subscribe(observer);
              });
            });
        }
      }
    }

    if (
      networkError &&
      "statusCode" in networkError &&
      networkError.statusCode === 401
    ) {
      // Handle network-level 401 errors
      if (!isRefreshing) {
        isRefreshing = true;

        axios
          .post(
            `${BASE_URL}/auth/refreshToken`,
            {},
            {
              withCredentials: true,
            }
          )
          .then(() => {
            resolvePendingRequests();
            isRefreshing = false;
          })
          .catch((error) => {
            rejectPendingRequests(error);
            isRefreshing = false;

            if (
              error.response?.status === 401 &&
              error.response.data.errorCode === "EXPIRED_REFRESH_TOKEN"
            ) {
              window.location.href = "/";
            }
          });
      }

      return new Observable((observer) => {
        pendingRequests.push(() => {
          forward(operation).subscribe(observer);
        });
      });
    }
  }
);

export const graphqlConfiguration = new ApolloClient({
  link: from([errorLink, httpLink]),

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

  defaultOptions: {
    watchQuery: {
      // fetchPolicy: "cache-and-network",
      errorPolicy: "all",
    },
    query: {
      // fetchPolicy: "cache-and-network",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
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
  graphqlConfiguration.clearStore();
};

export const removeSingleVendrFromCache = (vendorId) => {
  graphqlConfiguration.cache.evict({ id: `Vendor:${vendorId}` });
  graphqlConfiguration.cache.gc();
};

export const removeSingleRiderFromCache = (riderId) => {
  graphqlConfiguration.cache.evict({ id: `Rider:${riderId}` });
  graphqlConfiguration.cache.gc();
};

export function useSearch(query, roleOffset = 0, itemsPerPage = 15) {
  const [search, { data, loading, error, fetchMore, refetch }] = useLazyQuery(
    query,
    {
      variables: {
        offset: roleOffset,
        limit: itemsPerPage,
        search: "",
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "cache-and-network",
    }
  );

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
    if (searchTerm.length >= 0) {
      search({
        variables: {
          offset: roleOffset,
          limit: itemsPerPage,
          search: searchTerm,
        },
      });
    }
  }, 300);

  return { debouncedSearch, data, loading, error, fetchMore, refetch };
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
    if (searchTerm.length >= 0) {
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

export function useOrderSearch(query, roleOffset = 0, itemsPerPage = 20) {
  const [search, { data, loading, error, fetchMore }] = useLazyQuery(query, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    search({
      variables: {
        offset: roleOffset,
        limit: itemsPerPage,
        search: "",
        entityFilter: "",
        orderIds: [],
      },
    });
  }, [search, roleOffset, itemsPerPage]);

  const debouncedSearch = useMemo(
    () =>
      debounce((searchTerm, entityFilterTerm, orderIdsTerm) => {
        if (
          searchTerm.trim().length >= 0 ||
          entityFilterTerm.trim().length >= 0 ||
          orderIdsTerm?.length >= 0
        ) {
          search({
            variables: {
              offset: roleOffset,
              limit: itemsPerPage,
              search: searchTerm,
              entityFilter: entityFilterTerm,
              orderIds: orderIdsTerm,
            },
          });
        }
      }, 300),
    [search, roleOffset, itemsPerPage]
  );

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  return { debouncedSearch, data, loading, error, fetchMore };
}

export function useOrderCODSearch(query, offset = 0, itemsPerPage = 20) {
  const [search, { data, loading, error, fetchMore, refetch }] = useLazyQuery(query, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  console.log(error)
  useEffect(() => {
    search({
      variables: {
        offset,
        limit: itemsPerPage,
        search: "",
        orderIds: [],
        pickupDateFrom: "",
        pickupDateTo: "",
        deliveryDateFrom: "",
        deliveryDateTo: "",
       
        vendorId: "",
        assignedTo:""
      },
    });
  }, [search, offset, itemsPerPage]);

  const debouncedSearch = useMemo(
    () =>
      debounce(
        (
          searchTerm,
          orderIdsTerm,
          pickupDateFrom,
          pickupDateTo,
          deliveryDateFrom,
          deliveryDateTo, 
          vendorId,
          assignedTo
        ) => {
          if (
            searchTerm.trim().length >= 0 ||
            orderIdsTerm?.length >= 0 ||
            pickupDateFrom ||
            pickupDateTo ||
            deliveryDateFrom ||
            deliveryDateTo ||     
            vendorId||
            assignedTo
          ) {
           
            search({
              variables: {
                offset: offset,
                limit: itemsPerPage,
                search: searchTerm,
                orderIds:orderIdsTerm,
                pickupDateFrom,
                pickupDateTo,
                deliveryDateFrom,
                deliveryDateTo,    
                vendorId,
                assignedTo,
                // orderIds: orderIdsTerm,
              },
            });
          }
        },
        300
      ),
    [search, offset, itemsPerPage]
  );

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  return { debouncedSearch, data, loading, error, fetchMore,refetch };
}
