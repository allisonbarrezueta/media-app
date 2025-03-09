import IssueScreen from "@/screens/IssueScreen";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
    item: any;
};

export default function DetailScreen() {
    const localSearchParams = useLocalSearchParams();

    const id = localSearchParams.id as string;

    return (
        <View style={{ backgroundColor: "white", flex: 1 }}>
            <Stack.Screen
                options={{
                    title: "Issue",
                    headerStyle: {
                        backgroundColor: "#A1CEDC",
                    },
                }}
            />

            <IssueScreen number={parseInt(id)} />
        </View>
    );
}

const styles = StyleSheet.create({
    reactLogo: {
        height: 100,
        width: 300,
        bottom: 0,
        left: 0,
        right: 0,
        position: "absolute",
    },
});
