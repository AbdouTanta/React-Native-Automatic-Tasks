import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { Profiles } from "../database";
import { Tasks } from "../database";
import { CommonActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FAB, ListItem, Text } from "react-native-elements";
import { Checkbox } from "react-native-paper";

const changeChecked = (checked, index) => {
    if (checked[index] == "checked") {
        checked[index] = "unchecked";
        return checked;
    }
    if (checked[index] == "unchecked") {
        checked[index] = "checked";
        return checked;
    }
    return checked;
};
const changeId = (id, index, itemId) => {
    id[index] = itemId;
    return id;
};

const ChooseTasks = ({ route, navigation }) => {
    // tasks list
    const [tasks, setTasks] = useState([]);
    const [checked, setChecked] = useState([]);
    const [populate, setPopulate] = useState(false);
    const [id, setId] = useState([]);

    // populate on first render
    useEffect(() => {
        Tasks.onLoaded(() => {
            setTasks(
                Tasks.data().filter((task) => {
                    return (
                        task.profile ||
                        task.profile_id === "" ||
                        task.profile ||
                        task.profile_id === undefined
                    );
                })
            );
            tasks.forEach(() => {
                checked.push("unchecked");
                id.push("");
            });
            setPopulate(!populate);
        });
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <Text
                h3
                style={{ margin: 15 }}
                onPress={() => {
                    console.log(tasks);
                }}
            >
                Task list
            </Text>
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={tasks}
                extraData={checked}
                //the list item component
                renderItem={({ item, index }) => (
                    <ListItem
                        bottomDivider
                        onPress={() => {
                            navigation.push("ProfileDetails", { id: item.id });
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
                        />
                        <ListItem.Content>
                            <ListItem.Title>{item.name}</ListItem.Title>
                        </ListItem.Content>
                        <Checkbox
                            status={checked[index]}
                            onPress={() => {
                                setChecked(changeChecked(checked, index));
                                setId(changeId(id, index, item.id));
                                console.log(checked, id);
                                console.log(index);
                            }}
                        />
                    </ListItem>
                )}
            />
            <FAB
                size="large"
                placement="right"
                color="#8bc34a"
                icon={<Ionicons name="checkmark" size={24} />}
                onPress={() => {
                    Tasks.onLoaded(() => {
                        tasks.forEach((task, index) => {
                            if (id[index] != "") {
                                Tasks.update(id[index], {
                                    profile: route.params.id,
                                });
                            }
                        });
                    });
                    navigation.navigate("Profiles");
                }}
            />
        </View>
    );
};

export default ChooseTasks;
