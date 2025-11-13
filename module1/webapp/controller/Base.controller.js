sap.ui.define(["sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History",
    "sap/ui/core/Core"
], function (Controller, UIComponent, History, Core) {
    "use strict";

    return Controller.extend("module1.controller.Base", {
        onInit() {
        },

        getRouter: function () {
            return UIComponent.getRouterFor(this);
        },

        onNavTo: function (viewName, param = null) {
            this.getRouter().navTo(viewName, param);
        },

        onNavBack: function () {

            const oHistory = History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash === undefined) {
                this.getRouter().navTo("RouteMain");
            } else {
                window.history.go(-1);
            }
        },

        getById: function (objectId) {
            return this.getView().byId(objectId);
        },

        getValueById: function (objectId) {
            return this.getById(objectId).getValue();
        },

        getSelectedButtonById: function (groupId) {
            return this.getById(groupId).getSelectedButton().getText();
        },

        getStateById: function (objectId) {
            return this.getById(objectId).getState();
        },

        setValueById: function (objectId, value = '') {
            this.getById(objectId).setValue(value);
        },

        setSelectedButtonById: function (objectId) {
            this.getById(objectId).setSelectedIndex(0);
        },

        setStateById: function (objectId, state = true) {
            this.getById(objectId).setState(state);
        },

        onThemeSelector: function (oEvent) {

            const sTheme = oEvent.getSource().data("themeType") === 'L' ? "sap_horizon" : "sap_horizon_dark";

            Core.applyTheme(sTheme);
            localStorage.setItem("userTheme", sTheme)

        },

        _initTheme: function () {

            const sTheme = localStorage.getItem("userTheme");

            if (sTheme === undefined) {
                return;
            }

            Core.applyTheme(sTheme);

        }

    });
});