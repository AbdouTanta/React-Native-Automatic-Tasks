import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { Tasks } from "../database";
import { runAction } from "./ActionHelper";
import BackgroundTimer from "react-native-background-timer";

function runTask(tasks) {
    // get current time and loop over tasks to execute their actions
    tasks.forEach((task) => {
        BackgroundTimer.setTimeout(() => {
            //code that will be called every when it's time
            tasks.forEach((task) => {
                console.log("run");
                runAction(task.action);
                // disable the task here
                BackgroundTimer.stopBackgroundTimer();
                Tasks.onLoaded(() => {
                    Tasks.update(task.id, { state: false });
                });
                schedule();
            });
        }, task.time - Date.now());
    });
    return;
}

export default function schedule() {
    // unregister timer if it's already running

    // checking for tasks that are triggered by date and time (trigger_type: 2) and are enabled
    let tasks;
    Tasks.onLoaded(() => {
        tasks = Tasks.data().filter((task) => {
            return task.triggerType == 2 && task.state == true;
        });
        console.log("tasks that are triggered by time: ", tasks);
    });
    if (tasks.length >= 1) {
        console.log("we have stuff to schedule");
        runTask(tasks);
    }
    return;
}
