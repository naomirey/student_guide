import BudgetCard from './BudgetCard'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../../context/BudgetContext'

export default function UncategorisedBudgetCard(props) {
    const { budgetsRetrievedHandler } = useBudgets();
    const amount = budgetsRetrievedHandler(UNCATEGORIZED_BUDGET_ID).reduce(
        (total, expense) => total + expense.amount,
        0
    )
    if (amount === 0) return null;

    return <BudgetCard amount = {amount} name="Uncategorised" grey {...props} />
}