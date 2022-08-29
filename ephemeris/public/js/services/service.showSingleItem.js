var createShowSingleItemService = function () {
  var self ={};
  var objectIsActive = false;
  var lastUuid = undefined
  var lastStoreGroup = undefined
  var lastLabel = undefined
  var currentVisibleElement = undefined

  var init = function () {
    connections()

  }
  var connections =function () {
    document.addEventListener("storeUpdated", async function () {
      if (objectIsActive && currentVisibleElement) {
        var store = await query.currentProject()
        var newSingleElement = store[lastStoreGroup].items.find(e=> e.uuid == lastUuid)
        ephHelpers.updateListElements(currentVisibleElement,{
          items:store[lastStoreGroup].items,
          links:store[lastStoreGroup].links,
          metaLinks:store.metaLinks.items,
          rulesToDisplaySingleElement : generateRulesFromNodeType(lastLabel,store),
          singleElement:newSingleElement
        })
      }
    })
  }

  var render = function (uuid, callback) {
    showEditMenu(uuid, callback)
  }
  var showEditMenu = async function (uuid, callback) {
    objectIsActive = true;
    var store = await query.currentProject()


    var storeGroup=undefined
    var label=undefined
    if (store.currentPbs.items.find(i=>i.uuid == uuid)) { storeGroup = "currentPbs"; label='Pbs'}
    else if (store.requirements.items.find(i=>i.uuid == uuid)) { storeGroup = "requirements"; label='Requirements'}
    else if (store.functions.items.find(i=>i.uuid == uuid)) { storeGroup = "functions"; label='Functions'}
    else if (store.stakeholders.items.find(i=>i.uuid == uuid)) { storeGroup = "stakeholders"; label='Users'}
    else if (store.physicalSpaces.items.find(i=>i.uuid == uuid)) { storeGroup = "physicalSpaces"; label='physicalSpaces'}
    else if (store.workPackages.items.find(i=>i.uuid == uuid)) { storeGroup = "workPackages"; label='workPackages'}
    else if (store.interfaces.items.find(i=>i.uuid == uuid)) { storeGroup = "interfaces"; label='interfaces'}
    else if (store.documents.items.find(i=>i.uuid == uuid)) { storeGroup = "documents"; label='documents'}
    else if (store.vvActions.items.find(i=>i.uuid == uuid)) { storeGroup = "vvActions"; label='vvActions'}
    else if (store.changes.items.find(i=>i.uuid == uuid)) { storeGroup = "changes"; label='changes'}

    if (!store[storeGroup]) {
      console.log("no group available");
      return
    }

    lastStoreGroup = storeGroup
    lastLabel = label
    var originItem = store[storeGroup].items.filter(e=> e.uuid == uuid)
    currentVisibleElement = showListMenu({
      sourceData:store[storeGroup].items,
      sourceLinks:store[storeGroup].links,
      displayProp:"name",
      searchable : false,
      singleElement:originItem[0],
      rulesToDisplaySingleElement:generateRulesFromNodeType(label,store),
      display:[
        {prop:"name", displayAs:"Name", edit:false}
      ],
      idProp:"uuid",
      onCloseMenu: (ev)=>{
        objectIsActive = false;
        if (callback) {
          callback(ev)
        }
      },
      onEditChoiceItem: (ev)=>{
        startSelectionFromParametersView(ev, function () {
          // setTimeout(function () {
          //   update()
          // }, 1000);
        })
      },
      onLabelClick: (ev)=>{
        //check if label as a target or difined as a target in func checkIfTargetIsReachable
        if (checkIfTargetIsReachable(ev.target.dataset.id, store)) {
          showSingleItemService.showById(ev.target.dataset.id)
          ev.select.remove()//TODO add history
        }else {
          console.log('no target');
        }
      },
      onEditItem: (ev)=>{
        createInputPopup({
          originalData:ev.target.dataset.value || "",
          onSave:e =>{
            push(act.edit(storeGroup,{uuid:ev.target.dataset.id, prop:ev.target.dataset.prop, value:e}))
            // ev.select.update()
          },
          onClose:e =>{
            push(act.edit(storeGroup,{uuid:ev.target.dataset.id, prop:ev.target.dataset.prop, value:e}))
            //ev.select.update()

            // objectIsActive = true;
          }
        })
      },
      onEditItemTime: (ev)=>{
        push(act.edit(storeGroup,{uuid:ev.target.dataset.id, prop:ev.target.dataset.prop, value:ev.value}))
      }
    })
  }

  async function startSelectionFromParametersView(ev, callback) {
    var store = await query.currentProject()
    var metalinkType = ev.target.dataset.prop;
    var sourceTriggerId = ev.target.dataset.id;
    var currentLinksUuidFromDS = JSON.parse(ev.target.dataset.value)
    var sourceGroup = undefined
    var displayRules = [
      {prop:"name", displayAs:"Name", edit:false},
      {prop:"desc", displayAs:"Description", fullText:true, edit:false}
    ];
    var showColoredIconsRule = undefined
    var prependContent=undefined
    var onLoaded = undefined
    if (metalinkType == "originNeed") {
      sourceGroup="requirements"
    }else if (metalinkType == "originFunction") {
      sourceGroup="functions"
    }else if (metalinkType == "origin") {
      sourceGroup="stakeholders";
      showColoredIconsRule= lettersFromNames,
      displayRules = [
        {prop:"name", displayAs:"First name", edit:false},
        {prop:"lastName", displayAs:"Last name", fullText:true, edit:false}
      ];
    }else if (metalinkType == "contains") {
      sourceGroup="currentPbs";
      displayRules = [
        {prop:"name", displayAs:"Name", edit:false},
        {prop:"desc", displayAs:"Description", fullText:true, edit:false}
      ]
    }else if (metalinkType == "tags") {
      sourceGroup="tags";
      displayRules = [
        {prop:"name", displayAs:"Name", edit:false}
      ];
    }else if (metalinkType == "interfacesType") {
      sourceGroup="interfacesTypes";
      sourceData=store.interfacesTypes.items
      displayRules = [
        {prop:"name", displayAs:"Name", edit:false}
      ]
    }else if (metalinkType == "category") {
      sourceGroup="categories";
      displayRules = [
        {prop:"name", displayAs:"Name", edit:false}
      ];
    }else if (metalinkType == "WpOwn") {
      sourceGroup="currentPbs";
      displayRules = [
        {prop:"name", displayAs:"Name", edit:false}
      ];
    }else if (metalinkType == "WpOwnNeed") {
      sourceGroup="requirements";
      displayRules = [
        {prop:"name", displayAs:"Name", edit:false}
      ];
    }else if (metalinkType == "reqChangedBy") {
      sourceGroup="changes"
      sourceLinks=store.changes.links
      sourceData=store.changes.items
      displayRules = [
        {prop:"name", displayAs:"Name", edit:false},
        {prop:"desc", displayAs:"Description", edit:false}
      ]
    }else if (metalinkType == "documents") {
      sourceGroup="documents";
      if (typeof nw !== "undefined") {//if using node webkit
        prependContent = `<div class="ui basic prepend button"><i class="upload icon"></i>Drop new documents here</div>`
        onLoaded = function (ev) {
          dropAreaService.setDropZone(".prepend", function () {
            ev.select.updateData(store.documents.items)
            ev.select.refreshList()
            setTimeout(function () {
              ev.select.scrollDown()
            }, 100);
            // ev.select.scrollDown()
          })
        }
      }
      displayRules = [
        {prop:"name", displayAs:"Name", edit:false}
      ];
    }else if (metalinkType == "documentsNeed") {
      sourceGroup="documents";
      prependContent = `<div class="ui basic prepend button"><i class="upload icon"></i>Drop new documents here</div>`,
      onLoaded = function (ev) {
        dropAreaService.setDropZone(".prepend", function () {
          ev.select.updateData(store.documents.items)
          ev.select.refreshList()
          setTimeout(function () {
            ev.select.scrollDown()
          }, 100);
        })
      },
      displayRules = [
        {prop:"name", displayAs:"Name", edit:false}
      ];
    }else if (metalinkType == "assignedTo") {
      sourceGroup="stakeholders";
      displayRules = [
        {prop:"name", displayAs:"First name", edit:false},
        {prop:"lastName", displayAs:"Last name", fullText:true, edit:false}
      ];
    }

    var sourceData = store[sourceGroup].items
    showListMenu({
      sourceData:sourceData,
      parentSelectMenu:ev.select ,
      multipleSelection:currentLinksUuidFromDS,
      displayProp:"name",
      searchable : true,
      display:displayRules,
      idProp:"uuid",
      showColoredIcons:showColoredIconsRule,
      prependContent:prependContent,
      onLoaded:onLoaded,
      onAdd:(ev)=>{
        var uuid = genuuid()
        var newItem = prompt("New item name")
        if (newItem) {

          //special rules
          if (sourceGroup == "changes") {
            push(act.edit("changes",{uuid:uuid, prop:"createdAt", value:Date.now()}))
          }else {
            push(act.add(sourceGroup, {uuid:uuid,name:newItem}))
          }
        }

        setTimeout(async function () {
          var store = await query.currentProject()
          ev.select.updateData(store[sourceGroup].items)//TODO remove extra call
          ev.select.updateMetaLinks(store.metaLinks.items)//TODO remove extra call
          ev.select.refreshList()
        }, 2000);
        // var uuid = genuuid()
        // push(act.add(sourceGroup, {uuid:uuid,name:"Edit Item"}))
        // //special rules
        // if (sourceGroup == "changes") {
        //   push(act.edit("changes",{uuid:uuid, prop:"createdAt", value:Date.now()}))
        // }
        // // setTimeout(function () {
        // //   ev.select.scrollDown()
        // // }, 100);
        // ev.select.setEditItemMode({
        //   item:store[sourceGroup].items.filter(e=> e.uuid == uuid)[0],
        //   onLeave: (ev)=>{
        //     push(act.remove(sourceGroup,{uuid:uuid}))
        //     ev.select.updateData(store[sourceGroup].items)
        //   }
        // })
      },
      onEditItem: (ev)=>{
        var newValue = prompt("Edit Item",ev.target.dataset.value)
        if (newValue) {
          push(act.edit(sourceGroup, {uuid:ev.target.dataset.id, prop:ev.target.dataset.prop, value:newValue}))
        }
      },
      onCloseMenu: (ev)=>{
        console.log(ev.select);
        // ev.select.getParent().update()
        if (callback) {
          callback(ev)
        }
      },
      onChangeSelect: (ev)=>{
        console.log(ev.select.getSelected());
        console.log(store.metaLinks.items);
        batchRemoveMetaLinks(store, metalinkType,currentLinksUuidFromDS, ev.select.getSelected(), "source", sourceTriggerId)
        batchAddMetaLinks(store, metalinkType,currentLinksUuidFromDS, ev.select.getSelected(), "source", sourceTriggerId)

        //ev.select.getParent().updateMetaLinks(store.metaLinks.items)//TODO remove extra call
        // ev.select.getParent().update()
      },
      onClick: (ev)=>{
        console.log("select");
      }
    })
  }

  function checkIfTargetIsReachable(uuid, store){
    if (store.currentPbs.items.find(i=>i.uuid == uuid)) {return true }
    else if (store.requirements.items.find(i=>i.uuid == uuid)) {return true }
    else if (store.functions.items.find(i=>i.uuid == uuid)) { return true}
    else if (store.stakeholders.items.find(i=>i.uuid == uuid)) {return true }
    else if (store.physicalSpaces.items.find(i=>i.uuid == uuid)) {return true }
    else if (store.workPackages.items.find(i=>i.uuid == uuid)) {return true }
    else if (store.interfaces.items.find(i=>i.uuid == uuid)) {return true }
    else if (store.documents.items.find(i=>i.uuid == uuid)) {return true }
    else if (store.vvActions.items.find(i=>i.uuid == uuid)) {return true }
    else if (store.changes.items.find(i=>i.uuid == uuid)) {return true }
    else {
      return false
    }
  }

  function generateRulesFromNodeType(type, store) {
    if (type == "Functions") {
      return [{prop:"name", displayAs:"Name", edit:"true"},
        {prop:"desc", displayAs:"Description", edit:"true"},
        {prop:"originNeed", displayAs:"Linked to requirements", meta:()=>store.metaLinks.items, choices:()=>store.requirements.items, edit:true},
        {prop:"originFunction",isTarget:true, displayAs:"linked to products", meta:()=>store.metaLinks.items, choices:()=>store.currentPbs.items, edit:false}
      ]
    }else if (type =="Requirements") {
      return [{prop:"name", displayAs:"Name", edit:"true"},
        {prop:"desc", displayAs:"Description", edit:"true"},
        {prop:"origin", displayAs:"Received from", meta:()=>store.metaLinks.items, choices:()=>store.stakeholders.items, edit:true},
        {prop:"originNeed",isTarget:true, displayAs:"linked to products", meta:()=>store.metaLinks.items, choices:()=>store.currentPbs.items, edit:false},
        {prop:"originNeed",isTarget:true, displayAs:"linked to functions", meta:()=>store.metaLinks.items, choices:()=>store.functions.items, edit:false},
        {prop:"tags", displayAs:"Tags", meta:()=>store.metaLinks.items, choices:()=>store.tags.items, edit:true},
        {prop:"WpOwnNeed",isTarget:true, displayAs:"Work Packages", meta:()=>store.metaLinks.items, choices:()=>store.workPackages.items, edit:false},
        {prop:"reqChangedBy",displayAs:"Changed by", meta:()=>store.metaLinks.items, choices:()=>store.changes.items, edit:true},
        {prop:"documentsNeed", displayAs:"Documents", meta:()=>store.metaLinks.items, choices:()=>store.documents.items, edit:true},
        {prop:"vvReportNeed", isTarget:true, displayAs:"V&V", choiceStyle: (item) =>item.status==2? 'background-color:#21ba45 !important;':'background-color:#dd4b39 !important;', meta:()=>store.metaLinks.items, choices:()=>store.vvActions.items, edit:false}
      ]
    }else if (type =="Pbs") {
      let fields =  [{prop:"name", displayAs:"Name", edit:"true"},
        {prop:"desc", displayAs:"Description", edit:"true"},
        {prop:"originNeed", displayAs:"Linked to requirements", meta:()=>store.metaLinks.items, choices:()=>store.requirements.items, edit:true},
        {prop:"originFunction", displayAs:"Linked to functions", meta:()=>store.metaLinks.items, choices:()=>store.functions.items, edit:true},
        {prop:"contains",isTarget:true, displayAs:"Linked to physical spaces", meta:()=>store.metaLinks.items, choices:()=>store.physicalSpaces.items, edit:false},
        {prop:"tags", displayAs:"Tags", meta:()=>store.metaLinks.items, choices:()=>store.tags.items, edit:true},
        {prop:"category", displayAs:"Category", meta:()=>store.metaLinks.items, choices:()=>store.categories.items, edit:true},
        {prop:"fakeInterfaces", displayAs:"Interfaces", meta:()=>workarounds.generateLinksToInterfaceTargets(store.interfaces.items), choices:()=>store.currentPbs.items, customChoiceName:e=>e.target, dataIdIsLinkId:true,edit:false},//TODO clean as this is a bit of an hack
        {prop:"WpOwn",isTarget:true, displayAs:"Work Packages", meta:()=>store.metaLinks.items, choices:()=>store.workPackages.items, edit:false},
        {prop:"documents", displayAs:"Documents", meta:()=>store.metaLinks.items, choices:()=>store.documents.items, edit:true}
      ]
      let customFields = store.extraFields.items.filter(s=>s.linkedTo == "currentPbs")
      if (customFields && customFields[0]) { //if store settings exist and array is populated
        fields = fields.concat(ephHelpers.formatCustomFields(customFields))
        //displayRules = extraFields
      }
      return fields
    }else if (type =="physicalSpaces") {
      return [{prop:"name", displayAs:"Name", edit:true},
        {prop:"desc", displayAs:"Description", fullText:true, edit:true},
        {prop:"contains", displayAs:"Products contained", meta:()=>store.metaLinks.items, choices:()=>store.currentPbs.items, edit:true}
      ]
    }else if (type =="Users"){
      return [{prop:"name", displayAs:"First name", edit:true},
              {prop:"lastName", displayAs:"Last name", edit:true},
              {prop:"org", displayAs:"Organisation", edit:true},
              {prop:"role", displayAs:"Role", edit:true},
              {prop:"mail", displayAs:"E-mail", edit:true},
              {prop:"origin",isTarget:true, displayAs:"linked to requirements", meta:()=>store.metaLinks.items, choices:()=>store.requirements.items, edit:false},
              {prop:"assignedTo",isTarget:true, displayAs:"Work Packages", meta:()=>store.metaLinks.items, choices:()=>store.workPackages.items, edit:false}
      ]
    }else if (type =="workPackages"){
      return [{prop:"name", displayAs:"First name", edit:true},
              {prop:"assignedTo", displayAs:"Assigned To", meta:()=>store.metaLinks.items, choices:()=>store.stakeholders.items, edit:true},
              {prop:"WpOwn", displayAs:"Products Owned", meta:()=>store.metaLinks.items, choices:()=>store.currentPbs.items, edit:true},
              {prop:"WpOwnNeed", displayAs:"Requirements Owned", meta:()=>store.metaLinks.items, choices:()=>store.requirements.items, edit:true}
      ]
    }else if (type =="interfaces"){
      return [
              {prop:"name", displayAs:"Name", edit:true},
              {prop:"interfacesType", displayAs:"Type", meta:()=>store.metaLinks.items, choices:()=>store.interfacesTypes.items, edit:true},
              {prop:"description", displayAs:"Description", edit:true},
              {prop:"source", displayAs:"Source", custom:e=>getObjectNameByUuid(e, store), actionable:e=>e, edit:false},
              {prop:"target", displayAs:"Target", custom:e=>getObjectNameByUuid(e, store), actionable:e=>e, edit:false},
              {prop:"tags", displayAs:"Tags", meta:()=>store.metaLinks.items, choices:()=>store.tags.items, edit:true},
              {prop:"vvReportInterface", isTarget:true, displayAs:"V&V", choiceStyle: (item) =>item.status==2? 'background-color:#21ba45 !important;':'background-color:#dd4b39 !important;', meta:()=>store.metaLinks.items, choices:()=>store.vvActions.items, edit:false}

      ]
    }else if (type =="documents"){
      return [
              {prop:"name", displayAs:"Name", edit:true},
              {prop:"osPath", displayAs:"Local", fullText:true, localPath:true, edit:false},
              {prop:"link", displayAs:"Link", fullText:true, link:true, edit:true},
              {prop:"documents",isTarget:true, displayAs:"Products", meta:()=>store.metaLinks.items, choices:()=>store.currentPbs.items, edit:false},
              {prop:"documentsNeed",isTarget:true, displayAs:"requirements", meta:()=>store.metaLinks.items, choices:()=>store.requirements.items, edit:false}
      ]
    }else if (type =="vvActions"){
      return [
              {prop:"name", displayAs:"Name", edit:false},
              {prop:"vvReportNeed", displayAs:"Related Requirements", meta:()=>store.metaLinks.items, choices:()=>store.requirements.items, edit:false},
              {prop:"vvReportInterface", displayAs:"Related Interfaces", meta:()=>store.metaLinks.items, choices:()=>store.interfaces.items, edit:false},
              {prop:"shallStatement", displayAs:"Shall Statement", edit:false},
              {prop:"successCriteria", displayAs:"Success Criteria", edit:false},
              {prop:"verificationMethod", displayAs:"Verification Method", options:listOptions.vv_verification_type, edit:false},
              {uuid:"documents", prop:"documents", displayAs:"Documents", meta:()=>store.metaLinks.items, choices:()=>store.documents.items, edit:true},
              {prop:"Result", displayAs:"Result", edit:true},
              {prop:"status", displayAs:"Status", options:listOptions.vv_status,edit:true}
      ]
    }else if (type =="changes"){
      return [
              {prop:"name", displayAs:"Name", edit:true},
              {prop:"desc", displayAs:"Description", edit:true},
              {prop:"reqChangedBy",isTarget:true, displayAs:"Changed Requirement", meta:()=>store.metaLinks.items, choices:()=>store.requirements.items, edit:false},
              {prop:"assignedTo", displayAs:"Assigned to", meta:()=>store.metaLinks.items, choices:()=>store.stakeholders.items, edit:true},
              {prop:"createdAt", displayAs:"Added", edit:"true", time:true}
      ]
    }
  }

  var update = function () {
    if (currentVisibleElement) {
      console.log(currentVisibleElement);
      currentVisibleElement.remove()
    }
    if (lastUuid) {
      render(lastUuid)
    }else {
      render()
    }
  }
  var showById = function (id, callback) {
    lastUuid = id
    render(id, callback)
  }


  self.showById = showById
  self.update = update
  self.init = init

  return self
}

var showSingleItemService = createShowSingleItemService()
showSingleItemService.init()
