Ext.define('Stackops.portal.plugin.firewall.view.RuleInsert', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ruleinsert',
    requires:['Stackops.portal.util.JsonFormPanel',
    'Ext.form.field.Checkbox',
    'Ext.data.JsonStore',
    'Ext.data.reader.Json',
    'Stackops.portal.plugin.firewall.model.Firewall_Rule'],
     

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
   		
   		
	    me.items= [];
    	
    	me.rules_store = Ext.create('Ext.data.Store', {
		    model: 'Stackops.portal.plugin.firewall.model.Firewall_Rule',
		    data: me.rule_store
		});
		
		me.mixedC = new Ext.util.MixedCollection();
		
		/*Ext.each(me.policyRecord.raw.firewall_rules, function(record){
			values = {
				id : record
			};
			me.mixedC.add(record, values);
		});*/
		
	
		me.rules_store_aux = Ext.create('Ext.data.Store', {
		    model: 'Stackops.portal.plugin.firewall.model.Firewall_Rule',
		    data: me.rule_of_policy//me.mixedC.getRange()
		});
		

    	
    	
    	me.rules_combo = Ext.create('Ext.form.field.ComboBox',
   		{
   			fieldLabel: Portal.getText('firewall', 'fwaas-insert-rule'),
   			displayField: 'name',
            valueField: 'id',          
            forceSelection : true,
            allowBlank : false,
            margin : '10 5 10 5',   			
   			queryMode: 'local', 
   			labelWidth : 120,
   			store : me.rules_store,
   			typeAhead : true,
   			name:'firewall_rule_id',  
   			tpl: Ext.create('Ext.XTemplate',
		        '<tpl for=".">',			       
			        	'<div class="x-boundlist-item">{id} - {name}</div>',				        
		        '</tpl>'		       
		    ),
    		displayTpl: Ext.create('Ext.XTemplate',
		        '<tpl for=".">',			        
			        	'{name}',
		        '</tpl>'		        
		  )
   		});
   		me.items.push(me.rules_combo);
   		
   		
   		
   		me.rules_combo_aux = Ext.create('Ext.form.field.ComboBox',
   		{
   			fieldLabel: Portal.getText('firewall', 'fwaas-insert-rule-before'),
   			displayField: 'name',
            valueField: 'id',          
            //forceSelection : true,
            margin : '10 5 10 5',   			
   			queryMode: 'local', 
   			labelWidth : 120,
   			typeAhead : true,
   			name:'insert_before',  
   			store : me.rules_store_aux
   		});
   		
   		
   		me.items.push(me.rules_combo_aux);
   		
   		
   		me.rules_combo_after = Ext.create('Ext.form.field.ComboBox',
   		{
   			fieldLabel: Portal.getText('firewall', 'fwaas-insert-rule-after'),
   			displayField: 'name',
            valueField: 'id',         
            //forceSelection : true,
            margin : '10 5 20 5',   			
   			queryMode: 'local', 
   			labelWidth : 120,
   			typeAhead : true,
   			name:'insert_after',  
   			store : me.rules_store_aux
   		});
   		me.items.push(me.rules_combo_after);
   		
      	me.callParent(arguments);
    
    },
    
    
    
    
    
    

    
    buttons: [{
        text: Portal.getText('firewall', 'cancel'),
        handler: function() {
            this.up('form').up('window').close();
        }
    }, {
    	text : Portal.getText('firewall', 'create'),   
        formBind: true,
        handler: function() {
            var form = this.up('form').getForm();
            var me = this.up('form');
            if (form.isValid()) {
            		 		Ext.Ajax.request({
            					headers: {'Accept': 'application/json','Content-Type': 'application/json'},
            					url: 'proxy/network/'+Portal.firewall.neutronProxy+'fw/firewall_policies/'+me.section.treePanel.currentSection+"/insert_rule",
            					params : null,
            					method : 'PUT',
            					jsonData : form.getValues(),
            					callback : function(options,success,response){
            						if(success){
										this.up('form').section.refresh();
                						this.up('form').up('window').close(); 
            						}else{
            							var resp = Ext.decode(response.responseText);
            							var message = Portal.getText('firewall', 'fwaas-error-insert-rule');
            							
            							
            							if(resp!=null && resp.NeutronError!= null && resp.NeutronError.message != null){
            								
            								message = resp.NeutronError.message;
            							}
            							else if(resp!=null && resp.NeutronError!=null ){
	                        				resp = resp.NeutronError
	                        			}
										
            							Ext.Msg.show({
		                                    msg : message,
		                                    icon : Ext.Msg.ERROR,
		                                    buttons : Ext.Msg.OK,
		                                    fn : function(){},
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
  	