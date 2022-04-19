import classes from './MealPlanner.module.css';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from './../components/Card';
import { Form, Button } from 'react-bootstrap'
import AddMealForm from '../components/MealPlanner/AddMealForm';
import DisplayMeals from '../components/MealPlanner/DisplayMeals';
import MealPlanTable from '../components/MealPlanner/MealPlanTable';
import DisplayDays from '../components/MealPlanner/DisplayDays';

export default function MealPlanner() {
    const [addMeal, setAddMeal] = useState(false);
    const [currentMealList, setCurrentMealList] = useState([]);
    const [currentDayList, setCurrentDayList] = useState([]);

    // const setListHandler = (meals) => {
    //     setCurrentMealList(meals);
    //     console.log(currentMealList)
    // }

    const showAddMealHandler = () => {
        setAddMeal(true);
    };
    
    const hideAddMealHandler = () => {
        setAddMeal(false);
    }
    const submitMealHandler = async (mealData) => {
        // setIsAddingMeal(false);
        const response = await fetch('https://student-guide-meal-planner-default-rtdb.firebaseio.com/meals.json', {
            method: 'POST',
            body: JSON.stringify({
                id: mealData.id,
                name: mealData.name,
            })
        });
        setAddMeal(false);
        // setIsAddingBlog(false);
        // setDidAddBlog(true);
        // setAddBlog(false);
    }
    const {render, meals} = DisplayMeals();
    const {renderDays, days} = DisplayDays();
    return (
        <div style={{padding: '10rem'}}>
            <Button onClick={showAddMealHandler}>Add Meal</Button>
            {addMeal && <AddMealForm onPost={submitMealHandler} onClose={hideAddMealHandler}/>}
            {render}
            {renderDays}
            {console.log(currentMealList)}
            {console.log(currentDayList)}
            <MealPlanTable daysList = {days} mealsList = {meals}/>
            
        </div>
    )
}
