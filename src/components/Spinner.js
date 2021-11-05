const Spinner = () => {
    return (
        <svg
            style={{
                margin: 'auto',
                background: 'transparent',
                display: 'block',
                shapeRendering: 'auto',
            }}
            width='184px'
            height='184px'
            viewBox='0 0 100 100'
            preserveAspectRatio='xMidYMid'
        >
            <circle
                cx='50'
                cy='50'
                fill='none'
                stroke='#93dbe9'
                stroke-width='10'
                r='19'
                stroke-dasharray='89.5353906273091 31.845130209103033'
            >
                <animateTransform
                    attributeName='transform'
                    type='rotate'
                    repeatCount='indefinite'
                    dur='1.8518518518518516s'
                    values='0 50 50;360 50 50'
                    keyTimes='0;1'
                ></animateTransform>
            </circle>
        </svg>
    );
};

export default Spinner;
