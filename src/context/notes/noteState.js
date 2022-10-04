import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState=(props)=>{
  const host="http://localhost:5000"
    const notesInitial=[]
    const [notes,setNotes]=useState(notesInitial)

    //get all notes
    const getnote=async()=>{
      const response = await fetch(`${host}/api/notes/getallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token":localStorage.getItem('token')
        },
      });
      const json=await response.json();
      console.log(json);
      setNotes(json)
    }
    //Add a note
    const addnote=async(title,description,tag)=>{
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token":localStorage.getItem('token')
        },
      body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
      });
      const note= await response.json();
      setNotes(notes.concat(note))
    }
    //Delete a note
    const deletenote=async(id)=>{
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token":localStorage.getItem('token')
        },
      });
      const json= await response.json();
      console.log(json); 
      const newnote=notes.filter((note)=>{return note._id!==id})
      setNotes(newnote)
    }
    //Edit a note
    const editnote=async (id,title,description,tag)=>{

      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token":localStorage.getItem('token')
        },
      body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
      });
      const json= await response.json();
      console.log(json); // parses JSON response into native JavaScript objects
    let newnotes=JSON.parse(JSON.stringify(notes))
      for(let index=0;index<notes.length;index++)
      {
        const element=newnotes[index]
        if(element._id===id)
        {
          newnotes[index].title=title
          newnotes[index].description=description
          newnotes[index].tag=tag
          break;
        }
      }
      setNotes(newnotes)
    }
    

      return(
          <noteContext.Provider value={{notes,addnote,deletenote,editnote,getnote}}>
            {props.children}
        </noteContext.Provider>
    );
    
}

export default NoteState