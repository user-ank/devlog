function EventsLink(props){

    function doTask(e){
        props.click(e);
    }

    return(
        <div className='navImgDiv' onClick={doTask}>
            <img id='eventsLink' alt="timer" src={require('../../img/event3.png')} className='navImg' />
        </div>
    );
}

export default EventsLink;