import * as React from "react";
import { StyleSheet, TextInput } from "react-native";

type Props = {
    value: string;
    placeholder?: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
};
const InputText = (props: Props) => {
    const { value, placeholder, setValue } = props;
// const [keyboardStatus, setKeyboardStatus] = React.useState("");
    const textInputRef = React.useRef<TextInput>(null);
    // const checkKeyboards = () => {
    //     if (keyboardStatus === "none") textInputRef.current?.blur();

    //     return true;
    // };

    return (
        <TextInput
            ref={textInputRef}
            style={styles.input}
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            underlineColorAndroid="transparent"
            // onPressIn={checkKeyboards}
        />
    );
};

export default InputText;

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: "#dfdfdf7f",
        height: 40,
    },
});
