import React, { useEffect,useState } from 'react'
import UserContext from "./userContext";
import { useParams } from 'react-router-dom';

const UserState = (props) => {
    const {username} = useParams();
    const [userArray, setUserArray] = useState([]);
    useEffect(() => {

        fetch("http://localhost:8000/api/v1/posts/user/"+ username )
          .then(res => {
            return (res.json())
          })
          .then((data) => {
            console.log(data);
            setUserArray(data.data);
            console.log("userArray ", data.data);

          })
      }, [username])


    const initialState = {userArray}
    return (
        <UserContext.Provider value={initialState}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;
