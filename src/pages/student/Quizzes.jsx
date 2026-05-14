import { useState } from 'react'
import { useQuizzes } from '../../context/QuizContext'
import { Card, CardHeader, CardBody, Button, Badge, ProgressBar } from '../../components/shared/SharedComponents'
import styles from './StudentPages.module.css'

export default function Quizzes() {
  const { quizzes, submitQuiz } = useQuizzes()
  const [activeQuiz, setActiveQuiz] = useState(null)
  const [qIndex, setQIndex] = useState(0)
  const [selectedOpt, setSelectedOpt] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)

  const handleStart = (quiz) => {
    setActiveQuiz(quiz)
    setQIndex(0)
    setSelectedOpt(null)
    setShowFeedback(false)
    setCorrectAnswers(0)
  }

  const handleAnswer = (idx, correctIdx) => {
    if (showFeedback) return
    setSelectedOpt(idx)
    setShowFeedback(true)
    if (idx === correctIdx) {
      setCorrectAnswers(prev => prev + 1)
    }
  }

  const nextQ = () => {
    if (qIndex < activeQuiz.questions_data.length - 1) {
      setQIndex(qIndex + 1)
      setSelectedOpt(null)
      setShowFeedback(false)
    } else {
      // Calculate final score and submit
      const total = activeQuiz.questions_data.length
      const score = Math.round((correctAnswers / total) * 100)
      submitQuiz(activeQuiz.id, score, correctAnswers, total)
      setActiveQuiz(null)
    }
  }

  if (activeQuiz) {
    const q = activeQuiz.questions_data[qIndex]
    const progress = ((qIndex + 1) / activeQuiz.questions_data.length) * 100

    return (
      <div className={styles.page + ' fade-in'}>
        <div className={styles.header}>
          <div className={styles.title}>Quizzes & Assessments</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Question {qIndex + 1} of {activeQuiz.questions_data.length}
          </span>
          <Button variant="ghost" size="sm" onClick={() => setActiveQuiz(null)}>Exit Quiz</Button>
        </div>

        <Card>
          <CardBody>
            <div className={styles.quizQ}>{q.q}</div>
            <div className={styles.quizOptions}>
              {q.opts.map((opt, i) => {
                let cls = styles.quizOpt
                if (showFeedback) {
                  if (i === q.ans) cls += ' ' + styles.optCorrect
                  else if (i === selectedOpt) cls += ' ' + styles.optWrong
                } else if (i === selectedOpt) {
                  cls += ' ' + styles.optSelected
                }

                return (
                  <div key={i} className={cls} onClick={() => handleAnswer(i, q.ans)}>
                    {opt}
                  </div>
                )
              })}
            </div>

            {showFeedback && (
              <div style={{ marginTop: 12, fontSize: 13, color: selectedOpt === q.ans ? 'var(--accent3)' : 'var(--danger)' }}>
                {selectedOpt === q.ans ? '✓ Correct! Well done.' : '✗ Incorrect. Review your study notes!'}
                <div style={{ color: 'var(--text-muted)', marginTop: 4 }}>{q.explanation}</div>
              </div>
            )}

            {showFeedback && (
              <Button variant="primary" style={{ marginTop: 16 }} onClick={nextQ}>
                {qIndex < activeQuiz.questions_data.length - 1 ? 'Next Question →' : 'Finish Quiz ✓'}
              </Button>
            )}
          </CardBody>
        </Card>

        <div style={{ marginTop: 8 }}>
          <ProgressBar value={progress} />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page + ' fade-in'}>
      <div className={styles.header}>
        <div className={styles.title}>Quizzes & Assessments</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {quizzes.map(quiz => (
          <Card key={quiz.id}>
            <CardHeader 
              title={quiz.title} 
              action={
                <Badge variant={quiz.status === 'completed' ? 'green' : 'yellow'}>
                  {quiz.status === 'completed' ? `Completed · ${quiz.score}%` : quiz.dueDate ? `Due ${quiz.dueDate}` : 'Pending'}
                </Badge>
              } 
            />
            <CardBody>
              {quiz.status === 'pending' ? (
                <>
                  <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>
                    <span>⏱ {quiz.duration} minutes</span>
                    <span>❓ {quiz.questions} questions</span>
                    <span>📊 Pass: {quiz.passing}%</span>
                  </div>
                  <Button variant="primary" onClick={() => handleStart(quiz)}>Start Quiz →</Button>
                </>
              ) : (
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  Completed on {quiz.completedDate} · {quiz.correct}/{quiz.total} correct · <span style={{ color: 'var(--accent3)' }}>Passed</span>
                </div>
              )}
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}
