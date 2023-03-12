
function Searchbar(){

    return(

        <form id="search" action="result.html">
            <img id="searchIcon" src={require('../img/search.png')} alt=""/>
            <input name="query" id="input" type="text" placeholder="Search..."/>
        </form>
    )
}

export default Searchbar;
