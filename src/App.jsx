import { useState, useEffect } from 'react'
import Note from './components/Note'
import NewNote from "./components/NewNote.jsx";
import noteService from './services/notes'


const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)

    const addNote = event => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
        }


        noteService.create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote('');
            })
    }

    const newNoteEntry = (event) => {
        console.log(event.target.value);
        setNewNote(event.target.value);
        console.log('name changed', event.target);
    }

    useEffect(() => {
        console.log('effect')
        noteService.getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }, []);
    const toggleImportanceOf = id => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService.update(id, changedNote).then(returnedNote => {
            setNotes(notes.map(note => note.id !== id ? note : returnedNote))
        })
    }

    console.log('render', notes.length, 'notes');
    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all' }
                </button>
            </div>
            <ul>
                {   notes.filter(note => showAll? note: note.important !== showAll? note:null).map(note =>
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)}
                    />
                )}
            </ul>
            <NewNote addEntry = {addNote} newEnteredNote={newNote} handler ={newNoteEntry}/>
        </div>
    )

    // ...
}
export default App;