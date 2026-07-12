import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Notecard from '../components/cards/Notecard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { getUserInfo } from '../services/authService'
import { getAllNotes, deleteNote, updateNotePinned } from '../services/noteService'
import api from '../services/api'

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({ isShown: false, type: "add", data: null })
  const [userInfo, setUserInfo] = useState(null)
  const [allNotes, setAllNotes] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearch, setIsSearch] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const navigate = useNavigate()

  const fetchUser = async () => {
    try {
      const data = await getUserInfo()
      if (data?.user) setUserInfo(data.user)
    } catch (error) {
      if (error.response?.status === 401) navigate("/login")
      console.error("Error fetching user info:", error)
    }
  }

  const fetchNotes = async () => {
    try {
      const response = await getAllNotes()
      if (response?.notes) setAllNotes(response.notes)
    } catch (error) {
      console.error("Error fetching notes:", error)
    }
  }

  const onLogout = async () => {
    try {
      await api.post("/auth/logout")
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      setUserInfo(null)
      navigate("/login")
    }
  }

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId)
      fetchNotes()
    } catch (error) {
      console.error("Error deleting note:", error)
    }
  }

  const handlePinNote = async (note) => {
    try {
      await updateNotePinned(note._id, !note.isPinned)
      fetchNotes()
    } catch (error) {
      console.error("Error pinning note:", error)
    }
  }

  const onSearchNote = (query) => {
    const filtered = allNotes.filter(note =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.content.toLowerCase().includes(query.toLowerCase())
    )
    setIsSearch(true)
    setSearchResults(filtered)
  }

  const onClearSearch = () => {
    setIsSearch(false)
    setSearchResults([])
  }

  useEffect(() => {
    fetchUser()
    fetchNotes()
  }, [])

  const notesToDisplay = isSearch ? searchResults : allNotes

  return (
    <div>
      <Navbar 
        userInfo={userInfo} 
        onLogout={onLogout}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchNote={onSearchNote}
        onClearSearch={onClearSearch}
      />

      <div className='container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6'>
        {notesToDisplay.length > 0 ? (
          notesToDisplay.map((note) => (
            <Notecard 
              key={note._id}
              title={note.title}
              content={note.content}
              date={note.createdAt}
              tags={note.tags}
              isPinned={note.isPinned}
              onEdit={() => setOpenAddEditModal({ isShown: true, type: "edit", data: note })}
              onDelete={() => handleDeleteNote(note._id)}
              onPinNote={() => handlePinNote(note)}
            />
          ))
        ) : (
          <p className='text-slate-400 col-span-full text-center mt-10'>
            {isSearch ? "No notes match your search" : "No notes yet — click + to add one"}
          </p>
        )}
      </div>

      {!openAddEditModal.isShown && (
        <button 
          className='w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-600 fixed right-10 bottom-10 z-50 shadow-lg'
          onClick={(e) => {
            e.currentTarget.blur();
            setOpenAddEditModal({ isShown: true, type: "add", data: null });
          }}
        >
          <MdAdd className='text-[32px] text-white'/>
        </button>
      )}

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)" } }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-auto"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
          onNoteAdded={fetchNotes}
        />
      </Modal>
    </div>
  )
}

export default Home