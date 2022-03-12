import Modal from './Modal'
import classes from "./DeleteBlog.module.css";
import { Link } from 'react-router-dom';
import { useState } from 'react';


const DeleteBlog = (props) => {
    const [isDeleted, setIsDeleted] = useState([]);
    
    const blogToDelete = props.blogName

    const confirmDelete = () => {
        <Modal>
            <div>
                {console.log("Hello")}
                <label>{blogToDelete} successfully deleted.</label>
                <Link to={`/blog`}>
                    <button onClick={props.onClose} className={classes['button--alt']}>Close</button>
                </Link>
            </div>
        </Modal>
    }
        

    const DeleteBlogForm =
        <div className={classes.actions}>
            <label>Are You Sure you wish to delete {blogToDelete}</label>
            <button onClick={props.onClose} className={classes['button--alt']}>Close</button>
            <button onClick={props.delete} className={classes.delete}>Confirm</button>
        </div>

    return (
        <Modal>
            <div>
                {DeleteBlogForm}
            </div>
        </Modal>
    )
}

export default DeleteBlog;