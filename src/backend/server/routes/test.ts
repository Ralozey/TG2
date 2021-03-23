import { ApiEndpoint } from "..";

export default {
    method: "get",
    path: "/api/test",
    exec: (req, res) => {
        res.send("Test!");
    }
} as ApiEndpoint;