export type Label = {
    edges: {
        node: {
            name: string;
            color: string;
        };
    }[];
};

export type IssueNode = {
    node: Issue;
};

export type Issue = {
    id: string;
    author: {
        url: string;
    };
    title: string;
    url: string;
    number: number;
    state: string;
    createdAt: string;
    author: {
        url: string;
    };
    labels: Label;
    body: string;
    comments: Comment[];
};

export type Repository = {
    repository: {
        issue: Issue;
    };
};

export type Search = {
    search: {
        edges: IssueNode[];
    };
};

export type Comment = {
    edges: CommentNode[];
};

export type CommentNode = {
    node: {
        id: string;
        body: string;
        author: {
            avatarUrl: string;
            login: string;
        };
    };
};

export type PageInfo = {
    startCursor: ID;
    endCursor: ID;
    hasNextPage: Boolean!;
};
