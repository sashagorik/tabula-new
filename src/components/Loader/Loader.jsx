import React from 'react'
import "./Loadder.css"
import Spinner from 'react-bootstrap/Spinner';

const Loader = () => {
    return (
        <div className="loaderMainDiv">
            <div className="loaderSpinner">
                <Spinner animation="border" role="status" className="spinn">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
            <div className="loadertext mt-5 ">
                loading...
            </div>
        </div>
    )
}

export default Loader