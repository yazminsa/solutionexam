import React, { PureComponent } from 'react';
import styles from './Exam.module.scss';

export default class Exam extends PureComponent {

render() {
    const {data} = this.props;
        return (
            <div className={styles.Exam}>
                <li>Nombre : {data.name}<br/></li>
                <li>Temperatura : {data.temp}<br/></li>
                <li>Presión : {data.presion}<br/></li>
                <li>Humedad : {data.humedad}<br /></li>
            </div>
        );
    }
}