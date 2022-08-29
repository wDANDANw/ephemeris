var createNotesManager = function (targetSelector) {
  var self ={};
  var objectIsActive = false;
  var container = document.querySelector(targetSelector)
  let easymde = undefined
  let nodeToDisplay = undefined

  let currentOpenedNote = undefined

  let theme = {}
  theme.noNote = function () {
    return `
    <div class="ui placeholder segment">
      <div class="ui icon header">
        <i class="sticky note outline icon"></i>
        Select a note to display
      </div>
    </div>`
  }
  theme.editor = function (e) {
     html =`
     <div class="noteAreaEditor">
        <h1 class="ui header">${e.title}
          <button data-name="${e.title}" data-id="${e.uuid}" class="ui basic mini button action_note_manager_rename_note">Rename</button>
          <button data-id="${e.uuid}" class="ui basic red mini button action_note_manager_remove_note">Delete Note</button>
        </h1>
        ${theme.noteTagArea(e)}
       <textarea class="inputNoteAreaEditor"></textarea>
     </div>
    `
    return html
  }
  theme.noteTagArea= function (note) {
     html =`
     <div class="tag_area">
       <div class="tag_list">
       </div>
       <span data-id="${note.uuid}" class="action_note_manager_add_tag"> <i data-id="${note.uuid}" class="manage_tag_button far fa-edit"></i></span>
     </div>
    `
    return html
  }
  theme.noteTag= function (tagName, tagId) {
     html =`
      <div data-id="" class="eph teal tag">${tagName}</div>
    `
    return html
  }
  theme.notePreviewItem = function (i) {
     html =`
     <div data-id="${i.uuid}" class="searchable_note list-item action_note_manager_load_note">
       <div class="relaxed" data-id="${i.uuid}" >
        <strong data-id="${i.uuid}" >${i.title}</strong>
        <div data-id="${i.uuid}" >${i.content.substring(0,135)+".. "}</div>
       </div>
       <i class="fas fa-sticky-note"></i>
     </div>`

    return html
  }
  theme.notePreviewTitle= function (html) {
     html =`
        Notes
        <span class="action_note_manager_add_note small button"> Add</span>
    `
    return html
  }
  theme.noteSearchArea= function () {
     html =`
        <input class="note_search_input search_input" type="text" placeholder="Search..">
        <span class=""> <i class="fas fa-search"></i></span>
    `
    return html
  }


  var init = function () {
    connections()

  }
  var connections =function () {
    connect(".action_note_manager_load_note", "click", (e)=>{
      console.log(e.target.dataset.id);
      let noteId = e.target.dataset.id
      loadNoteByUuid(noteId)
    })
    connect(".action_note_manager_remove_note", "click", (e)=>{
      console.log(e.target.dataset.id);
      if (confirm("This not will be deleted")) {
        let noteId = e.target.dataset.id
        //TODO This has to be removed and routes must be used
        app.store.userData.notes.items = app.store.userData.notes.items.filter(n=>n.uuid != noteId)
        update()
      }
    })
    connect(".action_note_manager_rename_note", "click", (e)=>{
      console.log(e.target.dataset.id);
      let newName = prompt("Enter a new name", e.target.dataset.name)
      if (newName) {
        let noteId = e.target.dataset.id
        //TODO This has to be removed and routes must be used
        let note = app.store.userData.notes.items.filter(n=>n.uuid == noteId)[0]
        if (note) {
          note.title = newName
          renderNote(note)
        }
        update()
      }
    })
    connect(".action_note_manager_add_note", "click", (e)=>{
      app.store.userData.notes.items.push({
        uuid:genuuid(),
        title:"A new Note",
        content:"Click to edit the note"
      })
      update()
    })
    connect(".action_note_manager_add_tag", "click", (e)=>{
      let noteUuid = e.target.dataset.id
      let linkedTag = app.store.userData.tags.items.filter((t) => {
        return t.targets.includes(noteUuid)
      })
      let linkedTagUuid = linkedTag.map((t)=>t.uuid)
      showListMenu({
        sourceData:app.store.userData.tags.items,
        multipleSelection:linkedTagUuid,
        displayProp:"name",
        searchable : true,
        display:[
          {prop:"name", displayAs:"Name", edit:false}
        ],
        idProp:"uuid",
        onCloseMenu: (ev)=>{
          update()
        },
        onAdd:(ev)=>{
          let newTagName = prompt('Add a Tag')
          if (newTagName) {
            app.store.userData.tags.items.push({
              uuid:genuuid(),
              name:newTagName,
              targets:[]
            })
          }
        },
        onRemove:(ev)=>{
          let tagToRemoveName = ev.target.dataset.id
          if (tagToRemoveName) {
            app.store.userData.tags.items= app.store.userData.tags.items.filter((i) => {
              return !(i.uuid==tagToRemoveName)
            })
            console.log(ev);
            ev.select.updateData(app.store.userData.tags.items)
          }
        },
        onChangeSelect: (ev)=>{//TODO all ugly change
          console.log(ev.select.getSelected());
          let selectedTags = ev.select.getSelected()
          app.store.userData.tags.items.forEach((item) => {
            if (selectedTags.includes(item.uuid)) {//if one of selected
              var index = item.targets.indexOf(noteUuid);
              if (index < 0) {
                item.targets.push(noteUuid)
              }
            }else {
              var index = item.targets.indexOf(noteUuid);
              if (index > -1) {
                item.targets.splice(index, 1);
              }
            }
          })

        },
        onClick: (ev)=>{
          console.log("select");
        }
      })
      // app.store.userData.notes.items.push({
      //   uuid:genuuid(),
      //   title:"A new Note",
      //   content:"Click to edit the note"
      // })

    })
  }

  var render = function () {
    container.innerHTML = theme.noNote()
    let treeContainer = document.querySelector(".left-menu-area")
    let noteTitleArea = document.querySelector(".left-menu-area .title")
    let notePreviewArea = treeContainer.querySelector('.left-list')
    let searchArea = treeContainer.querySelector('.side_searchArea')
    if (notePreviewArea && searchArea) { //reuse what is already setup
      noteTitleArea.innerHTML = theme.notePreviewTitle()
      searchArea.innerHTML=theme.noteSearchArea()
      updateNoteTree(notePreviewArea)
    //update search event
    setUpSearch(document.querySelector(".note_search_input"), app.store.userData.notes.items)
  }else {
    alert("elemet missing")
  }
  }

  function renderSearchArea() {
    return theme.noteSearchArea()
  }

  function renderNoteTree() {
    let html = ""
    app.store.userData.notes.items.forEach(function (e) {//todo add proper routes
      html += theme.notePreviewItem(e)
    })
    return theme.notePreviewList(html)
  }
  function updateNoteTree(container) {
    let html = ""
    app.store.userData.notes.items.forEach(function (e) {//todo add proper routes
      html += theme.notePreviewItem(e)
    })
    container.innerHTML = html
  }

  function renderNote(e) {
    container.innerHTML = theme.editor(e)
    container.querySelector(".tag_list").innerHTML= renderTagList(e)
    console.log(e.content);
    easyMDE = new EasyMDE({
      element: document.querySelector('.inputNoteAreaEditor'),
      autoDownloadFontAwesome:false,
      spellChecker:false,
      initialValue : e.content
    });

    easyMDE.codemirror.on("change", function(){
    	console.log(easyMDE.value());
      e.content = easyMDE.value()//TODO use routes. UGLY
    });
  }
  function renderTagList(note) {
    let linkedTag = app.store.userData.tags.items.filter((t) => {
      console.log(t.targets);
      return t.targets.includes(note.uuid)
    })
    let linkedTagHtml = linkedTag.map((t)=>theme.noteTag(t.name,t.id))
    return linkedTagHtml.join("")
    // let tagedNoteList = app.store.userData.notes.items.map((i) => {})
  }
  function setUpSearch(searchElement, sourceData) {
    searchElement.addEventListener('keyup', function(e){
      //e.stopPropagation()
      var value = document.querySelector(".note_search_input").value
      console.log("fefsefsef");
      console.log(sourceData);
      var filteredData = sourceData.filter((item) => {
        if (fuzzysearch(value, item.title) || fuzzysearch(value, item.content) || fuzzysearch (value, item.title.toLowerCase()) || fuzzysearch (value, item.content.toLowerCase())) {
          return true
        }
        return false
      })
      var filteredIds = filteredData.map(x => x.uuid);
      var searchedItems = document.querySelectorAll(".searchable_note")
      for (item of searchedItems) {
        if (filteredIds.includes(item.dataset.id) || !value) {item.style.display = "block"}else{item.style.display = "none"}
      }
    });
  }

  function loadNoteByUuid(noteId) {
    let note = app.store.userData.notes.items.filter(n=>n.uuid == noteId)[0]
    if (note) {
      currentOpenedNote = note.uuid
      renderNote(note)
    }
  }

  var update = function () {
    saveDB() //TODO move all to actions!
    render()
    if (currentOpenedNote) {
      loadNoteByUuid(currentOpenedNote)
    }
  }

  var setActive =function () {
    objectIsActive = true;
    update()
  }

  var setInactive = function () {
    document.querySelector('.side_searchArea').innerHTML=""
    document.querySelector('.left-menu-area > .title').innerHTML=""
    objectIsActive = false;
  }

  self.setActive = setActive
  self.setInactive = setInactive
  self.update = update
  self.init = init

  return self
}

var notesManager = createNotesManager(".center-container")
notesManager.init()
