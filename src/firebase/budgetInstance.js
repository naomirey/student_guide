import axios from 'axios';

export default axios.create({
    baseURL: "https://student-guide-budget-calc-default-rtdb.firebaseio.com/"
})