import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { Profiles } from "../database";
import { CommonActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import { FAB, ListItem, Text, Switch } from "react-native-elements";
import { Tasks } from "../database";

const ProfileDetails = ({ route, navigation }) => {
    const [tasks, setTasks] = useState([]);
    const isFocused = useIsFocused();

    // populate on first render
    useEffect(() => {
        Tasks.onLoaded(() => {
            setTasks(
                Tasks.data().filter((task) => {
                    let hh = task.profile || task.profile_id;
                    console.log(hh);

                    return hh == route.params.id;
                })
            );
        });
    }, []);

    // populate on other renders (when back to the screen)
    useFocusEffect(
        React.useCallback(() => {
            const unsubscribe = () => {
                if (isFocused) {
                    Tasks.onLoaded(() => {
                        setTasks(
                            Tasks.data().filter((task) => {
                                let hh = task.profile || task.profile_id;
                                console.log(hh);
                                return hh == route.params.id;
                            })
                        );
                    });
                    console.log(tasks);
                }
            };
            return () => unsubscribe();
        }, [isFocused])
    );

    return (
        <View style={{ flex: 1 }}>
            <Text h3 style={{ padding: 15 }}>
                Profile tasks:
            </Text>
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={tasks}
                //the list item component
                renderItem={({ item }) => (
                    <ListItem bottomDivider>
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
                                    : "Enable Airplane Mode"}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                )}
            />
            <FAB
                size="large"
                placement="right"
                color="#FA8072"
                icon={<Ionicons name="trash" size={24} />}
                onPress={() => {
                    // pop up to delete task
                    console.log("DELETE profile??????????");
                    Profiles.onLoaded(() => {
                        Profiles.remove({ id: route.params.id });
                        navigation.dispatch(CommonActions.goBack());
                    });
                }}
            />
            <FAB
                size="large"
                placement="left"
                color="#2196f3"
                icon={<Ionicons name="add" size={24} />}
                onPress={() => {
                    navigation.navigate("ChooseTasks", { id: route.params.id });
                }}
            />
        </View>
    );
};

export default ProfileDetails;
