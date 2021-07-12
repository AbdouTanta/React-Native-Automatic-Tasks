import React, { useState } from "react";
import { View, SectionList } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import { FAB, ListItem, Text, CheckBox } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";

// each item in data should be an object so we can add other informations about a trigger
const DATA = [
    {
        title: "Ringer",
        data: [{ desc: "Switch to silent", code: 1 }],
    },
    {
        title: "Wifi",
        data: [
            { desc: "Disable Wifi", code: 2 },
            { desc: "Enable Wifi", code: 3 },
        ],
    },
    {
        title: "Airplane mode",
        data: [
            { desc: "Disable Airplane mode", code: 4 },
            { desc: "Enable Airplane mode", code: 5 },
        ],
    },
    {
        title: "Bluetooth",
        data: [
            { desc: "Disable Bluetooth", code: 6 },
            { desc: "Enable Bluetooth", code: 7 },
        ],
    },
];

const SelectAction = ({ route, navigation }) => {
    const [checked, setChecked] = useState("Choose location");
    const [code, setCode] = useState(1);

    return (
        <View style={{ flex: 1 }}>
            <Text h3 style={{ padding: 15 }}>
                Select an action for your task to execute
            </Text>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item.desc + index}
                renderItem={({ item }) => (
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>{item.desc}</ListItem.Title>
                        </ListItem.Content>
                        <RadioButton
                            value={item.code.toString()}
                            status={
                                checked === item.code.toString()
                                    ? "checked"
                                    : "unchecked"
                            }
                            onPress={() => {
                                setChecked(item.code.toString());
                                setCode(item.code);
                            }}
                        />
                    </ListItem>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text
                        style={{
                            padding: 15,
                            fontSize: 18,
                            color: "teal",
                        }}
                    >
                        {title}
                    </Text>
                )}
            />
            <FAB
                size="large"
                placement="right"
                color="#8bc34a"
                icon={<Ionicons name="checkmark" size={24} />}
                onPress={() =>
                    navigation.push("ChooseName", {
                        ...route.params,
                        // change this
                        action: code,
                    })
                }
            />
        </View>
    );
};

export default SelectAction;
