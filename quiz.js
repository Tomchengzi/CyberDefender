// 修改显示测试结果函数，优化移动端显示
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
        scoreText.textContent = "继续加油，提升网络安全意识！";
        scoreText.className = "score-evaluation score-encourage";
    }
    
    // 显示总结
    const correctCount = answers.filter(answer => answer && answer.isCorrect).length;
    resultsSummary.textContent = `你答对了${correctCount}道题，答错了${currentQuestions.length - correctCount}道题。`;
    
    // 显示抽奖机会
    let prizeChances = 1; // 参与即可获得1次
    if (score >= 80) prizeChances = 2;
    if (score >= 100) prizeChances = 3;
    
    const prizeInfo = document.createElement('div');
    prizeInfo.className = 'prize-info';
    prizeInfo.innerHTML = `
        <div class="prize-info-icon"><i class="fas fa-gift"></i></div>
        <div class="prize-info-text">
            <h3>恭喜获得 ${prizeChances} 次抽奖机会！</h3>
            <p>请向工作人员出示此页面领取奖品</p>
        </div>
    `;
    
    // 如果还没有添加过抽奖信息，则添加
    if (!document.querySelector('.prize-info')) {
        resultsContainer.insertBefore(prizeInfo, resultsDetails);
    }
    
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
    
    // 添加移动端优化的样式
    if (window.innerWidth <= 768) {
        resultsContainer.classList.add('mobile-results');
    }
} 