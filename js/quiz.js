// 全局变量
let currentQuestions = []; // 当前测试的10道题
let currentQuestionIndex = 0; // 当前题目索引
let score = 0; // 总分
let answers = []; // 用户答案记录
let answeredQuestions = new Set(); // 已回答的题目索引集合
let quizStarted = false; // 测试是否已开始

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 注册 Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker 注册成功:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker 注册失败:', error);
            });
    }
    
    showWelcomeScreen();
    
    // 添加事件监听器
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const restartBtn = document.getElementById('restart-btn');
    const startBtn = document.getElementById('start-quiz-btn');
    
    if (nextBtn) nextBtn.addEventListener('click', showNextQuestion);
    if (prevBtn) prevBtn.addEventListener('click', showPreviousQuestion);
    if (restartBtn) restartBtn.addEventListener('click', restartQuiz);
    if (startBtn) startBtn.addEventListener('click', startQuiz);
});

// 显示欢迎屏幕
function showWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const quizContent = document.getElementById('quiz-content');
    
    if (welcomeScreen && quizContent) {
        welcomeScreen.classList.remove('hidden');
        quizContent.classList.add('hidden');
    }
    
    // 更新题目数量显示
    const totalQuestionsElement = document.getElementById('total-questions');
    if (totalQuestionsElement) {
        totalQuestionsElement.textContent = 10;
    }
}

// 开始测试
function startQuiz() {
    quizStarted = true;
    
    const welcomeScreen = document.getElementById('welcome-screen');
    const quizContent = document.getElementById('quiz-content');
    const quizContainer = document.getElementById('quiz-container');
    
    if (!welcomeScreen || !quizContent) {
        console.error('找不到必要的DOM元素');
        return;
    }
    
    // 隐藏欢迎屏幕，显示测试内容
    welcomeScreen.classList.add('hidden');
    quizContent.classList.remove('hidden');
    
    // 初始化测试
    initializeQuiz();
    
    // 添加开始动画
    if (quizContainer) {
        quizContainer.classList.add('fade-in');
    }
}

// 初始化测试
function initializeQuiz() {
    // 从题库中随机选择10道题
    currentQuestions = getRandomQuestions(questionsData, 10);
    currentQuestionIndex = 0;
    score = 0;
    answers = Array(currentQuestions.length).fill(null);
    answeredQuestions = new Set();
    
    // 更新进度条和得分
    updateProgress();
    updateScore();
    
    // 显示第一道题
    showQuestion(currentQuestions[0]);
    
    // 重置UI状态
    document.getElementById('question-container').classList.remove('hidden');
    document.getElementById('feedback-container').classList.add('hidden');
    document.getElementById('results-container').classList.add('hidden');
    document.querySelector('.action-buttons').classList.remove('hidden');
    
    // 初始化按钮状态
    updateButtonStates();
}

// 从题库中随机选择指定数量的题目
function getRandomQuestions(questions, count) {
    let shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// 显示当前题目
function showQuestion(question) {
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    
    // 设置题目文本
    questionText.textContent = `${currentQuestionIndex + 1}. ${question.question}`;
    
    // 清空并重新生成选项
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.dataset.index = index;
        
        const marker = document.createElement('span');
        marker.className = 'option-marker';
        marker.textContent = String.fromCharCode(65 + index); // A, B, C, D...
        
        const text = document.createElement('span');
        text.className = 'option-text';
        text.textContent = option;
        
        optionDiv.appendChild(marker);
        optionDiv.appendChild(text);
        optionsContainer.appendChild(optionDiv);
        
        // 添加点击事件
        optionDiv.addEventListener('click', selectOption);
    });
    
    // 如果这道题已经回答过，恢复之前的选择和状态
    if (answeredQuestions.has(currentQuestionIndex) && answers[currentQuestionIndex]) {
        const answer = answers[currentQuestionIndex];
        const options = document.querySelectorAll('.option');
        
        options.forEach(option => {
            const optionIndex = parseInt(option.dataset.index);
            
            if (optionIndex === answer.selectedIndex) {
                option.classList.add('selected');
            }
            
            if (answer.isSubmitted) {
                option.removeEventListener('click', selectOption);
                if (optionIndex === currentQuestions[currentQuestionIndex].correctIndex) {
                    option.classList.add('correct');
                } else if (optionIndex === answer.selectedIndex && !answer.isCorrect) {
                    option.classList.add('incorrect');
                }
            }
        });
        
        // 显示反馈
        if (answer.isSubmitted) {
            showFeedback(answer.isCorrect, currentQuestions[currentQuestionIndex].explanation);
        } else {
            document.getElementById('feedback-container').classList.add('hidden');
        }
    } else {
        // 新题目，隐藏反馈
        document.getElementById('feedback-container').classList.add('hidden');
    }
    
    // 更新按钮状态
    updateButtonStates();
    
    // 添加动画效果
    document.getElementById('question-container').classList.add('slide-in');
    setTimeout(() => {
        document.getElementById('question-container').classList.remove('slide-in');
    }, 500);
}

// 选择选项
function selectOption(event) {
    // 如果这道题已经提交过答案，不允许再选择
    if (answeredQuestions.has(currentQuestionIndex) && 
        answers[currentQuestionIndex] && 
        answers[currentQuestionIndex].isSubmitted) {
        return;
    }
    
    // 移除其他选项的选中状态
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    
    // 添加当前选项的选中状态
    const selectedOption = event.currentTarget;
    selectedOption.classList.add('selected');
    
    // 获取选择的选项索引
    const selectedIndex = parseInt(selectedOption.dataset.index);
    const currentQuestion = currentQuestions[currentQuestionIndex];
    const isCorrect = selectedIndex === currentQuestion.correctIndex;
    
    // 记录答案
    const answer = {
        questionIndex: currentQuestionIndex,
        question: currentQuestion.question,
        selectedIndex: selectedIndex,
        selectedAnswer: currentQuestion.options[selectedIndex],
        correctIndex: currentQuestion.correctIndex,
        correctAnswer: currentQuestion.options[currentQuestion.correctIndex],
        isCorrect: isCorrect,
        explanation: currentQuestion.explanation,
        isSubmitted: true
    };
    
    // 更新答案
    answers[currentQuestionIndex] = answer;
    
    // 如果这是新回答的题目
    if (!answeredQuestions.has(currentQuestionIndex)) {
        answeredQuestions.add(currentQuestionIndex);
        
        // 更新得分
        if (isCorrect) {
            score += 10;
            updateScore();
        }
    }
    
    // 显示正确答案和反馈
    options.forEach(option => {
        // 移除点击事件，防止重复选择
        option.removeEventListener('click', selectOption);
        
        const optionIndex = parseInt(option.dataset.index);
        if (optionIndex === currentQuestion.correctIndex) {
            option.classList.add('correct');
        } else if (optionIndex === selectedIndex && !isCorrect) {
            option.classList.add('incorrect');
        }
        
        // 添加禁用样式
        option.style.pointerEvents = 'none';
    });
    
    // 显示反馈
    showFeedback(isCorrect, currentQuestion.explanation);
    
    // 直接启用下一题按钮，不依赖updateButtonStates
    document.getElementById('next-btn').disabled = false;
    
    // 添加动画效果
    selectedOption.classList.add('pulse-animation');
    setTimeout(() => {
        selectedOption.classList.remove('pulse-animation');
    }, 500);
    
    // 改进的滚动逻辑 - 确保反馈区域可见
    setTimeout(() => {
        const feedbackContainer = document.getElementById('feedback-container');
        feedbackContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300);
}

// 显示下一题
function showNextQuestion() {
    if (currentQuestionIndex < currentQuestions.length - 1) {
        // 切换到下一题
        currentQuestionIndex++;
        showQuestion(currentQuestions[currentQuestionIndex]);
        updateProgress();
        
        // 滚动到页面顶部，但考虑导航栏高度
        const headerHeight = document.querySelector('header').offsetHeight;
        window.scrollTo({
            top: headerHeight,
            behavior: 'smooth'
        });
    } else if (answeredQuestions.size === currentQuestions.length) {
        // 所有题目都已回答，显示结果
        showResults();
        
        // 滚动到结果顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// 显示上一题
function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestions[currentQuestionIndex]);
        updateProgress();
        
        // 滚动到页面顶部，但考虑导航栏高度
        const headerHeight = document.querySelector('header').offsetHeight;
        window.scrollTo({
            top: headerHeight,
            behavior: 'smooth'
        });
    }
}

// 更新进度
function updateProgress() {
    const currentQuestion = document.getElementById('current-question');
    const progressFill = document.getElementById('progress-fill');
    
    currentQuestion.textContent = currentQuestionIndex + 1;
    const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
    progressFill.style.width = `${progress}%`;
    
    // 添加动画效果
    progressFill.classList.add('progress-animation');
    setTimeout(() => {
        progressFill.classList.remove('progress-animation');
    }, 500);
}

// 更新得分显示
function updateScore() {
    const currentScore = document.getElementById('current-score');
    currentScore.textContent = score;
    
    // 添加分数变化动画
    currentScore.classList.add('score-change');
    setTimeout(() => {
        currentScore.classList.remove('score-change');
    }, 500);
}

// 更新按钮状态
function updateButtonStates() {
    // 上一题按钮
    document.getElementById('prev-btn').disabled = currentQuestionIndex === 0;
    
    // 下一题按钮
    const nextBtn = document.getElementById('next-btn');
    if (answeredQuestions.has(currentQuestionIndex) && 
        answers[currentQuestionIndex] && 
        answers[currentQuestionIndex].isSubmitted) {
        nextBtn.disabled = false;
    } else {
        nextBtn.disabled = true;
    }
}

// 显示测试结果
function showResults() {
    const resultsContainer = document.getElementById('results-container');
    const finalScore = document.getElementById('final-score');
    const scoreText = document.getElementById('score-text');
    const resultsSummary = document.getElementById('results-summary');
    const resultsDetails = document.getElementById('results-details');
    
    // 隐藏题目和反馈容器
    document.getElementById('question-container').classList.add('hidden');
    document.getElementById('feedback-container').classList.add('hidden');
    document.querySelector('.action-buttons').classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    
    // 显示分数
    finalScore.textContent = score;
    
    // 根据分数显示评价
    if (score >= 90) {
        scoreText.textContent = "优秀！你是网络安全专家！";
        scoreText.className = "score-evaluation score-excellent";
    } else if (score >= 70) {
        scoreText.textContent = "良好！你有扎实的网络安全知识。";
        scoreText.className = "score-evaluation score-good";
    } else if (score >= 60) {
        scoreText.textContent = "及格！你掌握了基本的网络安全知识。";
        scoreText.className = "score-evaluation score-pass";
    } else {
        scoreText.textContent = "需要加强学习网络安全知识。";
        scoreText.className = "score-evaluation score-fail";
    }
    
    // 显示总结
    const correctCount = answers.filter(answer => answer && answer.isCorrect).length;
    resultsSummary.textContent = `你答对了${correctCount}道题，答错了${currentQuestions.length - correctCount}道题。`;
    
    // 显示详细答题情况
    resultsDetails.innerHTML = '';
    
    answers.forEach((answer, index) => {
        if (!answer) return; // 跳过未回答的题目
        
        const resultItem = document.createElement('div');
        resultItem.className = `result-item ${answer.isCorrect ? 'correct' : 'incorrect'}`;
        
        const resultHeader = document.createElement('div');
        resultHeader.className = 'result-header';
        
        const resultNumber = document.createElement('span');
        resultNumber.className = 'result-number';
        resultNumber.textContent = index + 1;
        
        const resultIcon = document.createElement('span');
        resultIcon.className = 'result-icon';
        resultIcon.innerHTML = `<i class="fas fa-${answer.isCorrect ? 'check' : 'times'}"></i>`;
        
        const resultQuestion = document.createElement('h4');
        resultQuestion.className = 'result-question';
        resultQuestion.textContent = answer.question;
        
        resultHeader.appendChild(resultNumber);
        resultHeader.appendChild(resultIcon);
        resultHeader.appendChild(resultQuestion);
        
        const resultDetails = document.createElement('div');
        resultDetails.className = 'result-details';
        
        const yourAnswer = document.createElement('p');
        yourAnswer.innerHTML = `<strong>你的答案:</strong> ${answer.selectedAnswer}`;
        
        const correctAnswer = document.createElement('p');
        correctAnswer.innerHTML = `<strong>正确答案:</strong> ${answer.correctAnswer}`;
        
        const explanation = document.createElement('p');
        explanation.className = 'explanation';
        explanation.innerHTML = `<strong>解析:</strong> ${answer.explanation}`;
        
        resultDetails.appendChild(yourAnswer);
        resultDetails.appendChild(correctAnswer);
        resultDetails.appendChild(explanation);
        
        resultItem.appendChild(resultHeader);
        resultItem.appendChild(resultDetails);
        
        resultsDetails.appendChild(resultItem);
    });
    
    // 添加动画效果
    resultsContainer.classList.add('fade-in');
    
    // 添加到结果操作区域
    const resultsActions = document.querySelector('.results-actions');
    if (!document.querySelector('.share-btn')) {
        resultsActions.appendChild(shareBtn);
    }
}


// 重新开始测试
function restartQuiz() {
    // 滚动到页面顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // 延迟初始化，以便滚动完成
    setTimeout(() => {
        initializeQuiz();
    }, 300);
}

// 显示反馈
function showFeedback(isCorrect, explanation) {
    const feedbackContainer = document.getElementById('feedback-container');
    const feedbackIcon = document.getElementById('feedback-icon');
    const feedbackText = document.getElementById('feedback-text');
    const explanationElement = document.getElementById('explanation');
    
    feedbackContainer.classList.remove('hidden', 'correct', 'incorrect');
    feedbackContainer.classList.add(isCorrect ? 'correct' : 'incorrect');
    
    feedbackIcon.innerHTML = isCorrect ? 
        '<i class="fas fa-check-circle"></i>' : 
        '<i class="fas fa-times-circle"></i>';
    
    feedbackText.textContent = isCorrect ? '回答正确！' : '回答错误';
    explanationElement.textContent = explanation;
    
    // 添加动画效果
    feedbackContainer.classList.add('feedback-animation');
    setTimeout(() => {
        feedbackContainer.classList.remove('feedback-animation');
    }, 500);
}

// 添加错误处理和重试机制
window.addEventListener('error', function(e) {
    console.error('资源加载失败:', e.target.src || e.target.href);
    // 可以在这里添加重试逻辑
}); 