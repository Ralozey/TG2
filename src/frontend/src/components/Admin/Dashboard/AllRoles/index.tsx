import React, { useEffect, useState } from "react";
import { RolePreview } from "../../../../../../backend/database/models/Role";
import { get } from "../../../../utils/requests";


export const AllRoles: React.FunctionComponent = () => {
    const [allRoles, setAllRoles] = useState<Array<RolePreview>>([]);

    useEffect(() => {
        get<Array<RolePreview>>("/api/roles").then(roles => {
            if (!roles || "code" in roles) return;
            setAllRoles(roles);
        })
    }, []);

    console.log(allRoles);

    return(
        <div>

        </div>
    )
}