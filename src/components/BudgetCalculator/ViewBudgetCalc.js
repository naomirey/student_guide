import { useEffect, useState } from 'react';
import budgetInstance from '../../firebase/budgetInstance';
import BudgetCard from './BudgetCard';
import { Button } from 'react-bootstrap';
import AddItemModal from './AddItemModal.js'
import { useAuth0 } from "@auth0/auth0-react";

export default function ViewBudgetCalc() {
    const [isLoading, setIsLoading] = useState(true);
    const [expenses, setExpenses] = useState([]);
    const [income, setIncome] = useState([]);
    const [addItem, setAddItem] = useState(false);
    const [addName, setAddName] = useState("");
    const { user } = useAuth0();

    const refreshPage = ()=>{
        window.location.reload();
     }

    useEffect(() => {
        setIsLoading(true);
        budgetInstance.get(user.nickname+'/expenses.json').then((response)=>{
            const currentExpenses = [];
            for (const key in response.data) {
                currentExpenses.push({...response.data[key], id:key});
            }
            setExpenses(currentExpenses);
            setIsLoading(false);
            console.log(expenses);
        });

        budgetInstance.get(user.nickname+'/income/.json').then((response)=>{
            const currentIncome = [];
            for (const key in response.data) {
                currentIncome.push({...response.data[key], id:key});
            }
            setIncome(currentIncome);
            setIsLoading(false);
            console.log(income);
        });

    }, []);
    
    const deleteItem = (id, itemName) => {
        console.log(id);
        budgetInstance.delete(user.nickname+'/'+ itemName+'/'+ id +'/.json').then((response) => {
            if (response.statusText == "OK") {
                refreshPage();
                alert(itemName + "deleted successfully!")
            } else{
                alert("Error")
            }
        })
    }
  
    let expensesMax = parseInt(0);
    expenses.map(({amount}) => (
        expensesMax = parseInt(expensesMax)+parseInt(amount)        
    ))
    let incomeMax = parseInt(0);
    income.map(({amount}) => (
        incomeMax = parseInt(incomeMax)+parseInt(amount)
        
    ))
    const expenseHandler=()=> {
        setAddItem(true);
        setAddName("expenses");
        console.log(addItem);
        console.log(addName);
    }
    const incomeHandler=()=> {
        setAddItem(true);
        setAddName("income");
        console.log(addItem);
        console.log(addName);
    }

    return (
        <div style={{display:'flex', flexDirection:'row'}}>
            <div style={{ marginLeft: '40px' }} >
                <h2>Expenses</h2>
                {
                expenses.map((key) => (
                    <BudgetCard name={key.description} amount={key.amount} deleteItem={deleteItem} id={key.id} itemName="expenses" />
                ))}
            </div>
            <div style={{ marginLeft: '40px' }}>
                <h2>Income</h2>
                {income.map((key) => (
                    <BudgetCard name={key.description} amount={key.amount} deleteItem={deleteItem} id={key.id} itemName="income" />
                ))}
            </div>
            <div style={{ marginLeft: '40px' }}>
                <Button onClick={()=> expenseHandler()}>Add Expense</Button>
                <Button onClick={()=> incomeHandler()}>Add Income</Button>
                <BudgetCard name={"Total"} amount={expensesMax} max={incomeMax} showMessage/>
                <AddItemModal 
                    itemName={addName}
                    showItem={addItem} 
                    handleClose={()=> setAddItem(false)}/>
            </div>
            
        </div>
    )
}
