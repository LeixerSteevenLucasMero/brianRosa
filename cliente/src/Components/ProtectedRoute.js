import React, { useEffect, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch} from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { setUser } from '../redux/features/userSlice';

export default function ProtectedRoute({ children }){
    const dispatch  = useDispatch()
    const { user} = useSelector(state => state.user)

    //get user
    const getUser = useCallback(async () => {
        try {
            dispatch(showLoading())
            const res = await axios.post ('/user/getUserData', 
            {token : localStorage.getItem('token')}, 
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

            },
            ) 
            dispatch(hideLoading())
            if (res.data.success){
            dispatch(setUser (res.data.data))
            }else {
                dispatch(setUser(null));
                localStorage.clear();
            }
        } catch (error) {
            dispatch(hideLoading())
            dispatch(setUser(null));
            localStorage.clear();
            console.log(error)
        }
    }, [dispatch]); 

    useEffect(()=> {
        if (!user){
            getUser();
        }
    }, [user, getUser]);

    if (localStorage.getItem("token")) {
        return children; 
    } else {
        return <Navigate to ="/login" />;
    }
}