
function Searchbar(){

    function handleSubmit(e)
    {
        e.preventDefault();
    }
    return(

        <form id="search" onSubmit={handleSubmit}>
            <img id="searchIcon" src={require('../img/search.png')} alt=""/>
            <input name="query" id="input" type="text" placeholder="Search..."/>
        </form>
    )
}

export default Searchbar;
