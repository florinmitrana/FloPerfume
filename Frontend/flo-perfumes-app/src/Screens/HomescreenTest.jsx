import React, { useEffect, useState } from 'react'
import api from '../api/axiosConfig'

const HomescreenTest = () => {

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
        <div className='w-full py-[10rem] px-4 bg-black'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
             {perfumes.map( (perfume, index) => (
             <div className='w-2/3 h-7/8 shadow-xl flex flex-col p-3 my-4 rounded-lg hover:scale-105 duration-300 bg-slate-900 justify-center'>
                <div className="card-content">
                <img className='w-20 mx-auto mt-[-3rem] ' src={perfume.images[0]} alt="/" />
                    <h2 className='text-2xl font-bold text-center py-8 text-[#00df9a]'>{perfume.name}</h2>
                    <div className='text-center font-medium text-1xl text-white '>
                    <h2 className='py-2 border-b mx-8 mt-8'>Note de vârf: {perfume.topNotes.join(', ')}</h2>
                    </div>
                    <a href= {`/${perfume.id}/recommandations`} class="bg-[#00df9a] hover:bg-blue-700 text-white font-bold py-2 px-4 mx-auto block text-center rounded">Vezi Recomandări</a>
                    <a href= {`/${perfume.id}/details`} class="bg-[#00df9a] hover:bg-blue-700 text-white font-bold py-2 px-4 mx-auto block text-center rounded my-4">Vezi Mai Multe Detalii</a>         
                </div>
            </div>
            ))}
        </div>
        </div>
    )
}

export default HomescreenTest;
