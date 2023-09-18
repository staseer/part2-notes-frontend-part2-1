const NewNote = (props) => {
 return (<div><form onSubmit={props.addEntry}>
        <div>
            New Note: <input value={props.newEnteredNote} onChange={props.handler}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
    </div>)
}

export default NewNote;