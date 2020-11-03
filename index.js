// Import stylesheets
import "./style.css";

// Json Data
import jsonData from "./jsonDataDummy/tiposDeEnsayo.js";

var $ = require("jquery");
var jQuery = require("jquery");
import "~/dropdown-tree/js/dropdowntree.js";

$(document).ready(() => {
  // Dropdown Tree
  const dropdowntreeDiv = document.getElementById("dropdown-tree-title");
  dropdowntreeDiv.innerHTML = `<h1>Dropdown Tree</h1>`;

  var arr = [{ id: 109, title: "GENERICO", data: null }];

  var options = {
    title: "Dropdown Tree",
    data: arr,
    maxHeight: 300,
    clickHandler: function(element) {
      //gets clicked element parents
      console.log($(element).GetParents());
      //element is the clicked element
      console.log(element);
      $("#firstDropDownTree").SetTitle(
        $(element)
          .find("a")
          .first()
          .text()
      );
      console.log("Selected Elements", $("#firstDropDownTree").GetSelected());
    },
    expandHandler: function(element, expanded) {
      console.log("expand", element, expanded);
    },
    checkHandler: function(element, checked) {
      console.log("check", element, checked);
    },
    closedArrow: '<i class="fa fa-caret-right" aria-hidden="true"></i>',
    openedArrow: '<i class="fa fa-caret-down" aria-hidden="true"></i>',
    multiSelect: true,
    selectChildren: true
  };

  $("#firstDropDownTree").DropDownTree(options);

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
