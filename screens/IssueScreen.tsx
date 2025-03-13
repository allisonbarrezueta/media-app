import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CommentCard from "@/components/ui/CommentCard";
import { GET_COMMENTS, GET_ISSUE } from "@/graphql/queries";
import { Repository } from "@/types/issues";
import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import Markdown from "react-native-markdown-display";

type Props = {
    number: number | string;
};

const IssueScreen = ({ number }: Props) => {
    const [after, setAfter] = useState("");
    const {
        data: comments,
        loading: loadingComments,
        error: errorComments,
    } = useQuery(GET_COMMENTS, {
        variables: {
            owner: "facebook",
            name: "react-native",
            number,
            after,
        },
    });

    const loadMore = () => {
        if (comments?.search?.pageInfo?.hasNextPage) {
            setAfter(comments?.search?.pageInfo?.endCursor);
        }
    };

    useEffect(() => {}, []);

    return (
        <SafeAreaView>
            <FlatList
                data={comments?.repository?.issue?.comments?.edges}
                style={{ padding: 32 }}
                keyExtractor={(item) => item.node.id}
                ListHeaderComponent={() => <IssueHeader number={number} />}
                onEndReachedThreshold={0.3}
                onEndReached={loadMore}
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
        <SafeAreaView>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">
                    {issue?.title}{" "}
                    <ThemedText type="subtitle" style={styles.number}>
                        # {number}
                    </ThemedText>
                </ThemedText>
            </ThemedView>
            <Markdown>{issue?.body ?? ""}</Markdown>
            <ThemedText type="subtitle">Comments</ThemedText>
        </SafeAreaView>
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
