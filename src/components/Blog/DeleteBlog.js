import Modal from '../Modal'
import { Button } from 'react-bootstrap';


const DeleteBlog = (props) => {
    const blogToDelete = props.blogTitle

    const DeleteBlogForm =
        <div>
            <label>Are You Sure you wish to delete {blogToDelete}</label>
            <Button onClick={props.onClose}>Close</Button>
            <Button onClick={props.delete}>Confirm</Button>
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