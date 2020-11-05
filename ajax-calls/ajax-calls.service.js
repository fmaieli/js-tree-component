export default class AjaxCalls {
  constructor() {}

  ajaxPOST_JSON(url, data) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        data: data,
        type: "POST",
        dataType: "json"
      })
        .success(function(result) {
          resolve(result);
        })
        .error(function(result) {
          showErrorAlert(result);
          reject(result);
        });
    });
  }

  ajaxGET_JSON(url) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        type: "GET",
        dataType: "json"
      })
        .success(function(result) {
          resolve(result);
        })
        .error(function(result) {
          showErrorAlert(result);
          reject(result);
        });
    });
  }

  ajaxGET_HTML(url) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        contentType: "application/html; charset=utf-8",
        type: "GET",
        dataType: "html",
        success: function(result) {
          resolve(result);
        },
        error: function(result) {
          showErrorAlert(result);
          reject(result);
        }
      });
    });
  }
}
