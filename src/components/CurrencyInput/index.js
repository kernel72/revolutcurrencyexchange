import React from 'react'
import {compose, mapProps} from 'recompose'
import {inject, observer} from 'mobx-react'

import style from './style.css'


const InputNumber = ({onValueChange}) => (
    <input autoFocus={true} className={style.inputNumber} 
            type="number"
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

            Converter.setFromValue(Number(e.target.value));
        }
    })),
)(InputNumber)