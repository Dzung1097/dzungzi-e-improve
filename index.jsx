// Sử dụng React từ global scope (đã load qua CDN)
const { useState, useEffect, useRef, StrictMode } = React;
const { createRoot } = ReactDOM;

// Data structure types
const learningPlan = [
  {
    title: "Tuần 1-4: Nền tảng & Giao tiếp thực chiến",
    goal: "",
    weeks: window.plan1_4.weeks
  },
  {
    title: "Tuần 5-8: Kỹ năng nâng cao & Ứng dụng",
    goal: "Nắm vững kỹ thuật nâng cao, giao tiếp phức tạp. Áp dụng kiến thức vào các case study thực tế và chuẩn bị cho môi trường làm việc chuyên nghiệp.",
    weeks: window.plan5_8.weeks
  },
  {
    title: "Tuần 9-12: Săn việc & Luyện phỏng vấn",
    goal: "Hoàn thiện hồ sơ, luyện tập phỏng vấn chuyên sâu, và sẵn sàng chinh phục nhà tuyển dụng cho vị trí IT BA.",
    weeks: window.plan9_12.weeks
  }
];



const styles = {
  appContainer: {
    width: '100%',
    maxWidth: '100%',
    margin: '0 auto',
    padding: '1rem',
    paddingTop: '120px', // Add space for fixed header
  },
  fixedHeader: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    zIndex: 1000,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    padding: '1rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  quizButton: {
    backgroundColor: 'var(--secondary-color)',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
    ':hover': {
      backgroundColor: '#1d4ed8',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
    },
  },
  tabsContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1rem',
    borderBottom: '2px solid var(--light-gray)',
    flexWrap: 'wrap',
  },
  tab: {
    padding: '1rem 1.5rem',
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    fontSize: '1.1rem',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    color: 'var(--dark-gray)',
    position: 'relative',
    transition: 'color 0.3s ease',
  },
  activeTab: {
    color: 'var(--secondary-color)',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: '-2px',
    left: 0,
    right: 0,
    height: '3px',
    backgroundColor: 'var(--secondary-color)',
    borderRadius: '3px 3px 0 0',
  },
  weekTab: {
    padding: '0.5rem',
    cursor: 'pointer',
    border: 'none',
    background: 'white',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    color: 'var(--dark-gray)',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.25rem',
    minWidth: '50px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  activeWeekTab: {
    backgroundColor: 'var(--secondary-color)',
    color: 'white',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(59, 130, 246, 0.3)',
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
    marginTop: '1rem',
  },
  contentContainer: {
    padding: '1rem 0',
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
    backgroundColor: 'var(--card-background)',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '2rem',
    boxShadow: '0 4px 12px rgba(0, 95, 115, 0.1)',
  },
  weekLabel: {
    fontSize: '1.5rem',
    color: 'var(--primary-color)',
    marginBottom: '1rem',
    borderBottom: '2px solid var(--light-gray)',
    paddingBottom: '0.5rem',
  },
  daysGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  dayCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '1rem 1.5rem',
    borderLeft: '4px solid var(--secondary-color)',
  },
  dayLabel: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: 'var(--heading-color)',
    marginBottom: '1rem',
  },
  taskSkill: {
    fontWeight: 'bold',
    color: 'var(--primary-color)',
    marginBottom: '0.5rem',
  },
  taskItem: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '0.5rem',
    fontSize: '0.95rem',
  },
  checkbox: {
    marginRight: '0.75rem',
    marginTop: '4px',
    accentColor: 'var(--accent-color)',
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
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  progressBarOuter: {
    flex: '1',
    height: '12px',
    backgroundColor: 'var(--light-gray)',
    borderRadius: '6px',
    overflow: 'hidden',
  },
  progressBarInner: {
    height: '100%',
    backgroundColor: 'var(--secondary-color)',
    borderRadius: '6px',
    transition: 'width 0.4s ease-in-out',
  },
  progressText: {
    fontWeight: 'bold',
    color: 'var(--primary-color)',
    fontSize: '0.9rem',
    minWidth: '90px',
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
  let totalTasks = 0;
  let completedTasks = 0;

  week.days.forEach(day => {
    day.tasks.forEach(task => {
      task.items.forEach((item, itemIndex) => {
        totalTasks++;
        const uniqueId = `${week.week_label}-${day.day_label}-${task.skill}-${itemIndex}`;
        if (checkedItems[uniqueId]) {
          completedTasks++;
        }
      });
    });
  });

  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div ref={weekRef} style={styles.weekCard}>
      <h3 style={styles.weekLabel}>{week.week_label}</h3>
      <div style={styles.progressContainer}>
        <div style={styles.progressBarOuter}>
          <div style={{ ...styles.progressBarInner, width: `${progress}%` }}></div>
        </div>
        <div style={styles.progressText}>
          {Math.round(progress)}% Hoàn thành
        </div>
      </div>
      <div style={styles.daysGrid}>
        {week.days.map((day, index) => (
          <DayCard key={index} day={day} weekLabel={week.week_label} checkedItems={checkedItems} onCheck={onCheck} />
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

const WeekTab = ({ weekNumber, isActive, onClick, progress }) => (
  <button 
    onClick={onClick} 
    style={{ 
      ...styles.weekTab, 
      ...(isActive ? styles.activeWeekTab : {}) 
    }} 
    aria-selected={isActive}
  >
    <span style={styles.weekNumber}>{weekNumber}</span>
    <span style={styles.weekProgress}>{progress}%</span>
  </button>
);

const App = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [checkedItems, setCheckedItems] = useState({});
  const [currentWeek, setCurrentWeek] = useState(0);
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
      weekRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setCurrentWeek(weekIndex);
    }
  };

  const currentPlanSection = learningPlan[activeTab];

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
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            {/* Empty space for left side */}
          </div>
          <div style={styles.headerRight}>
            <button 
              style={styles.quizButton}
              onClick={() => setQuizMode('topic-selection')}
            >
              🧠 Kiểm tra từ vựng
            </button>
          </div>
        </div>
        
        <nav style={styles.tabsContainer}>
          {learningPlan.map((plan, index) => (
            <Tab 
              key={plan.title} 
              label={plan.title.split(':')[0]} 
              isActive={activeTab === index} 
              onClick={() => setActiveTab(index)} 
            />
          ))}
        </nav>

        <div style={styles.weekTabsContainer}>
          {currentPlanSection.weeks.map((week, index) => (
            <WeekTab
              key={index}
              weekNumber={index + 1}
              isActive={currentWeek === index}
              onClick={() => scrollToWeek(index)}
              progress={0} // TODO: Calculate actual progress
            />
          ))}
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