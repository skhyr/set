import React from 'react';

const Diamonds = ({stroke, fillStyle}) =>{
return(
    <svg width="250%" viewBox="0 0 200 100">
    <g transform="translate(0,-197)">
    <path stroke={stroke} fill={fillStyle} d="m6.6546 249.67 94.993-36.191 92.756 37.667-93.875 36.32z" strokeWidth="4px"/>
    </g></svg>
)
}

const StripedDiamonds = ({stroke, fillStyle}) =>{
return(
    <svg  width="250%" viewBox="0 0 200 100" stroke={stroke} fill={fillStyle} >
    <g transform="translate(0,-197)"strokeWidth="1.5px">
    <path d="m6.2766 248.16 94.993-36.191 92.756 37.667-93.875 36.32z" strokeWidth="1.832px"/>
    <path d="m15.65 252.62 94.964-37.355" />
    <path d="m26.017 256.74 94.964-37.355" />
    <path d="m35.639 260.89 94.964-37.355" />
    <path d="m45.528 264.63 94.964-37.355" />
    <path d="m55.016 268.1 94.964-37.355" />
    <path d="m64.504 272.25 94.964-37.355" />
    <path d="m73.324 275.59 94.964-37.355" />
    <path d="m81.743 279.46 94.964-37.355" />
    <path d="m91.365 283.07 94.964-37.355" />
    </g>
    </svg>
)
}

export {Diamonds, StripedDiamonds};