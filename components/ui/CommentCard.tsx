import { CommentNode } from "@/types/issues";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Markdown from "react-native-markdown-display";
import { ThemedText } from "../ThemedText";

type Props = {
    comment: CommentNode;
};

export default function CommentCard(props: Props) {
    const { comment } = props;
    const node = comment?.node;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image src={node.author.avatarUrl} style={styles.avatar} />
                <ThemedText type="defaultSemiBold">
                    {node?.author?.login}
                </ThemedText>
            </View>
            <View style={styles.body}>
                <Markdown>{node?.body}</Markdown>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        borderColor: "#d1d9e0",
        borderWidth: 1,
        borderRadius: 8,
        marginVertical: 8,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        padding: 8,
        borderBottomColor: "#d1d9e0",
        borderBottomWidth: 1,
        fontSize: 24,
        fontWeight: "600",
        backgroundColor: "#f6f8fa",
        alignItems: "center",
    },
    body: {
        padding: 16,
        marginHorizontal: 2,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 8,
        boxShadow: "0 0 0 1px rgba(0,0,0,0.1)",
    },
});
