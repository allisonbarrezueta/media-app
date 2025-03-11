import ParallaxView from "@/components/ParallaxView";
import IssuesScreen from "@/screens/IssuesScreen";
import { Image, StyleSheet } from "react-native";

export default function HomeScreen() {
    return (
        <ParallaxView
            headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
            headerImage={
                <Image
                    source={require("@/assets/images/github.png")}
                    style={styles.reactLogo}
                />
            }
        >
            <IssuesScreen />
        </ParallaxView>
    );
}

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
