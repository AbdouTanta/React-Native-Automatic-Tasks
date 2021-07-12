import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";

const ViewLocation = ({ route, navigation }) => {
    // return <Text>{route.params.data.latitude}</Text>;
    const latitude = parseInt(route.params.data.latitude);
    const longitude = parseInt(route.params.data.longitude);
    const radius = parseInt(route.params.data.radius);
    return (
        <View style={{ flex: 1 }}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: latitude,
                        longitude: longitude,
                    }}
                    title={"marker-title"}
                    description={"desc"}
                />
                <Circle
                    center={{
                        latitude: latitude,
                        longitude: longitude,
                    }}
                    radius={radius}
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
});

export default ViewLocation;
