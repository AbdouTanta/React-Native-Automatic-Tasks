/**
 * Importing instance of the Created Vasern Database
 */
import db from "./db";

const { Tasks } = db;
const { Locations } = db;
const { Profiles } = db;

/**
 * Exporting VasernDB as default instance.
 * Exporting Schemas for usage in the Application.
 * These exported options can be imported anywhere in the Application to use.
 * This can act as single Instance as reference and different parts of it used wherever needed.
 */
export default db;
export { Tasks };
export { Locations };
export { Profiles };
