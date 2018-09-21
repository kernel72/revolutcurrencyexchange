import React from 'react'
import {compose, mapProps} from 'recompose'
import {inject, observer} from 'mobx-react'

import style from './style.css'


const InputNumber = ({onValueChange, value}) => (
    <input autoFocus={true} value={value} className={style.inputNumber} 
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
        value: Converter.inputFromValue,
        onValueChange: e => Converter.setFromValue(e.target.value)
    })),
)(InputNumber)