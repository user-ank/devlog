import AddIcon from '@mui/icons-material/Add';
import './Aboutme.css'


function AboutmeIsUser()
{
    return(
        <>
            <div className="aboutme-account-aboutmebtn">
                <div className="aboutme-account-aboutmeicon"> <AddIcon /> </div>
                <div className="aboutme-account-aboutme"> Add Bio </div>
            </div>
            <div className="message-of-empty-bio">
                Your bio is empty. Tell the world who you are by writing a short description about you.
            </div>
        </>
    );
}
export default AboutmeIsUser;