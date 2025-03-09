import { getTextColorForBackground } from "@/constants/Helpers";
import React from "react";
import { StyleSheet, Text } from "react-native";

type Props = {
    name: string;
    color: string;
};
export default function Label(props: Props) {
    const { name, color = "#bcbc" } = props;
    const textColor = getTextColorForBackground(`#${color}`);
    return (
        <Text
            style={{
                ...styles.label,
                color: textColor,
                backgroundColor: `#${color}`,
            }}
        >
            {name}
        </Text>
    );
}

const styles = StyleSheet.create({
    label: {
        textOverflow: "ellipsis",
        overflow: "hidden",
        color: "#000",
        width: "auto",
        fontWeight: 500,
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 0,
        marginLeft: 2,
        marginBottom: 2,
        backgroundColor: "#bcbc",
    },
});
