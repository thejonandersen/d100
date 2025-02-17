import { useEffect, useState } from "react";
import {useAppSelector, useAppDispatch} from '@/state/hooks';
import {Advantage, all as allAdvantages} from '@/state/advantage/slice';
import {load as loadRaces, all as allRaces} from '@/state/race/slice';
import {displayText} from '@/common/utils'
import {capitalize} from '@mui/material'
import {get} from 'lodash';

const getAllKeys = (obj: any, keysArray: string[] = []) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            keysArray.push(key);
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                getAllKeys(obj[key], keysArray);
            }
        }
    }

    return keysArray;
}

const useAdvantageRequirements = (advantage: Advantage) => {
    const [requirements, setRequirements] = useState<string[]>([]);
    const races = useAppSelector(state => allRaces(state));
    const advantages = useAppSelector(state => allAdvantages(state));
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!advantage) return;
        const {requirements} = advantage;

        if (!requirements || !requirements.length) return;

        if (requirements.some(req => req.type === 'race') && !races.length) {
            dispatch(loadRaces);
            return;
        }

        let requirementStrings = []

        if (advantage.special) {
            const special = JSON.parse(advantage.special);
            const keys = getAllKeys(special.requirements);

            requirementStrings.push(`${keys.map(key => capitalize(key)).join(" ")} ${get(special.requirements, keys.join('.'))}`);
        }

        const reqs = requirements.map(requirement => {
            const {type, advantageId, stat, raceId, value, skill} = requirement;

            switch (type) {
                case 'race':
                    const race = races.find(race => race.id === raceId);
                    return `Race - ${race?.name}`;
                case 'advantage':
                    const advantage = advantages.find(advantage => advantage.id === advantageId);
                    return `Advantage - ${advantage?.name}`;
                case 'skill':
                    return `Skill - ${skill && displayText[skill]}: ${value}`;
                case "stat":
                    return `Stat - ${stat && displayText[stat]}: ${value}`;
                default:
                    return `${type} - ${value}`;
            }
        });

        requirementStrings = [...requirementStrings, ...reqs];

        setRequirements(requirementStrings);
    }, [advantage, races]);

    return {requirements}
}

export default useAdvantageRequirements;
