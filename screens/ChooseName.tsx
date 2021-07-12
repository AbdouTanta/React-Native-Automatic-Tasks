import React, { useState } from "react";
import { View, SectionList } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import { FAB, Text, Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import { Tasks } from "../database";
import { Locations } from "../database";

// each item in data should be an object so we can add other informations about a trigger

const ChooseName = ({ route, navigation }) => {
    const [checked, setChecked] = useState("Choose location");
    const [name, setName] = useState("Random");

    return (
        <View style={{ flex: 1 }}>
            <Text h3 style={{ padding: 15 }}>
                Choose a name for your task
            </Text>
            <Text style={{ padding: 15, paddingTop: 5 }}>
                Example: "Mute phone in school"
            </Text>

            <Input
                placeholder="Type your task name..."
                onChangeText={(value) => setName(value)}
            />

            <FAB
                size="large"
                placement="right"
                color="#8bc34a"
                icon={<Ionicons name="checkmark" size={24} />}
                onPress={() => {
                    navigation.navigate("Tasks");
                    Tasks.insert({
                        name: name,
                        state: route.params.state,
                        action: route.params.action,
                        triggerType: route.params.triggerType,
                        ...(route.params.location !== undefined && {
                            location: route.params.location,
                        }),
                        ...(route.params.time !== undefined && {
                            time: route.params.time,
                        }),
                        // location: route.params.location[0] || "",
                        // time: route.params.time || "",
                    });
                }}
            />
        </View>
    );
};

export default ChooseName;
