
import React, { useState } from 'react';
import Card from '../components/ui/Card';
import { mockQuizzes } from '../constants';
import { Quiz } from '../types';
import Button from '../components/ui/Button';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const QuizComponent: React.FC<{ quiz: Quiz; onBack: () => void }> = ({ quiz, onBack }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
    const [showResults, setShowResults] = useState(false);

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const score = quiz.questions.reduce((acc, q, index) => 
        selectedAnswers[index] === q.correctAnswer ? acc + 1 : acc, 0);

    const handleAnswerSelect = (option: string) => {
        setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: option }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setShowResults(true);
        }
    };
    
    if (showResults) {
        return (
            <Card>
                <h2 className="text-2xl font-bold mb-4">Quiz Results: {quiz.title}</h2>
                <p className="text-xl mb-6">Your Score: <span className="font-bold text-accent">{score} / {quiz.questions.length}</span></p>
                <div className="space-y-4">
                    {quiz.questions.map((q, index) => (
                        <div key={q.id} className="p-4 bg-gray-700 rounded-md">
                            <p className="font-semibold">{q.question}</p>
                            <p className={`mt-2 flex items-center ${selectedAnswers[index] === q.correctAnswer ? 'text-green-400' : 'text-red-400'}`}>
                                {selectedAnswers[index] === q.correctAnswer ? <CheckCircle className="mr-2"/> : <XCircle className="mr-2"/>}
                                Your Answer: {selectedAnswers[index] || "Not Answered"}
                            </p>
                            {selectedAnswers[index] !== q.correctAnswer && <p className="text-green-400">Correct Answer: {q.correctAnswer}</p>}
                        </div>
                    ))}
                </div>
                <Button onClick={onBack} className="mt-6">Back to Quizzes</Button>
            </Card>
        );
    }

    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{quiz.title}</h2>
                <span className="flex items-center text-accent"><Clock className="mr-2"/> 05:00</span>
            </div>
            <p className="text-text-secondary mb-6">Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
            <div className="bg-gray-700 p-4 rounded-md mb-6">
                <p className="text-lg">{currentQuestion.question}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option) => (
                    <button
                        key={option}
                        onClick={() => handleAnswerSelect(option)}
                        className={`p-4 rounded-md text-left transition-colors border-2 ${selectedAnswers[currentQuestionIndex] === option ? 'bg-primary border-accent' : 'bg-gray-600 hover:bg-gray-500 border-transparent'}`}
                    >
                        {option}
                    </button>
                ))}
            </div>
            <div className="flex justify-end mt-8">
                <Button onClick={handleNext}>
                    {currentQuestionIndex < quiz.questions.length - 1 ? 'Next' : 'Finish'}
                </Button>
            </div>
        </Card>
    );
};


const PracticeArena: React.FC = () => {
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

    if (selectedQuiz) {
        return <QuizComponent quiz={selectedQuiz} onBack={() => setSelectedQuiz(null)} />;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Topic-Wise Practice Arena</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockQuizzes.map(quiz => (
                    <Card key={quiz.id} className="flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl font-bold">{quiz.title}</h2>
                            <p className="text-text-secondary mt-2">{quiz.subject}</p>
                        </div>
                        <Button onClick={() => setSelectedQuiz(quiz)} className="mt-4">
                            Start Quiz
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default PracticeArena;
