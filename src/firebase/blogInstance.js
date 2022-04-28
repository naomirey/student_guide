import axios from 'axios';

export default axios.create({
    baseURL: "https://student-moving-out-guide-default-rtdb.firebaseio.com/blog_posts"
})