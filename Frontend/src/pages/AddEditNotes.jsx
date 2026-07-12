import React, { useState, useEffect } from 'react'
import TagInput from '../components/Input/TagInput'
import { addNote, updateNote } from '../services/noteService'

const AddEditNotes = ({ type, noteData, onClose, onNoteAdded }) => {
  const [title, setTitle] = useState(noteData?.title || "")
  const [content, setContent] = useState(noteData?.content || "")
  const [tags, setTags] = useState(noteData?.tags || [])
  const [error, setError] = useState(null)

  useEffect(() => {
    setTitle(noteData?.title || "")
    setContent(noteData?.content || "")
    setTags(noteData?.tags || [])
  }, [noteData])

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError("Please enter a title")
      return
    }
    if (!content.trim()) {
      setError("Please enter content")
      return
    }
    setError(null)

    try {
      const response = type === "edit"
        ? await updateNote(noteData._id, { title, content, tags })
        : await addNote({ title, content, tags })

      if (response) {
        onNoteAdded?.()
        onClose()
      }
    } catch (err) {
      setError(err.response?.data?.message || "An unexpected error occurred. Please try again.")
    }
  }

  return (
    <div>
      <div className='flex flex-col gap-2'>
        <label className='text-xs text-slate-400'>TITLE</label>
        <input 
          type="text"
          className='text-2xl text-slate-950 outline-none' 
          placeholder='Go To Gym at 5'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className='flex flex-col gap-2 mt-5'>
        <label className='text-xs text-slate-400'>CONTENT</label>
        <textarea 
          className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
          placeholder='Content'
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className='mt-3'>
        <label className='text-xs text-slate-400'>TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className='text-red-500 text-sm pt-4'>{error}</p>}

      <div className='flex justify-center mt-5'>
        <button 
          className='w-fit px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium rounded'
          onClick={handleSubmit}
        >
          {type === "edit" ? "UPDATE" : "ADD"}
        </button>
      </div>
    </div> 
  )
}

export default AddEditNotes