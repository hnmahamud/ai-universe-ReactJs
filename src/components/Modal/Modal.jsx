import axios from 'axios';
import React, { useEffect, useState } from 'react';
import loadFailed from '../../assets/loadFailed.jpg';

const Modal = ({ isModalOpen, setIsOpen, singleId }) => {
  const [singleData, setSingleData] = useState({});

  useEffect(() => {
    const loadSingleData = async () => {
      try {
        const response = await axios.get(`https://openapi.programming-hero.com/api/ai/tool/${singleId}`);
        setSingleData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadSingleData();
  }, []);

  const { description, pricing, features, integrations, image_link, accuracy, input_output_examples } = singleData;

  const allPricePlane = [];
  if (pricing) {
    pricing.forEach(element => {
      allPricePlane.push(element);
    });
  }

  const allFeatures = [];
  if (features) {
    for (const index in features) {
      allFeatures.push(features[index].feature_name);
    }
  }

  return (
    <div>
      <input checked={isModalOpen} onChange={() => {}} type="checkbox" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div id="modal-container" className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-orange-50 border border-orange-300 rounded-md shadow-md p-6">
              <h4 className="font-semibold text-2xl mb-6">{description || 'No data Found'}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6">
                <div className="bg-white rounded-md p-4">
                  <p className="text-green-600 font-bold">{allPricePlane.length > 0 && allPricePlane[0].price ? allPricePlane[0].price : 'Free of Cost/'}</p>
                  <p className="text-green-600 font-bold">{allPricePlane.length > 0 && allPricePlane[0].plan ? allPricePlane[0].plan : 'Basic'}</p>
                </div>
                <div className="bg-white rounded-md p-4">
                  <p className="text-orange-600 font-bold">{allPricePlane.length > 0 && allPricePlane[1].price ? allPricePlane[1].price : 'Free of Cost/'}</p>
                  <p className="text-orange-600 font-bold">{allPricePlane.length > 0 && allPricePlane[1].plan ? allPricePlane[1].plan : 'Pro'}</p>
                </div>
                <div className="bg-white rounded-md p-4">
                  <p className="text-red-600 font-bold">{allPricePlane.length > 0 && allPricePlane[2].price ? allPricePlane[2].price : 'Free of Cost/'}</p>
                  <p className="text-red-600 font-bold">{allPricePlane.length > 0 && allPricePlane[2].plan ? allPricePlane[2].plan : 'Enterprise'}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <h4 className="text-2xl font-semibold mb-4">Features</h4>
                  <ul className="list-disc ml-8">
                    {allFeatures.length > 0 ? allFeatures.map((item, index) => <li key={index}>{item}</li>) : 'No data Found'}
                  </ul>
                </div>
                <div>
                  <h4 className="text-2xl font-semibold mb-4">Integrations</h4>
                  <ul className="list-disc ml-8">
                    {integrations && integrations.length > 0 ? integrations.map((item, index) => <li key={index}>{item}</li>) : 'No data Found'}
                  </ul>
                </div>
              </div>
            </div>
            <div className="order-first md:order-last border rounded-md shadow-md p-6">
              <div className="relative inline-flex">
                <img src={image_link && image_link.length > 0 ? image_link.find(img => img) : loadFailed} alt="" />
                {accuracy && accuracy.score ? <div className="absolute inline-flex bg-red-500 text-white text-xs rounded-md py-1 px-4 top-1 right-1">{accuracy.score * 100}% accuracy</div> : ''}
              </div>
              <div className="text-center mt-6">
                <h3 className="text-2xl font-semibold">{input_output_examples && input_output_examples.length > 0 ? input_output_examples[0].input : 'Can you give any example?'}</h3>
                <p className="py-4">{input_output_examples && input_output_examples.length > 0 ? input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
              </div>
            </div>
          </div>
          <div className="modal-action">
            <button onClick={() => setIsOpen(false)} type="button" className="btn btn-xs">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
