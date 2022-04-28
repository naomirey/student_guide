import classes from "./BlogFormInput.module.css";
import Modal from '../Modal'
import { useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";

const isEmpty = value => value.trim() === '';

const BlogFormInput = (props) => {
    const { user } = useAuth0();
    const [currentBlogs, setCurrentBlogs] = useState([]);
    const [formInputValid, setFormInputValid] = useState({
        name: true,
        blog: true,
        category: true,
        date: true
    })

    const nameInputRef = useRef();
    const blogInputRef = useRef();
    const categoryInputRef = useRef();
    const dateInputRef = useRef();
    
    const postBlogHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredBlog = blogInputRef.current.value;
        const enteredCategory = categoryInputRef.current.value;
        const enteredDate = dateInputRef.current.value;
        console.log(enteredDate);

        const enteredNameValid = !isEmpty(enteredName);
        const enteredBlogValid = !isEmpty(enteredBlog);
        const enteredCategoryValid = !isEmpty(enteredCategory);
        const enteredDateValid = !isEmpty(enteredDate);

        setFormInputValid({
            name: enteredNameValid,
            blog: enteredBlogValid,
            category: enteredCategoryValid,
            date: enteredDateValid
        })

        const formIsValid = 
            enteredNameValid &&
            enteredBlogValid &&
            enteredCategoryValid &&
            enteredDateValid

        if (!formIsValid) {
            return;
        }

        props.onPost({
            name: enteredName,
            user: user.nickname,
            blog: enteredBlog,
            category: enteredCategory,
            date: enteredDate
        });
        setCurrentBlogs(enteredNameValid);
    };
    
    const nameControlClasses = `${classes.control} ${
        formInputValid.name ? '' : classes.invalid
    }`;
    const blogControlClasses = `${classes.control} ${
        formInputValid.blog ? '' : classes.invalid
    }`;
    const categoryControlClasses = `${classes.control} ${
        formInputValid.category ? '' : classes.invalid
    }`;
    const dateControlClasses = `${classes.control} ${
        formInputValid.date ? '' : classes.invalid
    }`;

    const BlogForm = 
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
            <div className={categoryControlClasses}>
                <label htmlFor='category'>Category</label>
                <select type='category' id='category' ref={categoryInputRef} >
                    <option value="money advice">Money Advice</option>
                    <option value="student life">Student Life</option>
                    <option value="cleaning">Cleaning</option>
                </select>
                {!formInputValid.category && <p>Error select a category</p>}
            </div>
            <div className={dateControlClasses}>
                <label htmlFor='date'>Date</label>
                <input type='date' id='date' ref={dateInputRef} />
                {!formInputValid.date && <p>Error enter a date</p>}
            </div>
            <div className={classes.actions}>
                <Button onClick={props.onClose} className={classes['button--alt']}>Close</Button>
                <Button onClick={postBlogHandler} className={classes.submit}>Post</Button>
            </div>
        </form>

    return (
        <Modal>
            <div>
                {BlogForm}
            </div>
        </Modal>
    )
}

export default BlogFormInput;