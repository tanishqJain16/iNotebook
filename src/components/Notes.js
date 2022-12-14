
import React, { useContext, useEffect, useRef,useState } from 'react'
import noteContext from "../context/notes/noteContext"
import Addnote from './Addnote'
import Noteitem from './Noteitem'
import {  useNavigate } from 'react-router'
function Notes(props) {
  let navigate=useNavigate()
  const context = useContext(noteContext)
  const { notes, getnote ,editnote} = context
  const [note, setNote] = useState({ id:"",etitle: "", edescription: "", etag: "default" })
  useEffect(() => {
    if(localStorage.getItem('token')){

      getnote()
    }
    else
    {
      navigate("/login")
    }
     //eslint-disable-next-line
  }, [])
  const ref = useRef(null)
  const refClose = useRef(null)
  const updatenote = (currentnote) => {
    ref.current.click()
    setNote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
    
  }
  const handleonclick = (e) => {
    e.preventDefault()
    editnote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click()
    props.showAlert("Updated Successfully","success")
}
const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
}

  return (
    <>
      <Addnote showAlert={props.showAlert}/>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onchange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription}onChange={onchange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onchange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<3||note.edescription.length<5} onClick={handleonclick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h2>Your Notes</h2>
        <div className="container mx-3">
        {notes.length===0&&"No notes to display"}
        </div>
        {
          notes.map((notes) => {
            return <Noteitem key={notes._id} updatenote={updatenote} notes={notes} showAlert={props.showAlert} />
          })
        }
      </div>
    </>
  )
}

export default Notes
