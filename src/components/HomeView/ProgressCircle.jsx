import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function ProgressCircle({ percentage, count, goal }) {

    return (
        <>{percentage == 100 ?
            <CircularProgressbar
                value={percentage}
                text='&#9733;'
                strokeWidth={10}
                styles={buildStyles({
                    pathColor: `rgba(62, 152, 199)`,
                    textColor: '#FF5733',
                    backgroundColor: '#FF5733',
                    textSize: '40'
                })}
            />
            :
            <CircularProgressbar
                value={percentage}
                text={`${count} of ${goal}`}
                strokeWidth={10}
                styles={buildStyles({
                    pathColor: `rgba(62, 152, 199)`,
                    textColor: '#FF5733',
                    backgroundColor: '#FF5733',
                    textSize: '18'
                })}
            />
        }
        </>
    )
}

export default ProgressCircle;