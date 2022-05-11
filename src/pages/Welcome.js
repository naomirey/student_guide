import classes from './Welcome.module.css';
import { Carousel, Card } from 'react-bootstrap';

const Welcome = () => {
   return(
       <>
        <div style={{padding: '10rem' }}>
            <Carousel>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="slide.jpg"
                alt="Welcome!"
                width="auto"
                />
                <Carousel.Caption>
                <h3 className={classes.header}>Welcome to the Student Guide to Moving Out</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="slide.jpg"
                alt="Second slide"
                />
                <Carousel.Caption>
                <h3 className={classes.header}>Get ready for some helpful tips and planning ideas!</h3>
                </Carousel.Caption>
            </Carousel.Item>
            </Carousel>  
            <br/>
            <div>
                <Card style={{padding: '1.5rem', border: '10px solid #265fa8' }}>
                    <Card.Title>
                        Budget Calculator Information
                    </Card.Title>
                    <Card.Body>
                        The Budget Calculator will calculate how much money you are spending in total (expenses) and 
                        put that amount over how much you earn in a month (income). This will be outputted at the far right with
                        a progress bar, a personalised message on your spending and a total of how much you can save or 
                        if you've overspent, how much you are over your budget. 
                        <br/>
                        <br/>
                        Use this page to plan your weekly or monthly expenses and get on top of your spending! Preperation 
                        is key to getting to the bottom of where your money is going.
                    </Card.Body>

                </Card>
                <Card style={{padding: '1.5rem', border: '10px solid #265fa8' }}>
                    <Card.Title>
                        Meal Planner Information
                    </Card.Title>
                    <Card.Body>
                        It is so easy to buy ready meals or takeaways when thinking about what to cook every night gets to overwhelming.
                        <br/>
                        Let's plan our meals once in our week and not have this worry everyday!
                        <br/>
                        <br/>
                        Select from the already stored meals or add your own meals and start planning your weekly meal plan. Screenshot
                        or takeout this meal plan when you are out shopping for groceries and be prepared for the entire week.
                    </Card.Body>
                </Card>
                <Card style={{padding: '1.5rem', border: '10px solid #265fa8' }}>
                    <Card.Title>
                        Bill Comparison Information
                    </Card.Title>
                    <Card.Body>
                        Browse our Bill Comparison page for the UK's billing companies lowest and highest rates! You might find that you
                        are missing out on a deal!
                    </Card.Body>
                </Card>
                <Card style={{padding: '1.5rem', border: '10px solid #265fa8' }}>
                    <Card.Title>
                        Blog Information
                    </Card.Title>
                    <Card.Body>
                        Starting university and moving away from home can be a very daunting time. Take a look at some helpful blogs which 
                        you may find insightful and add your own advice!
                    </Card.Body>
                </Card>
            </div>      
        </div>
        </>
    )
}

export default Welcome;