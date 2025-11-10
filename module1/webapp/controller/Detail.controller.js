sap.ui.define(["./Base.controller"
], function (Controller) {
    "use strict";

    return Controller.extend("module1.controller.Detail", {
        onInit: function () {

            this.getRouter().getRoute("ViewDetail").attachMatched(this._onRouteMatched, this);

        },

        _onRouteMatched: function (oEvent) {

            const oArgs = oEvent.getParameter("arguments");
            const oView = this.getView();

            const indexProduct = this.getView().getModel("mProducts").getData().ProductCollection.findIndex(e => e.ProductId === oArgs.productId);

            oView.bindElement({
                path: `mProducts>/ProductCollection/${indexProduct}`,
                events: {
                    change: this._onBindingChange.bind(this)
                }
            });

        },

        _onBindingChange: function (oEvent) {

            if (!oEvent.getSource().getBoundContext().getObject()) {
                this.getRouter().getTargets().display("TargetNotFound");
            } 

        }               

    });
});
