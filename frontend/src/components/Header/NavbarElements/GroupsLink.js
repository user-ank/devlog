function GroupsLink(props){
    
    function doTask(e){
        props.click(e);
    }

    return(
        <div className='navImgDiv' onClick={doTask}>
            <img id='groupsLink' alt="timer" src={require('../../img/group.png')} className='navImg' />
        </div>
    );
}

export default GroupsLink;