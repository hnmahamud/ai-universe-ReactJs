import React, { useState } from 'react';
import Datas from '../Datas/Datas';

const Main = () => {
  const [isShowAll, setShowAll] = useState(false);
  const [sort, setSort] = useState(false);
  return (
    <main className="mt-12">
      <div className="text-center my-12">
        <h1 className="text-gray-600 text-3xl md:text-4xl font-black mb-8">AI Universe Hub</h1>
        <button onClick={() => setSort(true)} type="button" className="btn btn-xs">Sort By Date</button>
      </div>

      <Datas isShowAll={isShowAll} sort={sort} />

      <div className="text-center mb-12">
        {!isShowAll && <button onClick={() => setShowAll(true)} type="button" className="btn btn-wide">See More</button>}
      </div>
    </main>
  );
};

export default Main;
