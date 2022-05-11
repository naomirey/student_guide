import ViewBudgetCalc from '../components/BudgetCalculator/ViewBudgetCalc';
import { useAuth0 } from "@auth0/auth0-react";
import Title from "../components/Title";

export default function BudgetCalculator() {
    const { isAuthenticated, isLoading } = useAuth0();

    return (
        <div style={{ padding: '20rem'}}>
            <Title>Budget Calculator</Title>
            {isAuthenticated ?
                <ViewBudgetCalc />
                : isLoading ?
                <h3>Loading ..</h3>
                    :
                <h2>Login to start budgetting...</h2>
            }
        </div>
        
    )
}

