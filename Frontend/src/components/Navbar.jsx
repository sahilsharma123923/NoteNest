import React from 'react'
import { Link } from "react-router-dom";
import SearchBar from './SearchBar/SearchBar';
import { getInitials } from '../utils/helper';

const Navbar = ({ userInfo, onLogout, searchQuery, setSearchQuery, onSearchNote, onClearSearch }) => {

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearchNote(searchQuery)
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    onClearSearch();
  }

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
      <h2 className='text-xl font-medium text-black py-2'>NoteNest</h2>

      <SearchBar 
        value={searchQuery}
        onChange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={handleClear}
      />

      {userInfo ? (
        <div className="flex items-center gap-3">
          <div className='w-10 h-10 flex items-center justify-center rounded-full text-white font-medium bg-slate-500'>
            {getInitials(userInfo.name)}
          </div>
          <div>
            <p className='text-sm font-medium text-black'>{userInfo.name}</p>
            <button 
              className='text-sm text-gray-600 underline hover:text-gray-900' 
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-7">
          <Link to="/login" className="text-sm text-gray-600 px-3 py-2 hover:text-gray-900">
            Login
          </Link>
          <Link to="/register" className="text-sm bg-gray-600 text-white px-3 py-1.5 rounded-md hover:bg-gray-900 transition">
            Signup
          </Link>
        </div>
      )}
    </div>
  )
}

export default Navbar