import classes from './Blog.module.css';
import { useState, useEffect } from 'react';
import Card from './../components/Card';
import AddBlog from './../components/AddBlog';
import DeleteBlog from './../components/DeleteBlog';
import { Link } from 'react-router-dom';

const BlogsStored = () => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState(null);
    const [addBlog, setAddBlog] = useState(false);
    const [deleteBlog, setDeleteBlog] = useState(false);
    // const [postingBlog, setPostingBlog] = useState(false);

    const showAddBlogHandler = () => {
        setAddBlog(true);
    };

    const hideAddBlogHandler = () => {
        setAddBlog(false);
    }

    const showDeleteHandler = () => {
        setDeleteBlog(true);
    }

    const hideDeleteHandler = () => {
        setDeleteBlog(false);
    }

    const submitBlogHandler = async (blogData) => {
        await fetch('https://student-moving-out-guide-default-rtdb.firebaseio.com/blog_posts.json', {
            method: 'POST',
            body: JSON.stringify({
                id: blogData.id,
                name: blogData.name,
                blog: blogData.blog,
                date: blogData.date
            })
        });
        setAddBlog(false);
    }

    // const deleteBlog = () => {
    //     const dummyID = "-Mt-5e6BxTV6SS-UvZY-";
    //      fetch('https://student-moving-out-guide-default-rtdb.firebaseio.com/blog_posts/' + dummyID + '.json', {
    //         method: 'DELETE',
    //     })
    // }

    const editBlog = () => {
        const dummyID = "-Mt-5e6BxTV6SS-UvZY-";
        const dummyName = "Edit";
        const dummyBlog = "Blog Edit";
        const dummyDate = "Date Edit"
         fetch('https://student-moving-out-guide-default-rtdb.firebaseio.com/blog_posts/' + dummyID + '.json', {
            method: 'PUT',
            body: JSON.stringify({
                name: dummyName,
                blog: dummyBlog,
                date: dummyDate
            })
        })
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

    const blogsList = blogs.map((blog) => (
        <div>
            <Link to={`/blog/${blog.id}`}>
                <Card>
                    <div className={classes.blogPost}>{blog.blog}</div>
                    <div>Posted {blog.date} by {blog.name} </div>
                    <button className={classes.button} onClick={showDeleteHandler}>
                        <span>Delete</span>
                    </button>
                    {deleteBlog && <DeleteBlog onClose={hideDeleteHandler} blogName={blog.name} />}
                    {/* onPost={submitBlogHandler}/>} */}
                </Card>
            <div className={classes.blank} />
            </Link>
        </div>
    ));


    return (
        
        <div>
            <section className={classes.page}>
            <div className={classes.blank} />
                <button className={classes.button} onClick={showAddBlogHandler}>
                    <span>Add Blog Post</span>
                </button>
                {addBlog && <AddBlog onClose={hideAddBlogHandler} onPost={submitBlogHandler}/>}
                <div className={classes.blank} />
                <div className={classes.heading}>Blog Posts: </div>
                <div className={classes.blank} />
                <ul>{blogsList}</ul>
                {/* <button className={classes.button} onClick={deleteBlog}>Delete Post</button> */}
                <button className={classes.button} onClick={editBlog}>Edit Post</button>
            </section>
        </div>
    );
};

export default BlogsStored;