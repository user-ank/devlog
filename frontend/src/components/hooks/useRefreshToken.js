import { API } from '../../api';
import { useAuth } from '../../context/auth'

function useRefreshToken() {

    const {user, login} = useAuth();

    async function refresh() {
      
        const response = await API.get("users/renewAccessToken", {
            withCredentials: true
        });

        login({...user, accessToken: response.data.accessToken, profilePhoto: response.data.profilePhoto});
        return response.data.accessToken; 
    }

    return refresh;
}

export default useRefreshToken
