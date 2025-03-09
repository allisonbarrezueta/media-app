import { Issue } from "@/types/issues";
import * as Linking from "expo-linking";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemedText } from "../ThemedText";
import Labels from "./Labels";

type Props = {
    item: Issue;
};

const IssueCard = ({ item }: Props) => {
    const url = Linking.useURL();
    console.log({ url });
    return (
        <Link
            href={{
                pathname: "/detail/[id]",
                params: { id: item.number },
            }}
            style={{ marginBottom: 16 }}
        >
            <View style={styles.card}>
                <Text style={styles.number}>Issue # {item.number}</Text>
                <ThemedText type="subtitle">{item.title}</ThemedText>
                <Labels labels={item.labels} />
                <Text style={styles.state}>{item.state}</Text>
            </View>
        </Link>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 2,
        shadowColor: "#0000007f",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    number: {
        fontSize: 14,
        color: "#666",
        marginBottom: 4,
    },
    state: {
        fontSize: 14,
        color: "#0066cc",
        fontWeight: "bold",
    },
});

export default IssueCard;
