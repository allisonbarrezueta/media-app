import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import IssueCard from "@/components/ui/IssueCard";
import InputText from "@/components/ui/TextInput";
import { GET_ISSUES } from "@/graphql/queries";
import { Issue } from "@/types/issues";
import { useQuery } from "@apollo/client";
import get from "lodash/get";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

const IssuesScreen = () => {
    const [search, setSearch] = useState("");

    // Usage with variables
    const { data, loading, error } = useQuery(GET_ISSUES, {
        variables: {
            owner: "facebook",
            name: "react-native",
            states: ["OPEN"],
        },
    });

    return (
        <View>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Welcome!</ThemedText>
                <HelloWave />
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Search github issue:</ThemedText>
                <InputText
                    value={search}
                    setValue={setSearch}
                    placeholder="Write issue"
                />
            </ThemedView>
            {data?.repository?.issues.edges.map(
                (issue: { node: Issue }, index: number) => {
                    return (
                        <IssueCard
                            key={index}
                            item={get(issue, "node", {} as Issue)}
                        />
                    );
                }
            )}
        </View>
    );
};

export default IssuesScreen;

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 100,
        width: 300,
        bottom: 0,
        left: 0,
        right: 0,
        position: "absolute",
    },
    issueContainer: {
        flex: 1,
        // marginTop: 0,
    },
});
