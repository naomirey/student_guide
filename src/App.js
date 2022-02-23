import './App.css';
import Header from './components/Header';
import { Route, Switch } from 'react-router-dom';
import Welcome from './pages/Welcome';
import BudgetCalc from './pages/BudgetCalc';
import BillCompare from './pages/BillCompare';
import BlogsStored from './pages/Blog';
import MealPlanner from './pages/MealPlanner';
import BlogDetails from './pages/BlogDetails';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Switch>
          <Route path="/welcome">
            <Welcome />
          </Route>
          <Route path="/budget-calculator">
            <BudgetCalc />
          </Route>
          <Route path="/meal-planner">
            <MealPlanner />
          </Route>
          <Route path="/bill-comparison">
            <BillCompare />
          </Route>
          <Route path="/blog" exact>
            <BlogsStored />
          </Route>
          <Route path="/blog/:blogID">
            <BlogDetails />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
