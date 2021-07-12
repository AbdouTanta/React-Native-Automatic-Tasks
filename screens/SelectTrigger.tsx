import React, { useState } from "react";
import { View, SectionList } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import { FAB, ListItem, Text, CheckBox } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";

// each item in data should be an object so we can add other informations about a trigger
const DATA = [
    {
        title: "Location",
        data: [{ desc: "Choose location", code: 1 }],
    },
    {
        title: "Schedule your task",
        data: [{ desc: "Choose Date and Time", code: 2 }],
    },
    // {
    //     title: "Wifi",
    //     data: ["Choose a wifi"],
    // },
    // {
    //     title: "Battery",
    //     data: ["When charging", "Choose battery level"],
    // },
    // {
    //     title: "Date and time",
    //     data: ["Choose a date and time"],
    // },
];

// TODO: pass down the selected props to the following screens
// to create a task

const SelectTrigger = ({ navigation, route }) => {
    const [checked, setChecked] = useState("1");

    return (
        <View style={{ flex: 1 }}>
            <Text h3 style={{ padding: 15 }}>
                Select a trigger to provoke your task
            </Text>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item.desc + index}
                renderItem={({ item }) => (
                    <ListItem
                        bottomDivider
                        onPress={() => setChecked(item.code.toString())}
                    >
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
                onPress={() => {
                    if (checked == "1") {
                        navigation.push("ChooseLocation", {
                            triggerType: 1,
                            state: true,
                        });
                    }
                    if (checked == "2") {
                        navigation.push("ChooseDateTime", {
                            triggerType: 2,
                            state: true,
                        });
                    }
                    // push route object with the trigger type
                }}
            />
        </View>
    );
};

export default SelectTrigger;
