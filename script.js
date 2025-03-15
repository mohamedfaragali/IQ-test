// بيانات الألغاز
const riddles = [
    {
        question: "إذا كان البطيخ يسبح في البحر، والتفاح يطير في السماء، فماذا يفعل الموز؟",
        options: [
            "يرقص على جليد الثلاجة",
            "يلعب شطرنج مع البرتقال",
            "يتفلسف حول معنى الحياة",
            "يكتب قصيدة شعر عن الزبادي"
        ],
        correctIndex: 2
    },
    {
        question: "أربعة أشخاص دخلوا غرفة، خرج خمسة. كيف حدث ذلك؟",
        options: [
            "دخل شخص خامس من النافذة",
            "أحدهم انشطر إلى نصفين",
            "كان أحدهم حاملاً وولدت في الغرفة",
            "خرج أحدهم مرتين"
        ],
        correctIndex: 3
    },
    {
        question: "ما هو الشيء الذي كلما زاد نقص؟",
        options: [
            "الثقب",
            "العمر",
            "الصمت",
            "رصيد البنك بعد التسوق"
        ],
        correctIndex: 0
    },
    {
        question: "إذا كان الكرسي ابن الطاولة، فمن هو والد الثلاجة؟",
        options: [
            "المكيف",
            "الفرن",
            "لا أحد، فالأثاث لا يتناسل",
            "متجر الأثاث"
        ],
        correctIndex: 1
    },
    {
        question: "ما هو الشيء الذي يمشي ويقف وليس له أرجل؟",
        options: [
            "الساعة",
            "الماء",
            "الظل",
            "النكتة السيئة"
        ],
        correctIndex: 3
    }
];

// متغيرات عامة
let currentRiddleIndex = 0;
const userAnswers = Array(riddles.length).fill(null);

// العناصر في الصفحة
const riddleTextElement = document.getElementById('riddle-text');
const optionsContainerElement = document.getElementById('options-container');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const currentQuestionElement = document.getElementById('current-question');
const totalQuestionsElement = document.getElementById('total-questions');
const resultContainerElement = document.getElementById('result-container');
const scorePercentageElement = document.getElementById('score-percentage');
const resultMessageElement = document.getElementById('result-message');
const restartButton = document.getElementById('restart-btn');
const progressFillElement = document.getElementById('progress-fill');

// تحميل أول لغز
window.onload = function() {
    totalQuestionsElement.textContent = riddles.length;
    loadRiddle(currentRiddleIndex);
    
    // إضافة مستمع حدث لزر إعادة الاختبار
    restartButton.addEventListener('click', restartQuiz);
    
    // إضافة مستمعي أحداث لأزرار المشاركة
    document.querySelectorAll('.social-button').forEach(button => {
        button.addEventListener('click', () => shareResult(button.classList.contains('facebook') ? 'facebook' : 
                                                         button.classList.contains('twitter') ? 'twitter' : 'whatsapp'));
    });
};

// وظيفة تحميل اللغز
function loadRiddle(index) {
    const riddle = riddles[index];
    riddleTextElement.textContent = riddle.question;
    
    // إفراغ حاوية الخيارات
    opt