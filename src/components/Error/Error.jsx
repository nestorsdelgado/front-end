import React from 'react';
import errorPhoto from '../../Logo/Error.png'

export default function Home() {

    return (
        <>
            <div className='Error' style={{display:'flex', flexDirection:'column'}}>
                <h1>Not Tidy</h1>
                <hr />
                <img src={errorPhoto}/>
            </div>
        </>
    );
}

