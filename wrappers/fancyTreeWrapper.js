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
    var arrayChildern = [];

    $.each(data, function(key, elem) {
      var newOption = self.mapTipoEnsayoToOption(elem);
      // Si el tipo de ensayo tiene combinaciones entonces se itera por estos
      if (elem.Combinaciones.length > 0) {
        $.each(elem.Combinaciones, function(key, elem) {
          var newChildOption = self.mapTipoEnsayoToOption(elem);
          arrayChildern.push(newChildOption);
        });
        newOption.children = arrayChildern;
        arrayChildern = [];
      }
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
      Id: element.Id,
      title: element.Nombre,
      data: combinations
    };

    return newOption;
  }

  createTree() {
    $("#" + this.idComponente).fancytree({
      checkbox: true,
      icons: false,
      selectMode: 3,
      source: {
        url: this.url
      },
      beforeSelect: function(event, data) {
        $("#Nombre").prop("disabled", false);
        $("#GID").prop("disabled", false);
        $("#btnAgregar").prop("disabled", false);
      }
    });
  }
}
