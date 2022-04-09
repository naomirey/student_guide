import './App.css';
import Header from './components/Header';
import { Route, Switch } from 'react-router-dom';
import Welcome from './pages/Welcome';
import BillCompare from './pages/BillCompare';
import BlogsStored from './pages/Blog';
import MealPlanner from './pages/MealPlanner';
import BlogDetails from './pages/BlogDetails';
import Container from 'react-bootstrap/Container';
import BudgetCalculator from './pages/BudgetCalculator';

function App() {
  return (
    <Container>
      <div>
        <Header />
        <main>
          <Switch>
            <Route path="/welcome">
              <Welcome />
            </Route>
            <Route path="/budget-calculator">
              <BudgetCalculator />
            </Route>
            <Route path="/meal-planner">
              <MealPlanner />
            </Route>
            <Route path="/expense-comparison">
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
      </Container>
  );
}

export default App;
