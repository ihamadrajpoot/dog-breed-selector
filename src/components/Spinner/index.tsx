import React from 'react';
import styles from './spinner.module.scss'

interface SpinnerProps {
    size?: number;
    color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 30, color = '#ccc' }) => {
    return (
        <div className={styles.spinner} style={{ width: `${size}px`, height: `${size}px` }}>
            <div className={styles.spinnerInner} style={{ borderColor: `${color} transparent transparent transparent` }} />
        </div>
    );
};

export default Spinner;
