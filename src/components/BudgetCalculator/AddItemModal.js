import { Modal, Form, Button } from 'react-bootstrap';
import { useRef, useState } from 'react';
import budgetInstance from '../../firebase/budgetInstance';
import { useAuth0 } from "@auth0/auth0-react";

const isEmpty = value => value.trim() === '';

export default function AddItemModal({ showExpense, handleClose, handleSubmit, showItem, itemName }) {
    const [formInputValid, setFormInputValid] = useState({
        amount:true,
        description:true
    });
    const descriptionRef = useRef();
    const amountRef = useRef();
    const { user } = useAuth0();
    const refreshPage = ()=>{
        window.location.reload();
     }

    // const budgetIdRef = useRef();
    // const { addExpense, budgets } = useBudgets();
    
    const postItem = () => {
        const enteredDescription= descriptionRef.current.value;
        const enteredAmount = amountRef.current.value;
        const submitPost = async (formData) => {
            budgetInstance.post('/'+user.nickname+'/'+ itemName +'/.json', formData).then((response) => {
            if (response.statusText == "OK") {
                refreshPage();
                alert("Added Successfully")
                console.log("success")
            } else{
                alert("Error")
            }
            })
        }
        
        const enteredDescriptionValid = !isEmpty(enteredDescription);
        const enteredAmountValid = !isEmpty(enteredAmount);
        setFormInputValid({
            description: enteredDescriptionValid,
            amount: enteredAmountValid
        })
        const formIsValid = 
            enteredDescriptionValid &&
            enteredAmountValid

        if (!formIsValid) {
            return;
        }

        submitPost({
            description:enteredDescription,
            amount:enteredAmount
        });
    
    }
    // const handleExpenseSubmit = (formData) => {
    //     budgetInstance.post('/expenses/.json', formData).then((response) =>{
    //         console.log(response);
    //     })
    // }
    
    return (
        <Modal show={showItem} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>New {itemName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Form.Group>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control type="text" ref={descriptionRef}/>
                    {!formInputValid.description && <p style={{color:"red"}}>Error enter description</p>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Amount:</Form.Label>
                    <Form.Control type="number" ref={amountRef}/>
                    {!formInputValid.amount && <p style={{color:"red"}}>Error enter amount</p>}
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <Button onClick={postItem}>Submit</Button>
                    <Button onClick={handleClose}>Close</Button>
                </div>
                </Form>
            </Modal.Body>
        </Form>

    </Modal>
    )
}




{/* <Form.Group className = "mb-3" controlId = "description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" required ref={descriptionRef} />
                    </Form.Group>
                    <Form.Group className = "mb-3" controlId = "amount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            ref={amountRef}
                            type="number"
                            required
                            min={0}
                            step={5}
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">Add</Button>
                    </div> */}