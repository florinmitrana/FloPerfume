import React, { useEffect, useState } from 'react'
import api from '../api/axiosConfig'
import { useParams } from 'react-router';
import "./RecommendationsScreen.css"

const RecommendationsScreen = () => {
    const { perfumeId } = useParams(); 
    console.log(perfumeId);
    const [recommendations, setRecommendations] = useState([]);
    const [perfume, setPerfume] = useState({});

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const perfumeResponse = await api.get(`/api/perfumes/${perfumeId}`);
                setPerfume(perfumeResponse.data); 

                const response = await api.get(`/api/perfumes/${perfumeId}/recommandations`);
                setRecommendations(response.data); 
               
            } catch (err) {
                console.log(err);
            }
        };

        fetchRecommendations();
    }, [perfumeId]);

    return (
        <div className="recommendations-container font-bold">
            <h1>Recomandări pentru parfumul {perfume.name}</h1>
            <div className="perfume-container">
                {recommendations.length > 0 ? (
                    recommendations.map((recommendation, index) => (
                        <div className="perfume-card" key={index}>
                            <img src={recommendation.images[0]} alt={recommendation.name} />
                            <h2>{recommendation.name}</h2>
                            <p>Note de vârf: {recommendation.topNotes.join(', ')}</p>
                            <a href= {`/${recommendation.id}/details`} className="details-link-recommandation">Vezi Detalii Despre Parfum</a>
                        </div>
                    ))
                ) : (
                    <p>Nu există recomandări disponibile.</p>
                )}
            </div>
        </div>
    );
}

    export default RecommendationsScreen;