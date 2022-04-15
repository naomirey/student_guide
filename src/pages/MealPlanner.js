import classes from './MealPlanner.module.css';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from './../components/Card';
import { Form, Button } from 'react-bootstrap'
import AddMealForm from '../components/MealPlanner/AddMealForm';

export default function MealPlanner() {
    const submitMealHandler = async (mealData) => {
        // setIsAddingMeal(false);
        const response = await fetch('https://student-guide-meal-planner-default-rtdb.firebaseio.com/meals.json', {
            method: 'POST',
            body: JSON.stringify({
                id: mealData.id,
                meal: mealData.name,
            })
        });
        // setIsAddingBlog(false);
        // setDidAddBlog(true);
        // setAddBlog(false);
    }
    return (
        <div>
            <AddMealForm onPost={submitMealHandler}/>}
            
        </div>
    )
}
