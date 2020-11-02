class DropdownTreeWrapper {
  constructor(
    title,
    data,
    maxHeight,
    multiSelect,
    selectChildren,
    idComponente
  ) {
    this.title = title;
    this.dataOptions = data;
    this.maxHeight = maxHeight;
    this.multiSelect = multiSelect;
    this.selectChildren = selectChildren;
    this.idComponente = idComponente;
    this.TipoEnsayoService = new TipoEnsayoService();
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
        self.MapTiposEnsayosToOptions(result);
        self.CreateDropDownTree();
      })
      .fail(function(result) {
        showErrorAlert(result.responseText);
      });
  }

  mapTiposEnsayos(result) {
    var self = this;
    self.ResetData();
    $.each(result, function(key, elem) {
      var newOption = self.mapTipoEnsayoToOption(elem);
      self.dataOptions.push(newOption);
    });
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
      Id: element.Id,
      title: element.Nombre,
      data: combinations
    };

    return newOption;
  }

  createDropDownTree() {
    var self = this;
    var options = {
      title: self.title,
      data: self.dataOptions,
      maxHeight: self.maxHeight,
      multiSelect: self.multiSelect,
      selectChildren: self.selectChildren
    };
    $("#" + self.idComponente).empty();
    $("#" + self.idComponente).DropDownTree(options);
  }

  resetData() {
    this.dataOptions = new Array();
  }
}
