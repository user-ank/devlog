function HomeLink(props){

    function doTask(e){
        props.click(e);
    }

    return(
        <div className='navImgDiv' onClick={doTask}>
            <img id='homeLink' alt="timer" src={require('../../img/home.png')} className='navImg ' />
        </div>
    );
}

export default HomeLink;