import React, { useEffect, useState } from "react";
import { get } from "../../utils/requests";
import { Login } from "./Login";


export const Admin: React.FunctionComponent = () => {
    const [isAdmin, setAdmin] = useState<boolean>(false);

    useEffect(() => {
        get<{isAdmin: boolean}>("/api/me/isAdmin").then(res => {
            if (!res || "code" in res) return;
            setAdmin(res.isAdmin);
        });
    });

    return(
        <div>
            {isAdmin ? null:<Login onVerify={() => {
                setAdmin(true);
            }}/>}
        </div>
    )
}