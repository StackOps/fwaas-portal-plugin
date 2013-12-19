Ext.define('Stackops.portal.plugin.firewall.view.FirewallEdit', {
    extend: 'Ext.form.Panel',
    alias: 'widget.firewalledit',
    requires:['Stackops.portal.util.JsonFormPanel',
    'Stackops.portal.plugin.firewall.model.Firewall_Rule',
    'Ext.form.field.Checkbox',
    'Ext.data.JsonStore',
    'Ext.data.reader.Json'],
     

  	bodyPadding: 5,
    layout: 'anchor',
    align: 'center',
    defaults: {
         labelAlign: 'left', 
        // (top, right, bottom, left).
        padding: '3 0 2 0',
        width: 350,
    },
    
    border : false,
	buttonAlign : 'center',

    // The fields
   

    
    defaultType: 'textfield',
   	initComponent: function() {
   		var me = this;
   		

		me.policy_store = Ext.create('Stackops.portal.plugin.firewall.store.Policy');
		me.policy_store.load();

		// ComboBox with multiple selection enabled
		me.policyCombo = Ext.create('Ext.form.field.ComboBox', {
		    fieldLabel: 'Select one Policy',
		    //renderTo: 'multiSelectCombo',
		    
		    displayField: 'name',
		    valueField: 'id',
		    labelWidth : 120,
	        margin : '5 5 5 5',
		    store: me.policy_store,
		    queryMode: 'local',
		    value : me.record.get('firewall_policy_id')
		});

	    me.items= [
	    {
	        fieldLabel: 'Name',
	        name: 'name',
	        labelWidth : 120,
	        margin : '5 5 5 5',  
	        /*helpText: 'Para crear una nueva Máquina Virtual o Instancia,'+
            ' deberá proveer la siguiente información:\n',
	        */allowBlank: false,
	        value : me.record.get('name')
	    },
	        	
    	];
    	
    	me.items.push(me.policyCombo)

   		
   		me.description = Ext.create('Ext.form.field.TextArea',{
   			
   			grow : true,
   			labelWidth : 120,
   			margin : '5 5 5 5',
   			fieldLabel: 'Description', 
   			name: 'description', 
   			value: me.record.get('description')
   		});
   		me.items.push(me.description);
   		
   		
   		
   		/*me.sharedBox =  Ext.create ('Ext.form.field.Checkbox',{
    		boxLabel : 'Shared',
           // margin: '2 2 2 2',
            labelWidth : 120,
	        margin : '5 5 5 5',  
            align: 'right',
            //style: 'font-size:11px;',
            value: me.record.get('shared'),
            checked : me.record.get('shared'),
            name : 'shared',
            scope: me  
    	});	
    	me.items.push(me.sharedBox);
    	*/
    	me.adminstateBox =  Ext.create ('Ext.form.field.Checkbox',{
    		boxLabel : Portal.getText('firewall', 'fwaas-action-edit-firewall-admin_state_up'),
            //margin: '2 2 2 2',
            labelWidth : 120,
	        margin : '5 5 15 5',  
            align: 'right',
            style: 'font-size:11px;',
            value: me.record.get('admin_state_up'),
            checked : me.record.get('admin_state_up'),
            name : 'admin_state_up',
            scope: me  
    	});	
    	me.items.push(me.adminstateBox);    	
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
            	firewall : {
	            	name : form.findField('name').getValue(),	            	
	            	admin_state_up : form.findField('admin_state_up').getValue(),
	            	//shared : form.findField('shared').getValue(),
	            	firewall_policy_id : me.policyCombo.getValue()
	            }
            }; 
           	if(me.description.getValue()!="" && me.description.getValue() != null){
            	this.json.firewall.description = me.description.getValue();
            }
            
            

            
            
			if (form.isValid()) {
				Ext.Ajax.request({
					headers : {
						'Accept' : 'application/json',
						'Content-Type' : 'application/json'
					},
					url : 'proxy/network/' + Portal.firewall.neutronProxy + 'fw/firewalls/' + me.record.get('id'),
					params : null,
					method : 'PUT',
					jsonData : this.json,
					callback : function(options, success, response) {
						if (success) {
							this.up('form').section.refresh();
							this.up('form').up('window').close();
						} else {
							if (response.responseText != null) {
								var resp = Ext.decode(response.responseText, true);
								if (resp != null && resp.NeutronError != null && resp.NeutronError.message != null) {
									resp = resp.NeutronError.message;
								} 
								else if(resp!=null && resp.NeutronError!=null ){
	                        				resp = resp.NeutronError
	                        	}
								else {
									resp = Portal.getText('firewall', 'fwaas-error-edit-firewall');
								}
							} else {
								resp = Portal.getText('firewall', 'fwaas-error-edit-firewall');
							}
							Ext.Msg.show({
								msg : resp,
								icon : Ext.Msg.ERROR,
								buttons : Ext.Msg.OK,
								fn : function() {
								},
								scope : this
							});
							this.up('form').section.refresh();
							this.up('form').up('window').close();
						}
					},
					scope : this
				});

			}

        }
    }]
     
});
  	