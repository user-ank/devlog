import { useEffect, useState } from "react"
import useAxiosPrivate from "./hooks/useAxiosPrivate";

function Users() {

    // const [users, setUsers] = useState(null);
    const PrivateAPI = useAxiosPrivate();

    useEffect(() => {
        async function getUsers(){
            try{
                const response = await PrivateAPI.get("/users");
                console.log(response);
            }
            catch(error){
                console.log(error);
            }
        }
         
        getUsers();
    },[])

    return (
        <div>
            Here users list would be shown
        </div>
    )
}

export default Users
