import React, { useState } from "react";
import { View, Button, Platform } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import { FAB, Text, Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import { Tasks } from "../database";
import { Locations } from "../database";
import DateTimePicker from "@react-native-community/datetimepicker";

// each item in data should be an object so we can add other informations about a trigger

const ChooseDateTime = ({ route, navigation }) => {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === "ios");
        setDate(currentDate);
        console.log(date.toTimeString());
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode("date");
    };

    const showTimepicker = () => {
        showMode("time");
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ padding: 20, paddingTop: 150 }}>
                <Button onPress={showDatepicker} title="Choisir la date" />
                <Text style={{ alignSelf: "center", padding: 20 }}>
                    {date.toDateString()}
                </Text>
            </View>
            <View style={{ padding: 20 }}>
                <Button onPress={showTimepicker} title="Choisir le temps" />
                <Text style={{ alignSelf: "center", padding: 20 }}>
                    {date.toTimeString()}
                </Text>
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
            <FAB
                size="large"
                placement="right"
                color="#8bc34a"
                icon={<Ionicons name="checkmark" size={24} />}
                onPress={() => {
                    navigation.push("SelectAction", {
                        ...route.params,
                        time: date.getTime(),
                    });
                }}
            />
        </View>
    );
};

export default ChooseDateTime;
