import { faArrowRight, faCalendarWeek } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment/moment';
import React from 'react';
import loadFailed from '../../assets/loadFailed.jpg';

const Data = ({ prepareDataToPassModal, data }) => {
  const { id, image, features, name, published_in } = data;

  return (
    <div className="border rounded-md shadow-md p-6">
      <div className="mb-6">
        <img className="h-48 w-96" src={image || loadFailed} alt="" />
      </div>
      <div>
        <h3 className="text-2xl font-semibold mb-4">Features</h3>
        <ol className="list-decimal ml-8">
          {features && features.length > 0 ? features.map((feature, index) => <li key={index}>{feature}</li>) : 'No data Found'}
        </ol>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-semibold mb-4">{name || 'No data Found'}</h3>
          <p><span><FontAwesomeIcon icon={faCalendarWeek} /></span> {published_in ? moment(published_in).format('L') : 'No data Found'}</p>
        </div>
        <div>
          <button onClick={() => prepareDataToPassModal(id)} type="button" className="btn btn-xs btn-circle btn-outline"><FontAwesomeIcon icon={faArrowRight} /></button>
        </div>
      </div>
    </div>
  );
};

export default Data;
