import classes from './Blog.module.css';
import React, { useState, useEffect } from 'react';
import Card from './../components/Card';
import BlogFormInput from '../components/Blog/BlogFormInput';
import Modal from './../components/Modal';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";
import blogInstance from "./../firebase/blogInstance";

const BlogsStored = (props) => {
    const [blogs, setBlogs] = useState([]);
    const [isDataLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState(null);
    const [addBlog, setAddBlog] = useState(false);
    const [isAddingBlog, setIsAddingBlog] = useState(false);
    const [didAddBlog, setDidAddBlog] = useState(false);
    const [categoryState, setCategoryState] = useState("All Blogs");
    const { isAuthenticated, isLoading, user } = useAuth0();
    const [currentCategory, setCurrentCategory] = useState()
    const [currentList, setCurrentList] = useState([]);
    const refreshPage = ()=>{
        window.location.reload();
     }

    const showAddBlogHandler = () => {
        setAddBlog(true);
    };

    const hideAddBlogHandler = () => {
        setAddBlog(false);
    }

    // const hideConfirmHandler = () => {
    //     setDidAddBlog(false);
    // }

    const submitBlogHandler = async (blogData) => {
        console.log(user)
        console.log(blogData)
        setIsAddingBlog(false);
        const response = await blogInstance.post('.json', blogData).then((response) =>
        console.log(response))
            // method: 'POST',
            // body: JSON.stringify({
            //     id: blogData.id,
            //     name: blogData.name,
            //     blog: blogData.blog,
            //     date: blogData.date
            // })
        // });
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
                // if (key.category === categoryState){
                //     currentBlogsStored.push({...response.data[key], id:key});
                //     console.log(key.category)
                // };
                const categorySelected = [];
                currentBlogsStored.filter(blogSave => blogSave.category === categoryState).map(filteredBlogs => (
                    categorySelected.push(filteredBlogs)
                    ));
                
            console.log(categorySelected) 
            setCurrentCategory(categorySelected);
            setIsLoading(false);
            console.log(currentCategory);
        }})
        if (categoryState === "All Blogs"){
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
        // currentBlogsStored.push({...response.data[key], id:key});
        
        // const fetchBlogs = async () => {
        //     setIsLoading(true);
        
        //     const response = await fetch('https://student-moving-out-guide-default-rtdb.firebaseio.com/blog_posts.json');
        //     const responseData = await response.json();

        //     if (!response.ok) {
        //         throw new Error('Something went wrong!')
                
        //     }

        //     const loadedBlogs = [];
            
        //     for (const key in responseData) {
        //         loadedBlogs.push({
        //             key: key,
        //             id: key,
        //             name: responseData[key].name,
        //             user: responseData[key].user,
        //             blog: responseData[key].blog,
        //             category: responseData[key].category,
        //             date: responseData[key].date,
        //         });
        //     }
        //     setBlogs(loadedBlogs);
        //     setIsLoading(false);
        //     console.log(blogs);
        // };
        // if (categoryState === "All Blogs"){
        //     setCurrentList(blogs);
        //     console.log(currentList)
        // }
        // else{
        //     setCurrentList(currentCategory);
        //     console.log(currentList)
        // }

        // fetchBlogs().catch((error) => {
        // setIsLoading(false);
        // setHttpError(error.message);
        // });
        // console.log(categoryState)
    }, [categoryState]);

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
            <Link to={`/blog/${blog.id}`} style={{ textDecoration: 'none' }}>
                <Card>
                    <div className={classes.blogPost}>
                        <div style={{fontSize:"20px"}}>{blog.blog}</div>
                        <div>Posted {blog.date} by {blog.name} ({blog.user}) </div>
                        <h4>{blog.category}</h4>
                    </div>
                </Card>
            <div className={classes.blank} />
            </Link>
        </div>
    ));
    const confirmAddBlog =
        <Modal>
            <div>
                <label>Blog was successfully added!</label>
                <button onClick={refreshPage} className={classes['button']}>Close</button>
            </div>
        </Modal>

    return (
        <div style={{padding: '15rem'}}>
            <section>
            <div className={classes.blank} />
            <select 
                    className = "custom-select"
                    value={categoryState}
                    onChange={(e)=>{
                        const selectedCategory = e.target.value
                        setCategoryState(selectedCategory)
                    }}>
                    <option defaultValue="all blogs">All Blogs</option>
                    <option value="money advice">Money Advice</option>
                    <option value="student life">Student Life</option>
                    <option value="cleaning">Cleaning</option>
                </select>
                {isAuthenticated ?
                <Button className={classes.button} onClick={showAddBlogHandler}>
                    <span>Add Blog Post</span>
                </Button>
                : isLoading ?
                <h3>Loading ..</h3>
                    :
                <h2>Login to add a blog</h2>
            }
                
                {addBlog && <BlogFormInput onClose={hideAddBlogHandler} onPost={submitBlogHandler}/>}
                {didAddBlog && confirmAddBlog}
                <div className={classes.blank} />
                <div className={classes.heading}>Blog Posts: </div>
                <div className={classes.blank} />
                <ul>{blogsList}</ul>
            </section>
        </div>
    );
};

export default BlogsStored;