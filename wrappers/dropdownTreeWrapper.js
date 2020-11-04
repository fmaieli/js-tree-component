var $ = require("jquery");
import "~/dropdown-tree/js/dropdowntree.js";

export default class DropdownTreeWrapper {
  constructor(title, maxHeight, multiSelect, selectChildren, idComponente) {
    this.title = title;
    this.maxHeight = maxHeight;
    this.multiSelect = multiSelect;
    this.selectChildren = selectChildren;
    this.idComponente = idComponente;
    // this.TipoEnsayoService = new TipoEnsayoService();
    this.url = "/GestionEnsayosApi/ListTiposDeEnsayoExistentes";
  }

  callTiposEnsayos(empresa, anio, generacion) {
    var self = this;
    var data = {
      empresa: empresa,
      anio: anio,
      generacion: generacion
    };
    var promiseTiposEnsayosExistentes = self.TipoEnsayoService.CargarTiposDeEnsayo(
      self.url,
      data
    );

    promiseTiposEnsayosExistentes
      .then(function(result) {
        self.mapTiposEnsayosToOptions(result);
        self.createTree();
      })
      .fail(function(result) {
        showErrorAlert(result.responseText);
      });
  }

  mapTiposEnsayos(data) {
    var self = this;
    var arrayResult = [];

    $.each(data, function(key, elem) {
      var newOption = self.mapTipoEnsayoToOption(elem);
      arrayResult.push(newOption);
    });

    return arrayResult;
  }

  mapTipoEnsayoToOption(element) {
    var self = this;
    var combinaciones = element.Combinaciones;
    var combinations = null;

    if (combinaciones.length > 0) {
      combinations = [];
      combinaciones.forEach(comb => {
        var newCombinationOption = self.mapTipoEnsayoToOption(comb);
        combinations.push(newCombinationOption);
      });
    }

    var newOption = {
      id: element.Id,
      title: element.Nombre,
      data: combinations
    };

    return newOption;
  }

  createTree(dataOptions) {
    var self = this;
    var options = {
      title: self.title,
      data: dataOptions,
      maxHeight: self.maxHeight,
      multiSelect: self.multiSelect,
      selectChildren: self.selectChildren
    };
    $("#" + self.idComponente).empty();
    $("#" + self.idComponente).DropDownTree(options);
  }

  getTreeElementsChecked(element) {
    var inputsSelected = element.find("input:checkbox:checked");
    var arrayItemsSelected = [];

    $.each(inputsSelected, function(key, elem) {
      arrayItemsSelected.push(elem.value);
    });

    return arrayItemsSelected;
  }

  selectedElements() {
    var self = this;
    return this.getTreeElementsChecked($("#" + self.idComponente));
  }
}
