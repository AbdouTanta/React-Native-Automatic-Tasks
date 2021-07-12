import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { Tasks } from "../database";
import { Locations } from "../database";
import { runAction } from "./ActionHelper";
const LOCATION_TRACKING = "location-tracking";

const startLocationTracking = async () => {
    const { status } = await Location.requestBackgroundPermissionsAsync();
    if (status === "granted") {
        await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
            accuracy: Location.Accuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 0,
            foregroundService: {
                notificationTitle: "Tasker services are running",
            },
        });
        const hasStarted = await Location.hasStartedLocationUpdatesAsync(
            LOCATION_TRACKING
        );
        console.log("tracking started?", hasStarted);
    } else {
        console.log("background location denied");
    }
};

function runTask(tasks) {
    console.log("location helper executed");
    startLocationTracking();
    TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
        if (error) {
            console.log("LOCATION_TRACKING task ERROR:", error);
            return;
        }
        if (data) {
            // get our current location
            let latitude = data.locations[0].coords.latitude;
            let longitude = data.locations[0].coords.longitude;

            // loop over tasks to evaluate locations
            tasks.forEach((task, index) => {
                const location =
                    Locations.get({ id: task.location }) ||
                    Locations.get({ id: task.location_id });
                if (
                    arePointsNear(
                        { latitude, longitude },
                        // we have to check for the 2 values because of db inconsistencies
                        location,
                        parseInt(location.radius) / 1000
                    )
                ) {
                    runAction(parseInt(task.action));
                    // disable the task here
                    Tasks.onLoaded(() => {
                        Tasks.update(task.id, { state: false });
                    });
                    TaskManager.unregisterTaskAsync(LOCATION_TRACKING);
                    execute();
                }
            });
            console.log(
                `${new Date(
                    Date.now()
                ).toLocaleString()}: ${latitude},${longitude}`
            );
        }
    });
    return;
}

export default function execute() {
    // unregister task if it's already running
    TaskManager.isTaskRegisteredAsync(LOCATION_TRACKING).then((res) => {
        if (res) {
            TaskManager.unregisterTaskAsync(LOCATION_TRACKING);
        }
    });
    // checking for tasks that are triggered by location (trigger_type: 1) and are enabled
    let tasks;
    let locations;
    Tasks.onLoaded(() => {
        tasks = Tasks.data().filter((task) => {
            return task.triggerType == 1 && task.state == true;
        });
        console.log("tasks that are triggered by location: ", tasks);
    });
    Locations.onLoaded(() => {
        locations = Locations.data();
    });
    if (tasks.length >= 1) {
        runTask(tasks);
    }
    return;
}

// check if we're within the radius of the desired location
function arePointsNear(checkPoint, centerPoint, km) {
    var ky = 40000 / 360;
    var kx = Math.cos((Math.PI * centerPoint.latitude) / 180.0) * ky;
    var dx = Math.abs(centerPoint.longitude - checkPoint.longitude) * kx;
    var dy = Math.abs(centerPoint.latitude - checkPoint.latitude) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
}
