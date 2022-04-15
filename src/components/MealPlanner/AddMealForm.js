import classes from "./../../pages/BlogDetails.module.css";
import Modal from '../Modal'
import { useState, useRef } from 'react';


const isEmpty = value => value.trim() === '';

const AddMealForm = (props) => {
    const [currentMeals, setCurrentMeals] = useState([]);
    const [formInputValid, setFormInputValid] = useState({
        name: true,
    })

    const nameInputRef = useRef();
    
    const postMealHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
   
        const enteredNameValid = !isEmpty(enteredName);

        setFormInputValid({
            name: enteredNameValid
        })

        const formIsValid = 
            enteredNameValid 

        if (!formIsValid) {
            return;
        }

        props.onPost({
            name: enteredName,

        });
        setCurrentMeals(enteredNameValid);
    };
    
    const nameControlClasses = `${classes.control} ${
        formInputValid.name ? '' : classes.invalid
    }`;

    const MealForm = 
        <form className={classes.form} onSubmit={postMealHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Meal Name: </label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputValid.name && <p>Error enter name</p>}
            </div>
            <div className={classes.actions}>
                <button onClick={props.onClose} className={classes['button--alt']}>Close</button>
                <button className={classes.submit}>Post</button>
            </div>
        </form>

    return (
        <Modal>
            <div>
                {MealForm}
            </div>
        </Modal>
    )
}

export default AddMealForm;