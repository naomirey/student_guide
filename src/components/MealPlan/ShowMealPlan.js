import React from 'react'
import Link, { useState, useEffect, Button } from 'react';
import Card from '../../components/Card';
import { Table, DropdownButton, Dropdown, Form } from 'react-bootstrap';
import instance from '../../firebase/instance';
import { ImageListItemBar } from '@mui/material';


export default function ShowMealPlan() {
    const [isLoading, setIsLoading] = useState(true);
    const [currentMeals, setCurrentMeals] = useState([]);
    const [httpError, setHttpError] = useState([]);
    const [currentMealPlans, setCurrentMealPlans] = useState([]);
    const [currentDates, setCurrentDates] = useState([]);
    const [dateState, setDateState] = useState(null)
    const [results, setResults] = useState();

    useEffect(() => {
        setIsLoading(true);
        instance.get('/meal-plans.json').then((response)=>{
            console.log(response);
            const currentDatesStored = [];
            for (const key in response.data) {
                currentDatesStored.push({...response.data[key], id:key});
            }
            setCurrentDates(currentDatesStored);
            setIsLoading(false);
            console.log(currentDatesStored);
        
    });
        const fetchDates = async () => {
            setIsLoading(true);
            instance.get('/meal-plans.json').then((response)=>{
                console.log(response);
            
        });
    }
        const fetchMealPlan = async () => {
            setIsLoading(true);
            const date = dateState;
            instance.get('/meal-plans/' + date + '.json').then((response)=>{
                const loadedMealPlans = [];
                
                for (const key in response.data) {
                    loadedMealPlans.push({ ...response.data[key], id:key});
            }
            setResults(loadedMealPlans);
            setIsLoading(false);
            });
        };
        fetchMealPlan().catch((error) => {
                setIsLoading(false);
                setHttpError(error.message);
        });     
    }, [dateState]);

    if (isLoading) { 
        return (
        <section>
        <p>Loading...</p>
        </section>
        );
    }
    
    // const currentMealList = currentMeals.map((meal, index) => (
    //     <div>
    //         <Card>
    //             <div>
    //                 <ul key={index}>{meal.name}</ul>
    //             </div>
    //         </Card> 
    //     <div />
    //     </div>
    // ));
    
    // const dateList = currentDates.map((date) => (date));
    
    return (
        <div>
            <div className = "container p-2">
                <select 
                    className = "custom-select"
                    value={dateState}
                    onChange={(e)=>{
                        const selectedDate = e.target.value
                        setDateState(selectedDate)
                    }}>
                    <option disabled selected="selected">Select Date</option>
                    {currentDates.map((key) => (
                        <option key={key.id} value={key.id}>{key.id}</option>
                    ))}
                </select>
                {console.log(currentDates)}
            </div>
            {dateState &&
            <>
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
                            {   
                                results.map((item) =>
                                <tr key={item.id}>
                                    <td>{item.day}</td>
                                    <td>{item.breakfast}</td>
                                    <td>{item.lunch}</td>
                                    <td>{item.dinner}</td>
                                </tr>
                                )
                            }
                    </tbody>
                </Table>
                </>
            }
            
        </div>
    )
}



// const response = await fetch('https://student-guide-meal-planner-default-rtdb.firebaseio.com/meal-plans/' + date + '.json');
                // const responseData = await response.json();
                // if (!response.statusText ==="OK") {
                //     throw new Error('Something went wrong!') 
                // }
            
                // const loadedMealPlans = [];
                
                // for (const key in response.data) {
                //         loadedMealPlans.push({
                //             key: key,
                //             id: key,
                //             day: response[key].day,
                //             breakfast: response[key].breakfast,
                //             lunch: response[key].lunch,
                //             dinner: response[key].dinner,
                //         });
                //     }
                //     setCurrentMealPlans(loadedMealPlans);
                //     setIsLoading(false);
                //     console.log(currentMealPlans);
                //     console.log(loadedMealPlans)
                //     });
                // };
            


                // const responseData = await response.json();
            // if (!response.ok) {
            //     throw new Error('Something went wrong!') 
            // }
            // const loadedDates = [];
            // for (const key in responseData) {
            //     loadedDates.push({
            //         key:key,
            //         id:key
            //     });
            // }
            // setCurrentDates(loadedDates);
            // setIsLoading(false);
        // }
        // fecthDates().catch((error) => {
        //     setIsLoading(false);
        //     setHttpError(error.message);


                         // const response = await fetch('https://student-guide-meal-planner-default-rtdb.firebaseio.com/meal-plans/' + date + '.json');
                // const responseData = await response.json();
                // if (!response.statusText ==="OK") {
                //     throw new Error('Something went wrong!') 
                // }


                // loadedMealPlans.push({
                        //     key: key,
                        //     id: key,
                        //     day: response[key].day,
                        //     breakfast: response[key].breakfast,
                        //     lunch: response[key].lunch,
                        //     dinner: response[key].dinner,
                        // });