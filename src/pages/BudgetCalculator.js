import classes from './MealPlanner.module.css';
import { Button, Stack } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import BudgetCard from '../components/BudgetCalc/BudgetCard';
import { useState, useEffect } from 'react';
import AddBudgetModal from './../components/BudgetCalc/AddBudgetModal'
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from '../context/BudgetContext';
import AddExpenseModal from '../components/BudgetCalc/AddExpenseModal';
import UncategorisedBudgetCard from '../components/BudgetCalc/UncategorisedBudgetCard';
import TotalBudgetCard from '../components/BudgetCalc/TotalBudgetCard';
import ViewExpensesModal from '../components/BudgetCalc/ViewExpensesModal';

// 38mins (45mins)

const BudgetCalculator = () => {
    const [ showAddBudgetModal, setShowAddBudgetModal ] = useState(false);
    const [ showAddExpenseModal, setShowAddExpenseModal ] = useState(false);
    const [ viewExpensesModalBudgetId, setViewExpensesModalBudgetId]  = useState();
    const [ addExpenseModalBudgetId, setAddExpenseModalBudgetId ] = useState();
    const [ didAddBudget, setDidAddBudget ] = useState(false);
    const [ addBudget, setAddBudget ] = useState(false);
    const [ httpError, setHttpError ] = useState(null);
    const { budgets, budgetsRetrievedHandler } = useBudgets();
    const [ isLoading, setIsLoading ] = useState(false);

    const openAddExpenseModal = (budgetId) => {
        setShowAddExpenseModal(true);
        setAddExpenseModalBudgetId(budgetId);
    }

    // const submitBudgetHandler = async (budgetData) => {
    //     const response = await fetch('https://student-guide-budget-calc-default-rtdb.firebaseio.com/budgets.json', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             id: budgetData.id,
    //             name: budgetData.name,
    //             amount: budgetData.amount,
    //             max: budgetData.max
    //         })
    //     });
    //     setDidAddBudget(true);
    //     setAddBudget(false);
    // }

    
    return (
        <>
        <Container className={classes.page}>
        <Stack direction="row" gap="2" className="mb-4">
            <h2 className="me-auto">Budgets</h2>
            <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
            <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
        </Stack>
        <div style={{ 
            display:'grid', 
            gridTemplateColumns: "repeat(auto-fill, minimax(300px, fr))", 
            gap: "1rem", 
            alignItems:"flex-start"
        }}>
            {budgets.map(budget => {
                const amount = budgetsRetrievedHandler(budget.id).reduce(
                    (total, expense) => total + expense.amount,
                    0
                ) // get all expenses for this budget and get a total as "amount"
                return(
                    <BudgetCard
                    key = {budget.id}
                    name={budget.name}
                    amount={amount}
                    max = {budget.max}
                    onAddExpenseClick={() => openAddExpenseModal(budget.id)} 
                    onViewExpenseClick={() => setViewExpensesModalBudgetId(budget.id)}/>
                )
            })}
            <UncategorisedBudgetCard 
                onAddExpenseClick={openAddExpenseModal} 
                onViewExpenseClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}/>
            <TotalBudgetCard />
        </div>
    </Container>
    <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)}  />
    <AddExpenseModal 
        show={showAddExpenseModal} 
        defaultBudgetId = {addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}  />
    <ViewExpensesModal 
        budgetId = {viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}  />
    </>
    )}

export default BudgetCalculator;