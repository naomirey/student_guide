import classes from './Blog.module.css';
import React, { useState, useEffect } from 'react';
import Card from './../components/Card';
import BlogFormInput from '../components/Blog/BlogFormInput';
import Modal from './../components/Modal';
import { Link } from 'react-router-dom';

const BlogsStored = () => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState(null);
    const [addBlog, setAddBlog] = useState(false);
    const [isAddingBlog, setIsAddingBlog] = useState(false);
    const [didAddBlog, setDidAddBlog] = useState(false);
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
        setIsAddingBlog(false);
        const response = await fetch('https://student-moving-out-guide-default-rtdb.firebaseio.com/blog_posts.json', {
            method: 'POST',
            body: JSON.stringify({
                id: blogData.id,
                name: blogData.name,
                blog: blogData.blog,
                date: blogData.date
            })
        });
        setIsAddingBlog(false);
        setDidAddBlog(true);
        setAddBlog(false);
    }

    useEffect(() => {
        const fetchBlogs = async () => {
        setIsLoading(true);
        const response = await fetch('https://student-moving-out-guide-default-rtdb.firebaseio.com/blog_posts.json');
        const responseData = await response.json();

        if (!response.ok) {
            throw new Error('Something went wrong!')
            
        }

        const loadedBlogs = [];
        
        for (const key in responseData) {
            loadedBlogs.push({
                key: key,
                id: key,
                name: responseData[key].name,
                blog: responseData[key].blog,
                date: responseData[key].date,
            });
        }
        setBlogs(loadedBlogs);
        setIsLoading(false);
        console.log(blogs);
        };

        fetchBlogs().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
        });
    }, []);

    if (isLoading) { 
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
    console.log(blogs);
    const blogsList = blogs.map((blog) => (
        <div>
            <Link to={`/blog/${blog.id}`} style={{ textDecoration: 'none' }}>
                <Card>
                    <div className={classes.blogPost}>
                        <div>{blog.blog}</div>
                        <div>Posted {blog.date} by {blog.name} </div>
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
        <div>
            <section className={classes.page}>
            <div className={classes.blank} />
                <button className={classes.button} onClick={showAddBlogHandler}>
                    <span>Add Blog Post</span>
                </button>
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