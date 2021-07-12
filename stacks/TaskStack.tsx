import React from "react";
import { Alert, StyleSheet, Text, View, Button } from "react-native";
import TaskList from "../screens/TaskList";

import { createStackNavigator } from "@react-navigation/stack";
import SelectTrigger from "../screens/SelectTrigger";
import SelectAction from "../screens/SelectAction";
import ChooseName from "../screens/ChooseName";
import TaskDetails from "../screens/TaskDetails";
import ChooseLocation from "../screens/ChooseLocation";
import ChooseDateTime from "../screens/ChooseDateTime";
import ViewLocation from "../screens/ViewLocation";

const Stack = createStackNavigator();

function TaskStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Tasks" component={TaskList} />
            <Stack.Screen
                name="TaskDetails"
                component={TaskDetails}
                options={{ title: "Task Details" }}
            />
            <Stack.Screen
                name="SelectTrigger"
                component={SelectTrigger}
                options={{ title: "Create a new task" }}
            />
            <Stack.Screen
                name="SelectAction"
                component={SelectAction}
                options={{ title: "Create a new task" }}
            />
            <Stack.Screen
                name="ChooseName"
                component={ChooseName}
                options={{ title: "Create a new task" }}
            />
            <Stack.Screen
                name="ChooseLocation"
                component={ChooseLocation}
                options={{ title: "Create a new task" }}
            />
            <Stack.Screen
                name="ChooseDateTime"
                component={ChooseDateTime}
                options={{ title: "Create a new task" }}
            />
            <Stack.Screen
                name="ViewLocation"
                component={ViewLocation}
                options={{ title: "View Task Location" }}
            />
        </Stack.Navigator>
    );
}

export default TaskStack;
