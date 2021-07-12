import React, { useState } from "react";
import { View, Button } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import { FAB, Text, Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import { Tasks } from "../database";
import { Locations } from "../database";
import { CommonActions } from "@react-navigation/native";

// each item in data should be an object so we can add other informations about a trigger

const TaskDetails = ({ route, navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <Text h4 style={{ padding: 15 }}>
                Task Name :
            </Text>
            <Text
                style={{
                    padding: 15,
                    paddingTop: 5,
                    fontWeight: "normal",
                    fontSize: 25,
                }}
            >
                {route.params.task.name}
            </Text>
            {route.params.task.triggerType == 1 && (
                <View>
                    <Text h4 style={{ padding: 15 }}>
                        Location :
                    </Text>
                    <Button
                        title="View Location"
                        onPress={() => {
                            Locations.onLoaded(() => {
                                let data =
                                    Locations.get({
                                        id: route.params.task.location,
                                    }) ||
                                    Locations.get({
                                        id: route.params.task.location_id,
                                    });
                                navigation.navigate("ViewLocation", {
                                    data: data,
                                });
                            });
                        }}
                    />
                </View>
            )}
            {route.params.task.triggerType == 2 && (
                <View>
                    <Text h4 style={{ padding: 15 }}>
                        Date and time :
                    </Text>
                    <Text
                        style={{
                            padding: 15,
                            paddingTop: 5,
                            fontWeight: "normal",
                            fontSize: 25,
                        }}
                    >
                        {new Date(
                            parseInt(route.params.task.time)
                        ).toLocaleString()}
                    </Text>
                </View>
            )}
            <Text h4 style={{ padding: 15 }}>
                Action :
            </Text>
            <Text
                style={{
                    padding: 15,
                    paddingTop: 5,
                    fontWeight: "normal",
                    fontSize: 25,
                }}
            >
                {route.params.task.action == 1
                    ? "Mute Device"
                    : route.params.task.action == 2
                    ? "Disable Wifi"
                    : route.params.task.action == 3
                    ? "Enable Wifi"
                    : route.params.task.action == 4
                    ? "Disable Airplane Mode"
                    : route.params.task.action == 5
                    ? "Enable Airplane Mode"
                    : route.params.task.action == 6
                    ? "Disable Bluetooth"
                    : "Enable Bluetooth"}
            </Text>
            <FAB
                size="large"
                placement="right"
                color="#FA8072"
                icon={<Ionicons name="trash" size={24} />}
                onPress={() => {
                    // pop up to delete task
                    console.log("DELETE??????????");
                    Tasks.onLoaded(() => {
                        Tasks.remove({ id: route.params.task.id });
                        console.log(route.params);
                        navigation.dispatch(CommonActions.goBack());
                    });
                }}
            />
        </View>
    );
};

export default TaskDetails;
