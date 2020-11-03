var $ = require("jquery");

export default class FancyTreeWrapper {
  constructor(_idComponente) {
    this.idComponente = _idComponente;
    this.url = "/ComparativoVariedades/CargarFancyTree";
  }

  callTiposEnsayos(empresa, anio, generacion) {}

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
      title: element.Nombre,
      key: element.Id,
      refKey: combinaciones.length > 0 ? "0" : "1",
      children: combinations
    };

    return newOption;
  }

  createTree(data) {
    $("#" + this.idComponente).fancytree({
      checkbox: true,
      icons: false,
      selectMode: 3,
      source: data,
      beforeSelect: function(event, data) {
        $("#Nombre").prop("disabled", false);
        $("#GID").prop("disabled", false);
        $("#btnAgregar").prop("disabled", false);
      }
    });
  }
}
