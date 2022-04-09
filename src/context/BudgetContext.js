import React, { useContext } from 'react';
import { v4 as uuidV4 } from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage'

const BudgetContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export const useBudgets = () => {
    return useContext(BudgetContext);

}

export const BudgetProvider = ({children}) => {
    const [budgets, setBudgets] = useLocalStorage("budgets", []);
    const [expenses, setExpenses] = useLocalStorage("expenses", []);
    const [incomings, setIncomings] = useLocalStorage("incomings", []);

    const getBudgetExpenses = (budgetId) => {
        return expenses.filter(expense => expense.budgetId === budgetId)
    }
    
    const addExpense = ( { description, amount, budgetId } ) => {
        setExpenses(prevExpenses => {
            return [...prevExpenses , { id: uuidV4(), description, amount, budgetId}]
        })
        
    }
    const addBudget = ({name, max}) => {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets 
                // prevents same name being added twice
            }
            return [...prevBudgets , { id: uuidV4(), name, max}]
        })
        // taking current budget and adds a new budget to it
    }
    const addIncoming = ({ description, amount, budgetId }) => {
        setIncomings(prevIncomings => {
            return [...prevIncomings , { id: uuidV4(), description, amount, budgetId}]
        })

    }
    const deleteBudget = ({ id }) => {
        //ensures that if a budget is deleted, the expense will go in to uncategorized
        setExpenses(prevExpenses => {
            return prevExpenses.map(expense=> {
                if (expense.budgetId !== id) return expense
                return { ...expense, budgetId : UNCATEGORIZED_BUDGET_ID}
            })
        }) 
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        })
        console.log("deletebudget")
    }
    const deleteExpense = ({ id }) => {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
        })
        console.log("deleteexpense")
    }
    const deleteIncoming = (id) => {
        setIncomings(prevIncomings => {
            return prevIncomings.filter(incoming => incoming.id !== id)
        })
    }
    return (
    
    <BudgetContext.Provider value={{
        budgets,
        expenses,
        incomings,
        getBudgetExpenses,
        addExpense,
        addBudget,
        addIncoming,
        deleteBudget,
        deleteExpense,
        deleteIncoming
    }} >
        {children}
    </BudgetContext.Provider>
    //passing a value and all children within this can access this
    )
}


// const BudgetContext = React.createContext({
//   items: [],
//   totalAmount: 0,
//   addItem: (item) => {},
//   removeItem: (id) => {},
//   clearBudget: () => {}
// });

// export default BudgetContext;