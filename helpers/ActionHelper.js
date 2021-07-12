import SystemSetting from "react-native-system-setting";
import { ToastAndroid } from "react-native";
// this function checks action types and executes them
export function runAction(type) {
    switch (type) {
        case 1:
            // mute
            SystemSetting.setVolume(0);
            SystemSetting.getVolume()
                .then((volume) => {
                    console.log("Current volume is " + volume * 100);
                })
                .catch((err) => {
                    console.log("catched");
                });
            ToastAndroid.show("device muted", ToastAndroid.LONG);
            break;
        case 2:
            // Disable
            console.log("hhhhhhhhhhhhhhhhhhhhhhh");
            SystemSetting.isWifiEnabled()
                .then((enable) => {
                    const state = enable ? "On" : "Off";
                    ToastAndroid.show("Wifi disabled", ToastAndroid.LONG);
                    if (state == "On") {
                        SystemSetting.switchWifi(() => {
                            console.log("Wifi disabled");
                            ToastAndroid.show(
                                "Wifi disabled",
                                ToastAndroid.LONG
                            );
                        });
                    }
                })
                .catch((err) => {
                    console.log("wifi mochkil");
                });
            break;

        case 3:
            // Enable wifi
            SystemSetting.isWifiEnabled()
                .then((enable) => {
                    const state = enable ? "On" : "Off";
                    if (state == "Off") {
                        SystemSetting.switchWifi(() => {
                            console.log("Wifi disabled");
                        });
                    }
                })
                .catch((err) => {
                    console.log("wifi mochkil");
                });
            break;

        case 4:
            // Disable Airplane mode
            console.log("Airplane mode disabled");
            SystemSetting.isAirplaneEnabled()
                .then((enable) => {
                    const state = enable ? "On" : "Off";
                    if (state == "On") {
                        SystemSetting.switchAirplane(() => {
                            console.log("Airplane mode disabled");
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            break;

        case 5:
            // Enable Airplane mode
            SystemSetting.isAirplaneEnabled()
                .then((enable) => {
                    const state = enable ? "On" : "Off";
                    if (state == "Off") {
                        SystemSetting.switchAirplane(() => {
                            console.log("Airplane mode enabled");
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            break;
        case 6:
            // Disable Bluetooth
            SystemSetting.isBluetoothEnabled()
                .then((enable) => {
                    const state = enable ? "On" : "Off";
                    if (state == "On") {
                        SystemSetting.switchBluetoothSilence(() => {
                            ToastAndroid.show(
                                "Bluetooth disabled",
                                ToastAndroid.LONG
                            );
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            break;
        case 7:
            // Enable Bluetooth
            SystemSetting.isBluetoothEnabled()
                .then((enable) => {
                    const state = enable ? "On" : "Off";
                    if (state == "Off") {
                        SystemSetting.switchBluetoothSilence(() => {
                            console.log("Bluetooth enabled");
                            ToastAndroid.show(
                                "Bluetooth enabled",
                                ToastAndroid.LONG
                            );
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            break;
    }
}

// DeviceInfo.getBatteryLevel().then((batteryLevel) => {
//     console.log("battery level is: ", batteryLevel * 100);
// });
// SystemSetting.isWifiEnabled()
//     .then((enable) => {
//         const state = enable ? "On" : "Off";
//         console.log("Current wifi is " + state);
//     })
//     .catch((err) => {
//         console.log("wifi mochkil");
//     });
// SystemSetting.getVolume()
//     .then((volume) => {
//         console.log("Current volume is " + volume * 100);
//     })
//     .catch((err) => {
//         console.log("catched");
//     });
