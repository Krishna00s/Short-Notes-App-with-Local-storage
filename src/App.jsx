// import React, { useState } from 'react'

// const App = () => {
//   const [Title, setTitle] = useState('')

//   const submitHandler = (e) => {
//     e.preventDefault();
//     console.log('Form Submitted by', Title)
//     setTitle('')
//   }

//   return (
//     <div>
//       <form onSubmit={(e) => {
//         submitHandler(e)
//       }}>

//         <input type="text" placeholder='Type Here...' value={Title} onChange={(e) => {
//           setTitle(e.target.value)
//         }} />
//         <button>Submit</button>
//       </form>
//     </div>
//   )
// }

// export default App


import { useEffect, useState } from 'react'

const App = () => {

  const submitHandler = (e) => {

    e.preventDefault();

    if (!Title || !Details) return

    setTask([{ Title, Details }, ...Task])
    setTitle('')
    setDetails('')
  }

  const [Title, setTitle] = useState('')
  const [Details, setDetails] = useState('')
  const [Task, setTask] = useState(()=>{
    const saved = localStorage.getItem('OldNotes')
    return saved? JSON.parse(saved) : []
  })

  const DeleteNote = (idx) => {
    const CopyTask = [...Task]
    CopyTask.splice(idx, 1)
    setTask(CopyTask)
  }

  useEffect(() => {
    localStorage.setItem('OldNotes', JSON.stringify(Task))
  }, [Task])

  
  return (
    <div className='h-screen lg:flex bg-black text-white'>

      <form onSubmit={(e) => {
        submitHandler(e)
      }} className='flex lg:w-1/2 flex-col gap-4 p-10'>
        <h1 className='text-3xl font-bold'>Add Notes</h1>

        {/* Heading of the note */}
        <input className='px-5 py-2 border-2 rounded-l' type="text" placeholder='Enter Notes Heading' value={Title} onChange={(e) => {
          setTitle(e.target.value)
        }} />

        {/* Setting Details here */}
        <textarea type="text" placeholder='Enter Details...' className='px-5 py-2 h-30 border-2 rounded-l' value={Details} onChange={(e) => {
          setDetails(e.target.value)
        }} />
        <button className='bg-white text-black px-5 py-2 rounded'>Add Note</button>
      </form>
      <div className='lg:w-1/2 lg:border-l p-10 overflow-hidden'>
        <h1 className='text-3xl font-bold'>Recent Notes</h1>
        <div className='flex flex-wrap items-start justify-start gap-5 mt-5 h-[90%] overflow-auto '>
          {Task.map((elem, idx) => {
            return <div key={idx} className='relative justify-between items-start flex flex-col h-52 w-40 bg-cover bg-[url(https://static.vecteezy.com/system/resources/previews/037/152/677/non_2x/sticky-note-paper-background-free-png.png)] rounded-2xl pb-2 px-2'>
              <div>
                <h3 className='text-black pt-4 first-letter:uppercase leading-tight font-bold text-xl pl-2 pr-2'>{elem.Title}</h3>
                <p className='first-letter:uppercase pl-2 leading-tight mt-3 font-medium text-gray-600 pr-2'>{elem.Details}</p>
              </div>
              <button onClick={() => {
                DeleteNote(idx)
              }} className='bg-yellow-500 py-0.5 w-full text-xs  rounded-full active:scale-95 font-bold leading-normal tracking-wide cursor-pointer'>Delete</button>
            </div>
          })}
        </div>
      </div>
    </div>

  )
}

export default App
