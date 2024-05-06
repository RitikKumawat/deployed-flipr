import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, assignRole, createDatabase, fetchDatabases, getInstances } from '../services/operations/adminApi';
import AddUserModal from '../components/AddUserModal';
import CreateUserModal from '../components/CreateUserModal';
import { FaRegEdit } from "react-icons/fa";
import EditAccessRole from '../components/EditAccessRole';
const Databases = () => {
    const location = useLocation();
    // const {instances} = useSelector((state)=>state.admin);
    const instance = location.state.instance;
    // console.log("instance....",instance);
    // console.log("instances....",instances);
    const [databases, setDatabases] = useState(instance.databases);
    const [newDatabaseName, setNewDatabaseName] = useState('');
    const [selectedDatabase,setSelectedDatabase] = useState();
    const [db,setDb] = useState([]);
    const {token} = useSelector((state)=>state.auth);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModal,setEditModal] = useState(false);
    const [newUserEmail, setNewUserEmail] = useState('');
    const [accessRole,setAccessRole] = useState("");
    const [selectedUserEmail,setSelectedUserEmail] = useState("");
    const [newUserRole, setNewUserRole] = useState('');
    const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
    const navigate = useNavigate();
    // console.log("databases",databases);
    const dispatch = useDispatch();
    const handleCreateDatabase =  () => {
        dispatch(createDatabase(newDatabaseName,instance._id,token))
        navigate("/");
    };
    const handleCreateUser = () => {
        dispatch(addUser(newUserEmail,selectedDatabase,token));
        setSelectedDatabase("");
        
        setIsModalOpen(false);
        navigate("/");
    };
    
    return (
        <div className=" mx-auto py-8 bg-black h-screen ">
            <h1 className="text-3xl font-bold mb-4 text-white text-center">Databases for {instance.host}:{instance.port}</h1>
            <div className="mb-4 flex w-fit mx-auto">
                <input
                    type="text"
                    placeholder="Enter new database name"
                    value={newDatabaseName}
                    onChange={(e) => setNewDatabaseName(e.target.value)}
                    className="p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm"
                />
                <div className='flex gap-4'>

                <button
                    onClick={handleCreateDatabase}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md w-fit"
                >
                    Create Database
                </button>
                <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md w-fit'
                onClick={() => setIsCreateUserModalOpen(true)}>
                    Create New User
                </button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {databases.map(database => (
                    <div key={database._id} className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg text-center font-semibold mb-2">Database Name</h2>
                        <h2 className="text-lg text-center mb-2">{database.name}</h2>
                        
                        <div className='flex  justify-center gap-4'>
                            <div>

                                <p className="text-sm font-bold text-gray-600">Users: </p>
                                <div className="text-sm text-gray-600">{database?.users.map((user)=>(
                                    <p key={user._id}>{user.username}</p>
                                ))} </div>
                            </div>
                            <div>

                                <p className="text-sm font-bold text-gray-600">Role: </p>
                                <div className="text-sm text-gray-600">{database?.users.map((user)=>(
                                    
                                    <p key={user._id} className='flex items-center gap-3' >{user.accessRoles.map((r)=>(
                                        <p>{r.role}</p>
                                    ))}
                                    

                                    <FaRegEdit className=" cursor-pointer" onClick={()=>{
                                        setSelectedUserEmail(user.email);
                                        setEditModal(true)
                                        setSelectedDatabase(database.name)
                                    }}/>
                                    </p>
                                    
                                ))} </div>
                            </div>
                            
                        </div>
                        <button className='mx-auto mt-2 text-sm flex justify-center bg-blue-500 rounded-lg p-1 hover:bg-blue-700 text-white'
                        onClick={() => {
                            setIsModalOpen(true)
                            setSelectedDatabase(database.name)
                        }}>
                                Add user
                            </button>

                    </div>
                ))}
            </div>
            <AddUserModal
                selectedDatabase={selectedDatabase}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreateUser={handleCreateUser}
            />
            <CreateUserModal
                isOpen={isCreateUserModalOpen}
                onClose={() => setIsCreateUserModalOpen(false)}
                onCreateUser={handleCreateUser}
            />
            <EditAccessRole
                isOpen={editModal}
                onClose = {()=>setEditModal(false)}
                email={selectedUserEmail}
                database={selectedDatabase}
            />
        </div>
    );
};

export default Databases;