import React from 'react'
import { useState, useEffect } from 'react';
import { Table} from 'react-bootstrap';
import instance from '../../firebase/instance';
import { useAuth0 } from "@auth0/auth0-react";



export default function ShowMealPlan() {
    const [isLoading, setIsLoading] = useState(true);
    const [currentMeals, setCurrentMeals] = useState([]);
    const [httpError, setHttpError] = useState([]);
    const [currentMealPlans, setCurrentMealPlans] = useState([]);
    const [currentDates, setCurrentDates] = useState([]);
    const [dateState, setDateState] = useState(null)
    const [results, setResults] = useState();
    const { user } = useAuth0();


    useEffect(() => {
        setIsLoading(true);
        instance.get('/meal-plans/'+user.nickname+ '.json').then((response)=>{
            console.log(response);
            const currentDatesStored = [];
            for (const key in response.data) {
                currentDatesStored.push({...response.data[key], id:key});
            }
            setCurrentDates(currentDatesStored);
            setIsLoading(false);
            console.log(currentDatesStored);
        
    });

        const fetchMealPlan = async () => {
            setIsLoading(true);
            const date = dateState;
            instance.get('/meal-plans/'+ user.nickname + '/' + date + '.json').then((response)=>{
                const loadedMealPlans = [];
                console.log(response)
                
                for (const key in response.data) {
                    loadedMealPlans.push({ ...response.data[key], id:key});
            }
            setResults(loadedMealPlans);
            setIsLoading(false);
            });
        };
        fetchMealPlan().catch((error) => {
                setIsLoading(false);
                setHttpError(error.message);
        });     
    }, [dateState]);

    if (isLoading) { 
        return (
        <section>
        <p>Loading...</p>
        </section>
        );
    }
 
    return (
        <div>
            <div className = "container p-2">
                <select 
                    className = "custom-select"
                    value={dateState}
                    onChange={(e)=>{
                        const selectedDate = e.target.value
                        setDateState(selectedDate)
                    }}>
                    <option disabled selected="selected">Select Date</option>
                    {currentDates.map((key) => (
                        <option key={key.id} value={key.id}>{key.id}</option>
                    ))}
                </select>
                {console.log(currentDates)}
            </div>
            {dateState &&
            <>
                <Table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Breakfast</th>
                            <th>Lunch</th>
                            <th>Dinner</th>
                        </tr>
                        </thead>
                        <tbody>
                            {   
                                results.map((item) =>
                                <tr key={item.id}>
                                    <td>{item.day}</td>
                                    <td>{item.breakfast}</td>
                                    <td>{item.lunch}</td>
                                    <td>{item.dinner}</td>
                                </tr>
                                )
                            }
                    </tbody>
                </Table>
                </>
            }
            
        </div>
    )
}