// Import stylesheets
import "./style.css";

// Json Data
import jsonData from "./jsonDataDummy/tiposDeEnsayo.js";

var $ = require("jquery");
import "jquery.fancytree";
import "~/dropdown-tree/js/dropdowntree.js";

// Fancy Tree
const dancytreeDiv = document.getElementById("fancytree-title");
dancytreeDiv.innerHTML = `<h1>Fancy Tree</h1>`;
$(function() {
  $("#tree").fancytree({
    checkbox: true,
    source: [
      { title: "Node 1" },
      { title: "Node 2", key: "id2" },
      {
        title: "Folder 3",
        folder: true,
        children: [{ title: "Node 3.1" }, { title: "Node 3.2" }]
      },
      { title: "Folder 2", folder: true }
    ],
    activate: function(event, data) {
      $("#status").text("Activate: " + data.node);
    }
  });

  // Activate a node, on button click
  $("#button1").click(function() {
    var tree = $("#tree").fancytree("getTree"),
      node2 = tree.getNodeByKey("id2");
    node2.toggleSelected();
  });
  $("#version").text(
    "Fancytree " + $.ui.fancytree.version + " / jQuery " + $.fn.jquery
  );
});

// Dropdown Tree
const dropdowntreeDiv = document.getElementById("dropdown-tree-title");
dropdowntreeDiv.innerHTML = `<h1>Dropdown Tree</h1>`;

var arr = [{ Id: 109, title: "GENERICO", data: null }];

// var arr = [
//   {
//     title: 1,
//     dataAttrs: [
//       { title: "dataattr1", data: "value1" },
//       { title: "dataattr2", data: "value2" },
//       { title: "dataattr3", data: "value3" }
//     ]
//   },
//   {
//     title: 2,
//     dataAttrs: [
//       { title: "dataattr4", data: "value4" },
//       { title: "dataattr5", data: "value5" },
//       { title: "dataattr6", data: "value6" }
//     ]
//   },
//   {
//     title: 3,
//     dataAttrs: [
//       { title: "dataattr7", data: "value7" },
//       { title: "dataattr8", data: "value8" },
//       { title: "dataattr9", data: "value9" }
//     ]
//   }
// ];

var options = {
  title: "DropDown Tree",
  data: arr,
  maxHeight: 300, 
  multiSelect: true,
  selectChildren: true,
  clickHandler: function(element) {
    console.log(element);
  }
};

$("#firstDropDownTree").DropDownTree(options);
