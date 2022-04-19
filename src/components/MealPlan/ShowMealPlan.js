import React from 'react'
import Link, { useState, useEffect, useRef } from 'react';
import Card from '../../components/Card';
import { Table, DropdownButton, Dropdown, Form } from 'react-bootstrap';

export default function ShowMealPlan() {
    const [isLoading, setIsLoading] = useState(true);
    const [currentMeals, setCurrentMeals] = useState([]);
    const [httpError, setHttpError] = useState([]);
    const [currentMealPlans, setCurrentMealPlans] = useState([]);
    const [currentDates, setCurrentDates] = useState([]);
    const [dateState, setDateState] = useState("2022-04-18")

    useEffect(() => {
        const fecthDates = async () => {
            setIsLoading(true);
            const response = await fetch('https://student-guide-meal-planner-default-rtdb.firebaseio.com/meal-plans.json');
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error('Something went wrong!') 
            }
            const loadedDates = [];
            for (const key in responseData) {
                loadedDates.push({
                    key:key,
                    id:key
                });
            }
            setCurrentDates(loadedDates);
            setIsLoading(false);
        }
        fecthDates().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
        const fetchMealPlan = async () => {
            setIsLoading(true);
            const date = dateState;
            console.log(date)
            const response = await fetch('https://student-guide-meal-planner-default-rtdb.firebaseio.com/meal-plans/' + date + '.json');
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error('Something went wrong!') 
            }
        
            const loadedMealPlans = [];
            
            for (const key in responseData) {
                    loadedMealPlans.push({
                        key: key,
                        id: key,
                        breakfast: responseData[key].breakfast,
                        lunch: responseData[key].lunch,
                        dinner: responseData[key].dinner,
                    });
                }
                setCurrentMealPlans(loadedMealPlans);
                setIsLoading(false);
                console.log(currentMealPlans);
                };
        
                fetchMealPlan().catch((error) => {
                        setIsLoading(false);
                        setHttpError(error.message);
                });
           
        const fetchMeals = async () => {
            setIsLoading(true);
            const response = await fetch('https://student-guide-meal-planner-default-rtdb.firebaseio.com/meals.json');
            const responseData = await response.json();
    
            if (!response.ok) {
                throw new Error('Something went wrong!')
                
            }
    
            const loadedMeals = [];
            
            for (const key in responseData) {
                loadedMeals.push({
                    key: key,
                    id: key,
                    name: responseData[key].name,
                });
            }
            setCurrentMeals(loadedMeals);
            setIsLoading(false);
            console.log(currentMeals);
            };
    
            fetchMeals().catch((error) => {
                    setIsLoading(false);
                    setHttpError(error.message);
            })
       
    }, [dateState]);

    if (isLoading) { 
        return (
        <section>
        <p>Loading...</p>
        </section>
        );
    }
    
    const currentMealList = currentMeals.map((meal, index) => (
        <div>
            <Card>
                <div>
                    <ul key={index}>{meal.name}</ul>
                </div>
            </Card> 
        <div />
        </div>
    ));
    
    const dateList = currentDates.map((date) => (date.id));
    return (
        <div>
            {currentMealList}
            <div className = "container p-5">
                <select 
                    className = "custom-select" 
                    value={dateState}
                    onChange={(e)=>{
                        const selectedDate = e.target.value
                        setDateState(selectedDate)
                        console.log(selectedDate)
                }}>
                    {dateList.map((date, key) => (
                        <option key={key} value={date}>{date}</option>
                    ))}
                </select>
            </div>
            
            <h2>Table</h2>
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
                            currentMealPlans.map((item,i) =>
                            <tr key={i}>
                                <td>{item.id}</td>
                                <td>{item.breakfast}</td>
                                <td>{item.lunch}</td>
                                <td>{item.dinner}</td>
                            </tr>
                            )
                        }
                </tbody>
            </Table>
        </div>
    )
}
