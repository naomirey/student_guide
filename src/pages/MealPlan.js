import React from 'react';
import ShowMealPlan from '../components/MealPlan/ShowMealPlan';
import MealPlanForm from '../components/MealPlan/MealPlanForm';
import { ButtonToolbar, Button, InputGroup, FormControl, ButtonGroup } from 'react-bootstrap';
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";


export default function MealPlan() {
    const { isAuthenticated, isLoading } = useAuth0();
    return (
        <div style={{padding: '15rem'}}>
            {isAuthenticated ?
            <div>
                <h2>Meal Plan</h2>
                <MealPlanForm />
                <ShowMealPlan />
            </div>
              : isLoading ?
            <h3>Loading ..</h3>
                :
            <h2>Login to start meal planning</h2>}
        </div>
    )
}