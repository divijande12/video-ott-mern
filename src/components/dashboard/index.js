import React from 'react'
import Appbar from '../appbar'
import {Image} from 'cloudinary-react';
const thumnailId = 'thumbnails/wxopwcqyd921onsqagwv';
export default function Dashboard() {
    return (
        <div style={{ backgroundImage: "linear-gradient(to top right, #291524, black)",
                    backgroundSize: 'cover',
                    height: '100vh',
                    boxSizing: 'border-box'}}>
            <Appbar />
            <Image
                height={137}
                width={244}
                crop="scale"
                cloudName="domzykbc2"
                publicId={thumnailId}
            />
        </div>
    )
}

