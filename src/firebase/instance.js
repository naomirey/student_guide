import axios from "axios";

export default axios.create({
    baseURL: "https://student-guide-meal-planner-default-rtdb.firebaseio.com/"
})
