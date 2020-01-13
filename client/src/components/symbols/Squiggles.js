import React from 'react';

const Squiggles = ({stroke, fillStyle}) =>{
return(
    <svg width="250%" viewBox="0 0 200 100" stroke={stroke} fill={fillStyle}>
    <g transform="translate(0,-197)">
    <path className='pathClass' d="m27.228 295.19s-21.874-1.2684-21.064-42.281c0.81019-41.013 28.76-50.315 50.229-49.469 21.469 0.84566 47.798 14.376 66.026 17.335
    18.228 2.9597 53.874-21.141 54.684-21.986 0.81009-0.84567 13.367-1.2684 17.013 27.483 3.6456 28.751-25.114 61.308-59.545
    60.462-34.431-0.84568-39.697-15.644-60.355-15.644-20.659 0-46.988 24.1-46.988 24.1z" strokeWidth="4px"/>
    </g></svg>
)}

const StripedSquiggles = ({stroke, fillStyle}) =>{
return(
    <svg  width="250%" viewBox="0 0 200 100" stroke={stroke} fill={fillStyle}>
        <g transform="translate(0,-197)" strokeWidth="1.5px">
        <path className='pathClass' d="m26.457 295.18s-21.874-1.2684-21.064-42.281c0.81019-41.013 28.76-50.315 50.229-49.469 21.469 0.84566 47.798 14.376 66.026 17.335 18.228 2.9597 53.874-21.141 54.684-21.986 0.81009-0.84567 13.367-1.2684 17.013 27.483 3.6456 28.751-25.114 61.308-59.545 60.462-34.431-0.84568-39.697-15.644-60.355-15.644-20.659 0-46.988 24.1-46.988 24.1z" strokeWidth="2.317px"/>
        <path className='pathClass' d="m6.0113 257.53 101.01-40.946" />
        <path className='pathClass' d="m6.1735 265.82 111.97-45.859" />
        <path className='pathClass' d="m7.8577 272.23 175.85-70.806" />
        <path className='pathClass' d="m8.8642 279.56 179.25-71.562" />
        <path className='pathClass' d="m13.061 285.87 177.55-70.995" />
        <path className='pathClass' d="m64.504 272.25 127.66-51.34" />
        <path className='pathClass' d="m80.506 272.19 112.73-44.914"/>
        <path className='pathClass' d="m90.625 275.3 103.28-40.379" />
        <path className='pathClass' d="m99.869 279.67 93.263-36.788" />
        <path className='pathClass' d="m108.91 283.27 81.735-31.496" />
        <path className='pathClass' d="m119.68 285.53 63.592-25.449" />
        <path className='pathClass' d="m6.6632 248.68 88.538-35.465" />
        <path className='pathClass' d="m131.77 287.42 42.047-16.377" />
        <path className='pathClass' d="m7.2302 238.85 77.577-28.85" />
        <path className='pathClass' d="m9.498 230.73 64.348-24.504" />
        <path className='pathClass' d="m13.089 222.22 47.15-18.267" />
        <path className='pathClass' d="m16.68 291.01 51.496-20.346" />
        </g></svg>
)}

export {Squiggles, StripedSquiggles};