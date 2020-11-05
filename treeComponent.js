export default class TreeComponent {
  constructor(_treeWrapper, _url, _ajaxCalls, _data) {
    this.treeWrapper = _treeWrapper;
    this.url = _url;
    this.ajaxCalls = _ajaxCalls;
    this.data = _data;
  }

  promiseCall(empresa, anio, generacion) {
    // Si es dinamico tiene que tener data y hacer un POST, sino hago un GET
    if (
      isNotNullOrUndefined(empresa) &&
      isNotNullOrUndefined(anio) &&
      isNotNullOrUndefined(generacion)
    ) {
      var data = {
        empresa: empresa,
        anio: anio,
        generacion: generacion
      };
      this.ajaxCalls.ajaxPOST_JSON(this.url, data);
    } else {
      this.ajaxCalls.ajaxGET_JSON(this.url);
    }
  }

  initializeComponent() {
    var resultData = this.treeWrapper.mapTiposEnsayos(this.data);
    this.treeWrapper.createTree(resultData);
  }

  selectedItems() {
    return this.treeWrapper.selectedElements();
  }

  isNotNullOrUndefined(variable) {
    return variable != undefined || variable != null;
  }
}
