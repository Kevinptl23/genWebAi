import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { setUserData } from '../redux/userSlice.js';

export const useGetCurrentUser = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const GetCurrentUser = async () => {
            try {
                const result = await axios.get('http://localhost:8080/api/user/me', {withCredentials: true});
                dispatch(setUserData(result.data))
            } catch (error) {
                console.log("ERROR: ", error)
            }
        }

        GetCurrentUser();
    }, []);

    return (
        <div>useGetCurrentUser</div>
    )
}
