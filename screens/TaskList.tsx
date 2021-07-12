import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, RefreshControl } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import { FAB, ListItem, Text, Switch } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";

import { Tasks } from "../database";
import { Profiles } from "../database";
import { Locations } from "../database";
import execute from "../helpers/LocationHelper";
import schedule from "../helpers/DateTimeHelper";

// data should be pulled from a database

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

const ProfileList = ({ navigation }) => {
    // tasks list
    const [tasks, setTasks] = useState([
        // { id: 1, name: "fetching tasks...", state: false, triggerType: 1 },
    ]);
    const [populate, setPopulate] = useState(false);
    const isFocused = useIsFocused();

    // populate on first render
    useEffect(() => {
        Tasks.onLoaded(() => {
            setTasks(Tasks.data());
            setPopulate(!populate);
        });
    }, []);

    // populate on other renders (when back to the screen)
    useFocusEffect(
        React.useCallback(() => {
            const unsubscribe = () => {
                if (isFocused) {
                    Tasks.onLoaded(() => {
                        setTasks(Tasks.data());
                    });
                    console.log(tasks);
                    setPopulate(!populate);
                }
            };
            return () => unsubscribe();
        }, [isFocused])
    );

    //handle refresh
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        schedule();
        execute();
        Tasks.onLoaded(() => {
            console.log("tasks: ", Tasks.data());
        });
        Locations.onLoaded(() => {
            console.log("locations: ", Locations.data());
        });
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Text h3 style={{ padding: 15 }}>
                All tasks:
            </Text>

            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                keyExtractor={(item, index) => index.toString()}
                data={tasks}
                extraData={populate}
                //the list item component
                renderItem={({ item }) => (
                    <ListItem
                        bottomDivider
                        onPress={() => {
                            navigation.push("TaskDetails", { task: item });
                        }}
                    >
                        <Ionicons
                            name={
                                item.triggerType == 1
                                    ? "location"
                                    : item.triggerType == 2
                                    ? "time"
                                    : "star"
                            }
                            size={24}
                            color="#808080"
                        />
                        <ListItem.Content>
                            <ListItem.Title>{item.name}</ListItem.Title>
                            <ListItem.Subtitle>
                                {item.action == 1
                                    ? "Mute Device"
                                    : item.action == 2
                                    ? "Disable Wifi"
                                    : item.action == 3
                                    ? "Enable Wifi"
                                    : item.action == 4
                                    ? "Disable Airplane Mode"
                                    : item.action == 5
                                    ? "Enable Airplane Mode"
                                    : item.action == 6
                                    ? "Disable Bluetooth"
                                    : "Enable Bluetooth"}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                        <Switch
                            value={item.state}
                            onValueChange={() => {
                                Tasks.onLoaded(() => {
                                    let task = Tasks.get({ id: item.id });
                                    console.log("task: ", task);
                                    setTasks(Tasks.data());
                                    setPopulate(!populate);
                                    Tasks.update(task.id, {
                                        state: !task.state,
                                    });
                                });
                            }}
                        />
                    </ListItem>
                )}
            />
            <FAB
                size="large"
                placement="right"
                color="#2196f3"
                icon={<Ionicons name="add" size={24} />}
                onPress={() => {
                    navigation.push("SelectTrigger");
                }}
            />
        </View>
    );
};

export default ProfileList;
