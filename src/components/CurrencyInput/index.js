import React from 'react'
import {compose, mapProps} from 'recompose'
import {inject, observer} from 'mobx-react'

import style from './style.css'


const InputNumber = ({onValueChange}) => (
    <input autoFocus={true} className={style.inputNumber} 
            type="text" // Used 'text' instead of "number", because Firefox has a bug with input charachters. And if entered value is NaN then e.target.value is empty.
            onKeyPress = {e => {
                if(
                    !/[0-9\.]/.test(e.key) ||
                    (['.'].includes(e.key) && (e.target.value.includes('.')))
                ){
                    e.preventDefault();
                }
            }}
            onChange={(e) => onValueChange(e)}/>
)

export const CurrencyInput = compose(
    inject('Converter'),
    observer,
    mapProps(({Converter}) => ({
        onValueChange: e => {

            if(e.target.value.length > 6){
                e.target.value = e.target.value.slice(0,6);
            }

            if(isNaN(Number(e.target.value))){
                e.preventDefault();
                return; 
            }

            Converter.setFromValue(Number(e.target.value));
        }
    })),
)(InputNumber)