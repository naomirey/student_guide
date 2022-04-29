import { Card, ProgressBar, Button } from 'react-bootstrap';
import Stack from '@mui/material/Stack';
import { currencyFormatter } from '../utils';

export default function BudgetCard({ name, amount, max, grey, onAddExpenseClick, hideButtons, onViewExpenseClick, deleteItem, id, itemName, showMessage}) {
    const classNames = [];
    const ratio = amount / max;

    if (amount > max) {
        classNames.push("bg-danger", "bg-opacity-10")
    } else if (grey) {
        classNames.push("bg-light")

    }

    const getProgressBarVariant = (amount, max) => {
        if (ratio < .5) return "primary"
        if (ratio < .75) return "warning"
        return "danger"

    }
    return (
        <Card style = {{padding: '20px'}}>
            <Card.Body>
                <Card.Title className="d-flex mb-3">
                {/* justify-content-between 
                align-items-baseline fw-normal */}
                    <div className="me-2">{name}</div>
                    <div className="d-flex align-items-baseline ">
                        {currencyFormatter.format(amount)} 
                        {max && (
                            <span className="text-muted fs-6 ms-1">
                                / {currencyFormatter.format(max)}
                            </span> 
                        )}
                    </div>
                </Card.Title>
                {deleteItem && 
                    <div style={{position: 'absolute', right: '0'}}>
                        <Button onClick={()=>deleteItem(id, itemName)}>X</Button>
                    </div>
                }
                {max > 0 && (
                    <ProgressBar 
                        className="rounded-pill" 
                        variant={getProgressBarVariant(amount,max)}
                        min={0}
                        max={max}
                        now={amount}
                    />
                )}
                {showMessage && (
                ratio < .5 ? 
                    <h4>You've spent less than half your budget <br/>
                    Save {currencyFormatter.format(parseInt(max) - parseInt(amount))} </h4>
                : ratio < .75 ?
                    <h4>You've spent over half your budget <br/>
                    Save {currencyFormatter.format(parseInt(max) - parseInt(amount))} </h4>
                :
                    <h4>You've less than 25% of your budget left <br/>
                    Save {currencyFormatter.format(parseInt(max) - parseInt(amount))} </h4>)}
             
            </Card.Body>
        </Card>
    )
}

//ms-1 = margin of 1
//fs-6 = font size 6