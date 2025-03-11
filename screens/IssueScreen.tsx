import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CommentCard from "@/components/ui/CommentCard";
import { GET_COMMENTS, GET_ISSUE } from "@/graphql/queries";
import { Repository } from "@/types/issues";
import { useQuery } from "@apollo/client";
import React from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import Markdown, { MarkdownIt } from "react-native-markdown-display";

type Props = {
    number: number | string;
};

const IssueScreen = ({ number }: Props) => {
    const {
        data: comments,
        loading: loadingComments,
        error: errorComments,
    } = useQuery(GET_COMMENTS, {
        variables: {
            owner: "facebook",
            name: "react-native",
            number,
        },
    });

    return (
        <SafeAreaView>
            <FlatList
                data={comments?.repository?.issue?.comments?.edges}
                style={{ padding: 32 }}
                keyExtractor={(item) => item.node.id}
                ListHeaderComponent={() => <IssueHeader number={number} />}
                renderItem={({ item }) => {
                    return <CommentCard comment={item} />;
                }}
            />
        </SafeAreaView>
    );
};

export default IssueScreen;

const IssueHeader = ({ number }: { number: number | string }) => {
    const {
        data: dataIssue,
        loading,
        error,
    } = useQuery(GET_ISSUE, {
        variables: {
            owner: "facebook",
            name: "react-native",
            number,
        },
    });

    const issue = (dataIssue as Repository)?.repository?.issue;

    return (
        <>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">
                    {issue?.title}{" "}
                    <ThemedText type="subtitle" style={styles.number}>
                        # {number}
                    </ThemedText>
                </ThemedText>
            </ThemedView>
            <Markdown markdownit={MarkdownIt({ typographer: true })}>
                {issue?.body}
            </Markdown>
            <ThemedText type="subtitle">Comments</ThemedText>
        </>
    );
};

const styles = StyleSheet.create({
    titleContainer: {
        display: "flex",
        alignItems: "center",
        gap: 8,
    },
    content: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: "hidden",
    },
    number: {
        fontSize: 26,
        color: "rgb(89, 99, 110)",
    },
});
