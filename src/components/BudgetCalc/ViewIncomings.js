import React, { useState, useEffect } from 'react';
import classes from './../../pages/MealPlanner.module.css';
import BudgetCard from './BudgetCard';
import { Link } from 'react-router-dom';

export default function ViewIncomings() {

    const [ httpError, setHttpError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ incomesRetrieved, setIncomesRetrieved ] = useState([]);

    useEffect(() => {
        const fetchIncomes = async () => {
        setIsLoading(true);
        const response = await fetch('https://student-guide-budget-calc-default-rtdb.firebaseio.com/income.json');
        const responseData = await response.json();
    
        if (!response.ok) {
            throw new Error('Something went wrong!')
            
        }
    
        const loadedIncomes = [];
        
        for (const key in responseData) {
            loadedIncomes.push({
                key: key,
                id: key,
                name: responseData[key].name,
                amount: responseData[key].amount,
            });
        }
        setIncomesRetrieved(loadedIncomes);
        setIsLoading(false);
        };
    
        fetchIncomes().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
        });
    }, []);
    if (isLoading) { 
        return (
        <section className={classes.IncomesLoading}>
        <p>Loading...</p>
        </section>
        );
    }

    if (httpError) {
        return (
        <section className={classes.BlogsError}>
        <p>{httpError}</p>
        </section>
        )
    }
    const IncomeList = incomesRetrieved.map((income) => (
        <div>
            <Link to={`/budget-calculator/${income.id}`} style={{ textDecoration: 'none' }}>
                <BudgetCard
                key = {income.id}
                name={income.name}
                amount={income.amount} />
            <div className={classes.blank} />
            </Link>
        </div>
    ));
    
    return (
        <div>
            <div className={classes.blank} />
            <div className={classes.heading}>Incoming : </div>
            <div className={classes.blank} />
            <ul>{IncomeList}</ul>
        </div>
    )
}
