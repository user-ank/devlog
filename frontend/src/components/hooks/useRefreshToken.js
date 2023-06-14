import { API } from '../../api';
import { useAuth } from '../../context/auth'
import { useNavigate, useLocation } from 'react-router-dom';

function useRefreshToken() {

    const navigate = useNavigate();
    const location = useLocation();
    const {user, login, logout} = useAuth();

    async function refresh() {
      
        try{

            const response = await API.get("users/renewAccessToken", {
                withCredentials: true
            });
            console.log(response);
            // {...user, accessToken: response.data.accessToken, profilePhoto: response.data.profilePhoto}
            login(response.data);
            return response.data.accessToken; 
        }
        catch(err)
        {
            console.log(err);
        }
    }

    return refresh;
}

export default useRefreshToken
