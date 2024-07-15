import { PrivateAPI } from "../../api";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAuth } from "../../context/auth";
import { useNavigate, useLocation } from "react-router-dom";


function useAxiosPrivate() {

    const refresh = useRefreshToken();
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {

        const requestIntercept = PrivateAPI.interceptors.request.use(
            config => {
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] =  `Bearer ${user?.accessToken}`;
                }
                return config;
            }, (err) => Promise.reject(err)
        );

        const responseIntercept = PrivateAPI.interceptors.response.use(
            response => response,
            async (err) =>{
                const prevRequest = err?.config;

                if(err?.response.status === 500 && !prevRequest?.sent){
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return PrivateAPI(prevRequest);
                }
                if(err?.response.status === 401) // If token is expired then should logout from app and redirect to login page
                    navigate('/devlog/login', { state: { path : location.pathname } }); // right only redirecting but should logout(local) as well.

                return Promise.reject(err);
            }
        );

        return () => {
            PrivateAPI.interceptors.request.eject(requestIntercept);
            PrivateAPI.interceptors.response.eject(responseIntercept);
        }
    },[user, refresh])
    
    return PrivateAPI;
}

export default useAxiosPrivate
