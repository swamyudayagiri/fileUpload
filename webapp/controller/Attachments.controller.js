sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,MessageBox) {
        "use strict";

        return Controller.extend("project1.controller.Attachments", {
            onInit: function () {

              

                this.getView().byId("UploadSet").setUploadUrl(this.getOwnerComponent().getModel().sServiceUrl + "/Z802_ATTACHMENTSSet");
               
            },
            startUpload: function () {
                var oUploadSet = this.byId("UploadSet");
                var cFiles = oUploadSet.getIncompleteItems().length;

                if (cFiles > 0) {
                    oUploadSet.upload();
                }
            },

            onBeforeUploadStarts: function (oEvent) {
                var oUploadSet = oEvent.getSource();
                var oItemToUpload = oEvent.getParameter("item");
           
                var oCustomerHeaderToken = new sap.ui.core.Item({
                    key: "x-csrf-token",
                    text: this.getView().getModel().getSecurityToken()
                });

                // Header Slug
                var oCustomerHeaderSlug = new sap.ui.core.Item({
                    key: "slug",
                    text: oItemToUpload.getFileName()
                });
                 // Header Slug
                 var oCustomerHeaderSlug1 = new sap.ui.core.Item({
                    key: "invid",
                    text: 1
                });

                oUploadSet.removeAllHeaderFields();
                oUploadSet.addHeaderField(oCustomerHeaderToken);
                oUploadSet.addHeaderField(oCustomerHeaderSlug);
                oUploadSet.addHeaderField(oCustomerHeaderSlug1);
            },
            onItemRemoval:function(){

            },
            onUploadCompleted: function (oEvent) {
                var that = this;
                var oModel =  this.getOwnerComponent().getModel();
                var oUploadSet = this.byId("UploadSet");
                oEvent.getParameters().item.attachRemovePressed(function(oEvent1){
                    debugger;
                    var item = oEvent1.mParameters.item;
                    oEvent1.preventDefault(true);
                    var GUID = oEvent1.mParameters.item.mProperties.FileGuid;
                    MessageBox.show(
                        "Are you sure want to delete File", {
                            icon: MessageBox.Icon.INFORMATION,
                            title: "File Deletion",
                            actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                            emphasizedAction: MessageBox.Action.YES,
                            onClose: function (oAction) { 
                                if(oAction === 'YES'){
                                    
                                    oModel.remove("/Z802_ATTACHMENTSSet('"+ GUID +"')",{
                                         success:function(oData){
                                            MessageBox.success(`File ${item.mProperties.fileName} deleted successfully`);
                                            oUploadSet.removeItem(item);
                                           
                                         },
                                         error:function(oErr){
                                            MessageBox.error('File deleted successfully');
                                         }
                                    });
                                }
                             }
                        }
                    );
                   
                });
                oEvent.mParameters.item.setVisibleEdit(false)
            var    parser = new DOMParser(),
          xmlDoc =       parser.parseFromString(oEvent.oSource._getActiveUploader()._mRequestHandlers[oEvent.getParameters().item.getId()].xhr.response,"text/xml");
                oEvent.mParameters.item.setUrl(
                    this.getOwnerComponent().getModel().sServiceUrl + "/Z802_ATTACHMENTSSet('" +xmlDoc.getElementsByTagName('d:Guid')[0].getInnerHTML()+"')/$value"
                        
                    )
                    oEvent.mParameters.item.mProperties.FileGuid = xmlDoc.getElementsByTagName('d:Guid')[0].getInnerHTML();
                    console.log(  this.getOwnerComponent().getModel().sServiceUrl + "/Z802_ATTACHMENTSSet('" +xmlDoc.getElementsByTagName('d:Guid')[0].getInnerHTML()+"')/$value")
                
            },
        });
    });
