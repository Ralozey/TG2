import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import {CustomWs} from "../../utils/CustomWs";
import {PACKETS} from "../../../../backend/websocket";
import { get } from "../../utils/requests";
import {EngineView} from "../../../../backend/engine";

import {PlayerList} from "./PlayerList";

export interface BasePlayProps {
    socket: MutableRefObject<CustomWs|undefined>,
    game: EngineView
}

export const Play: React.FunctionComponent = () => {
    const history = useHistory();
    const socket = useRef<CustomWs|undefined>();
    const [game, setGame] = useState<EngineView|undefined>();

    useEffect(() => {

        get<{in: boolean}>("/api/me/in").then(res => {
            if (!res || ("code" in res)) return;
            if (!res.in) return history.push("/");

            socket.current = new CustomWs();

            socket.current.on("close", () => {
                history.push("/");
            });

            socket.current.listen(PACKETS.GAME_DATA, (data) => {
                setGame(data);
            });

        });

        return () => socket.current?.ws.close();
    }, []);
    
    if (!game) return null;
    return(
        <div>
            <p>Play!</p>
            <PlayerList socket={socket} players={game.players} game={game}></PlayerList>
        </div>
    );
};