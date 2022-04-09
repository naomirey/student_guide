import { useParams } from 'react-router-dom';
import classes from './BlogDetails.module.css';
import { useState, useEffect } from 'react';
import Card from './../components/Card';
import DeleteBlog from '../components/Blog/DeleteBlog';
import Modal from './../components/Modal';
import { Link } from 'react-router-dom';
import BlogFormInput from '../components/Blog/BlogFormInput'
import { propTypes } from 'react-bootstrap/esm/Image';


const BlogDetails = () => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState(null);
    const [deleteBlogModal, setDeleteBlogModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [didDelete, setDidDelete] = useState(false);
    const [didUpdate, setDidUpdate] = useState(false);
    const [editBlogModal, setEditBlogModal] = useState(false);
    

    const params = useParams();

    const showDeleteHandler = () => {
        setDeleteBlogModal(true);
    }

    const hideDeleteHandler = () => {
        setDeleteBlogModal(false);
    }
    function refreshPage() {
        window.location.reload(false);
    }
    
    const showEditHandler = () => {
        setEditBlogModal(true);
    }

    const hideEditHandler = () => {
        setEditBlogModal(false);
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

    const editBlogHandler = (blogData) => {
         fetch('https://student-moving-out-guide-default-rtdb.firebaseio.com/blog_posts/' + params.blogID + '.json', {
            method: 'PUT',
            body: JSON.stringify({
                name: blogData.name,
                blog: blogData.blog,
                date: blogData.date
            })
        })
        setEditBlogModal(false);
        setDidUpdate(true);
    }

    useEffect(() => {
        const fetchBlogs = async () => {
        setIsLoading(true);
        const response = await fetch('https://student-moving-out-guide-default-rtdb.firebaseio.com/blog_posts/'+ params.blogID + '.json');
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
                <label>{blogs.name} deleted successfully.</label>
                <Link to={`/blog`}>
                    <button className={classes['button']}>Close</button>
                </Link>
            </div>
        </Modal>
    const editModalContent =
    <Modal>
            <div>
                <label>{blogs.name} edited successfully.</label>
                <Link to={`/blog`}>
                    <button onClick={refreshPage} className={classes['button']}>Close</button>
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
                <button className={classes.button} onClick={showEditHandler}>
                        <span>Edit</span>
                </button>
                {editBlogModal && <BlogFormInput onClose={hideEditHandler} onPost={editBlogHandler} 
                currentName={blogs.name}
                currentDate={blogs.date}
                currentBlog={blogs.blog}/>}
                {didUpdate && editModalContent}
            </div>
        </section>
    )
}

export default BlogDetails;

