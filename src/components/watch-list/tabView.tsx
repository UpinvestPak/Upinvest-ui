// components/Watchlist.js
"use client"
import { useState } from 'react';
import { FiPlus, FiFilter, FiGrid } from 'react-icons/fi';
import MarketTable from './tableView';
import Modal from './Model';


export default function TabView() {
  const [activeTab, setActiveTab] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [hideTab, setHideTab] = useState(false)


  const tabs = ['All', 'Banking', 'Cement', 'Argri'];


  return (
    <div className="max-w-full md:mx-3 mx-0.5">
      <div className="flex justify-between items-center">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-black">My Watchlist</h1>

        {/* Icons */}
        <div className="flex space-x-3">
          <button className="p-2 hover:bg-gray-100 rounded-full" onClick={()=>setIsModalOpen(true)}>
            <FiPlus className="text-xl"
             />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full"  onClick={()=>setHideTab(!hideTab)}  >
            <FiFilter className="text-xl text-green-500" />
          </button>
        
        </div>
      </div>

      <div className="mt-6">
        {!hideTab &&( <div className="flex space-x-2 md:space-x-4 font-medium ">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 md:px-6 py-1 md:py-2 text-sm font-medium  border-2 rounded-full  ${
                activeTab === tab
                  ? 'bg-primary border-2   text-white '
                  : 'text-black font-normal'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}
       
      </div>
   
      <MarketTable/>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> 

    </div>
  );
}





