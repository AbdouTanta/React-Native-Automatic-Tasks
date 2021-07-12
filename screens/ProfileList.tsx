import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import { FAB, ListItem, Text, Switch } from "react-native-elements";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import { Profiles } from "../database";

// data should be pulled from a database
const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

const ProfileList = ({ navigation }) => {
    // tasks list
    const [profiles, setProfiles] = useState([
        // { id: 1, name: "fetching tasks...", state: false, triggerType: 1 },
    ]);
    const [populate, setPopulate] = useState(false);
    const isFocused = useIsFocused();

    // populate on first render
    useEffect(() => {
        Profiles.onLoaded(() => {
            setProfiles(Profiles.data());
            setPopulate(!populate);
        });
    }, []);

    // populate on other renders (when back to the screen)
    useFocusEffect(
        React.useCallback(() => {
            const unsubscribe = () => {
                if (isFocused) {
                    Profiles.onLoaded(() => {
                        setProfiles(Profiles.data());
                    });
                }
            };
            return () => unsubscribe();
        }, [isFocused])
    );

    //handle refresh
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        Profiles.onLoaded(() => {
            console.log("profiles: ", Profiles.data());
        });
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Text h3 style={{ padding: 15 }}>
                All profiles:
            </Text>
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={profiles}
                extraData={populate}
                //the list item component
                renderItem={({ item }) => (
                    <ListItem
                        bottomDivider
                        onPress={() => {
                            navigation.push("ProfileDetails", { id: item.id });
                        }}
                    >
                        <FontAwesome
                            name="circle"
                            size={24}
                            color={item.color}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{item.name}</ListItem.Title>
                        </ListItem.Content>
                        <Switch />
                    </ListItem>
                )}
            />
            <FAB
                size="large"
                placement="right"
                color="#2196f3"
                icon={<Ionicons name="add" size={24} />}
                onPress={() => navigation.push("AddProfile")}
            />
        </View>
    );
};

export default ProfileList;
