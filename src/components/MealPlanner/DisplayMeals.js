import React, { useState, useEffect, useRef } from 'react';
import Card from '../Card';
import { Link } from 'react-router-dom';
import classes from '../../pages/Blog.module.css';
import { Button } from 'react-bootstrap';

export default function DisplayMeals() {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState(null);
    const isInitialMount = useRef(true);
    useEffect(() => {
        const abortCont = new AbortController();
        const fetchMeals = async () => {
            setIsLoading(true);
            const response = await fetch('https://student-guide-meal-planner-default-rtdb.firebaseio.com/meals/.json',{signal: abortCont.signal});
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
            setMeals(loadedMeals);
            setIsLoading(false);
            };
    
            fetchMeals().catch((error) => {
                if (error.name === 'AbortError'){
                    console.log('fetchAbort')
                } else{
                setIsLoading(false);
                setHttpError(error.message);}
            });
        return () => abortCont.abort();
    }, [meals]);

    if (isLoading) { 
        return (
        <section className={classes.MealsLoading}>
        <p>Loading...</p>
        </section>
        );
    }

    if (httpError) {
        return (
        <section className={classes.MealsError}>
        <p>{httpError}</p>
        </section>
        )
    }
    
    const mealsList = meals.map((meal) => (
        <div>
            <Link to={`/meal/${meal.id}`} style={{ textDecoration: 'none' }}>
                <Card>
                    <div className={classes.mealPost}>
                        <div>{meal.name} </div>
                    </div>
                </Card>
            <div className={classes.blank} />
            </Link>
        </div>
    ));
    return {
        meals,
        render:(
        <div>
            <ul>{mealsList}</ul>
        </div>
        )
    }
}
