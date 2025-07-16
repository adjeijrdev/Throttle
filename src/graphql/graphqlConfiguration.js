import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

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
          Staff:{
           
          }
        },
      },
    },
  }),
});

export const removeSingleRoleFromCache = (roleId) => {
  console.log(roleId);
  graphqlConfiguration.cache.evict({ id: `Role:${roleId}` });
  graphqlConfiguration.cache.gc();
};
