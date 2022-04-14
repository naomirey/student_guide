import classes from './Blog.module.css';
import ViewBudget from './../components/BudgetCalc/ViewBudgets';
import ViewIncomings from './../components/BudgetCalc/ViewIncomings';
import TotalBudgetCard from './../components/BudgetCalc/TotalBudgetCard';
import { useState } from "react";
import ViewExpensesModal from './../components/BudgetCalc/ViewExpensesModal';

export default function BudgetTrial() {
    const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()

    return (
        <div>
            <section className={classes.page}>
            <div className={classes.blank} />
                <ViewBudget />
                <ViewIncomings />
                <TotalBudgetCard />
                {/* <ViewExpensesModal
                    budgetId={viewExpensesModalBudgetId}
                    handleClose={() => setViewExpensesModalBudgetId()}
                /> */}
            </section>
        </div>
    )
}

