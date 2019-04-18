import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
export default (props)=>{
   return (
    
   <div>
      <Sparklines height={120} width={80} data={props.data}>
        <SparklinesLine  color= "blue"/>
      </Sparklines>
   </div>
   );
}