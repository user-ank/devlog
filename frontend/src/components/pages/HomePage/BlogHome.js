import { useState } from 'react'
import { Link } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { wentWrongMsg } from '../../Header/Header';
import { useAuth } from '../../../context/auth';
import './BlogHome.css'
import LoginModal from '../Authentication/LoginModal';

function BlogHome(prop) {
	let { blog } = prop;
	const PrivateAPI = useAxiosPrivate();
	const [loginModal, setModal] = useState(false);
	const [is_bookmarked, setBookmark] = useState(false);
	const {user} = useAuth();

	let blogTime = new Date(blog.updatedAt);
	let curentTime = new Date();
	let timeDiff = curentTime.getTime() - blogTime.getTime();
	let time = new Date(timeDiff);


	async function bookmark()
	{
		try{
			setBookmark(prev => !prev);
			const res = await PrivateAPI.get("/posts/bookmark/"+ blog.id);	
			console.log(res);		
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
	

	return (
		<>
		{loginModal ? <LoginModal changeModal={setModal}/> : null}

			<div className='blogContainer'>
					<div className='blogHeader'>
						<img className='blogHeaderImage' src={blog.user.profilePhoto} alt='blogHeader'/>
						
						<Link to={"/devlog/" + blog.user.userName}>
							<div className='blogHeaderNameTimeDiv'>

								<div className='blogHeaderName'>{blog.user.name}</div>

								<div className='blogHeaderUsernameTimeDiv'>
									<div className='blogHeaderUsername'>{blog.user.userName}</div>
									<div className='dot'></div>
									<div className='blogHederTimeago'>{blogTime.toDateString()}</div>
								</div>
							</div>
						</Link>
					</div>


					<Link to={"/devlog/" + blog.user.userName + "/" + blog.title}>
						<div className='blogBody'>
							<div className='blogBodyContentDiv'>
								<div className='blogBodyTitle'>{blog.title}</div>
								<div className='blogBodyMinRead'>{blog.minute_read} min read</div>
								<div className='blogBodyContent'>{blog.content.substring(0,200)+"..."}</div>
							</div>
							<div className='blogBodyImageDiv'> {/*  put image here */}
								{blog.ContainImage ? <img className='blogBodyImage' src={blog.photo}/> : null}
							</div>					
						</div>
					</Link>

				<div className='blogFooter'>
					<img className='bookmarkIcon'
						src={is_bookmarked ? require("../../img/bookmark.png") : require("../../img/bookmark-empty.png")}
						onClick={handleBookmark}
						/>
				</div>
				<div className='bookmarkmsg'>Bookmarked !</div>
			</div>
		</>
	)
}

export default BlogHome
