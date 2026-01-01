require([
  "dojo/store/Memory",
  "dijit/Tree",
  "dijit/tree/ObjectStoreModel",
  "dojo/domReady!"
], function(Memory, Tree, ObjectStoreModel) {

  var store = new Memory({
    data: [
      { id: "root", name: "Credit Card", root: true },
      { id: "apply", name: "Apply", parent: "root" }
    ],
    getChildren: function(obj) {
      return this.query({ parent: obj.id });
    }
  });

  var model = new ObjectStoreModel({
    store: store,
    query: { id: "root" }
  });

  new Tree({
    model: model,
    onClick: function(item) {
      if(item.id === "apply") {
        window.loadTabs();
      }
    }
  }, "navTree").startup();
});
