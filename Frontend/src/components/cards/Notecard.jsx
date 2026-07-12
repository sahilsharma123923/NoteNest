import React from 'react'
import {MdCreate, MdDelete, MdOutlinePushPin} from "react-icons/md"

const Notecard = ({title, date, content, tags, isPinned, onEdit, onDelete, onPinNote}) => {
  return (
    <div 
      className='border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out cursor-pointer'
      onClick={onEdit}
    >
      <div className='flex items-center justify-between'>
        <div>
          <h6 className='text-sm font-medium'>{title}</h6>
          <span className='text-xs text-slate-500'>{date}</span>
        </div>
        <MdOutlinePushPin
          className={`icon-btn ${isPinned ? 'text-blue-500' : 'text-slate-300'}`}
          onClick={(e) => {
            e.stopPropagation();
            onPinNote();
          }}
        />
      </div>

      <p className='text-xs text-slate-600 mt-2'>{content?.slice(0, 60)}</p>

      <div className='flex items-center justify-between mt-2'>
        <div className='flex flex-wrap gap-1 text-xs text-slate-500'>
          {tags?.map((tag, index) => (
            <span key={index} className='bg-slate-100 px-2 py-0.5 rounded-full'>
              #{tag}
            </span>
          ))}
        </div>
        <div className='flex items-center gap-2'>
          <MdCreate 
            className='icon-btn hover:text-green-600' 
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          />
          <MdDelete 
            className='icon-btn hover:text-red-500' 
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Notecard