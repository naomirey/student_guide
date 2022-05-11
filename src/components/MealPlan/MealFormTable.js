import React from 'react'
import { Button, Form, Col, Row, Table } from 'react-bootstrap';
import { useState, useRef } from 'react';
import instance from '../../firebase/instance';
import { useAuth0 } from "@auth0/auth0-react";

const isEmpty = value => value.trim() === '';

export default function MealFormTable(props) {
    const [formInputValid, setFormInputValid] = useState(true);
    const { user } = useAuth0();
    const dateSelected = useRef();
    const breakfastMon = useRef();
    const lunchMon = useRef();
    const dinnerMon = useRef();
    const breakfastTue = useRef();
    const lunchTue = useRef();
    const dinnerTue = useRef();
    const breakfastWed = useRef();
    const lunchWed = useRef();
    const dinnerWed = useRef();
    const breakfastThurs = useRef();
    const lunchThurs = useRef();
    const dinnerThurs = useRef();
    const breakfastFri = useRef();
    const lunchFri = useRef();
    const dinnerFri = useRef();
    const breakfastSat = useRef();
    const lunchSat = useRef();
    const dinnerSat = useRef();
    const breakfastSun = useRef();
    const lunchSun = useRef();
    const dinnerSun = useRef();

    const postMealHandler = () => {
        const enteredDate=dateSelected.current.value;
        const enteredBeakfastMon=breakfastMon.current.value;
        const enteredLunchMon=lunchMon.current.value;
        const enteredDinnerMon=dinnerMon.current.value;
        const enteredBeakfastTue=breakfastTue.current.value;
        const enteredLunchTue=lunchTue.current.value;
        const enteredDinnerTue=dinnerTue.current.value;
        const enteredBeakfastWed=breakfastWed.current.value;
        const enteredLunchWed=lunchWed.current.value;
        const enteredDinnerWed=dinnerWed.current.value;
        const enteredBeakfastThurs=breakfastThurs.current.value;
        const enteredLunchThurs=lunchThurs.current.value;
        const enteredDinnerThurs=dinnerThurs.current.value;
        const enteredBeakfastFri=breakfastFri.current.value;
        const enteredLunchFri=lunchFri.current.value;
        const enteredDinnerFri=dinnerFri.current.value;
        const enteredBeakfastSat=breakfastSat.current.value;
        const enteredLunchSat=lunchSat.current.value;
        const enteredDinnerSat=dinnerSat.current.value;
        const enteredBeakfastSun=breakfastSun.current.value;
        const enteredLunchSun=lunchSun.current.value;
        const enteredDinnerSun=dinnerSun.current.value;

        const refreshPage = ()=>{
            window.location.reload();
         }
         
        const enteredDateValid = !isEmpty(enteredDate);
        setFormInputValid(enteredDateValid)
        
        if (!enteredDateValid) {
            return;
        }

        const submitMealPlanner = async (formData) => {
            instance.put('/meal-plans/'+ user.nickname + '/' + enteredDate + '.json', formData).then((response)=>
            {if (response.statusText == "OK") {
                refreshPage();
                alert("Added Meal Plan Successfully")
                console.log("success")
            } else{
                alert("Error")
            }
        });
        
        }

        
        submitMealPlanner({
            "0": {
                day:"Monday",
                breakfast: enteredBeakfastMon,
                lunch: enteredLunchMon,
                dinner: enteredDinnerMon
            },
            "1": {
                day:"Tuesday",
                breakfast: enteredBeakfastTue,
                lunch: enteredLunchTue,
                dinner: enteredDinnerTue
            },
            "2": {
                day:"Wednesday",
                breakfast: enteredBeakfastWed,
                lunch: enteredLunchWed,
                dinner: enteredDinnerWed
            },
            "3": {
                day:"Thursday",
                breakfast: enteredBeakfastThurs,
                lunch: enteredLunchThurs,
                dinner: enteredDinnerThurs
            },
            "4": {
                day:"Friday",
                breakfast: enteredBeakfastFri,
                lunch: enteredLunchFri,
                dinner: enteredDinnerFri
            },
            "5": {
                day:"Saturday",
                breakfast: enteredBeakfastSat,
                lunch: enteredLunchSat,
                dinner: enteredDinnerSat
            },
            "6": {
                day:"Sunday",
                breakfast: enteredBeakfastSun,
                lunch: enteredLunchSun,
                dinner: enteredDinnerSun
            }
        });
    }

    return (
        <>
        <div>
        <input ref={dateSelected} type="week" name="date"/>
        <Button onClick={props.showAddMeal}>Add Meal</Button>
        {!formInputValid && <p style={{color:"red"}}>Select a week</p>}
        </div>
        <Table>
            <thead>
                <tr>
                    <th></th>
                    <th>Breakfast</th>
                    <th>Lunch</th>
                    <th>Dinner</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Monday</td>
                    <td>
                        <Form.Group as={Col} controlId="breakfast">
                            <Form.Select ref={breakfastMon} defaultValue="Choose...">
                                {props.meals.map((meal, key) => (
                                    <option key={key} value={meal.name} >{meal.name}</option>
                                ))}
                            </Form.Select>
                    </Form.Group>
                    </td>
                    <td>
                        <Form.Group as={Col} controlId="lunch">
                            <Form.Select ref={lunchMon} defaultValue="Choose...">
                                {props.meals.map((meal, key) => (
                                    <option key={key} value={meal.name} >{meal.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </td>
                    <td>
                        <Form.Group as={Col} controlId="dinner">
                            <Form.Select ref={dinnerMon} defaultValue="Choose...">
                                {props.meals.map((meal, key) => (
                                    <option key={key} value={meal.name} >{meal.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </td>
                </tr>
                <tr>
                    <td>Tuesday</td>
                    <td>
                        <Form.Group as={Col} controlId="breakfast">
                            <Form.Select ref={breakfastTue} defaultValue="Choose...">
                                {props.meals.map((meal, key) => (
                                    <option key={key} value={meal.name}>{meal.name}</option>
                                ))}
                            </Form.Select>
                    </Form.Group>
                    </td>
                    <td>
                        <Form.Group as={Col} controlId="lunch">
                            <Form.Select ref={lunchTue} defaultValue="Choose...">
                                {props.meals.map((meal, key) => (
                                    <option key={key} value={meal.name}>{meal.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </td>
                    <td>
                        <Form.Group as={Col} controlId="dinner">
                            <Form.Select ref={dinnerTue} defaultValue="Choose...">
                                {props.meals.map((meal, key) => (
                                    <option key={key} value={meal.name}>{meal.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </td>
                </tr>
                <tr>
                    <td>Wednesday</td>
                    <td>
                        <Form.Group as={Col} controlId="breakfast">
                            <Form.Select ref={breakfastWed} defaultValue="Choose...">
                                {props.meals.map((meal, key) => (
                                    <option key={key} value={meal.name}>{meal.name}</option>
                                ))}
                            </Form.Select>
                    </Form.Group>
                    </td>
                    <td>
                        <Form.Group as={Col} controlId="lunch">
                            <Form.Select ref={lunchWed} defaultValue="Choose...">
                                {props.meals.map((meal, key) => (
                                    <option key={key} value={meal.name}>{meal.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </td>
                    <td>
                        <Form.Group as={Col} controlId="dinner">
                            <Form.Select ref={dinnerWed} defaultValue="Choose...">
                                {props.meals.map((meal, key) => (
                                    <option key={key} value={meal.name}>{meal.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </td>
                </tr>
                <tr>
                    <td>Thursday</td>
                    <td>
                        <Form.Group as={Col} controlId="breakfast">
                            <Form.Select ref={breakfastThurs} defaultValue="Choose...">
                                {props.meals.map((meal, key) => (
                                    <option key={key} value={meal.name}>{meal.name}</option>
                                ))}
                            </Form.Select>
                    </Form.Group>
                    </td>
                    <td>
                        <Form.Group as={Col} controlId="lunch">
                            <Form.Select ref={lunchThurs} defaultValue="Choose...">
                                {props.meals.map((meal, key) => (
                                    <option key={key} value={meal.name}>{meal.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </td>
                    <td>
                        <Form.Group as={Col} controlId="dinner">
                            <Form.Select ref={dinnerThurs} defaultValue="Choose...">
                                {props.meals.map((meal, key) => (
                                    <option key={key} value={meal.name}>{meal.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </td>
                </tr>
                <tr>
                    <td>Friday</td>
                    <td>
                        <Form.Group as={Col} controlId="breakfast">
                            <Form.Select ref={breakfastFri} defaultValue="Choose...">
                                {props.meals.map((meal, key) => (
                                    <option key={key} value={meal.name}>{meal.name}</option>
                                ))}
                            </Form.Select>
                    </Form.Group>
                    </td>
                    <td>
                        <Form.Group as={Col} controlId="lunch">
                            <Form.Select ref={lunchFri} defaultValue="Choose...">
                                {props.meals.map((meal, key) => (
                                    <option key={key} value={meal.name}>{meal.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </td>
                    <td>
                        <Form.Group as={Col} controlId="dinner">
                            <Form.Select ref={dinnerFri} defaultValue="Choose...">
                                {props.meals.map((meal, key) => (
                                    <option key={key} value={meal.name}>{meal.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </td>
                </tr>
                <tr>
                    <td>Saturday</td>
                    <td>
                        <Form.Group as={Col} controlId="breakfast">
                            <Form.Select ref={breakfastSat} defaultValue="Choose...">
                                {props.meals.map((meal, key) => (
                                    <option key={key} value={meal.name}>{meal.name}</option>
                                ))}
                            </Form.Select>
                    </Form.Group>
                    </td>
                    <td>
                        <Form.Group as={Col} controlId="lunch">
                            <Form.Select ref={lunchSat} defaultValue="Choose...">
                                {props.meals.map((meal, key) => (
                                    <option key={key} value={meal.name}>{meal.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </td>
                    <td>
                        <Form.Group as={Col} controlId="dinner">
                            <Form.Select ref={dinnerSat} defaultValue="Choose...">
                                {props.meals.map((meal, key) => (
                                    <option key={key} value={meal.name}>{meal.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </td>
                </tr>
                <tr>
                    <td>Sunday</td>
                    <td>
                        <Form.Group as={Col} controlId="breakfast">
                            <Form.Select ref={breakfastSun} defaultValue="Choose...">
                                {props.meals.map((meal, key) => (
                                    <option key={key} value={meal.name}>{meal.name}</option>
                                ))}
                            </Form.Select>
                    </Form.Group>
                    </td>
                    <td>
                        <Form.Group as={Col} controlId="lunch">
                            <Form.Select ref={lunchSun} defaultValue="Choose...">
                                {props.meals.map((meal, key) => (
                                    <option key={key} value={meal.name}>{meal.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </td>
                    <td>
                        <Form.Group as={Col} controlId="dinner">
                            <Form.Select ref={dinnerSun} defaultValue="Choose...">
                                {props.meals.map((meal, key) => (
                                    <option key={key} value={meal.name}>{meal.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </td>
                </tr>                
            </tbody>
        </Table>
        <Button type="submit" onClick={postMealHandler}>Submit</Button>
        <Button onClick={() => props.setShowForm(false)}>Close</Button>
        </>
    )
}

