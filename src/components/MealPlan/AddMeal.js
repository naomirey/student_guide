import instance from '../../firebase/instance';
import { useRef, useState } from 'react'
import { Button, Form } from 'react-bootstrap';

const isEmpty = value => value.trim() === '';

export default function AddMeal(props) {
    const [formInputValid, setFormInputValid] = useState({
        meal:true,
        ingredient:true
    });
    const mealInput = useRef();
    const ingredientsInput = useRef();
    const refreshPage = ()=>{
        window.location.reload();
     }
    const postMeal = () => {
        const enteredMeal = mealInput.current.value;
        const enteredIngredients = ingredientsInput.current.value;
        const submitMeal = async (formData) => {
            instance.post('/meals/.json', formData).then((response)=>{
            if (response.statusText == "OK") {
                refreshPage();
                alert("Added Successfully")
                console.log("success")
            } else{
                alert("Error")
            }
        })
        }
        const enteredMealValid = !isEmpty(enteredMeal);
        const enteredIngredientValid = !isEmpty(enteredIngredients);
        setFormInputValid({
            meal: enteredMealValid,
            ingredient: enteredIngredientValid
        })
        const formIsValid = 
            enteredMealValid &&
            enteredIngredientValid

        if (!formIsValid) {
            return;
        }
        submitMeal({
            name: enteredMeal,
            ingredients: enteredIngredients
        })
        console.log("success")
    }
   
    // const confirmMealAdded =
    //     <Modal>
    //         <div>
    //             <label>Added successfully added!</label>
    //             <button onClick={refreshPage} className={classes['button']}>Close</button>
    //         </div>
    //     </Modal>

    return (
        <>
            <Form>
                <Form.Group>
                    <Form.Label> Meal:</Form.Label>
                    <Form.Control type="text" ref={mealInput}/>
                    {!formInputValid.meal && <p style={{color:"red"}}>Error enter meal</p>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Ingredients:</Form.Label>
                    <Form.Control type="text" ref={ingredientsInput}/>
                    {!formInputValid.ingredient && <p style={{color:"red"}}>Error enter ingredients</p>}
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <Button onClick={postMeal}>Submit</Button>
                    <Button onClick={props.onClose}>Close</Button>
                </div>
            </Form>
        </>
    )
}
