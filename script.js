const questions = [
    {
        question: "تعرف بيئات التعلم الشخصية بأنها أنظمة تدعم التعليم والتعلم وتحاكي البيئة الحقيقية وتعمل عبر الإنترنت.",
        answers: [
            { text: "صح", correct: true },
            { text: "خطا", correct: false },
        ]
    },
    {
        question: "أي مما يلي لا يعتبر من منصات العوالم الافتراضية؟",
        answers: [
            { text: "Activeworlds", correct: false },
            { text: "Dreamweaver", correct: true },
            { text: "Second Life", correct: false },
            { text: "OpenSimulator", correct: false },
        ]
    },
    {
        question: "يحتاج الإنترنت إلى تطابق أجهزة الكمبيوتر وأنظمة التشغيل المستخدمة مع الأجهزة المستخدمة في الإرسال.",
        answers: [
            { text: "صح", correct: true },
            { text: "خطا", correct: false },
        ]
    },
    {
        question: "أي مما يلي ليس من مميزات التعليم الإلكتروني؟",
        answers: [
            { text: "تجاوز الفروق العمرية", correct: false },
            { text: "تحديد مكان وزمان للتعلم", correct: true },
            { text: "المرونة في الوقت", correct: false },
            { text: "توفير بيئة تعلم تفاعلية", correct: false },
        ]
    },
    {
        question: "ينظر الواقع الافتراضي على أنه قاعدة بيانات حاسوبية تسمح للمستخدم بالوصول للمعلومات في أشكال مختلفة.",
        answers: [
            { text: "صح", correct: false },
            { text: "خطا", correct: true },
        ]
    },
    {
        question: "أي مما يلي ليس من مراحل تطور التعليم الإلكتروني؟",
        answers: [
            { text: "التعلم المعتمد على المكونات المادية", correct: false },
            { text: "التعلم المعتمد على شبكات التواصل", correct: false },
            { text: "التعلم المعتمد على الوسائط المتعددة", correct: true },
            { text: "التعلم المعتمد على الإنترنت", correct: false },
        ]
    },
    {
        question: "يقدم تطبيق Human body VR 3D خدمة عرض المدن والشوارع بصورة ثلاثية الأبعاد بدقة عالية.",
        answers: [
            { text: "صح", correct: false },
            { text: "خطا", correct: true },
        ]
    },
    {
        question: "أي مما يلي يعتبر من أدوات التواصل في التعليم الإلكتروني؟",
        answers: [
            { text: "المدونات", correct: true },
            { text: "القلم الرصاص", correct: false },
            { text: "السبورة الطباشيرية", correct: false },
            { text: "الكتاب الورقي", correct: false },
        ]
    },
    {
        question: "يتطلب التعليم الإلكتروني عقد اللقاءات والاجتماعات الإلكترونية.",
        answers: [
            { text: "صح", correct: true },
            { text: "خطا", correct: false },
        ]
    },
    {
        question: "أي مما يلي لا يعد من أنواع التعليم الإلكتروني؟",
        answers: [
            { text: "التعليم المدمج", correct: false },
            { text: "التعليم المتزامن", correct: false },
            { text: "التعليم غير المتزامن", correct: false },
            { text: "التعليم التقليدي البحت", correct: true },
        ]
    }
];

const USER_KEY = 'quiz_username';
const EMAIL_KEY = 'quiz_email';
const PASSWORD_KEY = 'quiz_password';
const VIDEO_URL = 'https://www.youtube.com/embed/MoCaRMdq-Qw';
const loginContainer = document.getElementById("login-container");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const usernameInput = document.getElementById("username-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const loginButton = document.getElementById("login-button");
const questionsContainer = document.getElementById("questions-container");
const submitButton = document.getElementById("submit-button");
const totalQuestionsElement = document.getElementById("total-questions");
const totalQuestionsInfo = document.getElementById("total-questions-info");
const currentUserElement = document.getElementById("current-user");
const logoutDuringQuizBtn = document.getElementById("logout-during-quiz");
const answeredCountElement = document.getElementById("answered-count");
const progressFill = document.getElementById("progress-fill");
const currentQuestionElement = document.getElementById("current-question");
const completionMessage = document.getElementById("completion-message");

// عناصر الفيديو
const showVideoBtn = document.getElementById("show-video-btn");
const videoContainer = document.getElementById("video-container");
const videoFrame = document.getElementById("video-frame");
const closeVideoBtn = document.getElementById("close-video-btn");
const showVideoQuizBtn = document.getElementById("show-video-quiz");
const videoModal = document.getElementById("video-modal");
const modalVideoFrame = document.getElementById("modal-video-frame");
const closeModalBtn = document.getElementById("close-modal-btn");

// تهيئة العناصر
function initElements() {
    totalQuestionsElement.textContent = questions.length;
    totalQuestionsInfo.textContent = questions.length;
    
    // تعيين رابط الفيديو
    if (videoFrame) videoFrame.src = VIDEO_URL;
    if (modalVideoFrame) modalVideoFrame.src = VIDEO_URL;
    
    // إضافة مستمعي الأحداث للفيديو
    if (showVideoBtn) {
        showVideoBtn.addEventListener('click', showVideoInPage);
    }
    
    if (closeVideoBtn) {
        closeVideoBtn.addEventListener('click', hideVideoInPage);
    }
    
    if (showVideoQuizBtn) {
        showVideoQuizBtn.addEventListener('click', showVideoModal);
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', hideVideoModal);
    }
    
    // إغلاق النافذة المنبثقة عند النقر خارجها
    if (videoModal) {
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                hideVideoModal();
            }
        });
    }
}

// دالة لعرض الإشعارات
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    
    notificationText.textContent = message;
    
    // إضافة اللون حسب نوع الإشعار
    if (type === 'success') {
        notification.style.backgroundColor = '#28a745';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#dc3545';
    } else if (type === 'warning') {
        notification.style.backgroundColor = '#ffc107';
        notification.style.color = '#212529';
    } else {
        notification.style.backgroundColor = '#007bff';
    }
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// عرض الفيديو في صفحة التسجيل
function showVideoInPage() {
    if (videoContainer && videoFrame) {
        videoContainer.style.display = 'block';
        videoFrame.src = VIDEO_URL;
        
        // تمرير إلى قسم الفيديو
        videoContainer.scrollIntoView({ behavior: 'smooth' });
        
        // showNotification('جارٍ تشغيل الفيديو التعريفي', 'info');
    }
}

// إخفاء الفيديو في صفحة التسجيل
function hideVideoInPage() {
    if (videoContainer) {
        videoContainer.style.display = 'none';
    }
}

// عرض نافذة الفيديو المنبثقة
function showVideoModal() {
    if (videoModal && modalVideoFrame) {
        videoModal.style.display = 'flex';
        modalVideoFrame.src = VIDEO_URL;
        
        // إيقاف أي فيديو آخر يعمل
        if (videoFrame) {
            videoFrame.src = videoFrame.src; // إعادة تحميل لإيقافه
        }
        
        showNotification('فتح الفيديو في نافذة منبثقة', 'info');
    }
}

// إخفاء نافذة الفيديو المنبثقة
function hideVideoModal() {
    if (videoModal) {
        videoModal.style.display = 'none';
        
        // إيقاف الفيديو عند الإغلاق
        if (modalVideoFrame) {
            modalVideoFrame.src = modalVideoFrame.src; // إعادة تحميل لإيقافه
        }
    }
}

// التحقق من حالة تسجيل الدخول
function checkLoginState() {
    const username = localStorage.getItem(USER_KEY);
    const email = localStorage.getItem(EMAIL_KEY);
    
    // إخفاء جميع الحاويات أولاً
    loginContainer.style.display = 'none';
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'none';
    
    if (username && email) {
        // المستخدم مسجل دخول
        currentUserElement.textContent = `مرحباً ${username}`;
        quizContainer.style.display = 'block';
        startQuiz();
    } else {
        // المستخدم غير مسجل دخول
        loginContainer.style.display = 'block';
    }
}

// تسجيل الدخول
function handleLogin() {
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (!username || !email || !password) {
        showNotification("الرجاء إدخال جميع البيانات المطلوبة", 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification("كلمة المرور يجب أن تتكون من 6 أحرف على الأقل", 'error');
        return;
    }
    
    // التحقق من صحة البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification("الرجاء إدخال بريد إلكتروني صحيح", 'error');
        return;
    }
    
    // حفظ بيانات المستخدم
    localStorage.setItem(USER_KEY, username);
    localStorage.setItem(EMAIL_KEY, email);
    localStorage.setItem(PASSWORD_KEY, password);
    
    showNotification(`مرحباً ${username}! تم تسجيل الدخول بنجاح`, 'success');
    
    // الانتقال إلى الاختبار
    setTimeout(() => {
        checkLoginState();
    }, 1000);
}

// بدء الاختبار
function startQuiz() {
    // خلط الأسئلة
    shuffleArray(questions);
    
    // مسح المحتوى القديم
    questionsContainer.innerHTML = '';
    
    // إنشاء الأسئلة
    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.className = 'question-item';
        questionElement.dataset.index = index;
        
        // خلط الإجابات
        const shuffledAnswers = [...question.answers];
        shuffleArray(shuffledAnswers);
        
        questionElement.innerHTML = `
            <div class="question-text">${index + 1}. ${question.question}</div>
            <div class="answers-container" id="answers-${index}">
                ${shuffledAnswers.map((answer, ansIndex) => `
                    <label class="answer-label">
                        <input type="radio" name="question-${index}" value="${ansIndex}" required>
                        <span>${answer.text}</span>
                    </label>
                `).join('')}
            </div>
        `;
        questionsContainer.appendChild(questionElement);
    });
    
    submitButton.style.display = 'block';
    submitButton.disabled = true;
    submitButton.style.opacity = '0.6';
    submitButton.style.cursor = 'not-allowed';
    submitButton.textContent = `أجب على جميع الأسئلة (0/${questions.length})`;
    
    setupAnswerValidation();
    updateProgress();
}

// خلط المصفوفة
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// إعداد التحقق من الإجابات
function setupAnswerValidation() {
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    
    radioInputs.forEach(input => {
        input.addEventListener('change', () => {
            checkAllQuestionsAnswered();
            updateProgress();
        });
    });
}

// التحقق من إجابة جميع الأسئلة
function checkAllQuestionsAnswered() {
    const totalQuestions = questions.length;
    let answeredCount = 0;
    
    for (let i = 0; i < totalQuestions; i++) {
        const answered = document.querySelector(`input[name="question-${i}"]:checked`);
        if (answered) {
            answeredCount++;
        }
    }
    
    if (answeredCount === totalQuestions) {
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
        submitButton.style.cursor = 'pointer';
        submitButton.textContent = `إرسال الإجابات (${answeredCount}/${totalQuestions})`;
        completionMessage.style.display = 'block';
    } else {
        submitButton.disabled = true;
        submitButton.style.opacity = '0.6';
        submitButton.style.cursor = 'not-allowed';
        submitButton.textContent = `أجب على جميع الأسئلة (${answeredCount}/${totalQuestions})`;
        completionMessage.style.display = 'none';
    }
    
    answeredCountElement.textContent = answeredCount;
}

// تحديث شريط التقدم
function updateProgress() {
    const totalQuestions = questions.length;
    let answeredCount = 0;
    
    for (let i = 0; i < totalQuestions; i++) {
        const answered = document.querySelector(`input[name="question-${i}"]:checked`);
        if (answered) {
            answeredCount++;
        }
    }
    
    const progressPercentage = (answeredCount / totalQuestions) * 100;
    progressFill.style.width = `${progressPercentage}%`;
    currentQuestionElement.textContent = answeredCount;
}

// حساب النتيجة
function calculateScore() {
    let score = 0;
    
    questions.forEach((question, index) => {
        const selectedAnswer = document.querySelector(`input[name="question-${index}"]:checked`);
        
        if (selectedAnswer) {
            const answerIndex = parseInt(selectedAnswer.value);
            if (question.answers[answerIndex].correct) {
                score++;
            }
        }
    });
    
    return score;
}

// عرض الإجابات الصحيحة
function showCorrectAnswers() {
    const username = localStorage.getItem(USER_KEY);
    const email = localStorage.getItem(EMAIL_KEY);
    const userScore = calculateScore();
    
    let answersHTML = `
        <h2>الإجابات الصحيحة</h2>
        <p><strong>الاسم:</strong> ${username}</p>
        <p><strong>البريد الإلكتروني:</strong> ${email}</p>
        <p><strong>نتيجتك:</strong> <span style="color:#007bff; font-weight:bold;">${userScore} / ${questions.length}</span></p>
        
        <div class="result-video-container">
            <h3><i class="fas fa-video"></i> الفيديو التعريفي</h3>
            <div class="result-video-wrapper">
                <iframe 
                    src="${VIDEO_URL}" 
                    title="فيديو تعريفي عن التعليم الإلكتروني"
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
            <p style="margin-top: 10px; color: #666; text-align: center;">يمكنك مشاهدة الفيديو مرة أخرى لتذكر مفاهيم التعليم الإلكتروني</p>
        </div>
        
        <div class="answers-review">
    `;
    
    questions.forEach((question, index) => {
        const correctAnswer = question.answers.find(answer => answer.correct);
        const userAnswerElement = document.querySelector(`input[name="question-${index}"]:checked`);
        let userAnswerText = "لم تجب على هذا السؤال";
        let answerClass = "not-answered";
        
        if (userAnswerElement) {
            const answerIndex = parseInt(userAnswerElement.value);
            userAnswerText = question.answers[answerIndex].text;
            answerClass = question.answers[answerIndex].correct ? "correct" : "incorrect";
        }
        
        answersHTML += `
            <div class="answer-item">
                <div class="question-review">
                    <strong>${index + 1}. ${question.question}</strong>
                </div>
                <div class="user-answer ${answerClass}">
                    <strong>إجابتك:</strong> ${userAnswerText}
                </div>
                <div class="correct-answer">
                    <strong>الإجابة الصحيحة:</strong> ${correctAnswer.text}
                </div>
            </div>
        `;
    });
    
    answersHTML += `
        </div>
        <button id="back-to-result" class="btn" style="background:#6c757d; margin-top:15px;">العودة للنتيجة</button>
        <button id="logout-btn-answers" class="btn" style="background:#dc3545; margin-top:15px;">تسجيل الخروج</button>
    `;
    
    resultContainer.innerHTML = answersHTML;
    
    document.getElementById("back-to-result").addEventListener("click", showFinalResult);
    document.getElementById("logout-btn-answers").addEventListener("click", logoutUser);
}

// عرض النتيجة النهائية
function showFinalResult() {
    const score = calculateScore();
    const username = localStorage.getItem(USER_KEY);
    const email = localStorage.getItem(EMAIL_KEY);
    const percentage = Math.round((score / questions.length) * 100);
    
    let performanceLevel = "";
    let performanceColor = "";
    
    if (percentage >= 90) {
        performanceLevel = "ممتاز ";
        performanceColor = "#28a745";
    } else if (percentage >= 80) {
        performanceLevel = "جيد جداً ";
        performanceColor = "#17a2b8";
    } else if (percentage >= 70) {
        performanceLevel = "جيد ";
        performanceColor = "#ffc107";
    } else if (percentage >= 60) {
        performanceLevel = "مقبول ";
        performanceColor = "#fd7e14";
    } else {
        performanceLevel = "يحتاج تحسين ";
        performanceColor = "#dc3545";
    }
    
    quizContainer.style.display = "none";
    resultContainer.innerHTML = `
        <div class="final-result-container">
            <div class="result-header">
                <h2> نتيجتك النهائية</h2>
                <div class="divider"></div>
            </div>
            
            <div class="user-info">
                <div class="info-item">
                    <span class="info-label"> الاسم:</span>
                    <span class="info-value">${username}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">البريد الإلكتروني:</span>
                    <span class="info-value">${email}</span>
                </div>
            </div>
            
            <div class="score-display">
                <div class="score-circle" style="border-color: ${performanceColor}">
                    <span class="score-number">${score}</span>
                    <span class="score-total">/${questions.length}</span>
                </div>
                <div class="percentage" style="color: ${performanceColor}">
                    ${percentage}%
                </div>
                <div class="performance-level" style="color: ${performanceColor}">
                    ${performanceLevel}
                </div>
            </div>
            
            <div class="result-video-container">
                <h3><i class="fas fa-video"></i> الفيديو التعريفي</h3>
                <div class="result-video-wrapper">
                    <iframe 
                        src="${VIDEO_URL}" 
                        title="فيديو تعريفي عن التعليم الإلكتروني"
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
                <p style="margin-top: 10px; color: #666; text-align: center;">شاهد الفيديو مرة أخرى لتثبيت مفاهيم التعليم الإلكتروني</p>
            </div>
            
            <div class="result-actions">
                <button id="show-answers-btn" class="btn result-btn">
                     <i class="fas fa-list-check"></i> عرض الإجابات الصحيحة
                </button>
                <button id="restart-btn" class="btn result-btn">
                    <i class="fas fa-redo"></i> إعادة الاختبار
                </button>
                <button id="logout-btn" class="btn result-btn">
                     <i class="fas fa-sign-out-alt"></i> تسجيل الخروج
                </button>
            </div>
            
            <div class="result-footer">
                <p>نصيحة: استمر في التعلم وتدرب أكثر لتحسين نتائجك</p>
            </div>
        </div>
    `;
    resultContainer.style.display = "block";
    
    document.getElementById("restart-btn").addEventListener("click", restartQuiz);
    document.getElementById("logout-btn").addEventListener("click", logoutUser);
    document.getElementById("show-answers-btn").addEventListener("click", showCorrectAnswers);
}

// إعادة الاختبار
function restartQuiz() {
    resultContainer.style.display = "none";
    quizContainer.style.display = "block";
    startQuiz();
}

// تسجيل الخروج
function logoutUser() {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(EMAIL_KEY);
    localStorage.removeItem(PASSWORD_KEY);
    
    // إيقاف أي فيديو يعمل
    if (videoFrame) videoFrame.src = videoFrame.src;
    if (modalVideoFrame) modalVideoFrame.src = modalVideoFrame.src;
    
    showNotification("تم تسجيل الخروج بنجاح", 'info');
    
    setTimeout(() => {
        location.reload();
    }, 1000);
}

// تسجيل الخروج أثناء الاختبار
function logoutDuringQuiz() {
    if (confirm("هل تريد تسجيل الخروج؟ سيتم فقدان تقدمك الحالي في الاختبار.")) {
        logoutUser();
    }
}

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initElements();
    checkLoginState();
    
    // إضافة مستمعي الأحداث
    loginButton.addEventListener('click', handleLogin);
    submitButton.addEventListener('click', showFinalResult);
    
    if (logoutDuringQuizBtn) {
        logoutDuringQuizBtn.addEventListener('click', logoutDuringQuiz);
    }
    
    // السماح بتسجيل الدخول باستخدام زر Enter
    usernameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleLogin();
    });
    
    emailInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleLogin();
    });
    
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleLogin();
    });
});