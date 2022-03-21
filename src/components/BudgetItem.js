import classes from './BudgetItem.module.css';

const BudgetItem = (props) => {

//   const addToCartHandler = amount => {
//     cartCtx.addItem({
//       id: props.id,
//       name: props.name,
//       amount: amount,
//       price: props.price
//     });
//   };

  return (
    <li className={classes.expense}>
      <div>
        <h4>{props.name}</h4>
        {console.log(props.name)}
        <div className={classes.description}>{props.description}</div>
      </div>
    </li>
  );
};

export default BudgetItem;
