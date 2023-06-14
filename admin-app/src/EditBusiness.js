import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { supabase } from './supabase';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function EditBusiness() {
  const [image, setImage] = useState(null);
  const [promos, setPromos] = useState([]);
  let query = useQuery();
  const bizSlug = query.get('business-slug');

  useEffect(() => {
    const fetchPromos = async () => {
      let { data: promos, error } = await supabase
        .from('promos')
        .select('*')
        .eq('biz_slug', bizSlug);

      if (error) console.error('Error loading promos:', error);
      else setPromos(promos);
    };

    fetchPromos();
  }, [bizSlug]);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!image) return;

    // Create a unique file name
    const filePath = `${bizSlug}/${image.name}`;

    const { error } = await supabase
      .storage
      .from('business-images')
      .upload(filePath, image);

    if (error) {
      console.error('Error uploading image:', error);
    } else {
      console.log('Image uploaded');
    }
  };

  const handleInputChange = (index, event) => {
    const target = event.target;
    const { name, value } = target;
    const newPromos = [...promos];
    newPromos[index][name] = value;
    setPromos(newPromos);
  }

  const handleSaveClick = async (index) => {
    const { id, ...promo } = promos[index];
    let { error } = await supabase
      .from('promos')
      .update(promo)
      .eq('id', id);
    
    if (error) console.error('Error updating promo:', error);
    else console.log(`Promo ${id} updated`);
  }

  return (
    <div className="max-w-screen-lg m-auto container">
      <div className="my-8 flex flex-col">
        <input className="m-auto" type="file" onChange={handleImageChange} />
        <button className="mb-2 p-2 bg-blue-500 text-white rounded" onClick={handleImageUpload}>Upload Image</button>
      </div>

      {promos.map((promo, index) => (
        <div key={index} className="flex flex-col mb-4">
          <input className="mb-2 p-2 border rounded" name="name" value={promo.name} onChange={event => handleInputChange(index, event)} />
          <textarea className="mb-2 p-2 border rounded" name="description" value={promo.description} onChange={event => handleInputChange(index, event)} />
          <input className="mb-2 p-2 border rounded" name="donation_price" value={promo.donation_price} onChange={event => handleInputChange(index, event)} />
          <input className="mb-2 p-2 border rounded" name="purchase_price" value={promo.purchase_price} onChange={event => handleInputChange(index, event)} />
          <input className="mb-2 p-2 border rounded" name="inventory" value={promo.inventory} onChange={event => handleInputChange(index, event)} />
          <button className="mb-2 p-2 bg-blue-500 text-white rounded" onClick={() => handleSaveClick(index)}>Save</button>
        </div>
      ))}
    </div>
  );
}

export default EditBusiness;
