import React from 'react'
import Card from './Card';
import img1 from '../assets/img1.jpg'
import img2 from '../assets/img2.jpg'
import img3 from '../assets/img3.jpg'

const cards=[
    {
        id:1,
        title:'Canal principal',
        image: img1,
        url: 'https://youtube.com',
        text: 'Revisa las últimas publicaciones de tus maestros y compañeros'
    },
    {
        id:2,
        title: 'Chat',
        image: img2,
        url: 'https://youtube.com',
        text: 'Comunicate con las personas de tu curso'

    },
    {
        id:3,
        title: 'Calendario',
        image: img3,
        url: 'https://youtube.com',
        text: 'Mantente al pendiente de las fechas de examen y/o entregas'

    },
]

function Cards() {
  return (
    <div className="container d-flex justify-content-center align align-items-center h-100">
        <div className="row">
            {
                cards.map((card)=>(
                    <div className="col-md-4" key={card.id}>
                 <Card title={card.title} imageSource={card.image} url={card.url} text={card.text}/>
            </div>
                ))
            }
        </div>
    </div>
  )
}

export default Cards