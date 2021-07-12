import React from "react";
import { Alert, StyleSheet, Text, View, Button } from "react-native";
import ProfileList from "../screens/ProfileList";

import { createStackNavigator } from "@react-navigation/stack";
import AddProfile from "../screens/AddProfile";
import ProfileDetails from "../screens/ProfileDetails";
import ChooseTasks from "../screens/ChooseTasks";

const Stack = createStackNavigator();

function ProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profiles" component={ProfileList} />
            <Stack.Screen
                name="AddProfile"
                component={AddProfile}
                options={{ title: "Create a new profile" }}
            />
            <Stack.Screen
                name="ProfileDetails"
                component={ProfileDetails}
                options={{ title: "Profile details" }}
            />
            <Stack.Screen
                name="ChooseTasks"
                component={ChooseTasks}
                options={{ title: "Choose Tasks" }}
            />
        </Stack.Navigator>
    );
}

export default ProfileStack;
