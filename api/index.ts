import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    uri: process.env.EXPO_PUBLIC_API_URL,
});

const authLink = setContext((_, { headers }) => {
    const token = process.env.EXPO_PUBLIC_TOKEN;
    return {
        headers: {
            ...headers,
            authorization: token ? `bearer ${token}` : "",
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
