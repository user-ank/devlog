import "./EmptyPage.css"

const EmptyPage = ({ header, message }) => {
    return (
        <div id="emptyPage">
            <div className="bookmarksHeader">{header} Page</div>
            <div className="hr"/>
            <h2 className="bookmarksMSG">Nothing to show here !!</h2>
            <p>{message}</p>
        </div>
    )
}

export default EmptyPage
