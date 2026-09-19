import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { setUserData } from '../redux/userSlice.js';

export const useGetCurrentUser = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const GetCurrentUser = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
                const result = await axios.get(`${API_URL}/api/user/me`, {withCredentials: true});
                dispatch(setUserData(result.data))
            } catch (error) {
                console.log("ERROR: ", error)
            }
        }

        GetCurrentUser();
    }, [dispatch]);

    return (
        <div>useGetCurrentUser</div>
    )
}
