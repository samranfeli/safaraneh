import React from 'react';
import PropTypes from 'prop-types';
import { Star } from './icons';

type Props ={
    className?: string;
    number: number;
}

const Rating:React.FC<Props> = props => (<div className={`flex items-center gap-.5 ${props.className || ""}`}>
    {[...new Array(props.number)].map((_,index)=><Star className='w-5 h-5 fill-amber-400' key={index} />)}
</div>);

Rating.propTypes = {
    number:PropTypes.number.isRequired
}
export default Rating;