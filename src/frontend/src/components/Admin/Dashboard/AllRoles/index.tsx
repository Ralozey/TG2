import React, { useEffect, useState } from "react";
import { RolePreview } from "../../../../../../backend/database/models/Role";
import { get } from "../../../../utils/requests";
import {Rolecard} from "../../../common/Rolecard";
 
export const AllRoles: React.FunctionComponent = () => {
    const [allRoles, setAllRoles] = useState<Array<RolePreview>>([]);

    useEffect(() => {
        get<Array<RolePreview>>("/api/roles").then(roles => {
            if (!roles || "code" in roles) return;
            setAllRoles(roles);
        });
    }, []);

    return(
        <div>
            {allRoles.length ? allRoles.map(r => <Rolecard key={r.name} role={r}/>):<h2>No roles!</h2>}
        </div>
    );
};