import React, {useCallback, useEffect, useState} from "react";
import {allSlices} from '../state/slices'
import {useAppSelector, useAppDispatch} from '../state/hooks'
import {useNavigate} from 'react-router'

const useCollectionPage = (id: string) => {
    const [selected, setSelected] = useState<any>()
    const [special, setSpecial] = useState<any>();
    //@ts-ignore
    const {all, load} = allSlices[id];
    const data: any[] = useAppSelector(all);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleEditClick = useCallback((e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();

        navigate(`edit/${id}`);
    }, [data])

    const handleCreateClick = useCallback(() => {
        navigate('create');
    }, [data])

    useEffect(() => {
        if (!data.length) {
            dispatch(load());
        }
    }, [data])

    useEffect(() => {
        if (!selected) {
            return;
        }

        if (selected.special) {
            try {
                setSpecial(JSON.parse(selected.special));
            } catch (e) {
                console.error(e);
            }
        }
    }, [selected]);

    return {data, selected, handleEditClick, setSelected, handleCreateClick, special};
}

export default useCollectionPage;
