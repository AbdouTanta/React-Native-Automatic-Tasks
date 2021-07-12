import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import execute from "./helpers/LocationHelper";
import schedule from "./helpers/DateTimeHelper";
import { Tasks } from "./database";

import App from "./App";

// execute();

// const getData = async () => {
//     let data = await Tasks.data();
//     console.log(data);
//     return data;
// };

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

registerRootComponent(App);
