sap.ui.define([
  "./Base.controller"
], (BaseController) => {
  "use strict";

  return BaseController.extend("module1.controller.App", {
    onInit() {

      this._initTheme();

    }
  });
});