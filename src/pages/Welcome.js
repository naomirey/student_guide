import classes from './Welcome.module.css';
import { Carousel } from 'react-bootstrap';

const Welcome = () => {
   return(
        <div style={{padding: '10rem'}}>
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
                <h3>Second slide label</h3>
                </Carousel.Caption>
            </Carousel.Item>
            </Carousel>        
        </div>
    )
}



// const Welcome = () => {
//     const { loginWithRedirect } = useAuth0();
  
//     return (
//     <div style={{padding: '20rem'}}>
//          <button onClick={() => loginWithRedirect()}>Log In</button>;
//     </div>
//     )
   
//   };
export default Welcome;