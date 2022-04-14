import { useState, useEffect } from "react"

export default function useStorage(key, defaultValue) {
    const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof defaultValue === "function") {
      return defaultValue()
    } else {
      return defaultValue
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  useEffect(() => {
    const fetchBlogs = async () => {
    const response = await fetch('https://student-moving-out-guide-default-rtdb.firebaseio.com/blog_posts.json');
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error('Something went wrong!')
        
    }

    const loadedBlogs = [];
    
    for (const key in responseData) {
        loadedBlogs.push({
            key: key,
            id: key,
            name: responseData[key].name,
            blog: responseData[key].blog,
            date: responseData[key].date,
        });
    }
    setValue(loadedBlogs);
    };

}, []);

  return [value, setValue]
}