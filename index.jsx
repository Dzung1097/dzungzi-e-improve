// Sử dụng React từ global scope (đã load qua CDN)
const { useState, useEffect, useRef, StrictMode } = React;
const { createRoot } = ReactDOM;

// Data structure types
const learningPlan = [
  {
    title: "Tuần 1-4: Nền tảng & Giao tiếp thực chiến",
    goal: "",
    weeks: window.plan1_4?.weeks || []
  },
  {
    title: "Tuần 5-8: Kỹ năng nâng cao & Ứng dụng",
    goal: "",
    weeks: window.plan5_8?.weeks || []
  },
  {
    title: "Tuần 9-12: Săn việc & Luyện phỏng vấn",
    goal: "",
    weeks: window.plan9_12?.weeks || []
  }
];

// Fallback data if scripts don't load
if (!window.plan1_4 || !window.plan5_8 || !window.plan9_12) {
  console.log('Loading fallback data...');
  // Add some basic fallback data
  window.plan1_4 = { weeks: [] };
  window.plan5_8 = { weeks: [] };
  window.plan9_12 = { weeks: [] };
}



const styles = {
  appContainer: {
    width: '100%',
    maxWidth: '100%',
    margin: '0',
    padding: '0',
    paddingTop: '180px', // Space for fixed header
    overflowX: 'hidden',
  },
  fixedHeader: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    zIndex: 1000,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    padding: '1rem 1.5rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  headerRow1: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  headerRow2: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '2rem',
  },
  overallProgressSmall: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  overallProgressLabelSmall: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#1f2937',
    minWidth: '140px',
  },
  overallProgressBarSmall: {
    width: '100px',
    height: '4px',
    backgroundColor: '#e5e7eb',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  overallProgressFillSmall: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: '2px',
    transition: 'width 0.3s ease',
  },
  mainProgressSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flex: 1,
  },
  mainProgressLabel: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#1f2937',
    minWidth: '280px',
  },
  mainProgressBar: {
    flex: 1,
    height: '8px',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  mainProgressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  },
  headerRight: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  quizButton: {
    backgroundColor: '#8b5cf6', // Purple
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(139, 92, 246, 0.3)',
    ':hover': {
      backgroundColor: '#7c3aed',
      transform: 'translateY(-1px)',
      boxShadow: '0 3px 6px rgba(139, 92, 246, 0.4)',
    },
  },
  tabsContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '0.25rem',
    borderBottom: '2px solid #e5e7eb',
    flexWrap: 'wrap',
  },
  tab: {
    padding: '0.75rem 1rem',
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    fontSize: '1rem',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    color: '#6b7280',
    position: 'relative',
    transition: 'color 0.3s ease',
  },
  activeTab: {
    color: '#3b82f6', // Blue
  },
  tabIndicator: {
    position: 'absolute',
    bottom: '-2px',
    left: 0,
    right: 0,
    height: '3px',
    backgroundColor: '#3b82f6', // Blue
    borderRadius: '3px 3px 0 0',
  },
  weekTab: {
    padding: '0.4rem 0.6rem',
    cursor: 'pointer',
    border: 'none',
    background: 'white',
    borderRadius: '6px',
    fontSize: '0.8rem',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    color: '#6b7280',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.2rem',
    minWidth: '45px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  activeWeekTab: {
    backgroundColor: '#3b82f6', // Blue
    color: 'white',
    transform: 'translateY(-1px)',
    boxShadow: '0 3px 6px rgba(59, 130, 246, 0.3)',
  },
  weekNumber: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
  },
  weekProgress: {
    fontSize: '0.7rem',
    opacity: 0.8,
  },
  weekTabsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
    flexWrap: 'wrap',
    marginTop: '0.5rem',
  },
  progressSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    marginTop: '0.5rem',
    padding: '0.75rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  },
  overallProgress: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flex: 1,
  },
  overallProgressLabel: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#1f2937',
    minWidth: '80px',
  },
  overallProgressBar: {
    flex: 1,
    height: '6px',
    backgroundColor: '#e5e7eb',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  overallProgressFill: {
    height: '100%',
    backgroundColor: '#3b82f6', // Blue
    borderRadius: '3px',
    transition: 'width 0.3s ease',
  },
  overallProgressText: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#1f2937',
    minWidth: '40px',
    textAlign: 'right',
  },
  monthlyProgress: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  monthlyProgressLabel: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#6b7280',
    minWidth: '50px',
  },
  monthlyProgressBar: {
    width: '50px',
    height: '4px',
    backgroundColor: '#e5e7eb',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  monthlyProgressFill: {
    height: '100%',
    backgroundColor: '#ec4899', // Pink
    borderRadius: '2px',
    transition: 'width 0.3s ease',
  },
  monthlyProgressText: {
    fontSize: '0.7rem',
    fontWeight: '600',
    color: '#6b7280',
    minWidth: '30px',
    textAlign: 'right',
  },
  skillProgressDisplay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '0.5rem',
  },
  skillProgressText: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#3b82f6',
  },
  contentContainer: {
    padding: '0',
    maxWidth: '100%',
    overflow: 'visible',
  },
  monthGoal: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: 'var(--dark-gray)',
    marginBottom: '2rem',
    fontSize: '1.1rem',
    padding: '0 1rem',
  },
  weekCard: {
    backgroundColor: 'white',
    borderRadius: '0',
    padding: '2rem 1rem',
    marginBottom: '0',
    margin: '0 10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    border: 'none',
    borderBottom: '2px solid #e5e7eb',
    width: 'calc(100% - 20px)',
    minHeight: '100vh',
    boxSizing: 'border-box',
  },
  weekHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    position: 'sticky',
    top: '0',
    backgroundColor: 'white',
    zIndex: 10,
    padding: '1rem 0',
    borderBottom: '2px solid #e5e7eb',
  },
  weekTitleSection: {
    flex: 1,
  },
  weekTitle: {
    fontSize: '1.8rem',
    color: '#1f2937',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
  },
  weekTitleUnderline: {
    height: '2px',
    background: 'linear-gradient(90deg, #3b82f6, #ec4899)',
    width: '100%',
  },
  weekProgressSection: {
    flex: 1,
    textAlign: 'right',
  },
  weekLabel: {
    fontSize: '1.8rem',
    color: '#1f2937',
    marginBottom: '1.5rem',
    borderBottom: '2px solid #e5e7eb',
    paddingBottom: '0.75rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  daysGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  weekendGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
  },
  dayCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '1rem',
    borderLeft: '4px solid #3b82f6', // Blue
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
  },
  dayLabel: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '1rem',
  },
  taskSkill: {
    fontWeight: 'bold',
    color: '#8b5cf6', // Purple
    marginBottom: '0.75rem',
    fontSize: '1rem',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '0.5rem',
  },
  taskItem: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '0.5rem',
    fontSize: '0.95rem',
    lineHeight: '1.4',
  },
  checkbox: {
    marginRight: '0.75rem',
    marginTop: '2px',
    accentColor: '#8b5cf6', // Purple
    cursor: 'pointer',
    width: '16px',
    height: '16px',
    flexShrink: 0,
  },
  taskText: {
    flex: 1,
  },
  checkedTask: {
    textDecoration: 'line-through',
    color: 'var(--dark-gray)',
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem',
  },
  progressBarOuter: {
    flex: '1',
    height: '8px',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressBarInner: {
    height: '100%',
    backgroundColor: '#3b82f6', // Blue
    borderRadius: '4px',
    transition: 'width 0.4s ease-in-out',
  },
  progressText: {
    fontWeight: '600',
    color: '#1f2937',
    fontSize: '0.85rem',
    minWidth: '80px',
    textAlign: 'right',
  },
  skillProgressBox: {
    backgroundColor: '#f3e8ff',
    borderRadius: '8px',
    padding: '0.75rem',
    marginTop: '0.75rem',
    display: 'inline-block',
  },
  skillProgressItem: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#7c3aed',
  },
  firstWeekOfMonth: {
    marginTop: '2rem',
  },
  skillSeparator: {
    color: '#d1d5db',
    margin: '0 0.5rem',
  },
  categoryProgressContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  },
  categoryProgressItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  categoryProgressLabel: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#6b7280',
    minWidth: '60px',
  },
  categoryProgressBarOuter: {
    flex: 1,
    height: '6px',
    backgroundColor: '#e5e7eb',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  categoryProgressBarInner: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 0.3s ease',
  },
  categoryProgressText: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#3b82f6',
    minWidth: '35px',
    textAlign: 'right',
  },
  // Quiz styles
  quizContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: 'var(--card-background)',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 95, 115, 0.1)',
  },
  quizTitle: {
    textAlign: 'center',
    color: 'var(--primary-color)',
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
  },
  topicGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  topicButton: {
    padding: '1.5rem',
    border: '2px solid var(--primary-color)',
    borderRadius: '12px',
    backgroundColor: 'white',
    color: 'var(--primary-color)',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  setupForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  setupItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  setupLabel: {
    fontSize: '1rem',
    fontWeight: '600',
    color: 'var(--text-color)',
  },
  setupSelect: {
    padding: '0.75rem',
    border: '2px solid var(--light-gray)',
    borderRadius: '8px',
    fontSize: '1rem',
    backgroundColor: 'white',
  },
  setupInput: {
    padding: '0.75rem',
    border: '2px solid var(--light-gray)',
    borderRadius: '8px',
    fontSize: '1rem',
    backgroundColor: 'white',
  },
  startButton: {
    padding: '1rem 2rem',
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '1rem',
  },
  quizHeader: {
    marginBottom: '2rem',
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: 'var(--light-gray)',
    borderRadius: '4px',
    overflow: 'hidden',
    marginTop: '1rem',
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'var(--secondary-color)',
    transition: 'width 0.3s ease',
  },
  questionCard: {
    backgroundColor: '#f8f9fa',
    padding: '2rem',
    borderRadius: '12px',
    marginBottom: '2rem',
  },
  questionText: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'var(--primary-color)',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  questionPrompt: {
    fontSize: '1.1rem',
    color: 'var(--text-color)',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  optionButton: {
    padding: '1rem 1.5rem',
    border: '2px solid var(--light-gray)',
    borderRadius: '8px',
    backgroundColor: 'white',
    color: 'var(--text-color)',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'left',
  },
  selectedOption: {
    borderColor: 'var(--primary-color)',
    backgroundColor: 'var(--primary-color)',
    color: 'white',
  },
  answeredOption: {
    pointerEvents: 'none',
  },
  navigationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
  },
  navButton: {
    padding: '0.75rem 1.5rem',
    border: '2px solid var(--primary-color)',
    borderRadius: '8px',
    backgroundColor: 'white',
    color: 'var(--primary-color)',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  questionNumbers: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  questionNumber: {
    width: '40px',
    height: '40px',
    border: '2px solid var(--light-gray)',
    borderRadius: '50%',
    backgroundColor: 'white',
    color: 'var(--text-color)',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  currentQuestion: {
    borderColor: 'var(--primary-color)',
    backgroundColor: 'var(--primary-color)',
    color: 'white',
  },
  answeredQuestion: {
    borderColor: 'var(--secondary-color)',
    backgroundColor: 'var(--secondary-color)',
    color: 'white',
  },
  finishButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: 'var(--secondary-color)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  resultSummary: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  scoreCard: {
    backgroundColor: '#f8f9fa',
    padding: '2rem',
    borderRadius: '12px',
    display: 'inline-block',
  },
  scoreTitle: {
    fontSize: '1.2rem',
    color: 'var(--text-color)',
    marginBottom: '1rem',
  },
  scoreValue: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: 'var(--primary-color)',
    marginBottom: '0.5rem',
  },
  scoreText: {
    fontSize: '1rem',
    color: 'var(--text-color)',
  },
  resultsList: {
    marginBottom: '2rem',
  },
  resultsTitle: {
    fontSize: '1.3rem',
    color: 'var(--primary-color)',
    marginBottom: '1rem',
  },
  resultItem: {
    border: '1px solid var(--light-gray)',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
  },
  resultQuestion: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem',
  },
  questionNumber: {
    fontWeight: 'bold',
    color: 'var(--primary-color)',
  },
  questionWord: {
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  resultAnswers: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  answerRow: {
    display: 'flex',
    gap: '0.5rem',
  },
  answerLabel: {
    fontWeight: '600',
    minWidth: '120px',
  },
  answerText: {
    fontWeight: '500',
  },
  correctAnswer: {
    color: '#10b981',
    fontWeight: '600',
  },
  wrongAnswer: {
    color: '#ef4444',
    fontWeight: '600',
  },
  resultActions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
  retryButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  backButton: {
    padding: '0.75rem 1.5rem',
    border: '2px solid var(--primary-color)',
    borderRadius: '8px',
    backgroundColor: 'white',
    color: 'var(--primary-color)',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  quizButton: {
    padding: '0.5rem 1rem',
    backgroundColor: 'var(--secondary-color)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginLeft: '1rem',
  },
};

// Quiz Components
const TopicSelection = ({ onTopicSelect }) => (
  <div style={styles.quizContainer}>
    <h2 style={styles.quizTitle}>Chọn chủ đề từ vựng</h2>
    <div style={styles.topicGrid}>
      {Object.keys(vocabularyData).map(topic => (
        <button
          key={topic}
          onClick={() => onTopicSelect(topic)}
          style={styles.topicButton}
        >
          {topic}
        </button>
      ))}
    </div>
  </div>
);

const QuizSetup = ({ topic, onStartQuiz }) => {
  const [questionType, setQuestionType] = useState('en-to-vi');
  const [questionCount, setQuestionCount] = useState(10);

  const handleStart = () => {
    onStartQuiz({
      topic,
      questionType,
      questionCount: Math.min(questionCount, vocabularyData[topic].length)
    });
  };

  return (
    <div style={styles.quizContainer}>
      <h2 style={styles.quizTitle}>Thiết lập bài kiểm tra</h2>
      <div style={styles.setupForm}>
        <div style={styles.setupItem}>
          <label style={styles.setupLabel}>Chủ đề: {topic}</label>
        </div>
        <div style={styles.setupItem}>
          <label style={styles.setupLabel}>Loại câu hỏi:</label>
          <select 
            value={questionType} 
            onChange={(e) => setQuestionType(e.target.value)}
            style={styles.setupSelect}
          >
            <option value="en-to-vi">Tiếng Anh → Tiếng Việt</option>
            <option value="vi-to-en">Tiếng Việt → Tiếng Anh</option>
            <option value="mixed">Trộn ngẫu nhiên</option>
          </select>
        </div>
        <div style={styles.setupItem}>
          <label style={styles.setupLabel}>Số câu hỏi:</label>
          <input
            type="number"
            min="1"
            max={vocabularyData[topic].length}
            value={questionCount}
            onChange={(e) => setQuestionCount(parseInt(e.target.value) || 1)}
            style={styles.setupInput}
          />
        </div>
        <button onClick={handleStart} style={styles.startButton}>
          Bắt đầu kiểm tra
        </button>
      </div>
    </div>
  );
};

const QuizInterface = ({ 
  questions, 
  currentQuestion, 
  onAnswer, 
  onNext, 
  onPrevious, 
  onFinish,
  userAnswers 
}) => {
  const question = questions[currentQuestion];
  const userAnswer = userAnswers[question.id];

  return (
    <div style={styles.quizContainer}>
      <div style={styles.quizHeader}>
        <h2 style={styles.quizTitle}>Câu hỏi {currentQuestion + 1} / {questions.length}</h2>
        <div style={styles.progressBar}>
          <div 
            style={{ 
              ...styles.progressFill, 
              width: `${((currentQuestion + 1) / questions.length) * 100}%` 
            }} 
          />
        </div>
      </div>

      <div style={styles.questionCard}>
        <h3 style={styles.questionText}>{question.word}</h3>
        <p style={styles.questionPrompt}>Chọn nghĩa đúng:</p>
        
        <div style={styles.optionsContainer}>
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswer(question.id, index)}
              style={{
                ...styles.optionButton,
                ...(userAnswer === index ? styles.selectedOption : {}),
                ...(userAnswer !== undefined ? styles.answeredOption : {})
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.navigationContainer}>
        <button 
          onClick={onPrevious} 
          disabled={currentQuestion === 0}
          style={styles.navButton}
        >
          ← Câu trước
        </button>
        
        <div style={styles.questionNumbers}>
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => {/* TODO: Jump to question */}}
              style={{
                ...styles.questionNumber,
                ...(index === currentQuestion ? styles.currentQuestion : {}),
                ...(userAnswers[index] !== undefined ? styles.answeredQuestion : {})
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {currentQuestion === questions.length - 1 ? (
          <button onClick={onFinish} style={styles.finishButton}>
            Nộp bài
          </button>
        ) : (
          <button onClick={onNext} style={styles.navButton}>
            Câu tiếp theo →
          </button>
        )}
      </div>
    </div>
  );
};

const QuizResults = ({ result, onRetry, onBackToTopics }) => {
  return (
    <div style={styles.quizContainer}>
      <h2 style={styles.quizTitle}>Kết quả bài kiểm tra</h2>
      
      <div style={styles.resultSummary}>
        <div style={styles.scoreCard}>
          <h3 style={styles.scoreTitle}>Điểm số</h3>
          <div style={styles.scoreValue}>{result.score}%</div>
          <p style={styles.scoreText}>
            {result.correctAnswers} / {result.totalQuestions} câu đúng
          </p>
        </div>
      </div>

      <div style={styles.resultsList}>
        <h3 style={styles.resultsTitle}>Chi tiết từng câu hỏi:</h3>
        {result.questions.map((question, index) => (
          <div key={question.id} style={styles.resultItem}>
            <div style={styles.resultQuestion}>
              <span style={styles.questionNumber}>{index + 1}.</span>
              <span style={styles.questionWord}>{question.word}</span>
            </div>
            <div style={styles.resultAnswers}>
              <div style={styles.answerRow}>
                <span style={styles.answerLabel}>Đáp án của bạn:</span>
                <span style={{
                  ...styles.answerText,
                  ...(question.isCorrect ? styles.correctAnswer : styles.wrongAnswer)
                }}>
                  {question.userAnswer !== undefined ? question.options[question.userAnswer] : 'Chưa trả lời'}
                </span>
              </div>
              <div style={styles.answerRow}>
                <span style={styles.answerLabel}>Đáp án đúng:</span>
                <span style={styles.correctAnswer}>
                  {question.options[question.correctAnswer]}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.resultActions}>
        <button onClick={onRetry} style={styles.retryButton}>
          Làm lại
        </button>
        <button onClick={onBackToTopics} style={styles.backButton}>
          Về chọn chủ đề
        </button>
      </div>
    </div>
  );
};

const TaskItem = ({ item, isChecked, onCheck, skill }) => {
    const checkboxId = `task-${item.replace(/\s+/g, '-').slice(0, 20)}`;
    const isVocabularyTask = skill?.includes('Từ vựng');
    
    return (
        <div style={styles.taskItem}>
            <input
                type="checkbox"
                id={checkboxId}
                name={checkboxId}
                checked={isChecked}
                onChange={onCheck}
                style={styles.checkbox}
                aria-label={`Mark task as complete: ${item}`}
            />
            <label htmlFor={checkboxId} style={{ ...styles.taskText, ...(isChecked ? styles.checkedTask : {}) }}>
                {item}
            </label>

        </div>
    );
};

const DayCard = ({ day, weekLabel, checkedItems, onCheck }) => (
  <div style={styles.dayCard}>
    <h4 style={styles.dayLabel}>{day.day_label}</h4>
    {day.tasks.map((task, taskIndex) => (
      <div key={taskIndex} style={{ marginBottom: '1rem' }}>
        <p style={styles.taskSkill}>{task.skill}</p>
        {task.items.map((item, itemIndex) => {
          const uniqueId = `${weekLabel}-${day.day_label}-${task.skill}-${itemIndex}`;
          return (
            <TaskItem
              key={uniqueId}
              item={item}
              isChecked={checkedItems[uniqueId] || false}
              onCheck={() => onCheck(uniqueId)}
              skill={task.skill}

            />
          );
        })}
      </div>
    ))}
  </div>
);

const WeekCard = ({ week, checkedItems, onCheck, weekIndex, weekRef }) => {
  // Calculate progress by skill category with equal weight
  const skillCategories = ['Từ vựng 📚', 'Ngữ pháp ✍️', 'Nghe 🎧', 'Nói 🗣️', 'Viết 📝'];
  const categoryProgress = {};
  let totalProgress = 0;
  let categoriesWithTasks = 0;

  // First pass: count categories that have tasks
  skillCategories.forEach(skill => {
    let hasTasks = false;
    week.days.forEach(day => {
      day.tasks.forEach(task => {
        if (task.skill === skill) {
          hasTasks = true;
        }
      });
    });
    if (hasTasks) categoriesWithTasks++;
  });

  // Second pass: calculate progress with equal weight (25% per category)
  skillCategories.forEach(skill => {
    let categoryTasks = 0;
    let categoryCompleted = 0;

    week.days.forEach(day => {
      day.tasks.forEach(task => {
        if (task.skill === skill) {
          task.items.forEach((item, itemIndex) => {
            categoryTasks++;
            const uniqueId = `${week.week_label}-${day.day_label}-${task.skill}-${itemIndex}`;
            if (checkedItems[uniqueId]) {
              categoryCompleted++;
            }
          });
        }
      });
    });

    // Each category has equal weight: 100% / number of categories
    const equalWeight = categoriesWithTasks > 0 ? 100 / categoriesWithTasks : 0;
    
    // Calculate how much this category contributes based on completion
    const categoryContribution = categoryTasks > 0 ? (categoryCompleted / categoryTasks) * equalWeight : 0;
    
    categoryProgress[skill] = categoryContribution;
    totalProgress += categoryContribution;
  });

  const overallProgress = totalProgress;

  const isFirstWeekOfMonth = weekIndex === 0 || weekIndex === 4 || weekIndex === 8;
  
  return (
    <div ref={weekRef} style={{
      ...styles.weekCard,
      ...(isFirstWeekOfMonth && styles.firstWeekOfMonth)
    }}>
      <div style={styles.weekHeader}>
        <div style={styles.weekTitleSection}>
          <h3 style={styles.weekTitle}>{week.week_label}</h3>
          <div style={styles.weekTitleUnderline}></div>
        </div>
                  <div style={styles.weekProgressSection}>
            <div style={styles.progressText}>
              Tiến độ tuần: {Math.round(overallProgress)}% (Tổng % các mục)
            </div>
          <div style={styles.progressBarOuter}>
            <div 
              style={{ 
                ...styles.progressBarInner, 
                width: `${overallProgress}%`,
                background: 'linear-gradient(90deg, #3b82f6, #ec4899)'
              }}
            ></div>
          </div>
          <div style={styles.skillProgressBox}>
            {skillCategories.map((skill, index) => {
              const progress = categoryProgress[skill];
              const hasTasks = week.days.some(day => 
                day.tasks.some(task => task.skill === skill)
              );
              
              if (!hasTasks) return null;
              
              return (
                <span key={skill} style={styles.skillProgressItem}>
                  {skill}: {Math.round(progress)}%
                  {index < skillCategories.length - 1 && <span style={styles.skillSeparator}> | </span>}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div style={styles.daysGrid}>
        {week.days.slice(0, 4).map((day, index) => (
          <DayCard key={index} day={day} weekLabel={week.week_label} checkedItems={checkedItems} onCheck={onCheck} />
        ))}
      </div>
      
      {/* Weekend days */}
      <div style={styles.weekendGrid}>
        {week.days.slice(4, 7).map((day, index) => (
          <DayCard key={index + 4} day={day} weekLabel={week.week_label} checkedItems={checkedItems} onCheck={onCheck} />
        ))}
      </div>
    </div>
  );
};

const Tab = ({ label, isActive, onClick }) => (
  <button onClick={onClick} style={{ ...styles.tab, ...(isActive ? styles.activeTab : {}) }} aria-selected={isActive}>
    {label}
    {isActive && <div style={styles.tabIndicator}></div>}
  </button>
);

const WeekTab = ({ weekNumber, weekTitle, isActive, onClick, progress }) => (
  <button 
    onClick={onClick} 
    style={{ 
      ...styles.weekTab, 
      ...(isActive ? styles.activeWeekTab : {}) 
    }} 
    aria-selected={isActive}
    title={weekTitle}
  >
    <span style={styles.weekNumber}>{weekNumber}</span>
    <span style={styles.weekProgress}>{progress}%</span>
  </button>
);

const App = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [checkedItems, setCheckedItems] = useState({});
  const [currentWeek, setCurrentWeek] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const weekRefs = useRef({});
  
  // Quiz state
  const [quizMode, setQuizMode] = useState('main');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [quizSettings, setQuizSettings] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);

  useEffect(() => {
    // Check if data is loaded
    const checkDataLoaded = () => {
      if (window.plan1_4 && window.plan5_8 && window.plan9_12) {
        setDataLoaded(true);
      } else {
        setTimeout(checkDataLoaded, 100);
      }
    };
    
    checkDataLoaded();
    
    try {
      const savedProgress = localStorage.getItem('learningProgress');
      if (savedProgress) {
        setCheckedItems(JSON.parse(savedProgress));
      }
    } catch (error) {
      console.error("Could not load progress from localStorage", error);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for header
      
      // Find which week is currently in view
      Object.keys(weekRefs.current).forEach((weekIndex) => {
        const weekRef = weekRefs.current[weekIndex];
        if (weekRef) {
          const rect = weekRef.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;
          
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setCurrentWeek(parseInt(weekIndex));
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCheck = (id) => {
    const newCheckedItems = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(newCheckedItems);
    try {
      localStorage.setItem('learningProgress', JSON.stringify(newCheckedItems));
    } catch (error) {
      console.error("Could not save progress to localStorage", error);
    }
  };

  // Quiz functions
  const generateQuizQuestions = (settings) => {
    const topicWords = vocabularyData[settings.topic];
    const shuffledWords = [...topicWords].sort(() => Math.random() - 0.5);
    const selectedWords = shuffledWords.slice(0, settings.questionCount);
    
    return selectedWords.map((wordData, index) => {
      const isEnglishToVietnamese = settings.questionType === 'en-to-vi' || 
        (settings.questionType === 'mixed' && Math.random() > 0.5);
      
      const question = isEnglishToVietnamese ? wordData.word : wordData.meaning;
      const correctAnswer = isEnglishToVietnamese ? wordData.meaning : wordData.word;
      
      // Generate wrong options
      const allMeanings = topicWords.map(w => isEnglishToVietnamese ? w.meaning : w.word);
      const wrongOptions = allMeanings
        .filter(m => m !== correctAnswer)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      
      const options = [...wrongOptions, correctAnswer].sort(() => Math.random() - 0.5);
      const correctAnswerIndex = options.indexOf(correctAnswer);
      
      return {
        id: index,
        word: question,
        meaning: correctAnswer,
        options,
        correctAnswer: correctAnswerIndex,
      };
    });
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setQuizMode('setup');
  };

  const handleStartQuiz = (settings) => {
    setQuizSettings(settings);
    const questions = generateQuizQuestions(settings);
    setQuizQuestions(questions);
    setCurrentQuestion(0);
    setUserAnswers({});
    setQuizMode('quiz');
  };

  const handleAnswer = (questionId, answerIndex) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinish = () => {
    const correctAnswers = quizQuestions.filter(q => 
      userAnswers[q.id] === q.correctAnswer
    ).length;
    
    const result = {
      totalQuestions: quizQuestions.length,
      correctAnswers,
      score: Math.round((correctAnswers / quizQuestions.length) * 100),
      questions: quizQuestions.map(q => ({
        ...q,
        userAnswer: userAnswers[q.id],
        isCorrect: userAnswers[q.id] === q.correctAnswer
      }))
    };
    
    setQuizResult(result);
    setQuizMode('results');
  };

  const handleRetry = () => {
    if (quizSettings) {
      handleStartQuiz(quizSettings);
    }
  };

  const handleBackToTopics = () => {
    setQuizMode('topic-selection');
    setSelectedTopic('');
    setQuizSettings(null);
    setQuizQuestions([]);
    setCurrentQuestion(0);
    setUserAnswers({});
    setQuizResult(null);
  };

  const handleBackToMain = () => {
    setQuizMode('main');
    setSelectedTopic('');
    setQuizSettings(null);
    setQuizQuestions([]);
    setCurrentQuestion(0);
    setUserAnswers({});
    setQuizResult(null);
  };

  const scrollToWeek = (weekIndex) => {
    const weekRef = weekRefs.current[weekIndex];
    if (weekRef) {
      const headerHeight = 180; // Height of fixed header
      const elementTop = weekRef.offsetTop - headerHeight;
      window.scrollTo({
        top: elementTop,
        behavior: 'smooth'
      });
    }
  };

  // Calculate progress functions
  const calculateMonthlyProgress = (sectionIndex) => {
    const section = learningPlan[sectionIndex];
    const skillCategories = ['Từ vựng 📚', 'Ngữ pháp ✍️', 'Nghe 🎧', 'Nói 🗣️', 'Viết 📝'];
    let totalProgress = 0;
    let activeSkills = 0;

    skillCategories.forEach(skill => {
      let totalTasks = 0;
      let completedTasks = 0;

      section.weeks.forEach(week => {
        week.days.forEach(day => {
          day.tasks.forEach(task => {
            if (task.skill === skill) {
              task.items.forEach((item, itemIndex) => {
                totalTasks++;
                const uniqueId = `${week.week_label}-${day.day_label}-${task.skill}-${itemIndex}`;
                if (checkedItems[uniqueId]) {
                  completedTasks++;
                }
              });
            }
          });
        });
      });

      if (totalTasks > 0) {
        const skillProgress = (completedTasks / totalTasks) * 100;
        totalProgress += skillProgress;
        activeSkills++;
      }
    });

    return activeSkills > 0 ? totalProgress / activeSkills : 0;
  };

  const calculateOverallProgress = () => {
    const skillCategories = ['Từ vựng 📚', 'Ngữ pháp ✍️', 'Nghe 🎧', 'Nói 🗣️', 'Viết 📝'];
    let totalProgress = 0;
    let activeSkills = 0;

    skillCategories.forEach(skill => {
      let totalTasks = 0;
      let completedTasks = 0;

      learningPlan.forEach(section => {
        section.weeks.forEach(week => {
          week.days.forEach(day => {
            day.tasks.forEach(task => {
              if (task.skill === skill) {
                task.items.forEach((item, itemIndex) => {
                  totalTasks++;
                  const uniqueId = `${week.week_label}-${day.day_label}-${task.skill}-${itemIndex}`;
                  if (checkedItems[uniqueId]) {
                    completedTasks++;
                  }
                });
              }
            });
          });
        });
      });

      if (totalTasks > 0) {
        const skillProgress = (completedTasks / totalTasks) * 100;
        totalProgress += skillProgress;
        activeSkills++;
      }
    });

    return activeSkills > 0 ? totalProgress / activeSkills : 0;
  };

  const calculateSkillProgress = () => {
    const skillCategories = ['Từ vựng 📚', 'Ngữ pháp ✍️', 'Nghe 🎧', 'Nói 🗣️', 'Viết 📝'];
    const skillProgress = {};

    skillCategories.forEach(skill => {
      let totalTasks = 0;
      let completedTasks = 0;

      learningPlan.forEach(section => {
        section.weeks.forEach(week => {
          week.days.forEach(day => {
            day.tasks.forEach(task => {
              if (task.skill === skill) {
                task.items.forEach((item, itemIndex) => {
                  totalTasks++;
                  const uniqueId = `${week.week_label}-${day.day_label}-${task.skill}-${itemIndex}`;
                  if (checkedItems[uniqueId]) {
                    completedTasks++;
                  }
                });
              }
            });
          });
        });
      });

      skillProgress[skill] = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    });

    return skillProgress;
  };

  const calculateCompletedTasks = (sectionIndex) => {
    let completedTasks = 0;
    const section = learningPlan[sectionIndex];
    
    section.weeks.forEach(week => {
      week.days.forEach(day => {
        day.tasks.forEach(task => {
          task.items.forEach((item, itemIndex) => {
            const uniqueId = `${week.week_label}-${day.day_label}-${task.skill}-${itemIndex}`;
            if (checkedItems[uniqueId]) {
              completedTasks++;
            }
          });
        });
      });
    });

    return completedTasks;
  };

  const calculateTotalTasks = (sectionIndex) => {
    let totalTasks = 0;
    const section = learningPlan[sectionIndex];
    
    section.weeks.forEach(week => {
      week.days.forEach(day => {
        day.tasks.forEach(task => {
          task.items.forEach((item, itemIndex) => {
            totalTasks++;
          });
        });
      });
    });

    return totalTasks;
  };

  const calculateWeekProgress = (sectionIndex, weekIndex) => {
    const section = learningPlan[sectionIndex];
    if (!section || !section.weeks[weekIndex]) return 0;

    const skillCategories = ['Từ vựng 📚', 'Ngữ pháp ✍️', 'Nghe 🎧', 'Nói 🗣️', 'Viết 📝'];
    let totalProgress = 0;

    skillCategories.forEach(skill => {
      let totalTasks = 0;
      let completedTasks = 0;

      section.weeks[weekIndex].days.forEach(day => {
        day.tasks.forEach(task => {
          if (task.skill === skill) {
            task.items.forEach((item, itemIndex) => {
              totalTasks++;
              const uniqueId = `${section.weeks[weekIndex].week_label}-${day.day_label}-${task.skill}-${itemIndex}`;
              if (checkedItems[uniqueId]) {
                completedTasks++;
              }
            });
          }
        });
      });

      if (totalTasks > 0) {
        const skillProgress = (completedTasks / totalTasks) * 100;
        totalProgress += skillProgress;
      }
    });

    return totalProgress;
  };

  if (!dataLoaded) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: '#3b82f6',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div>Đang tải dữ liệu...</div>
        <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
          Nếu trang không load, hãy refresh lại trang
        </div>
      </div>
    );
  }

  const currentPlanSection = learningPlan[activeTab];
  const monthlyProgress = calculateMonthlyProgress(activeTab);
  const overallProgress = calculateOverallProgress();
  const skillProgress = calculateSkillProgress();

  // Render quiz components
  if (quizMode === 'topic-selection') {
    return (
      <div style={styles.appContainer}>
        <TopicSelection onTopicSelect={handleTopicSelect} />
        <button onClick={handleBackToMain} style={styles.backButton}>
          ← Về trang chính
        </button>
      </div>
    );
  }

  if (quizMode === 'setup') {
    return (
      <div style={styles.appContainer}>
        <QuizSetup topic={selectedTopic} onStartQuiz={handleStartQuiz} />
        <button onClick={handleBackToTopics} style={styles.backButton}>
          ← Về chọn chủ đề
        </button>
      </div>
    );
  }

  if (quizMode === 'quiz') {
    return (
      <div style={styles.appContainer}>
        <QuizInterface
          questions={quizQuestions}
          currentQuestion={currentQuestion}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onFinish={handleFinish}
          userAnswers={userAnswers}
        />
      </div>
    );
  }

  if (quizMode === 'results') {
    return (
      <div style={styles.appContainer}>
        <QuizResults
          result={quizResult}
          onRetry={handleRetry}
          onBackToTopics={handleBackToTopics}
        />
      </div>
    );
  }

  return (
    <>
      <div style={styles.fixedHeader}>
        {/* Row 1: Overall Progress + Week Tabs */}
        <div style={styles.headerRow1}>
          <div style={styles.headerLeft}>
            <div style={styles.overallProgressSmall}>
              <span style={styles.overallProgressLabelSmall}>Tổng tiến độ khóa học: {Math.round(overallProgress)}%</span>
              <div style={styles.overallProgressBarSmall}>
                <div style={{ ...styles.overallProgressFillSmall, width: `${overallProgress}%` }}></div>
              </div>
            </div>
          </div>
          
          <div style={styles.weekTabsContainer}>
            {[...Array(12)].map((_, i) => {
              // Xác định week thuộc tháng nào
              let monthIndex = 0;
              let weekIdxInMonth = i;
              if (i >= 4 && i < 8) {
                monthIndex = 1;
                weekIdxInMonth = i - 4;
              } else if (i >= 8) {
                monthIndex = 2;
                weekIdxInMonth = i - 8;
              }
              
              const weekData = learningPlan[monthIndex]?.weeks[weekIdxInMonth];
              const isActive = (currentWeek === i);
              
              return (
                <button
                  key={i}
                  style={{
                    ...styles.weekTab,
                    ...(isActive ? styles.activeWeekTab : {}),
                  }}
                  aria-selected={isActive}
                  title={weekData?.week_label || `Tuần ${i+1}`}
                  onClick={() => {
                    setCurrentWeek(i);
                    setActiveTab(monthIndex);
                    scrollToWeek(weekIdxInMonth);
                  }}
                >
                  <span style={styles.weekNumber}>{i+1}</span>
                  <span style={styles.weekProgress}>{Math.round(calculateWeekProgress(monthIndex, weekIdxInMonth))}%</span>
                </button>
              );
            })}
          </div>

          <div style={styles.headerRight}>
            <a
              href="https://dzung1097.github.io/vocab-quiz-app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...styles.quizButton, textDecoration: 'none', display: 'inline-block' }}
            >
              🔊 Vocal Quiz
            </a>
          </div>
        </div>



        {/* Row 2: Monthly Progress + Skill Breakdown */}
        <div style={styles.headerRow2}>
          <div style={styles.mainProgressSection}>
            <span style={styles.mainProgressLabel}>Tiến độ tháng hiện tại: {Math.round(monthlyProgress)}% ({calculateCompletedTasks(activeTab)}/{calculateTotalTasks(activeTab)} nhiệm vụ)</span>
            <div style={styles.mainProgressBar}>
              <div style={{ ...styles.mainProgressFill, width: `${monthlyProgress}%` }}></div>
            </div>
          </div>
          
          <div style={styles.skillProgressDisplay}>
            <span style={styles.skillProgressText}>
              📚 Từ vựng: {Math.round(skillProgress['Từ vựng 📚'])}% | 
              ✍️ Ngữ pháp: {Math.round(skillProgress['Ngữ pháp ✍️'])}% | 
              🗣️ Nói: {Math.round(skillProgress['Nói 🗣️'])}% | 
              📝 Viết: {Math.round(skillProgress['Viết 📝'])}% | 
              🎧 Nghe: {Math.round(skillProgress['Nghe 🎧'])}%
            </span>
          </div>
        </div>
      </div>

      <div style={styles.appContainer}>
        <main style={styles.contentContainer}>
          {currentPlanSection.goal && <p style={styles.monthGoal}>{currentPlanSection.goal}</p>}
          {currentPlanSection.weeks.map((week, index) => (
            <WeekCard 
              key={week.week_label + index} 
              week={week} 
              checkedItems={checkedItems} 
              onCheck={handleCheck}
              weekIndex={index}
              weekRef={(el) => { weekRefs.current[index] = el; }}
            />
          ))}
        </main>
      </div>
    </>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
); 