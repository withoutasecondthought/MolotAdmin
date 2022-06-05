import React from 'react';
import style from './Skeleton.module.css'

const Skeleton = ({children, isLoaded}) => {
    return (
        <div className={'wrap'}>
            {isLoaded ? children : <div className={style.spinner}><img className={style.img} src={'/images/spinner.png'} alt={'error'}/></div>}
        </div>
    );
};

export default Skeleton;