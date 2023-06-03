import "./EmptyPage.css"

const EmptyPage = () => {
    return (
        <div id="emptyPage">
            <div className="bookmarksHeader">Bookmarks Page</div>
            <div className="hr"/>
            <h2 className="bookmarksMSG">Nothing to show here !!</h2>
            <p>You have no bookmarked posts.</p>
        </div>
    )
}

export default EmptyPage
