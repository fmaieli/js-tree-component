// Imports
var $ = require('jquery');
var jQuery = require('jquery');
import 'jquery.fancytree';
import AjaxCalls from '~/ajax-calls/ajax-calls.service.js';
import DropdownTreeWrapper from '~/wrappers/dropdownTreeWrapper.js';
import './style.css';
import FancyTreeWrapper from '~/wrappers/fancyTreeWrapper.js';
import TreeComponent from './treeComponent.js';

// Json Data
import jsonData from './jsonDataDummy/tiposDeEnsayo.js';

// Ajax calls
var ajaxCalls = new AjaxCalls();

// Wrappers
var dropdownTreeWrapper = new DropdownTreeWrapper(
  '-seleccione-',
  300,
  true,
  true,
  'dropdown-tree'
);
var fancyTreeWrapper = new FancyTreeWrapper('fancytree');

// Tree Component
var treeComponentDropdown = new TreeComponent(
  dropdownTreeWrapper,
  '/GestionEnsayosApi/ListTiposDeEnsayoExistentes',
  ajaxCalls,
  jsonData
);
treeComponentDropdown.initializeComponent();

var treeComponentFancy = new TreeComponent(
  fancyTreeWrapper,
  '/ComparativoVariedades/CargarFancyTree',
  ajaxCalls,
  jsonData
);
treeComponentFancy.initializeComponent();

$(document).ready(() => {
  const fancytreeDiv = document.getElementById('fancytree-title');
  fancytreeDiv.innerHTML = `<h1>Fancy Tree</h1>`;

  const dropdowntreeDiv = document.getElementById('dropdown-tree-title');
  dropdowntreeDiv.innerHTML = `<h1>Dropdown Tree</h1>`;

  // ------------------------------Button---------------------------------
  $('#selectedButton').on('click', function() {
    var itemsDropdown = treeComponentDropdown.selectedItems();
    var itemsFancy = treeComponentFancy.selectedItems();
  });

  //Inicio - Dejar submenú abierto hasta que se hace click fuera del menú
  jQuery('.dropdown-menu li a').mouseover(function(e) {
    e.stopPropagation();
    jQuery(this)
      .parent()
      .parent()
      .find('li')
      .each(function() {
        jQuery(this).removeClass('open');
      });
    jQuery(this)
      .parent()
      .addClass('open');
  });

  jQuery('.dropdown-toggle').click(function(e) {
    var classList = jQuery(this)
      .parent()
      .attr('class')
      .split(/\s+/);
    if (classList.includes('open')) {
      jQuery(this)
        .parent()
        .removeClass('open');
    } else {
      jQuery(this)
        .parent()
        .addClass('open');
    }
  });
  //Fin - Dejar submenú abierto hasta que se hace click fuera del menú
});
