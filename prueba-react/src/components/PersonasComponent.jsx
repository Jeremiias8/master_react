import React from 'react'
import '../Index.css';

import { AñadirComponent } from './AñadirComponent';

export const PersonasComponent = () => {

  return (
    <div className='numper-box'>
        <p>Número de personas <span className='aste-symbol'>*</span></p>

        <span className="pers-number">1</span>
        <span>-</span>
        <span className="pers-number">10</span>

        <span className="pers-number">11</span>
        <span>-</span>
        <span className="pers-number">49</span>

        <span className="pers-number">50</span>
        <span>-</span>
        <span className="pers-number">74</span>

        <span className="pers-number">75</span>
        <span>-</span>
        <span className="pers-number">100</span>

        <span className="clearfix"></span>

        <AñadirComponent />
    </div>
  );

}
