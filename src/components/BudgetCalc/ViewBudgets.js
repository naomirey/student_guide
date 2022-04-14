import React, { useState, useEffect } from 'react';
import classes from './../../pages/MealPlanner.module.css';
import BudgetCard from './BudgetCard';
import { Link } from 'react-router-dom';
import { useBudget } from './../../context/BudgetContext'

export default function ViewBudgets() {
    const [ httpError, setHttpError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
    const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
    const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
    const [ budgetsRetrieved, setBudgetsRetrieved ] = useState([]);
    
    function openAddExpenseModal(budgetId) {
        setShowAddExpenseModal(true)
        setAddExpenseModalBudgetId(budgetId)
      }

    useEffect(() => {
        const fetchBudgets = async () => {
        setIsLoading(true);
        const response = await fetch('https://student-guide-budget-calc-default-rtdb.firebaseio.com/budgets.json');
        const responseData = await response.json();

        if (!response.ok) {
            throw new Error('Something went wrong!')
            
        }

        const loadedBudgets = [];
        
        for (const key in responseData) {
            loadedBudgets.push({
                key: key,
                id: key,
                name: responseData[key].name,
                amount: responseData[key].amount,
                max: responseData[key].max,
            });
        }
        setBudgetsRetrieved(loadedBudgets);
        setIsLoading(false);
        };

        fetchBudgets().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
        });
    }, []);
    
    if (isLoading) { 
        return (
        <section className={classes.BlogsLoading}>
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
    console.log(budgetsRetrieved);
    const budgetList = budgetsRetrieved.map((budget) => (
        <div>
            <Link to={`/budget-calculator/${budget.id}`} style={{ textDecoration: 'none' }}>
                <BudgetCard
                key = {budget.id}
                name={budget.name}
                amount={budget.amount}
                max = {budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() =>
                  setViewExpensesModalBudgetId(budget.id) }/>
                <div className={classes.blank} />
            </Link>
        </div>
    ));

    return (
        <div>
            <div className={classes.blank} />
            <div className={classes.heading}>Outgoings : </div>
            <div className={classes.blank} />
            <ul>{budgetList}</ul>
        </div>
    )
}
