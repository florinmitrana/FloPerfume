import React, { useEffect, useState } from 'react';

import api from '../api/axiosConfig';
import './InformationScreen.css';
import { useParams } from 'react-router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart as regularHeart} from '@fortawesome/free-regular-svg-icons';
import {faHeart as solidHeart} from '@fortawesome/free-regular-svg-icons';

const InformationScreen = () => {
  const { perfumeId } = useParams(); 
  const [perfume, setPerfume] = useState(null);
  const [isFavorite, setIsFavorite] = useState(null);
  const [user,setUser] = useState(null);

  useEffect(() => {
    const fetchPerfumeDetails = async () => {
      try {
        const response = await api.get(`/api/perfumes/${perfumeId}`);
        setPerfume(response.data);
        console.log(response.data)
      } catch (err) {
        console.log(err);
      }
    };

    const loggedUser =  localStorage.getItem('user');
    if(loggedUser){
      const parsedUser =  JSON.parse(loggedUser);
      setUser(parsedUser);
      checkifFavorite(parsedUser.id);
    }

    fetchPerfumeDetails();
   
  }, [perfumeId]);

  const checkifFavorite = async (userId) =>{
    try{
      const response = await api.get(`/api/users/${userId}/favorites`);
      const favoritePerfumes = response.data;
      const isFav = favoritePerfumes.some(favPerfume => favPerfume.id === perfumeId);
      setIsFavorite(isFav);
    }catch(err) { console.log(err)}
  };

  const toggleFavorite = async () =>{
    if(!user){
      alert('Trebuie sa fi logat pentru a adauga un parfum la favorite!');
      return;
    }
    try{
      if(isFavorite){
        await api.delete(`/api/users/${user.id}/favorites/${perfumeId}`);
        setIsFavorite(false);
      }else{
        await api.post(`/api/users/${user.id}/favorites`,{ id: perfumeId});
        setIsFavorite(true);
      }

    }catch(err){console.log(err)}
  }

  if (!perfume) {
    return <div>Nu exista parfumul</div>; 
  }

  return (
    <div className="information-container">
      <div className="image-container">
        <img src={perfume.images[0]} alt={perfume.name} className="perfume-image" />
      </div>
  
      <div className="details-container">
        <div className="title-container">
          <h1>{perfume.name}</h1>
          <button onClick={toggleFavorite} className="favorite-button">
            <FontAwesomeIcon icon={isFavorite ? solidHeart : regularHeart} className={isFavorite ? "favorite-icon active" : "favorite-icon"} />
          </button>
        </div>
  
        <div className="details-section">
          <h2>Note</h2>
          <p><strong>Note de vârf:</strong> {perfume.topNotes.join(', ')}</p>
          <p><strong>Note de mijloc:</strong> {perfume.middleNotes.join(', ')}</p>
          <p><strong>Note de bază:</strong> {perfume.baseNotes.join(', ')}</p>
        </div>
  
        <div className="details-section">
          <h2>Longevitate</h2>
          <p>{perfume.longevity.join(', ')}</p>
        </div>
  
        <div className="details-section">
          <h2>Gen</h2>
          <p>{perfume.gender.join(', ')}</p>
        </div>
  
        <div className="details-section">
          <h2>Furnizori</h2>
          {perfume.suppliers.map((supplier, index) => (
            <div key={index} className="supplier-info">
              <p><strong>Nume:</strong> {supplier.name}</p>
              <p><strong>Preț:</strong> {supplier.price} RON</p>
              <a href={supplier.link} className="supplier-link" target="_blank" rel="noopener noreferrer">
                Cumpără de la {supplier.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InformationScreen;