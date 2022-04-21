import instance from '../../firebase/instance';
import { useRef } from 'react'
import { Button, Form } from 'react-bootstrap';

export default function AddMeal(props) {
    const mealInput = useRef();
    const ingredientsInput = useRef();
    // const refreshPage = ()=>{
    //     window.location.reload();
    //  }
    const postMeal = () => {
        const enteredMeal = mealInput.current.value;
        const enteredIngredients = ingredientsInput.current.value;
        const submitMeal = async (formData) => {
            instance.post('/meals/.json', formData).then((response)=>
            console.log(response));
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
                </Form.Group>
                <Form.Group>
                    <Form.Label>Ingredients:</Form.Label>
                    <Form.Control type="text" ref={ingredientsInput}/>
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <Button onClick={postMeal}>Submit</Button>
                    <Button onClick={props.onClose}>Close</Button>
                </div>
            </Form>
        </>
    )
}
