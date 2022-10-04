import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext"

function Addnote(props) {
    const context = useContext(noteContext)
    const { addnote } = context
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleonclick = (e) => {
        e.preventDefault()
        addnote(note.title, note.description, note.tag)
        props.showAlert("Note Added Successfully","success")
        setNote({ title: "", description: "", tag: "" })
    }
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className="mt-3 ">
                <h2>Add a Note</h2>
            </div>
            <div className="container my-3">
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' value={note.title}aria-describedby="emailHelp" onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description'value={note.description} onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag'value={note.tag} onChange={onchange} />
                    </div>
                    <button type="submit" disabled={note.title.length<3||note.description.length<5} className="btn btn-primary" onClick={handleonclick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default Addnote
