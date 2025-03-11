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
};

export type Repository = {
    repository: {
        issue: Issue;
    };
};
