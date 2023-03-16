import React from 'react'
import './BlogHome.css'
import { Link } from 'react-router-dom';

function BlogHome(prop) {
	let { blog } = prop;
	// console.log("im blog")

	let blogTime = new Date(blog.updatedAt);
	let curentTime = new Date();
	let timeDiff = curentTime.getTime() - blogTime.getTime();
	let time = new Date(timeDiff);

	return (
		<div className='blogContainer'>
				<div className='blogHeader'>
					<img className='blogHeaderImage' />
					
					<Link to={"/devlog/" + blog.username}>
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


				<Link to={"/devlog/" + blog.username + "/" + blog.title}>
					<div className='blogBody'>
						<div className='blogBodyContentDiv'>
							<div className='blogBodyTitle'>{blog.title}</div>
							<div className='blogBodyMinRead'>{5} min read</div>
							<div className='blogBodyContent'>{blog.content.substring(0,300)+"..."}</div>
						</div>
						<div className='blogBodyImage'> {/*  put image here */}
							{blog.hasImage ? <img /> : null}
						</div>

						
					</div>
				</Link>

			<div className='blogFooter'>

			</div>
		</div>
	)
}

export default BlogHome
