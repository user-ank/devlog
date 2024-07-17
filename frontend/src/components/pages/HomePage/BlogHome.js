import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { wentWrongMsg } from '../../Header/Header';
import { useAuth } from '../../../context/auth';
import './BlogHome.css';
import LoginModal from '../Authentication/LoginModal';

function BlogHome({ blog, showLimited }) {
	const PrivateAPI = useAxiosPrivate();
	const [loginModal, setModal] = useState(false);
	const [is_bookmarked, setBookmark] = useState(blog.isBookmarked ? true : false);
	const [is_liked, setLike] = useState(blog.isLiked ? true : false);
	const [likeCnt, changeLike] = useState(blog.likeCnt);
	const bookmarkMsgRef = useRef();
	const { user } = useAuth();

	function timeAgo() {
		let blogTime = new Date(blog.creationTime);
		let curentTime = new Date();
		let timeDiff = curentTime.getTime() - blogTime.getTime();
		let time = new Date(timeDiff);
		return blogTime.toDateString().substring(4);
	}

	async function bookmark() {
		try {
			setBookmark((prev) => !prev);
			const res = await PrivateAPI.get("/posts/bookmark/" + blog.id);
			if (res.status === 200) {
				bookmarkMsgRef.current.style.visibility = "visible";
				bookmarkMsgRef.current.style.opacity = 1;
				setTimeout(() => {
					bookmarkMsgRef.current.style.visibility = "hidden";
					bookmarkMsgRef.current.style.opacity = 0;
				}, 2000);
			}
		} catch (err) {
			console.log(err);
			wentWrongMsg();
			setBookmark((prev) => !prev);
		}
	}

	function handleBookmark() {
		if (!user) {
			setModal(true);
		} else {
			bookmark();
		}
	}

	async function like() {
		try {
			setLike((prev) => !prev);
			is_liked ? changeLike((prev) => prev - 1) : changeLike((prev) => prev + 1);
			const res = await PrivateAPI.post('posts/likePost/' + blog.id);
		} catch (err) {
			console.log(err);
		}
	}

	function handleLike() {
		if (!user) {
			setModal(true);
		} else {
			like();
		}
	}

	function ProfilePage() {
		const isOtherUser = true;
	}

	return (
		<>
			{loginModal ? <LoginModal changeModal={setModal} /> : null}
			<div className='blogContainer'>
				{!showLimited && (
					<div className='blogHeader'>
						<Link to={"/devlog/account/" + blog?.user?.userName}>
							<img className='blogHeaderImage' src={blog?.user?.profilePhoto} alt='blogHeader' onClick={ProfilePage} />
						</Link>
						<Link to={"/devlog/" + blog?.user?.userName} target="_blank">
							<div className='blogHeaderNameTimeDiv'>
								<div className='blogHeaderName'>{blog?.user?.name}</div>
								<div className='blogHeaderUsernameTimeDiv'>
									<div className='blogHeaderUsername'>{blog?.user?.userName}</div>
									<div className='dot'></div>
									<div className='blogHederTimeago'>{timeAgo()}</div>
								</div>
							</div>
						</Link>
					</div>
				)}

				<Link to={"/devlog/" + blog?.user?.userName + "/" + blog?.url_title}>
					<div className='blogBody'>
						<div className='blogBodyContentDiv'>
							<div className='blogBodyTitle'>{blog?.title}</div>
							<div className='blogBodyMinRead'>{blog?.minRead} min read</div>
							<div className='blogBodyContent'>{blog?.content}...</div>
						</div>
						<div className='blogBodyImageDiv'>
							{blog.ContainImage ? <img className='blogBodyImage' src={blog?.photo} alt='Blog' /> : null}
						</div>
					</div>
				</Link>

				{!showLimited && (
					<div className='blogFooter'>
						<div className='bookmarkIconDiv' onClick={handleBookmark}>
							<img className='bookmarkIcon' src={is_bookmarked ? require("../../img/bookmark.png") : require("../../img/bookmark-empty2.png")} />
						</div>
						<div className='heartIconDiv' onClick={handleLike}>
							<img className='heartIcon' src={is_liked ? require("../../img/heart-red3.png") : require("../../img/heart-empty2.png")} />
							<span className='likeCnt'>{likeCnt}</span>
						</div>
					</div>
				)}

				<div ref={bookmarkMsgRef} className='bookmarkmsg'>Bookmarked!</div>
			</div>
		</>
	);
}

export default BlogHome;