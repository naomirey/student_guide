import './App.css';
import Header from './components/Header';
import { Route, Switch } from 'react-router-dom';
import Welcome from './pages/Welcome';
import BillCompare from './pages/BillCompare';
import BlogsStored from './pages/Blog';
import MealPlan from './pages/MealPlan';
import BlogDetails from './pages/BlogDetails';
import Container from 'react-bootstrap/Container';
import BudgetTrial from './pages/BudgetTrial';
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState();

  function getLoggedIn(isLoggedIn)
  {
    setLoggedIn(isLoggedIn)
  }

  return (
    <Container>
      <div>
        <Header getState={getLoggedIn} />
        <main>
          <Switch>
            <Route path="/" exact>
              <Welcome />
            </Route>
            <Route path="/budget-calculator">
              <BudgetTrial />
            </Route>
            <Route path="/meal-planner">
              <MealPlan />
            </Route>
            <Route path="/expense-comparison">
              <BillCompare />
            </Route>
            <Route path="/blog" exact>
              <BlogsStored/>
            </Route>
            <Route path="/blog/:blogID">
              <BlogDetails isLoggedIn={loggedIn} />
            </Route>
          </Switch>
        </main>
      </div>
      </Container>
  );
}

export default App;
