import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function ProgressCircle({ percentage, count, goal }) {

    return (
        <>{percentage >= 100 ?
            <CircularProgressbar
                value={percentage}
                text='&#9733;'
                strokeWidth={8}
                styles={buildStyles({
                    pathColor: `#247ebf`,
                    textColor: '#FFD670',
                    backgroundColor: '#FF5733',
                    textSize: '40'
                })}
            />
            :
            <CircularProgressbar
                value={percentage}
                text={`${count} of ${goal}`}
                strokeWidth={8}
                styles={buildStyles({
                    pathColor: '#247ebf',
                    textColor: '#DA3E52',
                    backgroundColor: '#FF5733',
                    textSize: '16'
                })}
            />
        }
        </>
    )
}

export default ProgressCircle;