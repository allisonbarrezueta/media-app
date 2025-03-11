import { gql } from "@apollo/client";

export const SEARCH_ISSUES = gql`
    query SearchIssues($query: String!) {
        search(query: $query, first: 10) {
            edges {
                node {
                    ... on Issue {
                        id
                        title
                        url
                        number
                        state
                        createdAt
                        author {
                            url
                        }
                        labels(first: 3) {
                            edges {
                                node {
                                    name
                                    color
                                }
                            }
                        }
                    }
                }
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    }
`;

export const GET_ISSUES = gql`
    query GetIssues($owner: String!, $name: String!, $states: [IssueState!]) {
        repository(owner: $owner, name: $name) {
            issues(
                first: 20
                states: $states
                orderBy: { field: CREATED_AT, direction: DESC }
            ) {
                edges {
                    node {
                        id
                        title
                        url
                        number
                        state
                        createdAt
                        author {
                            url
                        }
                        labels(first: 3) {
                            edges {
                                node {
                                    name
                                    color
                                }
                            }
                        }
                    }
                }
                pageInfo {
                    endCursor
                    hasNextPage
                }
            }
        }
    }
`;

export const INFO_ISSUE = gql`
    query {
        repository(owner: "facebook", name: "react-native") {
            issues {
                totalCount
            }
            open: issues(states: OPEN) {
                totalCount
            }
            closed: issues(states: CLOSED) {
                totalCount
            }
        }
    }
`;

export const GET_ISSUE = gql`
    query GetIssue($owner: String!, $name: String!, $number: Int!) {
        repository(owner: $owner, name: $name) {
            issue(number: $number) {
                id
                title
                url
                number
                state
                createdAt
                author {
                    url
                }
                labels(first: 3) {
                    edges {
                        node {
                            name
                            color
                        }
                    }
                }
                body
            }
        }
    }
`;

export const GET_COMMENTS = gql`
    query GetIssue($owner: String!, $name: String!, $number: Int!) {
        repository(owner: $owner, name: $name) {
            issue(number: $number) {
                comments(first: 10) {
                    edges {
                        node {
                            id
                            body
                            author {
                                avatarUrl
                            }
                        }
                    }
                    pageInfo {
                        endCursor
                        hasNextPage
                    }
                }
            }
        }
    }
`;
