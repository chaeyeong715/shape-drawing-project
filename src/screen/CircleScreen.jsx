import React, { useState, useRef } from 'react';

const styles = {
    container: {
        maxWidth: '768px', 
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#fff',
        fontFamily: 'Arial, sans-serif',
        minHeight: '100vh',
        boxSizing: 'border-box',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        textAlign: 'center',
        color: '#333',
    },
    imageWrapper: {
        position: 'relative',
        width: '100%',
        paddingBottom: '58.33%', 
        height: 0,
        marginBottom: '20px',
        border: '1px solid #eee',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'pointer',
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'contain', 
    },
    circle: {
        position: 'absolute',
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        border: '3px solid red',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        pointerEvents: 'none', 
        transform: 'translate(-50%, -50%)', 
        zIndex: 10,
    },
    undoButton: {
        display: 'block',
        width: '100%',
        backgroundColor: '#ff6961',
        color: 'white',
        padding: '10px 15px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '20px',
        transition: 'background-color 0.2s',
    },
    undoButtonDisabled: {
        backgroundColor: '#ccc',
        cursor: 'not-allowed',
    },
    question: {
        fontSize: '16px',
        marginTop: '15px',
        fontWeight: '500',
        color: '#444',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        marginTop: '8px',
        fontSize: '16px',
        boxSizing: 'border-box', 
        marginBottom: '10px',
    },
    inputBig: {
        height: '100px',
        resize: 'vertical',
    }
};


export default function CircleScreen() {
    const [circles, setCircles] = useState([]);
    const [count, setCount] = useState("");
    const [otherNames, setOtherNames] = useState("");
    const imageWrapperRef = useRef(null); 

    const handleTouch = (event) => {
        if (imageWrapperRef.current) {
            const rect = imageWrapperRef.current.getBoundingClientRect();
            
            const x = event.clientX - rect.left; 
            const y = event.clientY - rect.top;    
            
            setCircles([...circles, { x, y }]);
        }
    };

    
    const handleUndo = () => {
        setCircles(circles.slice(0, -1)); 
    };

    const imagePath = '/assets/page.png'; 

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>2일차 활동</h1>

            {/* 배경 이미지 + 클릭 동그라미 영역 */}
            <div 
                ref={imageWrapperRef} 
                style={styles.imageWrapper}
                onClick={handleTouch}
            >
                <img 
                    src={imagePath} 
                    alt="문제 이미지" 
                    style={styles.image} 
                    onError={(e) => { 
                        e.currentTarget.onerror = null; 
                        e.currentTarget.src = "https://placehold.co/600x350/EFEFEF/AAAAAA?text=Put+page.png+in+/public/assets/"; 
                    }}
                />

                {/* 동그라미 표시 */}
                {circles.map((c, index) => (
                    <div
                        key={index}
                        style={{ ...styles.circle, left: `${c.x}px`, top: `${c.y}px` }}
                    />
                ))}
            </div>
            
            {/* 지우기 버튼 */}
            <button 
                style={circles.length === 0 ? {...styles.undoButton, ...styles.undoButtonDisabled} : styles.undoButton}
                onClick={handleUndo}
                disabled={circles.length === 0} 
            >
                마지막 동그라미 지우기 ({circles.length})
            </button>

            {/* 1번 입력 필드 */}
            <p style={styles.question}>1) ‘가’로 시작하는 물건은 모두 몇 개입니까?</p>
            <input
                style={styles.input}
                type="number" 
                value={count}
                onChange={(e) => setCount(e.target.value)}
                placeholder="숫자를 입력하세요"
            />

            {/* 2번 입력 필드 */}
            <p style={styles.question}>2) 나머지 물건의 이름도 모두 말해보세요.</p>
            <textarea
                style={{...styles.input, ...styles.inputBig}}
                value={otherNames}
                onChange={(e) => setOtherNames(e.target.value)}
                placeholder="여기에 적으세요"
            />
        </div>
    );
}