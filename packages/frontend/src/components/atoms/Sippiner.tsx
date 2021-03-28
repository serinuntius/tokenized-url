import React from 'react';

export const Spinner: React.FC = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            display="block"
            preserveAspectRatio="xMidYMid"
            viewBox="0 0 100 100"
            className="animate-spin w-5 h-5"
            style={{
                marginRight: -2,
                backgroundRepeat: 'initial',
            }}
        >
            <circle
                cx="50"
                cy="50"
                r="35"
                fill="none"
                stroke="#ECECF3"
                strokeDasharray="164.93361431346415 56.97787143782138"
                strokeWidth="10"
                style={{
                    WebkitAnimationPlayState: 'paused',
                    animationPlayState: 'paused',
                }}
            />
        </svg>
    );
};
