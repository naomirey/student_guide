import React, { useState, useEffect } from 'react';
import Modal from '../Modal';
import { Button } from 'react-bootstrap';
import MealFormTable from './MealFormTable';
import AddMeal from './AddMeal';


export default function MealPlanForm() {
    const [isLoading, setIsLoading] = useState(true);
    const [currentMeals, setCurrentMeals] = useState([]);
    const [httpError, setHttpError] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showAddMeal, setShowAddMeal] = useState(false);
 
    useEffect(() => {
        const fetchMeals = async () => {
            setIsLoading(true);
            const response = await fetch('https://student-guide-8b721-default-rtdb.firebaseio.com/meal-planner/meals.json');
            const responseData = await response.json();

            if (!response.ok) {
                throw new Error('Something went wrong!')
                
            }

            const loadedMeals = [];
            
            for (const key in responseData) {
                loadedMeals.push({
                    key: key,
                    id: key,
                    name: responseData[key].name,
                });
            }
            setCurrentMeals(loadedMeals);
            setIsLoading(false);
            console.log(currentMeals);
        };
        
        fetchMeals().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);

   
    if (isLoading) { 
        return (
        <section>
        <p>Loading...</p>
        </section>
        );
    }
    const showAddMealHandler = () => {
        setShowAddMeal(true);
        setShowForm(false);
    }
    return (
        <div>
            <Button onClick={() => setShowForm(true)}>Create Meal Plan</Button>
            {showForm &&
                <Modal>
                    <MealFormTable showAddMeal={()=> setShowAddMeal(showAddMealHandler)} setShowForm={setShowForm} meals={currentMeals} />
                </Modal>
            }
            {showAddMeal &&
                <Modal>
                    <AddMeal setShowAddMeal={setShowAddMeal} onClose={()=>setShowAddMeal(false)} />
                </Modal>
            }
            
        </div>
    )
}
