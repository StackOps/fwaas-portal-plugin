Ext.define('Stackops.portal.plugin.firewall.view.RuleEdit', {
    extend: 'Ext.form.Panel',
    alias: 'widget.fwaasruleedit',
    requires:['Stackops.portal.util.JsonFormPanel',
    'Ext.form.field.Checkbox',
    'Ext.data.JsonStore',
    'Ext.data.reader.Json'],
     
	border : false,
    buttonAlign : 'center',
  	bodyPadding: 5,
    layout: 'anchor',
    align: 'center',
    defaults: {
        labelAlign: 'left', 
        margin : '10 5 10 5',
        labelWidth : 180,
        width: 430,
    },

    // The fields
   

    
    defaultType: 'textfield',
   	initComponent: function() {
   		var me = this;
   		
   		var cidrTest = /^((([0-9])|([1-9][0-9])|([1][0-9][0-9])|([2][0-4][0-9])|(25[0-5]))[.]){3}(([0-9])|([1-9][0-9])|([1][0-9][0-9])|([2][0-4][0-9])|(25[0-5]))(\/([0-9]|[1-2][0-9]|3[0-2])){0,1}$/;
		Ext.apply(Ext.form.field.VTypes, {
		    cidr: function(val, field) {
		        return cidrTest.test(val);
		    },
		    cidrText: Portal.getText('firewall', 'rule-edit-vtype-cidr-text'),
		    cidrMask: /[\d\.\/]/i
		});
		
		var portsTest = /^([0-9]|[1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|(65)[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])(:([0-9]|[1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|(65)[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])){0,1}$/;
		Ext.apply(Ext.form.field.VTypes, {
		    ports: function(val, field) {
		        return portsTest.test(val);
		    },
		    portsText: Portal.getText('firewall', 'rule-edit-vtype-ports-text'),
		    portsMask: /[\d\:]/i
		});
   		
   		
   		me.protocolsStore =  Ext.create('Ext.data.Store', {
        	fields: ['id', 'name'],
            data : [
            	{ "id": "tcp", "name" : "TCP" },
            	{ "id": "udp", "name" : "UDP" },
            	{ "id": "icmp", "name" : "ICMP" },
            	{ "id": "any", "name" : "ANY" }
           	]
       });
       
       me.actionsStore =  Ext.create('Ext.data.Store', {
        	fields: ['id', 'name'],
            data : [
            	{ "id": "allow", "name" : "ALLOW" },
            	{ "id": "deny", "name" : "DENY" }
           	]
       });
   		
	    me.items= [
	    {
	        fieldLabel: Portal.getText('firewall', 'rule-edit-name'),
	        emptyText : Portal.getText('firewall', 'emptyText'),
	        name: 'name',
	        value : me.record.get('name'),
	        //labelWidth : 180,
	        //width : 400,
	        //margin : '10 5 10 5',  
	        //fwaasmandatory : true,
	        allowBlank: false
	    },
	        	
    	];
    	
    	
    	
    	
    	
    	me.protocols_combo = {
    			xtype : 'combo',
    			//labelWidth : 180,
    			//width : 400,
    			fieldLabel : Portal.getText('firewall', 'rule-edit-protocol'),
    			displayField: 'name',
	            valueField: 'id',
	            value : me.record.get('protocol'),            
	            forceSelection : true,
	            allowBlank : false,
    			queryMode: 'local', 
	   			typeAhead : true,
	   			name:'protocol',  
	   			store : me.protocolsStore,
	   			//fwaasmandatory : true
    	};
    	
   		me.items.push(me.protocols_combo);
   		
   		me.actions_combo = {
    			xtype : 'combo',
    			//labelWidth : 180,
    			//width : 400,
    			fieldLabel : Portal.getText('firewall', 'rule-edit-action'),
    			displayField: 'name',
	            valueField: 'id',
	            value: me.record.get('action'),            
	            forceSelection : true,
	            allowBlank : false,
    			queryMode: 'local', 
	   			typeAhead : true,
	   			name:'action',  
	   			store : me.actionsStore,
	   			//fwaasmandatory : true
    	};
   		
   		me.items.push(me.actions_combo);
   		
   		me.s_ip = {
    			xtype : 'textfield',
    			//labelWidth : 180,
    			//width : 400,
    			fieldLabel : Portal.getText('firewall', 'rule-edit-s_address'), 
	   			name:'s_address',
	   			vtype: 'cidr',
	   			value : me.record.get('source_ip_address'),
    	};
   		
   		/*Ext.create('Ext.form.field.Text',{ 
   			labelWidth : 180,
   			margin : '10 5 10 5',
   			fieldLabel: 'Source Ip Address/Subnet', 
   			name: 's_address', 
   			helpText: 'source',
   			//emptyText: Portal.getText('networking', 'networkAddressEx'),
   			allowBlank: true,
   			vtype: 'cidr',
   		});*/
   		
   		
   		me.items.push(me.s_ip);  
   		
   		
   		me.d_ip = {
    			xtype : 'textfield',
    			//labelWidth : 180,
    			//width : 400,
    			fieldLabel : Portal.getText('firewall', 'rule-edit-d_address'),  
	   			name : 'd_address',
	   			vtype : 'cidr',
	   			value : me.record.get('destination_ip_address'),
    	};
   		

   		me.items.push(me.d_ip);
   		
   		me.s_port = {
    			xtype : 'textfield',
    			//labelWidth : 180,
    			//width : 400,
    			fieldLabel : Portal.getText('firewall', 'rule-edit-s_port'),   
	   			name : 's_port',
	   			vtype: 'ports',
	   			value : me.record.get('source_port'),
    	};
    	

   		me.items.push(me.s_port);
   		
   		me.d_port = {
    			xtype : 'textfield',
    			//labelWidth : 180,
    			//width : 400,
    			fieldLabel : Portal.getText('firewall', 'rule-edit-d_port'),
	   			name : 'd_port',
	   			vtype: 'ports',
	   			value : me.record.get('destination_port'),
    	};
   		
   		me.items.push(me.d_port);
   		
   		
   		/*me.tenantsStore =  Ext.create('Ext.data.Store', {
        	fields: ['id', 'name'],
            data : me.section.tenantsData
       	});
       
   		me.tenants_combo = {
    			xtype : 'combo',
    			fieldLabel : 'Tenant',
    			displayField: 'name',
	            valueField: 'id',      
    			queryMode: 'local', 
	   			typeAhead : true,
	   			name:'tenant_id',  
	   			value : me.section.tenantId,
	   			store : me.tenantsStore
    	};
    	
    	if(me.section.admin){
   			me.items.push(me.tenants_combo);
   		}*/
   		
   		me.description = Ext.create('Ext.form.field.TextArea',{
   			
   			grow : true,
   			labelWidth : 180,
   			//width : 400,
   			//margin : '10 5 10 5',
   			fieldLabel: Portal.getText('firewall', 'rule-edit-description'), 
   			name: 'description', 
   			value : me.record.get('description')
   		});
   		me.items.push(me.description);
   		
   		
   		
   		me.sharedBox =  Ext.create ('Ext.form.field.Checkbox',{
    		fieldLabel : Portal.getText('firewall', 'rule-edit-shared'),
           // margin: '2 2 2 2',
            labelWidth : 180,
	        margin : '10 5 10 5',  
            align: 'right',
            style: 'font-size:11px;',
            value: me.record.get('shared'),
            checked : me.record.get('shared'),
            name : 'shared',
            /*handler: function(){
            	 me.checkBoxOn.call(me);
            },*/
            scope: me  
    	});	
    	me.items.push(me.sharedBox);
    	
    	me.enabledBox =  Ext.create ('Ext.form.field.Checkbox',{
    		fieldLabel : Portal.getText('firewall', 'rule-edit-enabled'),
            labelWidth : 180,
	        margin : '10 50 10 5',  
            align: 'right',
            style: 'font-size:11px;',
            value: me.record.get('enabled'),
            checked : me.record.get('enabled'),
            name : 'enabled',
            scope: me  
    	});	
    	me.items.push(me.enabledBox);    	
      	me.callParent(arguments);
    
    },
    
    
    
    
    
    

    
    buttons: [{
        text: Portal.getText('firewall', 'cancel'),
        handler: function() {
            this.up('form').up('window').close();
        }
    }, {
    	text : Portal.getText('firewall', 'submit'),        
        formBind: true,
        handler: function() {
            var form = this.up('form').getForm();
            var me = this.up('form');
            this.json = {
            	firewall_rule : {
	            	name : form.findField('name').getValue(),
	            	action : form.findField('action').getValue(),
	            	protocol : form.findField('protocol').getValue(),
	            	enabled : form.findField('enabled').getValue(),
	            	shared : form.findField('shared').getValue(),
	            	description : form.findField('description').getValue()
	            }
            }; 
            
           /* if(form.findField('tenant_id')!=null && form.findField('tenant_id') != undefined && form.findField('tenant_id')!= "" &&
            form.findField('tenant_id').getValue()!="" && form.findField('tenant_id').getValue()!=null&& form.findField('tenant_id').getValue()!=undefined){
            	this.json.firewall_rule.tenant_id = form.findField('tenant_id').getValue();
            }
            else{
            	delete this.json.firewall_rule.tenant_id;
            }*/
            
            if(form.findField('s_address').getValue()==""){
            	this.json.firewall_rule.source_ip_address = null;
            }
            if(form.findField('d_address').getValue()==""){
            	this.json.firewall_rule.destination_ip_address = null;
            }
            if(form.findField('s_port').getValue()==""){
            	this.json.firewall_rule.source_port = null;
            }
            if(form.findField('d_port').getValue()==""){
            	this.json.firewall_rule.destination_port = null;
            }
            
            
            
            
			if (form.isValid()) {
				Ext.Ajax.request({
					headers : {
						'Accept' : 'application/json',
						'Content-Type' : 'application/json'
					},
					url : 'proxy/network/' + Portal.firewall.neutronProxy + 'fw/firewall_rules/' + me.record.get('id'),
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
									resp = Portal.getText('firewall', 'rule-edit-error');
								}
							} else {
								resp = Portal.getText('firewall', 'rule-edit-error');
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
  	