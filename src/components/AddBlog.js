import classes from "./AddBlog.module.css";
import Modal from './Modal'
import { useState, useRef } from 'react';

const isEmpty = value => value.trim() === '';

const AddBlog = (props) => {
    const [currentBlogs, setCurrentBlogs] = useState([]);
    const [formInputValid, setFormInputValid] = useState({
        name: true,
        blog: true,
        date: true
    })

    const nameInputRef = useRef();
    const blogInputRef = useRef();
    const dateInputRef = useRef();

    

    const postBlogHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredBlog = blogInputRef.current.value;
        const enteredDate = dateInputRef.current.value;

        const enteredNameValid = !isEmpty(enteredName);
        const enteredBlogValid = !isEmpty(enteredBlog);
        const enteredDateValid = !isEmpty(enteredDate);

        setFormInputValid({
            name: enteredNameValid,
            blog: enteredBlogValid,
            date: enteredDateValid
        })

        const formIsValid = 
            enteredNameValid &&
            enteredBlogValid &&
            enteredDateValid

        if (!formIsValid) {
            return;
        }

        props.onPost({
            name: enteredName,
            blog: enteredBlog,
            date: enteredDate
        });
        setCurrentBlogs(enteredNameValid);
        console.log(currentBlogs);
    };
    
    const nameControlClasses = `${classes.control} ${
        formInputValid.name ? '' : classes.invalid
    }`;
    const blogControlClasses = `${classes.control} ${
        formInputValid.blog ? '' : classes.invalid
    }`;
    const dateControlClasses = `${classes.control} ${
        formInputValid.date ? '' : classes.invalid
    }`;

    const AddBlogForm = 
        <form className={classes.form} onSubmit={postBlogHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputValid.name && <p>Error enter name</p>}
            </div>
            <div className={blogControlClasses}>
                <label htmlFor='blog'>Blog</label>
                <input type='text' id='blog' ref={blogInputRef} />
                {!formInputValid.blog && <p>Error enter your blog post</p>} 
            </div>
            <div className={dateControlClasses}>
                <label htmlFor='date'>Date</label>
                <input type='text' id='date' ref={dateInputRef} />
                {!formInputValid.date && <p>Error enter a date</p>}
            </div>
            <div className={classes.actions}>
                <button onClick={props.onClose} className={classes['button--alt']}>Close</button>
                <button className={classes.submit}>Post</button>
            </div>
        </form>


    return (
        <Modal>
            <div>
                {AddBlogForm}
            </div>
        </Modal>
    )
}

export default AddBlog;