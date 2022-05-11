import axios from "axios";

export default axios.create({
    baseURL: "https://student-guide-8b721-default-rtdb.firebaseio.com/meal-planner/"
})
