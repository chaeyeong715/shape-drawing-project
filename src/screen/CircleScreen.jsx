import React, { useState, useRef } from 'react';

import activityImage from '../assets/page.png'; 

const CORRECT_COUNT = 4; 
const CORRECT_OTHER_NAMES = ["우산", "강아지", "시계", "캔음료", "써레", "모자", "나비", "지게", "소파", "트럭"]; 

const styles = {
    container: {
        maxWidth: '768px', margin: '0 auto', padding: '20px', backgroundColor: '#fff',
        fontFamily: 'Arial, sans-serif', minHeight: '100vh', boxSizing: 'border-box',
    },
    title: { fontSize: '24px', fontWeight: 'bold', marginBottom: '10px', textAlign: 'center', color: '#333' },
    instruction: { fontSize: '18px', textAlign: 'center', color: '#555', marginBottom: '20px', paddingBottom: '10px', borderBottom: '2px dashed #eee' },
    imageWrapper: {
        position: 'relative', width: '100%', paddingBottom: '58.33%', height: 0, marginBottom: '10px', 
        border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer',
    },
    image: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' },
    circle: (color) => ({
        position: 'absolute', width: '40px', height: '40px', borderRadius: '50%',
        border: `4px solid ${color}`, backgroundColor: `rgba(255, 0, 0, 0.2)`,
        pointerEvents: 'none', transform: 'translate(-50%, -50%)', zIndex: 10,
    }),
    buttonGroup: { display: 'flex', gap: '10px', marginBottom: '20px' },
    actionButton: (bgColor, disabled) => ({
        width: '100%', backgroundColor: disabled ? '#ccc' : bgColor, color: 'white',
        padding: '10px 15px', borderRadius: '8px', border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer', fontSize: '16px', fontWeight: 'bold',
        transition: 'background-color 0.2s',
    }),
    question: { fontSize: '16px', marginTop: '15px', fontWeight: '500', color: '#444' },
    input: { width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '8px', fontSize: '16px', boxSizing: 'border-box', marginBottom: '10px' },
    inputBig: { height: '100px', resize: 'vertical', marginBottom: '20px' },
    checkButton: {
        display: 'block', width: '100%', backgroundColor: '#4CAF50', color: 'white',
        padding: '15px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer',
        fontSize: '18px', fontWeight: 'bold', marginTop: '20px', transition: 'background-color 0.2s',
    },
    feedback: (isCorrect) => ({
        marginTop: '15px', padding: '10px', borderRadius: '8px', textAlign: 'center',
        fontWeight: 'bold', fontSize: '18px', color: 'white',
        backgroundColor: isCorrect ? '#4CAF50' : '#f44336', 
    })
};


export default function CircleScreen() {
    const [circles, setCircles] = useState([]);
    const [count, setCount] = useState("");
    const [otherNames, setOtherNames] = useState("");
    const [feedback, setFeedback] = useState(null); 
    
    const imageWrapperRef = useRef(null); 

    const handleTouch = (event) => {
        if (feedback) setFeedback(null); 

        if (imageWrapperRef.current) {
            const rect = imageWrapperRef.current.getBoundingClientRect();
            const x = event.clientX - rect.left; 
            const y = event.clientY - rect.top;    
            
            setCircles([...circles, { x, y, color: 'red' }]); 
        }
    };

    const handleUndo = () => {
        if (feedback) setFeedback(null);
        setCircles(circles.slice(0, -1)); 
    };
    
    const checkAnswers = () => {
        let isOverallCorrect = true;
        let feedbackMessage = [];

        const isCountCorrect = parseInt(count) === CORRECT_COUNT;
        if (isCountCorrect) {
            feedbackMessage.push("✅ 1번 정답 (개수)이 맞았습니다!");
        } else {
            isOverallCorrect = false;
            feedbackMessage.push(`❌ 1번 정답 (개수)이 틀렸습니다. (정답: ${CORRECT_COUNT}개)`);
        }

        const isNamesCorrect = checkOtherNames(otherNames);
        if (isNamesCorrect) {
            feedbackMessage.push("✅ 2번 정답 (나머지 물건 이름)이 맞았습니다!");
        } else {
            isOverallCorrect = false;
            feedbackMessage.push("❌ 2번 정답 (나머지 물건 이름)이 틀렸습니다. (정답: " + CORRECT_OTHER_NAMES.join(', ') + ")");
        }

        setFeedback({
            message: feedbackMessage.join('\n'),
            isCorrect: isOverallCorrect,
        });
    };

    const checkOtherNames = (names) => {
        if (!names) return false;

        const inputNames = names
            .split(/[\s,.\n]+/)
            .map(name => name.trim())
            .filter(name => name.length > 0)
            .map(name => name.toLowerCase());

        const correctNamesLower = CORRECT_OTHER_NAMES.map(name => name.toLowerCase());

        if (inputNames.length !== correctNamesLower.length) {
            return false;
        }

        const correctSet = new Set(correctNamesLower);
        return inputNames.every(name => correctSet.has(name));
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>실행기능</h1>
            
            <p style={styles.instruction}>
                아래 그림에서 '가'자로 시작되는 물건에 동그라미 하세요.
            </p>

            <div 
                ref={imageWrapperRef} 
                style={styles.imageWrapper}
                onClick={handleTouch}
            >
                <img 
                    src={activityImage} 
                    alt="문제 이미지" 
                    style={styles.image} 
                    onError={(e) => { 
                        e.currentTarget.onerror = null; 
                        e.currentTarget.src = "https://placehold.co/600x350/EFEFEF/AAAAAA?text=Put+page.png+in+/src/assets/"; 
                    }}
                />

                {circles.map((c, index) => (
                    <div
                        key={index}
                        style={{ ...styles.circle(c.color), left: `${c.x}px`, top: `${c.y}px` }}
                    />
                ))}
            </div>
            
            <div style={styles.buttonGroup}>
                <button 
                    style={styles.actionButton('#ff6961', circles.length === 0)}
                    onClick={handleUndo}
                    disabled={circles.length === 0} 
                >
                    마지막 동그라미 지우기 ({circles.length})
                </button>
            </div>

            <p style={styles.question}>1) ‘가’로 시작하는 물건은 모두 몇 개입니까?</p>
            <input
                style={styles.input}
                type="number" 
                value={count}
                onChange={(e) => setCount(e.target.value)}
                placeholder="숫자를 입력하세요"
            />

            <p style={styles.question}>2) 나머지 물건의 이름도 모두 말해보세요.</p>
            <textarea
                style={{...styles.input, ...styles.inputBig}}
                value={otherNames}
                onChange={(e) => setOtherNames(e.target.value)}
                placeholder="여기에 적으세요 (쉼표 또는 공백으로 구분)"
            />

            <button
                style={styles.checkButton}
                onClick={checkAnswers}
            >
                정답 확인하기
            </button>

            {feedback && (
                <div style={styles.feedback(feedback.isCorrect)}>
                    {feedback.message.split('\n').map((line, index) => (
                        <p key={index} style={{margin: '5px 0'}}>{line}</p>
                    ))}
                </div>
            )}
        </div>
    );
}