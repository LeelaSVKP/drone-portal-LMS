import { createContext, useContext, useState } from 'react'
import { COURSES } from '../data/mockData'

const CourseContext = createContext(null)

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState(COURSES)

  const enrollCourse = (courseId) => {
    setCourses(prevCourses =>
      prevCourses.map(course => {
        if (course.id === courseId) {
          if (course.enrolled) return course;
          return { ...course, enrolled: true, progress: 0 }
        }
        return course
      })
    )
  }

  const updateCourseProgress = (courseId, amount) => {
    setCourses(prevCourses =>
      prevCourses.map(course => {
        if (course.id === courseId) {
          const newProgress = Math.min(course.progress + amount, 100);
          return { ...course, progress: newProgress }
        }
        return course
      })
    )
  }

  const addCourse = (newCourse) => {
    setCourses(prev => [...prev, newCourse])
  }

  return (
    <CourseContext.Provider value={{ courses, enrollCourse, updateCourseProgress, addCourse }}>
      {children}
    </CourseContext.Provider>
  )
}

export function useCourses() {
  const context = useContext(CourseContext)
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider')
  }
  return context
}
