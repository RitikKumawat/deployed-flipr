import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createInstance, getInstances } from '../services/operations/adminApi';
import { useNavigate } from 'react-router-dom';
import { LogoutButton } from '../components/LogoutButton';

export const Home = () => {
    const {user} = useSelector((state)=>state.auth);
    const {instances} = useSelector((state)=>state.admin);
    console.log("instances",instances);
    const [host,setHost] = useState("");
    const [port,setPort] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector((state)=>state.auth);
    const [newInstance,setNewInstance] = useState(false);
    useEffect(()=>{
        dispatch(getInstances(token,navigate))
        setNewInstance(false);
    },[])
    const handleCreateInstance = (e)=>{
        e.preventDefault();
        setNewInstance(true);
    }
    const createNewInstance = (e)=>{
        e.preventDefault();
        dispatch(createInstance(host,port,token,navigate))
    }
    const handleClickViewDatabases = (instanceId) => {
        
        const selectedInstance = instances.find((instance) => instance._id === instanceId);
        
        navigate('/databases', { state: { instance: selectedInstance } });
    };
    return (
        <div className='bg-black h-screen'>

        <div className="container mx-auto py-8 relative">
        <h1 className="text-3xl font-bold mb-4 text-white text-center">MongoDB Instances</h1>
        <div className='mx-auto w-fit'>
        <div className='flex items-center h-fit gap-4'>

        <button onClick={handleCreateInstance} className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Create New Instance
        </button>
        <LogoutButton/>
        </div>

        </div>
        {
            instances.length === 0 ? "No instances found" : (
                <div className="grid grid-cols-1 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
                {instances.map(instance => (
                    <div key={instance._id} className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-2">Host:{instance.host} Port:{instance.port}</h2>
                        <p className="text-sm text-gray-600">Databases: {instance.databases.length}</p>
                        <p className='text-sm text-gray-600 hover:text-blue-600 cursor-pointer' onClick={() => handleClickViewDatabases(instance._id)}>
                         Click to view the databases</p>
                    </div>
                ))}
            </div>
            )
        }
            
    </div>
    {
        newInstance && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                                            Create New Instance
                                        </h3>
                                        <div className="mt-2">
                                            <div className="mb-4">
                                                <label htmlFor="host" className="block text-sm font-medium text-gray-700">
                                                    Host
                                                </label>
                                                <input
                                                    type="text"
                                                    name="host"
                                                    id="host"
                                                    value={host}
                                                    onChange={(e) => setHost(e.target.value)}
                                                    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="port" className="block text-sm font-medium text-gray-700">
                                                    Port
                                                </label>
                                                <input
                                                    type="text"
                                                    name="port"
                                                    id="port"
                                                    value={port}
                                                    onChange={(e) => setPort(e.target.value)}
                                                    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    onClick={createNewInstance}
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Create
                                </button>
                                <button
                                    onClick={() => setNewInstance(false)}
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
  )
}
