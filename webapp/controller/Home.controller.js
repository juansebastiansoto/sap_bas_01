sap.ui.define(["./Base.controller"
], function(Controller) {
    "use strict";

    return Controller.extend("module1.controller.Home", {
        onInit() {
        },

		onPressTile: function(oEvent) {
            const viewName = oEvent.getSource().getBindingContext("mTiles").getObject().view;

            this.onNavTo(viewName); // Este ViewList es el nombre del router que creamos en manifest.json
			
		}
    });
});