import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Dimensions } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import { FAB, ListItem, Text, CheckBox } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";
import { Locations } from "../database";
import { Input } from "react-native-elements/dist/input/Input";

const ChooseLocation = ({ route, navigation }) => {
    const [radius, setRadius] = useState("100");
    const [isLoading, setIsLoading] = useState(true);
    const [marker, setMarker] = useState({ latitude: 0, longitude: 0 });
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                return;
            }
            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Highest,
            });
            setIsLoading(false);

            setMarker({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        })();
    }, []);

    const onMapPress = (e) => {
        setMarker({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
        });
        console.log(marker.latitude);
    };

    return (
        <View style={{ flex: 1 }}>
            {!isLoading ? (
                <View>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={{
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        }}
                        onPress={(e) => onMapPress(e)}
                    >
                        <Marker
                            coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude,
                            }}
                            title={"marker-title"}
                            description={"desc"}
                        />
                        <Circle
                            center={{
                                latitude: marker.latitude,
                                longitude: marker.longitude,
                            }}
                            radius={parseInt(radius)}
                        />
                    </MapView>
                    <TextInput
                        style={{
                            position: "absolute",
                            bottom: 145,
                            left: 10,
                            zIndex: 1000,
                            width: 300,
                            height: 60,
                            borderRadius: 5,
                            backgroundColor: "#fff",
                        }}
                        placeholder="Radius (m)"
                        value={radius.toString()}
                        onChangeText={(value) => {
                            setRadius(value);
                        }}
                        keyboardType="number-pad"
                    />
                </View>
            ) : (
                <Text style={{ padding: 15, fontSize: 14 }}>
                    Loading your current position...
                </Text>
            )}

            <FAB
                size="large"
                placement="right"
                color="#8bc34a"
                icon={<Ionicons name="checkmark" size={24} />}
                onPress={() => {
                    const loc = Locations.insert({
                        latitude: marker.latitude,
                        longitude: marker.longitude,
                        radius: radius,
                    });
                    navigation.push("SelectAction", {
                        ...route.params,
                        location: loc[0],
                    });
                    console.log(loc[0]);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
});

export default ChooseLocation;
