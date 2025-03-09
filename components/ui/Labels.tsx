import React from "react";
import { StyleSheet, View } from "react-native";
import { Label as LabelType } from "./IssueCard";
import Label from "./Label";

type Labels = {
    name: string;
    color: string;
};

type Props = {
    labels: LabelType;
};
export default function Labels(props: Props) {
    const { labels } = props;

    return (
        <View style={styles.container}>
            {labels?.edges?.map((label, id) => (
                <Label key={id} {...label.node} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginVertical: 8,
    },
});
