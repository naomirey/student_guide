import Modal from './Modal'
import classes from "./DeleteBlog.module.css";

const DeleteBlog = (props) => {
    
    const Bleg = props.blogName

    const DeleteBlogForm =
        <div className={classes.actions}>
            <label>Are You Sure you wish to delete {Bleg}</label>
            <button onClick={props.onClose} className={classes['button--alt']}>Close</button>
            <button className={classes.delete}>Confirm</button>
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