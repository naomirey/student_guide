import { Modal, Stack, Button } from 'react-bootstrap';
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from '../../context/BudgetContext'
import { currencyFormatter } from '../utils';
import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';

export default function ViewExpensesModal({ budgetId, handleClose }) {

    const [ httpError, setHttpError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ expensesRetrieved, setExpensesRetrieved ] = useState([]);
    const [ incomesRetrieved, setIncomesRetrieved ] = useState([]);
    const params = useParams();
    useEffect(() => {
        const fetchExpenses = async () => {
        setIsLoading(true);
        const response = await fetch('https://student-guide-budget-calc-default-rtdb.firebaseio.com/expenses/' + params.budgetId + '.json');
        const responseData = await response.json();
  
        if (!response.ok) {
            throw new Error('Something went wrong!')
            
        }
  
        const loadedExpenses = [];
        
        for (const key in responseData) {
            loadedExpenses.push({
                key: key,
                id: key,
                description: responseData[key].description,
                amount: responseData[key].amount,
                budegtId: responseData[key].budegtId,
            });
        }
        setExpensesRetrieved(loadedExpenses);
        setIsLoading(false);
        };
  
        fetchExpenses().catch((error) => {
        setIsLoading(false);
        setHttpError(error.message);
        });
    }, []);

    const { budgetsRetrievedHandler, budgets, deleteBudget, deleteExpense} = useBudgets();
    console.log(expensesRetrieved);
    const expenses = expensesRetrieved.budgetId;
    const budget = 
        UNCATEGORIZED_BUDGET_ID === budgetId 
        ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID} 
        : budgets.find(b => b.id === budgetId)
    return (
        <Modal show={budgetId != null} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Stack direction="horizontal" gap="2">
                            <div>Expenses = {budget?.name}</div>
                            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                                <Button 
                                onClick ={() => {
                                    deleteBudget(budget)
                                    handleClose()
                                }}
                                variant = "outline-danger"
                                >
                                    Delete
                                </Button>
                            )}
                        </Stack>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack direction="vertical" gap="3">
                        {expenses.map(expense => (
                            <Stack direction="horizontal" gap="2" key={expense.id}>
                                <div className="mr-auto fs-4">{expense.description}</div>
                                <div className="fs-5">{currencyFormatter.format(expense.amount)}
                                </div>
                                <Button 
                                    onClick={() => deleteExpense(expense)}
                                    size="sm"
                                    variant="outline-danger"
                                >
                                    &times;
                                </Button>
                            </Stack>

                        ))}
                    </Stack>
                </Modal.Body>
        </Modal>
    )
}
