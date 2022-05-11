import classes from './Title.module.css';

const Title = props => {
  return (
    <div className={classes.banner}>
        <div className={classes.bannerContext}>
            {props.children}
        </div>
    </div>
  ) 
};

export default Title;

