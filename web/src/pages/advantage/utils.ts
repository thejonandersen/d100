import {AdvantageRequirement} from "d100-libs";
import {capitalize} from "@mui/material";

export const categoryIcons = {
    "Ally_Framework": "Users",
    "Archetype": "Shapes",
    "Armor": "Shield",
    "Body": "Dumbbell",
    "Divine_Pacts": "Church",
    "Epic_Archetypes": "CircleAlert",
    "Golden_Path": "Waypoints",
    "Melee_Combat": "Axe",
    "Mind": "Brain",
    "Power": "Zap",
    "Ranged_Combat": "MoveUpRight",
    "Tactical": "Sparkles"
};

const getKeys = function (obj: any) {
    let keys: string[] = [];

    for (let key in obj) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
            if (!keys.length) {
                keys.push(key);
            }
            keys = keys.concat(getKeys(obj[key]));
        } else {
            keys.push(key);
        }
    }

    return keys;
};

const getTerminalValue = function (reqs: any, keys: string[]): any {
    return keys.reduce((previousValue, currentValue) => {
        return previousValue[currentValue];
    }, reqs);
};

export const specialReqsToString = (reqs: any) => {
    let reqString: string;
    const keys: string[] = getKeys(reqs);
    return `${keys.map(key => capitalize(key)).join(" ")} ${getTerminalValue(reqs, keys)}`;
};

export const reqToString = (req: AdvantageRequirement) => {
    const id: string | null = req.type !== "tier" ?
        req.raceId || req.advantageId || req.stat || req.skill as string
        : null;
    return `${capitalize(req.type)}:${id && ` ${capitalize(id)}`} ${req.value?.toString()}`;
};
