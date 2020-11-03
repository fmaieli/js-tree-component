export default class TreeComponent {
  constructor(_treeWrapper, _data) {
    this.treeWrapper = _treeWrapper;
    this.data = _data;
  }

  initializeComponent() {
    var resultData = this.treeWrapper.mapTiposEnsayos(this.data);
    this.treeWrapper.createTree(resultData);
  }
}
