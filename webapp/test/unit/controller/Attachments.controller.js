/*global QUnit*/

sap.ui.define([
	"project1/controller/Attachments.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Attachments Controller");

	QUnit.test("I should test the Attachments controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
