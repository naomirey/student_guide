import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DeleteBlog from '../components/Blog/DeleteBlog';
import Modal from './../components/Modal';
import { Link } from 'react-router-dom';
import BlogFormInput from '../components/Blog/BlogFormInput';
import Title from './../components/Title';
import { Button, Card } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";


const BlogDetails = () => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState(null);
    const [deleteBlogModal, setDeleteBlogModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [didDelete, setDidDelete] = useState(false);
    const [didUpdate, setDidUpdate] = useState(false);
    const [editBlogModal, setEditBlogModal] = useState(false);
    const { user, isAuthenticated } = useAuth0();

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
        const response = await fetch('https://student-guide-8b721-default-rtdb.firebaseio.com/blog/blog_posts/' + params.blogID + '.json', {
            method: 'DELETE',
        })
        setIsDeleting(false);
        setDidDelete(true);

        setDeleteBlogModal(false)
    }

    const editBlogHandler = (blogData) => {
         fetch('https://student-guide-8b721-default-rtdb.firebaseio.com/blog/blog_posts/' + params.blogID + '.json', {
            method: 'PUT',
            body: JSON.stringify({
                name: blogData.name,
                blogTitle: blogData.blogTitle,
                category: blogData.category,
                user: user.nickname,
                blog: blogData.blog,
                date: blogData.date,
                likes: 0
            })
        })
        setEditBlogModal(false);
        setDidUpdate(true);
    }

    useEffect(() => {
        const fetchBlogs = async () => {
        setIsLoading(true);
        const response = await fetch('https://student-guide-8b721-default-rtdb.firebaseio.com/blog/blog_posts/'+ params.blogID + '.json');
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
                blogTitle: responseData[key].blogTile,
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
                <label>{blogs.blogTitle} deleted successfully.</label>
                <Link to={`/blog`}>
                    <Button>Close</Button>
                </Link>
            </div>
        </Modal>
    const editModalContent =
    <Modal>
            <div>
                <label>{blogs.blogTitle} edited successfully.</label>
                <Link to={`/blog`}>
                    <Button onClick={refreshPage} >Close</Button>
                </Link>
            </div>
        </Modal>

    return(
        <div style={{padding: '20rem'}}>
            <Title>Blog Details </Title>
            <Card>
                {isAuthenticated ? 
                <>
                    <div style={{padding:"100px"}}>
                        <h2>{blogs.blogTitle}</h2>
                        <p>{blogs.blog}</p>
                        <p>Posted By {blogs.name} on the {blogs.date} </p>
                    </div>
                    <div style={{padding:"20px", justifyContent:"center"}}>
                        <Button onClick={showDeleteHandler}>
                            <span>Delete</span>
                        </Button>
                        {deleteBlogModal && <DeleteBlog onClose={hideDeleteHandler} blogTitle={blogs.blogTitle} delete={deleteBlog}/>}
                        {didDelete && deletedModalContent}
                        <Button onClick={showEditHandler}>
                                <span>Edit</span>
                        </Button>
                    </div> 
                    </>
                    :
                    <>
                    <div style={{padding:"100px"}}>
                        <h2>{blogs.blogTitle}</h2>
                        <p>{blogs.blog}</p>
                        <p>Posted By {blogs.name} on the {blogs.date} </p>
                    </div>
                    </>
                    }
                
            </Card>
            <div style={{justifyContent:"center", margin:"20px", display: "flex"}}>
                <Button href='/blog'> - Return to Blogs - </Button>
            </div>
            {editBlogModal && <BlogFormInput onClose={hideEditHandler} onPost={editBlogHandler} 
            currentName={blogs.name}
            currentDate={blogs.date}
            currentBlog={blogs.blog}/>}
            {didUpdate && editModalContent}
        </div>
)
}

export default BlogDetails;

