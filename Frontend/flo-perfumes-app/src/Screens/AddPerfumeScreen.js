// src/screens/AddPerfumeScreen.js
import React, { useState } from 'react';
import api from '../api/axiosConfig';
import './AddPerfumeScreen.css';

const AddPerfumeScreen = () => {
  const [name, setName] = useState('');
  const [topNotes, setTopNotes] = useState('');
  const [middleNotes, setMiddleNotes] = useState('');
  const [baseNotes, setBaseNotes] = useState('');
  const [longevity, setLongevity] = useState('');
  const [gender, setGender] = useState('');
  const [images, setImages] = useState('');
  const [suppliers, setSuppliers] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const newPerfume = {
      name,
      topNotes: topNotes.split(',').map(note => note.trim()),
      middleNotes: middleNotes.split(',').map(note => note.trim()),
      baseNotes: baseNotes.split(',').map(note => note.trim()),
      longevity: longevity.split(',').map(item => item.trim()),
      gender: gender.split(',').map(item => item.trim()),
      images: images.split(',').map(img => img.trim()),
      suppliers: suppliers.split(',').map(supplier => ({ name: supplier.trim() })),
    };

    try {
      const response = await api.post('/api/perfumes/add', newPerfume);
      if (response.status === 201) {
        alert('Parfumul a fost adăugat cu succes!');
        setName('');
        setTopNotes('');
        setMiddleNotes('');
        setBaseNotes('');
        setLongevity('');
        setGender('');
        setImages('');
        setSuppliers('');
      }
    } catch (error) {
      console.error('Eroare la adăugarea parfumului:', error);
      alert('A apărut o eroare. Vă rugăm să încercați din nou.');
    }
  };

  return (
    <div className="add-perfume-container">
      <h1>Adaugă un nou parfum</h1>
      <form onSubmit={handleSubmit} className="perfume-form">
        <div className="form-group">
          <label>Nume parfum:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Note de vârf (separate prin virgulă):</label>
          <input type="text" value={topNotes} onChange={(e) => setTopNotes(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Note de mijloc (separate prin virgulă):</label>
          <input type="text" value={middleNotes} onChange={(e) => setMiddleNotes(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Note de bază (separate prin virgulă):</label>
          <input type="text" value={baseNotes} onChange={(e) => setBaseNotes(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Longevitate (separate prin virgulă):</label>
          <input type="text" value={longevity} onChange={(e) => setLongevity(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Gen (separate prin virgulă):</label>
          <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Imagini (URL-uri separate prin virgulă):</label>
          <input type="text" value={images} onChange={(e) => setImages(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Furnizori (separate prin virgulă):</label>
          <input type="text" value={suppliers} onChange={(e) => setSuppliers(e.target.value)} required />
        </div>

        <button type="submit" className="submit-btn">Adaugă Parfum</button>
      </form>
    </div>
  );
};

export default AddPerfumeScreen;
