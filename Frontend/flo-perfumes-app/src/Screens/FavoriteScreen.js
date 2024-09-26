
import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import './FavoriteScreen.css';

const FavoriteScreen = () => {
  const [favoritePerfumes, setFavoritePerfumes] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser);
      setUser(parsedUser);
      fetchFavoritePerfumes(parsedUser.id);
    } else {
      alert("Trebuie să fii logat pentru a vedea parfumurile preferate!");
    }
  }, []);

  const fetchFavoritePerfumes = async (userId) => {
    try {
      const response = await api.get(`/api/users/${userId}/favorites`);
      setFavoritePerfumes(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (favoritePerfumes.length === 0) {
    return <div className="favorite-container">Nu ai niciun parfum în lista de favorite.</div>;
  }

  return (
    <div className="favorite-container">
      {favoritePerfumes.map((perfume) => (
        <div className="favorite-card" key={perfume.id}>
          <div className="card-content">
            {perfume.images && perfume.images.length > 0 ? (
              <img src={perfume.images[0]} alt={perfume.name} />
            ) : (
              <img src="/path-to-placeholder-image.jpg" alt="Imagine indisponibilă" />
            )}
            <div className="text-content">
              <h2>{perfume.name}</h2>
              <p>Note de vârf: {perfume.topNotes && perfume.topNotes.length > 0 ? perfume.topNotes.join(', ') : 'Note indisponibile'}</p>
              <a href={`/${perfume.id}/details`} className="details-link-favscreen">Vezi Mai Multe Detalii</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoriteScreen;
