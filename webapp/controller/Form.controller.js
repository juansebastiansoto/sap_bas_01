sap.ui.define(["./Base.controller",
    "sap/m/MessageBox"
], function (Controller, MessageBox) {
    "use strict";

    return Controller.extend("module1.controller.Form", {
        onInit() {

        },

        onSubmit: function () {

            const _this = this;

            if (this.validateInput()) {
                return;
            }

            const newData = this.getValues();

            let modelData = this.getView().getModel("mProducts").getData().ProductCollection;
            modelData.unshift(newData);

            this.getView().getModel("mProducts").refresh();

            MessageBox.success("Product Added", {
                actions: [MessageBox.Action.OK],
                emphasizedAction: MessageBox.Action.OK,
                onClose: function () {
                    _this.clearValues();
                    _this.onNavTo("RouteHome");
                }
            });

        },

        onReject: function () {

            const _this = this;

            MessageBox.confirm("Confirm lost data?", {
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                emphasizedAction: MessageBox.Action.NO,
                onClose: function (oAction) {

                    if (oAction === MessageBox.Action.YES) {
                        _this.clearValues();
                        _this.onNavTo("RouteHome");
                    }

                }
            });

        },

        getValues: function () {

            const data = {
                "ProductId": this.getValueById("txtProductId"),
                "Category": this.getValueById("cmbCategory"),
                "MainCategory": this.getValueById("cmbMainCategory"),
                "SupplierName": this.getValueById("txtSupplierName"),
                "WeightMeasure": parseFloat(this.getValueById("txtWeightMeasure")),
                "WeightUnit": this.getSelectedButtonById("rgbWeightUnit"),
                "Description": this.getValueById("txtDescription"),
                "Name": this.getValueById("txtName"),
                "DateOfSale": this.getValueById("dpDateOfSales"),
                "Status": this.getStateById("swtAvailable") ? 'Available' : 'Not Available',
                "Quantity": parseInt(this.getValueById("txtQuantity")),
                "CurrencyCode": this.getSelectedButtonById("rgbCurrencyCode"),
                "Price": parseFloat(this.getValueById("txtPrice")),
                "ProductPicUrl": "https://sdk.openui5.org/test-resources/sap/ui/documentation/sdk/images/HT-1000.jpg",
                "TaxTarifCode": "1",
                "UoM": "PC",
                "Width": 30,
                "Depth": 18,
                "Height": 3,
                "DimUnit": "cm"
            };

            return data;

        },

        clearValues: function () {

            this.setValueById("txtProductId");
            this.setValueById("cmbCategory");
            this.setValueById("cmbMainCategory");
            this.setValueById("txtSupplierName");
            this.setValueById("txtWeightMeasure");
            this.setSelectedButtonById("rgbWeightUnit");
            this.setValueById("txtDescription");
            this.setValueById("txtName");
            this.setValueById("dpDateOfSales");
            this.setStateById("swtAvailable");
            this.setValueById("txtQuantity");
            this.setSelectedButtonById("rgbCurrencyCode");
            this.setValueById("txtPrice");

        },

        validateInput: function () {

            const aForms = ["frmGeneral", "frmWeight", "frmDetails"]; // Formularios a validar
            let invalid = false;

            aForms.forEach(oForm => { // Por cada formulario del array
                
                const oElements = this.getView().byId(oForm).getFormContainers()[0].getFormElements(); // Recupero los elementos en el container (tengo un único container por eso es 0)

                oElements.forEach(oElement => { // Por cada elemento del container

                    const oFields = oElement.getFields(); // Recupero los campos

                    oFields.forEach(oField => { // Y al final a cada campo

                        if (oField.getValue) { // Si tiene la propiedad value, puedo validarlo

                            oField.setValueState('None'); // Reseteo el estado del campo

                            if (oField.getRequired()) { // Si está marcado como obligatorio, entonces lo valido

                                if (oField.getValue() === '') { // Si está vacío y es obligatorio lo marco como inválido y también marco como error el campo

                                    invalid = true;
                                    oField.setValueState('Error');

                                }

                            }

                        }

                    })

                });
            });

            return invalid;

        }

    });
});