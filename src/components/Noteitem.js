import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"

function Noteitem(props) {
    const context = useContext(noteContext)
    const { deletenote } = context

    const { notes,updatenote } = props
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{notes.title}</h5>
                    <p className="card-text">{notes.description}</p>
                    <p className="card-text">{notes.tag}</p>
                    <i className="fa-solid fa-trash-can "onClick={()=>{deletenote(notes._id); props.showAlert("Updated Successfully","success")}}></i>
                    <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>{updatenote(notes)}}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
