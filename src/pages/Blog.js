import classes from './Blog.module.css';
import React, { useState, useEffect } from 'react';
import Title from './../components/Title';
import BlogFormInput from '../components/Blog/BlogFormInput';
import Modal from './../components/Modal';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";
import blogInstance from "./../firebase/blogInstance";


const BlogsStored = () => {
    const [blogs, setBlogs] = useState([]);
    const [isDataLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState(null);
    const [addBlog, setAddBlog] = useState(false);
    const [isAddingBlog, setIsAddingBlog] = useState(false);
    const [didAddBlog, setDidAddBlog] = useState(false);
    const [categoryState, setCategoryState] = useState("all blogs");
    const { isAuthenticated, isLoading, user } = useAuth0();
    const [currentCategory, setCurrentCategory] = useState()
    const [currentList, setCurrentList] = useState([]);
    const [addLike, setAddLike] = useState(false);
    const [updateLikes, setUpdateLikes] = useState();

    const refreshPage = ()=>{
        window.location.reload();
     }

    const showAddBlogHandler = () => {
        setAddBlog(true);
    };

    const hideAddBlogHandler = () => {
        setAddBlog(false);
        
    }

    const addLikeHandler = (props) => {
        setAddLike(!addLike);
        setUpdateLikes(props);
        console.log(addLike)
        console.log(updateLikes);
    }

    const submitBlogHandler = async (blogData) => {
        console.log(user)
        console.log(blogData)
        setIsAddingBlog(false);
        const response = await blogInstance.post('.json', blogData).then((response) =>
        console.log(response))
        setIsAddingBlog(false);
        setDidAddBlog(true);
        setAddBlog(false);
    }

    useEffect(() => {
        setIsLoading(true);
        blogInstance.get('.json').then((response)=>{
            const currentBlogsStored = [];
            for (const key in response.data) {
                currentBlogsStored.push({...response.data[key], id:key});
                setBlogs(currentBlogsStored)  
                
        }})
    
        if (categoryState === "all blogs"){
            setCurrentList(blogs);
            console.log(currentList)
        }
        else{
            const categorySelected = [];
                blogs.filter(blogSave => blogSave.category === categoryState).map(filteredBlogs => (
                    categorySelected.push(filteredBlogs)
                    ));
                setCurrentList(categorySelected)
        }
        console.log(categoryState)

        if (addLike === false){
            blogInstance.get(updateLikes+ '.json').then((response)=>{
                let currentLikes = 0;
                currentLikes = parseInt(response.data.likes) + 1;
                console.log(currentLikes)
                const likeData = ({likes:currentLikes})
                blogInstance.patch(updateLikes+ '.json', likeData).then((response)=>{
                    console.log(response)
                })
            })
        }
        if (addLike === true){
            blogInstance.get(updateLikes+ '.json').then((response)=>{
                let currentLikes = 0;
                currentLikes = parseInt(response.data.likes) - 1;
                console.log(currentLikes)
                const likeData = ({likes:currentLikes})
                blogInstance.patch(updateLikes+ '.json', likeData).then((response)=>{
                    console.log(response)
                })
            })
        }
        setIsLoading(false);
  
    }, [categoryState, addLike]);

    if (isDataLoading) { 
        return (
        <section className={classes.BlogsLoading}>
        <p>Loading...</p>
        </section>
        );
    }

    if (httpError) {
        return (
        <section className={classes.BlogsError}>
        <p>{httpError}</p>
        </section>
        )
    }

    const blogsList = currentList.map((blog) => (
        <div key={blog.id}>
            <Card style={{padding:"20px", borderRadius: "50px"}}>
                <Link to={`/blog/${blog.id}`} style={{ textDecoration: 'none' }}>
                    
                    <div className={classes.blogPost}>
                        <div style={{fontSize:"20px"}}>
                            <h4>{blog.blogTitle}</h4>
                        </div>
                        <div>Posted {blog.date}</div>
                        <div> by {blog.name} ({blog.user}) </div>
                        <h5>{blog.category}</h5>
                    </div>
                </Link>
                {isAuthenticated ?
                    <div style={{textAlign: "right"}} >
                        <Button onClick={()=>addLikeHandler(blog.id)} style={{backgroundColor:"white"}} >
                            <h2>
                                {blog.likes}
                                <img style={{height:"30px", width:"30px"}}src={"likee.png"}>
                                </img>
                            </h2>
                        </Button>
                    </div>
                    :
                    <div style={{textAlign: "right"}}>
                        <h2>
                            {blog.likes}
                            <img style={{height:"30px", width:"30px"}}src={"likee.png"}>
                            </img>
                        </h2>
                    </div>
                    }
            </Card>
        </div>
    ));
    const confirmAddBlog =
        <Modal>
            <div>
                <label>Blog was successfully added!</label>
                <Button onClick={refreshPage}>Close</Button>
            </div>
        </Modal>

    return (
        <>
        <Title>Blog Page</Title>
        <div style={{padding: '20rem'}}>
            <section>
            <div className={classes.blank} />
            <select 
                    className = "custom-select"
                    value={categoryState}
                    onChange={(e)=>{
                        const selectedCategory = e.target.value
                        setCategoryState(selectedCategory)
                    }}>
                    <option defaultValue="all blogs" value="all blogs">All Blogs</option>
                    <option value="money advice">Money Advice</option>
                    <option value="student life">Student Life</option>
                    <option value="cleaning">Cleaning</option>
                </select>
                {isAuthenticated ?
                <Button style={{margin:"30px"}} onClick={showAddBlogHandler}>
                    <span>Add Blog Post</span>
                </Button>
                : isLoading ?
                <h3>Loading .</h3>
                    :
                <h2>Login to add a blog...</h2>
            }
                
                {addBlog && <BlogFormInput onClose={hideAddBlogHandler} onPost={submitBlogHandler}/>}
                {didAddBlog && confirmAddBlog}
                <div className={classes.blank} />
                <div className={classes.heading}>Blog Posts: </div>
                <div className={classes.blank} />
                <ul>{blogsList}</ul>
            </section>
        </div>
        </>
    );
};

export default BlogsStored;