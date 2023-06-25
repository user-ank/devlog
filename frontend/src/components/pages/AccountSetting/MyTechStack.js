import React from 'react'
import './MyTechStack.css'
import AddIcon from '@mui/icons-material/Add';
import AccountContext from '../../../context/accountContext';

function MyTechStack() {
    const isUsers = React.useContext(AccountContext);
    
    return (
        <div className='user-mytechstack'>
            <div className="mytechstack">
                <div className="user-mytechstack-text"> My Tech Stack</div>
                {
                    isUsers ?
                        <>
                            <div className="mytechstack-account-mytechstackbtn">
                                <div className="mytechstack-account-mytechstackicon"> <AddIcon /> </div>
                                <div className="mytechstack-account-mytechstack"> Add your skills </div>
                            </div>
                        </>
                        :
                        <p className="profileaboutme-about-content">
                            Python,
                            C++,
                            Java,
                            JavaScript,
                            ReactJS,
                            NodeJS,
                            ExpressJS,
                            MongoDB,
                            MySQL,
                            HTML,
                            CSS,
                            Bootstrap,
                            Material UI,
                            Git,
                            GitHub,
                            VS Code,
                            CodeBlocks,
                            PyCharm,
                            IntelliJ IDEA,
                            Eclipse,
                            Android Studio,
                            Windows,
                            Linux,
                            Ubuntu,
                            Kali Linux,
                            Parrot OS,
                            Mac OS,
                            Chrome OS,
                            Stack Overflow,
                            Medium,
                            Dev.to,
                            Hashnode,
                            CodeChef,
                            Codeforces,
                            LeetCode,
                            GeeksforGeeks,
                            InterviewBit.
                        </p>
                }

            </div>
        </div>
    )
}

export default MyTechStack