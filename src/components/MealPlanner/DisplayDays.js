import React, { useState, useEffect, useRef } from 'react';
import Card from '../Card';
import { Link } from 'react-router-dom';
import classes from '../../pages/Blog.module.css';
import { Table } from 'react-bootstrap';

export default function DisplayDays() {
    const [days, setDays] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState(null);
    const isInitialMount = useRef(true);
    useEffect(() => {
        const abortCont = new AbortController();

        const fetchDays = async () => {
            setIsLoading(true);
            const response = await fetch('https://student-guide-meal-planner-default-rtdb.firebaseio.com/days/.json', { signal: abortCont.signal });
            const responseData = await response.json();
    
            if (!response.ok) {
                throw new Error('Something went wrong!')
                
            }
    
            const loadedDays = [];
            
            for (const key in responseData) {
                loadedDays.push({
                    key: key,
                    id: key,
                    name: responseData[key].name,
                });
            }
            setDays(loadedDays);
            setIsLoading(false);
            };
    
            fetchDays().catch((error) => {
                if (error.name === 'AbortError'){
                    console.log('fetchAbort')
                } else{
                setIsLoading(false);
                setHttpError(error.message);
                }});
            return () => abortCont.abort();
    }, [days]);

    if (isLoading) { 
        return (
        <section className={classes.DaysLoading}>
        <p>Loading...</p>
        </section>
        );
    }

    if (httpError) {
        return (
        <section className={classes.DaysError}>
        <p>{httpError}</p>
        </section>
        )
    }
    
    const daysList = days.map((day) => (
        <div>
            <Link to={`/day/${day.id}`} style={{ textDecoration: 'none' }}>
                <Card>
                    <div className={classes.blogPost}>
                        <div>{day.name} </div>
                    </div>
                </Card>
            <div className={classes.blank} />
            </Link>
        </div>
    ));
    return {
        days,
        renderDays:(
            <div>
                <ul>{daysList}</ul>
            </div>
        )
    }
}
