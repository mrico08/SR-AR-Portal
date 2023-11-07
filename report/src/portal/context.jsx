import {createContext} from "react";

export const local_host = "localhost:8000";
const LocalHost = createContext(local_host);
export default LocalHost;