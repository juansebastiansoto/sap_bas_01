sap.ui.define(["./Base.controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("module1.controller.List", {
        onInit() {
            
        },

        onItemPressList: function (oEvent) {
            const oItem = oEvent.getSource().getSelectedItem().getBindingContext("mProducts").getObject();
            
            this.onNavTo("ViewDetail", {productId: oItem.ProductId});
            
        },

        onSearchField: function(oEvent) {

            let aFilter = [];

            const sValue = oEvent.getSource().getValue();

            if (sValue.length > 0) {
                const oFilter = new Filter({path: "Name",
                                            operator: FilterOperator.Contains,
                                            value1: sValue });
                aFilter.push(oFilter);
            }

            const oList = this.byId("listProducts");
            const oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);

        }

    });
});