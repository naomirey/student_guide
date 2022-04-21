import React from 'react';
import ShowMealPlan from '../components/MealPlan/ShowMealPlan';
import MealPlanForm from '../components/MealPlan/MealPlanForm';
export default function MealPlan() {
    return (
        <div style={{padding: '10rem'}}>
            <ShowMealPlan />
            <MealPlanForm />
        </div>
    )
}
