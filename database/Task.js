export class TaskModel {
    name = "Tasks";

    props = {
        name: "string",
        state: "boolean",
        action: "number",
        triggerType: "number",
        location: "?#Locations",
        time: "?string",
        profile: "?#Profiles",
    };
}
