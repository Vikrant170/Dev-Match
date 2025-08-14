import axios from 'axios';
import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';
import { Link } from 'react-router-dom';

const Connection = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connection);
    const fetchConnections = async () => {
        try{
            const res = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true
            });
            dispatch(addConnection(res?.data?.data));
           
            
        }catch (error) {
           
        }
    }
    useState(()=>{
        fetchConnections();
    }, []);
    if (!connections || connections.length === 0){
        return (
            <div className="min-h-screen flex justify-center items-center">
                <h1 className="text-2xl font-semibold">No connections found.</h1>
            </div>
        );
    } 
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-[gilroy] font-semibold text-white text-center mb-8">
                    Your Connections
                </h1>
                
            

                <div className=" space-y-3">
                    {connections.map((connection, index) => {
                        const {_id,firstName, lastName, photoUrl, age, gender, about, skills} = connection;
                        return (
                            <div key={index} className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30">
                                <div className="flex items-center space-x-4">
                                    <img 
                                        src={photoUrl || '/api/placeholder/60/60'} 
                                        alt={`${firstName} ${lastName}`}
                                        className="w-12 h-12 rounded-full object-cover bg-slate-600 flex-shrink-0"
                                        onError={(e) => {
                                            e.target.src = '/api/placeholder/60/60';
                                        }}
                                    />
                                    
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold text-white truncate">
                                            {firstName} {lastName}
                                        </h3>
                                        
                                        <div className="text-slate-300 text-sm">
                                            {age && `${age}`} {age && gender && "•"} {gender}
                                        </div>
                                        
                                        {about && (
                                            <p className="text-slate-400 text-sm mt-1 line-clamp-2">
                                                {about}
                                            </p>
                                        )}
                                        
                                        {skills && skills.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {skills.slice(0, 2).map((skill, skillIndex) => (
                                                    <span key={skillIndex} className="px-2 py-1 bg-blue-600/30 text-blue-300 rounded-md text-xs">
                                                        {skill}
                                                    </span>
                                                ))}
                                                {skills.length > 2 && (
                                                    <span className="px-2 py-1 bg-slate-600/50 text-slate-300 rounded-md text-xs">
                                                        +{skills.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <Link to={"/chat/"+_id } className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200 flex-shrink-0">
                                        Chat
                                    </Link >
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>  
  )
}

export default Connection
