import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Alert, StyleSheet, Text, View, Button } from "react-native";

import TaskStack from "./stacks/TaskStack";
import ProfileStack from "./stacks/ProfileStack";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "Tasks") {
                            iconName = focused ? "list" : "list-outline";
                        } else if (route.name === "Profiles") {
                            iconName = focused
                                ? "bookmarks"
                                : "bookmarks-outline";
                        }

                        // You can return any component that you like here!
                        return (
                            <Ionicons
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        );
                    },
                })}
            >
                <Tab.Screen name="Tasks" component={TaskStack} />
                <Tab.Screen name="Profiles" component={ProfileStack} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "lavender",
        paddingVertical: 10,
        paddingHorizontal: 5,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
});
