// Imports
var $ = require("jquery");
var jQuery = require("jquery");
import "jquery.fancytree";
import "~/dropdown-tree/js/dropdowntree.js";
import DropdownTreeWrapper from "~/wrappers/dropdownTreeWrapper.js";
import "./style.css";
import FancyTreeWrapper from "~/wrappers/fancyTreeWrapper.js";
import TreeComponent from "./treeComponent.js";
import "./style.css";

// Json Data
import jsonData from "./jsonDataDummy/tiposDeEnsayo.js";

// Wrappers
var dropdownTreeWrapper = new DropdownTreeWrapper(
  "-seleccione-",
  300,
  true,
  true,
  "firstDropDownTree"
);

var fancyTreeWrapper = new FancyTreeWrapper("fancytree-title");

// Tree Component
var treeComponentDropdown = new TreeComponent(dropdownTreeWrapper, jsonData);
treeComponentDropdown.initializeComponent();

// var treeComponentFancy = new TreeComponent(fancyTreeWrapper, jsonData);
// treeComponentFancy.initializeComponent();

$(document).ready(() => {
  // Fancy Tree
  const fancytreeDiv = document.getElementById("fancytree-title");
  fancytreeDiv.innerHTML = `<h1>Fancy Tree</h1>`;
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

  //----------------------------------------------------------------------

  const dropdowntreeDiv = document.getElementById("dropdown-tree-title");
  dropdowntreeDiv.innerHTML = `<h1>Dropdown Tree</h1>`;

  //Inicio - Dejar submenú abierto hasta que se hace click fuera del menú
  jQuery(".dropdown-menu li a").mouseover(function(e) {
    e.stopPropagation();
    jQuery(this)
      .parent()
      .parent()
      .find("li")
      .each(function() {
        jQuery(this).removeClass("open");
      });
    jQuery(this)
      .parent()
      .addClass("open");
  });

  jQuery(".dropdown-toggle").click(function(e) {
    var classList = jQuery(this)
      .parent()
      .attr("class")
      .split(/\s+/);
    if (classList.includes("open")) {
      jQuery(this)
        .parent()
        .removeClass("open");
    } else {
      jQuery(this)
        .parent()
        .addClass("open");
    }
  });
  //Fin - Dejar submenú abierto hasta que se hace click fuera del menú
});
