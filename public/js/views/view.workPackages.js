var createWorkPackagesView = function () {
  var self ={};
  var objectIsActive = false;
  var extraFields = undefined
  var currentVisibleList = undefined

  var init = function () {
    connections()

  }
  var connections =function () {
    document.addEventListener("storeUpdated", async function () {
      if (objectIsActive && currentVisibleList) {
        var store = await query.currentProject()
        ephHelpers.updateListElements(currentVisibleList,{
          items:store.workPackages.items,
          links:store.workPackages.links,
          metaLinks:store.metaLinks.items,
          displayRules:setDisplayRules(store)
        })
      }
    })
  }

  var setDisplayRules = function (store) {
    var displayRules = [
      {prop:"name", displayAs:"Name", edit:true},
      {prop:"assignedTo", displayAs:"Assigned to", meta:()=>store.metaLinks.items, choices:()=>store.stakeholders.items, edit:true},
      {prop:"WpOwn", displayAs:"Products Owned", meta:()=>store.metaLinks.items, choices:()=>store.currentPbs.items, edit:true},
      {prop:"WpOwnNeed", displayAs:"Requirements Owned", meta:()=>store.metaLinks.items, choices:()=>store.requirements.items, edit:true}
    ]
    return displayRules
  }

  var render = async function () {
    var store = await query.currentProject()
    currentVisibleList = showListMenu({
      sourceData:store.workPackages.items,
      displayProp:"name",
      targetDomContainer:".center-container",
      fullScreen:true,// TODO: perhaps not full screen?
      display:setDisplayRules(store),
      idProp:"uuid",
      onEditItem: (ev)=>{
        console.log("Edit");
        var newValue = prompt("Edit Item",ev.target.dataset.value)
        if (newValue) {
          push(act.edit("workPackages", {uuid:ev.target.dataset.id, prop:ev.target.dataset.prop, value:newValue}))
        }
      },
      onRemove: (ev)=>{
        if (confirm("remove item ?")) {
          push(act.remove("workPackages",{uuid:ev.target.dataset.id}))
          ev.select.updateData(store.workPackages.items)
        }
      },
      onAdd: async (ev)=>{
        var popup= await createPromptPopup({
          title:"Add a new Work Package",
          iconHeader:"briefcase",
          fields:{ type:"input",id:"wpName" ,label:"Work Package name", placeholder:"Set a name for the new Work Package" }
        })
        var workPackages = popup.result
        if (workPackages !="") {
          push(act.add("workPackages",{uuid:genuuid(), name:workPackages}))
        }

      },
      onEditChoiceItem: (ev)=>{
        showUpdateLinksService.show(ev,"workPackages")
      },
      onLabelClick: (ev)=>{
        showSingleItemService.showById(ev.target.dataset.id)
      },
      onClick: (ev)=>{
        showSingleItemService.showById(ev.target.dataset.id, function (e) {
          ev.select.updateData(store.workPackages.items)
          ev.select.updateLinks(store.workPackages.links)
          ev.select.refreshList()
        })
      },
      extraButtons : [
        {name:"Relations", class:"fuse", prop:"projectId", action: (orev)=>{
          console.log('fesfsefsef');
          pageManager.setActivePage("relations", {param:{context:"extract", uuid:orev.dataset.id}})//TODO should not call page ma,ager directly
        }}
      ],
      extraActions:[
        {
          name:"Export",
          action:(ev)=>{
            exportToCSV()
          }
        }
      ]
    })
  }

  var exportToCSV = function () {
    let store = query.currentProject()
    let data = store.workPackages.items.map(i=>{
      let linkToTextsh = getRelatedItems(store, i, "stakeholders",{objectIs:"source", metalinksType:"assignedTo"}).map(s=> s[0]? s[0].name +" "+s[0].lastName : "").join(",")
      let linkToTextPbs = getRelatedItems(store, i, "currentPbs",{objectIs:"source", metalinksType:"WpOwn"}).map(s=> s[0]? s[0].name : '').join(",")
      let linkToTextReq = getRelatedItems(store, i, "requirements",{objectIs:"source", metalinksType:"WpOwnNeed"}).map(s=> s[0]? s[0].name : '').join(",")


      return {id:i.uuid, name:i.name, Owner:linkToTextsh, requirements:linkToTextReq, Products: linkToTextPbs}
    })
    JSONToCSVConvertor(data, 'Pbs', true)
  }

  // async function startSelection(ev) {
  //   var store = await query.currentProject()
  //   var metalinkType = ev.target.dataset.prop;
  //   var sourceTriggerId = ev.target.dataset.id;
  //   var currentLinksUuidFromDS = JSON.parse(ev.target.dataset.value)
  //   var sourceGroup = undefined
  //   var sourceData = undefined
  //   var invert = false
  //   var source = "source"
  //   var target = "target"
  //   var sourceLinks= undefined
  //   var displayRules= undefined
  //   if (metalinkType == "assignedTo") {
  //     sourceData=store.stakeholders.items
  //     displayRules = [
  //       {prop:"name", displayAs:"Name", edit:false},
  //       {prop:"lastName", displayAs:"Last name", edit:false}
  //     ]
  //   }else if (metalinkType == "WpOwn") {
  //     sourceGroup="currentPbs"
  //     sourceData=store.currentPbs.items
  //     sourceLinks=store.currentPbs.links
  //     displayRules = [
  //       {prop:"name", displayAs:"First name", edit:false},
  //       {prop:"desc", displayAs:"Description", fullText:true, edit:false}
  //     ]
  //   }else if (metalinkType == "WpOwnNeed") {
  //     sourceGroup="requirements"
  //     sourceData=store.requirements.items
  //     sourceLinks=store.requirements.links
  //     displayRules = [
  //       {prop:"name", displayAs:"First name", edit:false},
  //       {prop:"desc", displayAs:"Description", fullText:true, edit:false}
  //     ]
  //   }else if (metalinkType == "originNeed") {
  //     sourceGroup="currentPbs"
  //     invert = true;
  //     sourceData=store.currentPbs.items
  //     source = "target"//invert link order for after
  //     target = "source"
  //     sourceLinks=store.currentPbs.links
  //     displayRules = [
  //       {prop:"name", displayAs:"First name", edit:false},
  //       {prop:"desc", displayAs:"Description", fullText:true, edit:false}
  //     ]
  //   }else if (metalinkType == "tags") {
  //     sourceData=store.tags.items
  //     displayRules = [
  //       {prop:"name", displayAs:"Name", edit:false}
  //     ]
  //   }
  //   showListMenu({
  //     sourceData:sourceData,
  //     sourceLinks:sourceLinks,
  //     parentSelectMenu:ev.select ,
  //     multipleSelection:currentLinksUuidFromDS,
  //     displayProp:"name",
  //     searchable : true,
  //     display:displayRules,
  //     idProp:"uuid",
  //     onAdd:(ev)=>{//TODO experimental, replace with common service
  //       var uuid = genuuid()
  //       push(act.add(sourceGroup, {uuid:uuid,name:"Edit Item"}))
  //       if (sourceGroup == "currentPbs") {
  //         push(addPbsLink({source:query.currentProject().currentPbs.items[0].uuid, target:uuid}))
  //       }
  //       ev.select.setEditItemMode({
  //         item:store[sourceGroup].items.filter(e=> e.uuid == uuid)[0],
  //         onLeave: (ev)=>{
  //           push(act.remove(sourceGroup,{uuid:uuid}))
  //           if (sourceGroup == "currentPbs") {
  //             push(removePbsLink({target:uuid}))
  //           }
  //           ev.select.updateData(store[sourceGroup].items)
  //           ev.select.updateLinks(store[sourceGroup].links)          }
  //       })
  //     },
  //     onEditItem: (ev)=>{
  //       var newValue = prompt("Edit Item",ev.target.dataset.value)
  //       if (newValue) {
  //         push(act.edit(sourceGroup, {uuid:ev.target.dataset.id, prop:ev.target.dataset.prop, value:newValue}))
  //       }
  //     },
  //     onCloseMenu: (ev)=>{
  //       console.log(ev.select);
  //       ev.select.getParent().refreshList()
  //     },
  //     onChangeSelect: (ev)=>{
  //       batchRemoveMetaLinks(store, metalinkType,currentLinksUuidFromDS, ev.select.getSelected(), source, sourceTriggerId)
  //       batchAddMetaLinks(store, metalinkType,currentLinksUuidFromDS, ev.select.getSelected(), source, sourceTriggerId)
  //
  //       ev.select.getParent().updateMetaLinks(store.metaLinks.items)//TODO remove extra call
  //       ev.select.getParent().refreshList()
  //     },
  //     onClick: (ev)=>{
  //       console.log("select");
  //     }
  //   })
  // }

  var update = function () {
    render()
  }

  var setActive =function () {
    objectIsActive = true;
    //update()
    setTimeout(function () {
      update()
    }, 40);//TODO discover why it's needed and remove
  }

  var setInactive = function () {
    objectIsActive = false;
  }

  self.setActive = setActive
  self.setInactive = setInactive
  self.update = update
  self.init = init

  return self
}

var workPackagesView = createWorkPackagesView()
workPackagesView.init()
