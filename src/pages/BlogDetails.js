import { useParams } from 'react-router-dom';
import classes from './BlogDetails.module.css';
import { useState, useEffect } from 'react';
import Card from './../components/Card';
import DeleteBlog from './../components/DeleteBlog';
import Modal from './../components/Modal';
import { Link } from 'react-router-dom';


const BlogDetails = () => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState(null);
    const [deleteBlogModal, setDeleteBlogModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [didDelete, setDidDelete] = useState(false);
    

    const params = useParams();

    const showDeleteHandler = () => {
        setDeleteBlogModal(true);
    }

    const hideDeleteHandler = () => {
        setDeleteBlogModal(false);
    }

    // use response to get a status code and produce error message
    // find this is fetch request for loading meals or in the http module
    const deleteBlog = async () => {
        setIsDeleting(true);
        const response = await fetch('https://student-moving-out-guide-default-rtdb.firebaseio.com/blog_posts/' + params.blogID + '.json', {
            method: 'DELETE',
        })
        setIsDeleting(false);
        setDidDelete(true);

        setDeleteBlogModal(false)
    }

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
        setBlogs(responseData);
        setIsLoading(false);
        };

        fetchBlogs().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
        });
    }, []);

    const deletedModalContent = 
    <Modal>
            <div>
                {console.log("Hello")}
                <label>{blogs.name} successfully deleted.</label>
                <Link to={`/blog`}>
                    <button className={classes['button']}>Close</button>
                </Link>
            </div>
        </Modal>

    return(
        <section>
            <div className={classes.page}>
                <Card>
                    <p>{blogs.blog}</p>
                    <p>Posted By {blogs.name} on the {blogs.date} </p>
                </Card>
                <button className={classes.button} onClick={showDeleteHandler}>
                        <span>Delete</span>
                </button>
                {deleteBlogModal && <DeleteBlog onClose={hideDeleteHandler} blogName={blogs.name} delete={deleteBlog}/>}
                {didDelete && deletedModalContent}
            </div>
        </section>
    )
}

export default BlogDetails;

