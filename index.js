




document.addEventListener('DOMContentLoaded', function(){

  function idkWhatToCallThis(data){
    const NOTES = data
    console.log(NOTES)

    function renderNoteTitles(data){
      document.getElementById('notes').innerHTML = data.map(note => `<li data-note-id="${note.id}">${note.title}</li><br>`).join("")
      // add user name
    }

    function renderName(data) {
      document.getElementById('name').innerHTML = `${data.user.name}'s Awesome Shit`
    }

    document.getElementById('notesNav').addEventListener('click', function(e){
      if (e.target.dataset.noteId){
        note = NOTES.find(note => note.id === parseInt(e.target.dataset.noteId))
        noteContent = document.getElementById('notecontent')
        noteContent.innerHTML = `
        <h1>${note.title}</h1>
        ${note.body}
        `

        const ed = document.createElement('BUTTON')
        let t = document.createTextNode("Edit")
        ed.appendChild(t)
        noteContent.innerHTML += "<br><br><br>"
        noteContent.appendChild(ed)

        const del = document.createElement('BUTTON')
        t = document.createTextNode("Delete")
        del.appendChild(t)
        noteContent.appendChild(del)

        ed.addEventListener('click', function(){
          noteContent.innerHTML = `
            <form>
              <input type="text" id="new-title" value="${note.title}"></input>
              <br>
              <textarea rows="20" cols="60" id="new-body">${note.body}</textarea>
              <br>
              <input type="submit" value="Save" id="save">
            </form>
          `
          // event listener for save button in here?
          document.getElementById('save').addEventListener('click', function(e){
            e.preventDefault()
            note.title = document.getElementById('new-title').value
            note.body = document.getElementById('new-body').value
            debugger
            let url = 'http://localhost:3000/api/v1/notes/' + note.id
            let options = {id:note.id, title:note.title, body:note.body}
            console.log(options)

            fetch(url, {
              method: "PATCH",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(options)})
              .then(res => res.json())
              .then(json => console.log(json))

            noteContent.innerHTML = `
            <h1>${note.title}</h1>
            ${note.body}
            `
          })
        })

        del.addEventListener('click', function(){
          alert('delete was clicked')
        })



      } else if (e.target.id === "newbtn"){
        noteContent = document.getElementById('notecontent')
        noteContent.innerHTML = `
          <form>
            <input type="text" placeholder="TITLE THIS BITCH" id="newTitle"></textfield>
            <br>
            <br>
            <textarea placeholder="SAY SOME SHIT ABOUT IT" rows="20" cols="60" id="newBody"></textarea>
            <br>
            <input type="submit" value="Save" id="submit">
          </form>
        `
        // event listener for save button in here?

        document.getElementById('save').addEventListener('click', function(e){
          e.preventDefault()
          title = document.getElementById('newTitle').value
          body = document.getElementById('newBody').value
          // fetch('http://localhost:3000/api/v1/notes', {
          //   method: 'post'
          // }
        })
      }
    })

    renderNoteTitles(NOTES)
    renderName(NOTES[0])
  }

  fetch('http://localhost:3000/api/v1/notes').then(r => r.json()).then(json => idkWhatToCallThis(json))

})
