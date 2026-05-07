import { createContext, useContext, useState } from 'react'
import { QUIZ_BANK } from '../data/mockData'

const QuizContext = createContext(null)

export function QuizProvider({ children }) {
  const [quizzes, setQuizzes] = useState(QUIZ_BANK)

  const submitQuiz = (quizId, score, correct, total) => {
    setQuizzes(prev => 
      prev.map(quiz => {
        if (quiz.id === quizId) {
          return {
            ...quiz,
            status: 'completed',
            score,
            correct,
            total,
            completedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
          }
        }
        return quiz
      })
    )
  }

  const getPendingQuizzes = () => quizzes.filter(q => q.status === 'pending')
  const getCompletedQuizzes = () => quizzes.filter(q => q.status === 'completed')

  return (
    <QuizContext.Provider value={{ quizzes, submitQuiz, getPendingQuizzes, getCompletedQuizzes }}>
      {children}
    </QuizContext.Provider>
  )
}

export function useQuizzes() {
  const context = useContext(QuizContext)
  if (!context) throw new Error('useQuizzes must be used within a QuizProvider')
  return context
}
