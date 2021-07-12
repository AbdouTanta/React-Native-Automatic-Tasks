import React, { useState } from "react";
import { View, FlatList } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import { FAB, ListItem, Text } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { ColorPicker } from "react-native-color-picker";
import { Profiles } from "../database";

const AddProfile = ({ navigation }) => {
    const [name, setName] = useState("Random");
    const [color, setColor] = useState("#fff");

    return (
        <View style={{ flex: 1 }}>
            <Text h4 style={{ padding: 15 }}>
                Choose a name for the profile:
            </Text>
            <TextInput
                style={{
                    margin: 15,
                    borderRadius: 5,
                    padding: 15,
                    backgroundColor: "#fff",
                }}
                placeholder="Name"
                value={name}
                onChangeText={(value) => {
                    setName(value);
                }}
            />
            <Text h4 style={{ padding: 15 }}>
                Choose a color for the profile:
            </Text>
            <ColorPicker
                onColorSelected={(color) => setColor(color)}
                style={{ flex: 1, margin: 15 }}
            />
            <FAB
                size="large"
                placement="right"
                color="#8bc34a"
                icon={<Ionicons name="checkmark" size={24} />}
                onPress={() => {
                    Profiles.onLoaded(() => {
                        Profiles.insert({
                            name: name,
                            color: color,
                            state: true,
                        });
                        console.log(Profiles.data());
                    });
                    navigation.navigate("Profiles");
                }}
            />
        </View>
    );
};

export default AddProfile;
