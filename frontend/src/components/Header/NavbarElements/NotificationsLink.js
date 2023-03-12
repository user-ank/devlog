function NotificationsLink(props) {

    function doTask(e) {
        props.click(e);
    }

    return (
        <div className='navImgDiv' onClick={doTask}>
            <img id='notificationsLink' alt="timer" src={require('../../img/bell2.png')} className='navImg' />
        </div>
    );
}

export default NotificationsLink;