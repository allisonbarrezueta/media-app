import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { GET_ISSUE } from "@/graphql/queries";
import { Repository } from "@/types/issues";
import { useQuery } from "@apollo/client";
import React from "react";
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import Markdown, { MarkdownIt } from "react-native-markdown-display";

type Props = {
    number: number | string;
};

const IssueScreen = ({ number }: Props) => {
    const { data, loading, error } = useQuery(GET_ISSUE, {
        variables: {
            owner: "facebook",
            name: "react-native",
            number,
        },
    });
    const issue = (data as Repository)?.repository?.issue;

    const {
        data: comments,
        loading: loadingComments,
        error: errorComments,
    } = useQuery(GET_ISSUE, {
        variables: {
            owner: "facebook",
            name: "react-native",
            number,
        },
    });

    return (
        <SafeAreaView>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={{ height: "100%" }}
            >
                <View style={styles.content}>
                    <ThemedView style={styles.titleContainer}>
                        <ThemedText type="title">
                            {issue?.title}{" "}
                            <ThemedText type="subtitle" style={styles.number}>
                                # {number}
                            </ThemedText>
                        </ThemedText>
                    </ThemedView>
                    {/* add labels */}

                    {/* add author and description wrapper */}
                    <Markdown markdownit={MarkdownIt({ typographer: true })}>
                        {issue?.body}
                    </Markdown>

                    <FlatList
                        data={[]}
                        // keyExtractor={(item) => item.node.id}
                        renderItem={(issue) => {
                            return <></>;
                        }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default IssueScreen;

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
