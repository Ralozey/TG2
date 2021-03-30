import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router";
import {CustomWs} from "../../utils/CustomWs";
import {PACKETS} from "../../../../backend/websocket";
import { get } from "../../utils/requests";

export const Play: React.FunctionComponent = () => {
    const history = useHistory();
    const socket = useRef<CustomWs|undefined>();

    useEffect(() => {

        get<{in: boolean}>("/api/game/in").then(res => {
            if (!res || ("code" in res)) return;
            if (!res.in) return history.push("/");

            socket.current = new CustomWs();

            socket.current.on("close", () => {
                history.push("/");
            });

            socket.current.listen(PACKETS.JOIN, (data) => {
                console.log(data);
            });

            socket.current.listen(PACKETS.LEAVE, (data) => {
                console.log(data);
            })

        });

        return () => socket.current?.ws.close();
    }, []);

    return(
        <div>
            <p>Play!</p>
        </div>
    )
}