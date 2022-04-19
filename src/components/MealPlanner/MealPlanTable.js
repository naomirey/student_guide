import React from 'react'
import { Table } from 'react-bootstrap';


export default function MealPlanTable() {
    const daysNames=['mon','tue','wed','thurs','fri','sat','sun']
    
    const dayNames = daysNames.map((day) => (
        <li>
            {day}
        </li>
    ));
    
    return (
        <div>
            <Table responsive>
                <thead>
                    <tr>
                    <th></th>
                    {dayNames.map((day, index) => (
                        <td key={index}>{day} {index}</td>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>Breakfast</td>
                    {Array.from({ length: 7 }).map((_, index) => (
                        <td key={index}>Table cell {index}</td>
                    ))}
                    </tr>
                    <tr>
                    <td>Lunch</td>
                    {Array.from({ length: 7 }).map((_, index) => (
                        <td key={index}>Table cell {index}</td>
                    ))}
                    </tr>
                    <tr>
                    <td>Dinner</td>
                    {Array.from({ length: 7 }).map((_, index) => (
                        <td key={index}>Table cell {index}</td>
                    ))}
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}
