import React from 'react'
import Link, { useState, useEffect} from 'react';


export default function FetchMeals() {
    const [isLoading, setIsLoading] = useState(true);
    const [currentMeals, setCurrentMeals] = useState([]);
    const [httpError, setHttpError] = useState([]);
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
        return (
            currentMeals
        )
}
