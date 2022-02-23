import { useParams } from 'react-router-dom';
import classes from './BudgetCalc.module.css';
import { useState, useEffect } from 'react';
import Card from './../components/Card';

const BlogDetails = (props) => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState(null);
    const params = useParams();

    useEffect(() => {
        
        const fetchBlogs = async () => {
        setIsLoading(true);
        const response = await fetch('https://student-moving-out-guide-default-rtdb.firebaseio.com/blog_posts/'+ params.blogID + '.json');
        const responseData = await response.json();
        console.log(responseData);

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
            console.log(loadedBlogs);
        }
        // setBlogs(responseData);
        // setIsLoading(false);
        // console.log(blogs);
        };

        fetchBlogs().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
        });
    }, []);

    // const blogInfo = blogs.map((blog) => (
    //     <div>
    //         <Card>
    //             <div className={classes.blogPost}>{blog.blog}</div>
    //             <div>Posted {blog.date} by {blog.name} </div>
    //             {/* <button className={classes.button} onClick={showDeleteHandler}>
    //                 <span>Delete</span>
    //             </button> */}
    //             {/* {deleteBlog && <DeleteBlog onClose={hideDeleteHandler} blogName={blog.name} />} */}
    //             {/* onPost={submitBlogHandler}/>} */}
    //         </Card>
    //         <div className={classes.blank} />
    //     </div>
    // ));

    return(
        <section>
            <div className={classes.page}>
                <h2>Budget Calc</h2>
                <p>{blogs.name}</p>
                </div>
        </section>
    )
}

export default BlogDetails;

