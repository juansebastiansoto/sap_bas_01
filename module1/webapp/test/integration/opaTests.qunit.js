/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["module1/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
