import axios from 'axios';
import React, { useEffect, useState } from 'react';
import sortByDate from '../../utilities/SortByDate';
import Data from '../Data/Data';
import Modal from '../Modal/Modal';

const Datas = ({ isShowAll, sort }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [singleId, setSingleId] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get('https://openapi.programming-hero.com/api/ai/tools');
        setLoading(false);
        setData(response.data.data.tools);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const sortData = sortByDate(data);
    setData([...sortData]);
  }, [sort]);

  const prepareDataToPassModal = (individualId) => {
    setSingleId(individualId);
    setIsOpen(true);
  };

  return (
    <div>
      {
        isLoading && (
        <div className="mt-20">
          <div className="flex items-center justify-center">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
              >Loading...
              </span>
            </div>
          </div>
        </div>
        )
      }

      {isOpen && <Modal isModalOpen={isOpen} setIsOpen={setIsOpen} singleId={singleId} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {isShowAll ? data.map((singleData) => <Data key={singleData.id} prepareDataToPassModal={prepareDataToPassModal} data={singleData} />) : data.slice(0, 6).map((singleData) => <Data key={singleData.id} prepareDataToPassModal={prepareDataToPassModal} data={singleData} />)}
      </div>
    </div>
  );
};

export default Datas;
