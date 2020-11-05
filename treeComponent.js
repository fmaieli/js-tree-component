export default class TreeComponent {
  constructor(_treeWrapper, _url, _ajaxCalls, _data) {
    this.treeWrapper = _treeWrapper;
    this.url = _url;
    this.ajaxCalls = _ajaxCalls;
    this.data = _data;
  }

  promiseCall() {}

  initializeComponent() {
    var resultData = this.treeWrapper.mapTiposEnsayos(this.data);
    this.treeWrapper.createTree(resultData);
  }

  selectedItems() {
    return this.treeWrapper.selectedElements();
  }
}
