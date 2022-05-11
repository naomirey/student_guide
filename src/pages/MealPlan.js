import React from 'react';
import ShowMealPlan from '../components/MealPlan/ShowMealPlan';
import MealPlanForm from '../components/MealPlan/MealPlanForm';
import { Card } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";
import Title from "../components/Title";


export default function MealPlan() {
    const { isAuthenticated, isLoading } = useAuth0();
    return (
        <div style={{padding: '20rem'}}>
            <Title>Meal Planner</Title>
            <Card style={{padding: "30px", height:"30rem", width:"40rem", borderRadius: "50px"}}>
                {isAuthenticated ?
                <div>
                    <MealPlanForm />
                    <ShowMealPlan />
                </div>
                : isLoading ?
                <h3>Loading ..</h3>
                    :
                <h2>Login to start meal planning...</h2>}
            </Card>
        </div>
    )
} 