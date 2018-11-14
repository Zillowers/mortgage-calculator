import React from 'react';
import styles from './styles/MortgageSection.css';

const MortgageSection = props => (
  <div className={styles.title} onClick={props.onClick}>
    <span className={styles.collapsible}><b>Mortgage</b></span>
    <i className="fas fa-angle-down" id={styles.iconAngle}/>
  </div>
);

export default MortgageSection;
