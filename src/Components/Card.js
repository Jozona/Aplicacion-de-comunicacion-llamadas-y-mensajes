import React from 'react'
import PropTypes from 'prop-types'

import './Cards.css'

function Card({title, imageSource, url, text}) {
  return (
    <div className="card text-center bg-dark ">
        <div className="overflow">
        <img src={imageSource} alt="" className="card-img-top"/> 
        </div>
        <div className="cardBody text-light">
           <h4 className="card-title">{title}</h4> 
           <p className="card-text text-secondary">
            {
            text ? text: 'ola'
            }
            </p>
           <a href={url} className="btn btn-outline-secondary rounded-0" target="_blank">
            Entrar
           </a>

        </div>  
    </div>
  )
}

Card.propTypes={
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
    imageSource: PropTypes.string,
    text:PropTypes.string
}

export default Card