// import BudgetCard from './BudgetCard'
// import { useState, useEffect } from 'react';
// import classes from './../../pages/MealPlanner.module.css';

// export default function TotalBudgetCard() {
//   const [ httpError, setHttpError ] = useState(null);
//   const [ isLoading, setIsLoading ] = useState(false);
//   const [ expensesRetrieved, setExpensesRetrieved ] = useState([]);
//   const [ incomesRetrieved, setIncomesRetrieved ] = useState([]);

//   useEffect(() => {
//       const fetchExpenses = async () => {
//       setIsLoading(true);
//       const response = await fetch('https://student-guide-budget-calc-default-rtdb.firebaseio.com/expenses.json');
//       const responseData = await response.json();

//       if (!response.ok) {
//           throw new Error('Something went wrong!')
          
//       }

//       const loadedExpenses = [];
      
//       for (const key in responseData) {
//           loadedExpenses.push({
//               key: key,
//               id: key,
//               description: responseData[key].description,
//               amount: responseData[key].amount,
//               budegtId: responseData[key].budegtId,
//           });
//       }
//       setExpensesRetrieved(loadedExpenses);
//       setIsLoading(false);
//       };

//       fetchExpenses().catch((error) => {
//       setIsLoading(false);
//       setHttpError(error.message);
//       });
//   }, []);

//   useEffect(() => {
//       const fetchIncomes = async () => {
//       setIsLoading(true);
//       const response = await fetch('https://student-guide-budget-calc-default-rtdb.firebaseio.com/income.json');
//       const responseData = await response.json();

//       if (!response.ok) {
//           throw new Error('Something went wrong!')
          
//       }

//       const loadedIncomes = [];
      
//       for (const key in responseData) {
//           loadedIncomes.push({
//               key: key,
//               id: key,
//               name: responseData[key].name,
//               amount: responseData[key].amount,
//           });
//       }
//       setIncomesRetrieved(loadedIncomes);
//       setIsLoading(false);
//       };

//       fetchIncomes().catch((error) => {
//       setIsLoading(false);
//       setHttpError(error.message);
//       });
//   }, []);

//   if (isLoading) { 
//       return (
//       <section className={classes.BlogsLoading}>
//       <p>Loading...</p>
//       </section>
//       );
//   } 

//   if (httpError) {
//       return (
//       <section className={classes.BlogsError}>
//       <p>{httpError}</p>
//       </section>
//       )
// }
  
//   const expenses = expensesRetrieved;
//   const income = incomesRetrieved;
//   const amount = expenses.reduce((total, expense) => total + expense.amount, 0)
//   const incomeAmount = income.reduce((total, income) => total + income.amount, 0)
//   console.log(amount);
//   if (incomeAmount === 0) return null

//   return <BudgetCard amount={amount} name="Total" gray max={incomeAmount} hideButtons />
// }
 