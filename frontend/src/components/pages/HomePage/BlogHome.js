import { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { wentWrongMsg } from '../../Header/Header';
import { useAuth } from '../../../context/auth';
import './BlogHome.css'
import LoginModal from '../Authentication/LoginModal';

function BlogHome(prop) {
	let { blog } = prop;
	const PrivateAPI = useAxiosPrivate();	   // This instance is used to get data for private routes; it send the access token to server. 
	
	const [loginModal, setModal] = useState(false); 	// pops the modal to make users login
	const [is_bookmarked, setBookmark] = useState(blog.isBookmarked ? true : false);	// to show if post is already bookmarked or not
	const [is_liked, setLike] = useState(blog.isLiked ? true : false);					// to show if post is already liked or not
	const [likeCnt, changeLike] = useState(blog.likeCnt);

	const bookmarkMsgRef = useRef();

	const {user} = useAuth();							// to see if there is user present or not

	function timeAgo(){
		let blogTime = new Date(blog.updatedAt);
		let curentTime = new Date();
		let timeDiff = curentTime.getTime() - blogTime.getTime();
		let time = new Date(timeDiff);

		// if(time.getMinutes() < 1 && time.getHours <= 23 )
		// 	return("a minute ago")
		// else if(time.getMinutes() < 60)
		// 	return (time.getMinutes() + " minutes ago");
		// else if ( time.getMinutes() < 120)				// To be made later
		// 	return ("an hour ago");
		// console.log(blogTime.toDateString()+" "+time.getTime() + " " + time.getMinutes() + " " + time.getHours())
		// if ( time.getHours <= 23)
		// 	return (time.getHours() + " hours ago");
		// else
			return (blogTime.toDateString().substring(4))
	}


	async function bookmark()
	{
		try{
			setBookmark(prev => !prev);
			const res = await PrivateAPI.get("/posts/bookmark/"+ blog.id);	
			console.log(res);		
			if(res.status === 200)
			{
				bookmarkMsgRef.current.style.visibility = "visible";
				bookmarkMsgRef.current.style.opacity = 1;
				setTimeout(()=>{
					bookmarkMsgRef.current.style.visibility = "hidden";
					bookmarkMsgRef.current.style.visibility = 0;
			}, 2000)
			}

		}
		catch(err)
		{
			console.log(err);
			wentWrongMsg();
			setBookmark(prev => !prev);
		}
	}

	function handleBookmark(){
		if(!user)
		{
			setModal(true);
		}
		else{
			bookmark();
			console.log('ready to bookmark');
		}
	}
	
	async function like(){
		try{
			setLike(prev => !prev);
			is_liked ? changeLike(prev => prev - 1) : changeLike(prev => prev + 1)  
			
			const res = await PrivateAPI.post('posts/likePost/' + blog.id)
			console.log(res);
		}
		catch(err)
		{
			console.log(err);
		}
	}
	function handleLike(){
		if(!user)
		{
			setModal(true);
		}
		else{
			like();
			console.log('ready to bookmark');
		}
	}

	return (
		<>
		{loginModal ? <LoginModal changeModal={setModal}/> : null}

			<div className='blogContainer'>
					<div className='blogHeader'>
						<img className='blogHeaderImage' src={blog?.user?.profilePhoto} alt='blogHeader'/>
						
						<Link to={"/devlog/" + blog.user.userName} target="_blank" >
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


					<Link to={"/devlog/" + blog.user.userName + "/" + blog.title}>
						<div className='blogBody'>
							<div className='blogBodyContentDiv'>
								<div className='blogBodyTitle'>{blog?.title}</div>
								<div className='blogBodyMinRead'>{blog?.minRead} min read</div>
								<div className='blogBodyContent'>{blog?.content}</div>
							</div>
							<div className='blogBodyImageDiv'> {/*  put image here */}
								{blog.ContainImage ? <img className='blogBodyImage' src={blog.photo}/> : null}
							</div>					
						</div>
					</Link>

				<div className='blogFooter'>
					<div className='bookmarkIconDiv' onClick={handleBookmark}>
						<img className='bookmarkIcon'
							src={is_bookmarked ? require("../../img/bookmark.png") : require("../../img/bookmark-empty2.png")}
							/>
					</div>

					<div className='heartIconDiv' onClick={handleLike}>
						<img className='heartIcon'
							src={is_liked ? require("../../img/heart-red3.png") : require("../../img/heart-empty2.png")}
							/>
						<span className='likeCnt'>{likeCnt}</span>
					</div>

				</div>

				<div ref={bookmarkMsgRef} className='bookmarkmsg'>Bookmarked !</div>
			</div>
		</>
	)
}

export default BlogHome
