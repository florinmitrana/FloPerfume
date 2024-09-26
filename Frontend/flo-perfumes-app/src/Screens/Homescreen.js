import React, { useEffect, useState } from 'react'
import api from '../api/axiosConfig'
import './Homescreen.css'

const Homescreen = () => {

    const [perfumes, setPerfumes] = useState([]);

    useEffect(() => {
        const fetchPerfumes = async () => {
            try {
                const response = await api.get('/api/perfumes');
                setPerfumes(response.data);
            } catch (err) {
                console.log(err)
            }
        };

        fetchPerfumes();
    }, []);

    return (
        <div className="homescreen-container">
             {perfumes.map( (perfume, index) => (
            <div className="recommendation-card">
                <div className="card-content">
                    <img src={perfume.images[0]} alt={perfume.name} />
                    <div className="text-content">
                        <h2>{perfume.name}</h2>
                        <p>Note de vârf: {perfume.topNotes.join(', ')}</p>
                        <a href= {`/${perfume.id}/recommandations`} className="button">Vezi Recomandări</a>
                        <a href= {`/${perfume.id}/details`} className="details-link">Vezi Mai Multe Detalii</a>                  
                    </div>
                </div>
            </div>

            ))}
        </div>
    )
}

export default Homescreen;
