Ext.define('Stackops.portal.plugin.firewall.view.PolicyCreate', {
    extend: 'Ext.form.Panel',
    alias: 'widget.policycreate',
    requires:['Stackops.portal.util.JsonFormPanel',
    'Stackops.portal.plugin.firewall.model.Firewall_Rule',
    'Stackops.portal.plugin.firewall.store.Rules',
    'Ext.form.field.Checkbox',
    'Ext.data.JsonStore',
    'Ext.data.reader.Json'],
     

  	bodyPadding: 5,
    layout: 'anchor',
    align: 'center',
    //height : 250,
    defaults: {
         labelAlign: 'left', 
        // (top, right, bottom, left).
        padding: '3 0 2 0',
        width: 380
    },
    border : false,
    buttonAlign : 'center',

    // The fields
   

    
    defaultType: 'textfield',
   	initComponent: function() {
   		var me = this;
   		
		
		
		
		me.rulesStore = Ext.create('Ext.data.Store', {
       						model: 'Stackops.portal.plugin.firewall.model.Firewall_Rule',
                			data : me.rules_store
        				});        

		me.multiCombo = Ext.create('Ext.form.field.ComboBox', {
		    fieldLabel: Portal.getText('firewall', 'fwaas-action-create-policy-rule'),
		    //renderTo: 'multiSelectCombo',
		    multiSelect: true,
		    displayField: 'name',
		    valueField: 'id',
		    labelWidth : 150,
	        margin : '5 5 5 5',
		    store: me.rulesStore,
		    forceSelection: true,
		    queryMode: 'local'
		});
   		
	    me.items= [
	    {
	        fieldLabel: Portal.getText('firewall', 'fwaas-action-create-policy-name'),
	        name: 'name',
	        labelWidth : 150,
	        margin : '5 5 5 5',  
	        /*helpText: 'Para crear una nueva Máquina Virtual o Instancia,'+
            ' deberá proveer la siguiente información:\n',
	        */allowBlank: false
	    },
	        	
    	];
    	me.items.push(me.multiCombo)
    	
   		
   		me.description = Ext.create('Ext.form.field.TextArea',{
   			
   			grow : true,
   			labelWidth : 150,
   			margin : '5 5 5 5',
   			fieldLabel: Portal.getText('firewall', 'fwaas-action-create-policy-description'),
   			name: 'description', 
   		});
   		me.items.push(me.description);
   		
   		
   		
   		me.sharedBox =  Ext.create ('Ext.form.field.Checkbox',{
    		boxLabel : Portal.getText('firewall', 'fwaas-action-create-policy-shared'),
	        margin : '5 5 5 5',  
            align: 'right',
            style: 'font-size:11px;',
            value: 'false',
            name : 'shared',
            /*handler: function(){
            	 me.checkBoxOn.call(me);
            },*/
            scope: me  
    	});	
    	me.items.push(me.sharedBox);
    	
    	me.auditedBox =  Ext.create ('Ext.form.field.Checkbox',{
    		boxLabel : Portal.getText('firewall', 'fwaas-action-create-policy-audited'),
	        margin : '10 5 15 5',  
            style: 'font-size:11px;',
            value: 'true',
            name : 'audited',
            scope: me  
    	});	
    	me.items.push(me.auditedBox);    	
      	me.callParent(arguments);
    
    },
    
    
    
    buttons: [{
        text: Portal.getText('firewall', 'cancel'),
        handler: function() {
        	var me = this.up('form');
            this.up('form').up('window').close();
        }
    }, {
    	text : Portal.getText('firewall', 'create'),    
        formBind: true,
        handler: function() {
            var form = this.up('form').getForm();
            var me = this.up('form');
            this.json = {
            	firewall_policy : {
	            	name : form.findField('name').getValue(),	            	
	            	audited : form.findField('audited').getValue(),
	            	shared : form.findField('shared').getValue(),
	            	firewall_rules : []
	            }
            }; 
           	if(me.description.getValue()!="" && me.description.getValue() != null){
            	this.json.firewall_policy.description = me.description.getValue();
            }
            
            if(me.multiCombo.getValue()!="" && me.multiCombo.getValue() != null){
            	this.json.firewall_policy.firewall_rules = me.multiCombo.getValue();
            }

            
            if (form.isValid()) {
            	me.multiCombo.getValue();
            		 		Ext.Ajax.request({
            					headers: {'Accept': 'application/json','Content-Type': 'application/json'},
            					url: 'proxy/network/'+Portal.firewall.neutronProxy+'fw/firewall_policies',
            					params : null,
            					method : 'POST',
            					jsonData : this.json,
            					callback : function(options,success,response){
            						if(success){
            							var resp = Ext.decode(response.responseText);
										var firewall_policy = resp.firewall_policy;
										
										this.up('form').section.treePanel.created = true;
										this.up('form').section.treePanel.created_id = firewall_policy.id;
										this.up('form').section.treePanel.nodeExpanded.add('epolicy', 'epolicy');
										
										this.up('form').section.refresh();
                						this.up('form').up('window').close(); 
            						}else{
		            					if(response.responseText!=null){
		                        			resp = Ext.decode(response.responseText, true);
		                        			if(resp!=null && resp.NeutronError!=null && resp.NeutronError.message)
		                        			{
		                        				resp = resp.NeutronError.message
		                        			}
		                        			else if(resp!=null && resp.NeutronError!=null ){
		                        				resp = resp.NeutronError
		                        			}
		                        			else{
		                        				resp = Portal.getText('firewall', 'fwaas-error-create-policy');
		                        			}
		                    			}
		                    			else{
		                        			resp = Portal.getText('firewall', 'fwaas-error-create-policy');
		                    			}
		            					Ext.Msg.show({
		                                    msg : resp,
		                                    icon : Ext.Msg.ERROR,
		                                    buttons : Ext.Msg.OK,
		                                    fn : function(){},
		                                    scope : this
		                                });
		                                this.up('form').section.refresh();
	                        	}
            					},
			            		scope : this
                			});
                			
            }
        }
    }]
     
});
  	