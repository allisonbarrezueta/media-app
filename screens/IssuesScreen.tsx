import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import IssueCard from "@/components/ui/IssueCard";
import InputText from "@/components/ui/TextInput";
import { stateOptions } from "@/constants/Helpers";
import { SEARCH_ISSUES } from "@/graphql/queries";
import { IssueNode } from "@/types/issues";
import { useQuery } from "@apollo/client";
import { isEmpty, uniqBy } from "lodash";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const IssuesScreen = () => {
    const [search, setSearch] = useState("");
    const [state, setState] = useState("");
    const [issues, setIssues] = useState([] as IssueNode[]);
    const [after, setAfter] = useState("");

    const query = `is:issue archived:false repo:facebook/react-native sort:created-desc${
        !isEmpty(state) ? ` state:${state}` : ""
    }${!isEmpty(search) ? " in:title,body" : ""}`;

    console.log({ state: !isEmpty(state), query });

    // Usage with variables
    const { data, loading, error } = useQuery(SEARCH_ISSUES, {
        variables: {
            query,
            after,
        },
    });

    const loadMore = () => {
        if (data?.search?.pageInfo?.hasNextPage) {
            setAfter(data?.search?.pageInfo?.endCursor);
        }
    };

    useEffect(() => {
        if (!isEmpty(data?.search?.edges)) {
            const newData = data?.search?.edges;
            const filteredIssues = isEmpty(state)
                ? issues
                : issues.filter((issue) => issue?.node?.state === state);

            setIssues(uniqBy([...filteredIssues, ...newData], "node.id"));
        }
    }, [data]);

    return (
        <SafeAreaView>
            <FlatList
                data={issues}
                style={{ height: "100%" }}
                renderItem={({ item }) => {
                    return <IssueCard key={item.node.id} item={item.node} />;
                }}
                onEndReachedThreshold={0.3}
                onEndReached={loadMore}
                keyExtractor={(item) => item.node.id}
                // ListEmptyComponent={myListEmpty}
                ListHeaderComponent={() => (
                    <>
                        <ThemedView style={styles.titleContainer}>
                            <ThemedText type="title">Welcome!</ThemedText>
                            <HelloWave />
                        </ThemedView>
                        <ThemedView style={styles.stepContainer}>
                            <ThemedText type="subtitle">
                                Search github issue:
                            </ThemedText>
                            <InputText
                                value={search}
                                setValue={setSearch}
                                placeholder="Write issue"
                            />
                            <SelectDropdown
                                data={stateOptions}
                                onSelect={(selectedItem) => {
                                    setState(selectedItem.value);
                                }}
                                dropdownStyle={styles.dropdownMenuStyle}
                                renderButton={(selectedItem, isOpened) => {
                                    return (
                                        <View
                                            key={selectedItem?.value}
                                            style={styles.dropdownButtonStyle}
                                        >
                                            <Text>
                                                {(selectedItem &&
                                                    selectedItem.title) ||
                                                    "Status"}
                                            </Text>
                                            <Icon
                                                name={
                                                    isOpened
                                                        ? "chevron-up"
                                                        : "chevron-down"
                                                }
                                            />
                                        </View>
                                    );
                                }}
                                renderItem={(item, _, isSelected) => {
                                    return (
                                        <View
                                            style={{
                                                ...styles.dropdownItemStyle,
                                                ...(isSelected && {
                                                    backgroundColor: "#D2D9DF",
                                                }),
                                            }}
                                        >
                                            <Text>{item.title}</Text>
                                        </View>
                                    );
                                }}
                            />
                        </ThemedView>
                    </>
                )}
            />
        </SafeAreaView>
    );
};

export default IssuesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: 5,
        // fontSize: 30,
    },
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
    dropdownButtonStyle: {
        borderRadius: 15,
        backgroundColor: "#dfdfdf",
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: 100,
    },
    dropdownItemStyle: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#dfdfdf",
        margin: 3,
    },
    dropdownMenuStyle: {
        backgroundColor: "#E9ECEF",
        borderRadius: 8,
    },
});
