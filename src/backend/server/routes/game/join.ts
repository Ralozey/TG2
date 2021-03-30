import { ApiEndpoint } from "../../";

export default {
    method: "post",
    path: "/api/game/players",
    exec: (req, res) => {
        res.send("Test!");
    }
} as ApiEndpoint;