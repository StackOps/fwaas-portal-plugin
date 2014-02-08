Ext.define('Stackops.portal.plugin.firewall.view.PolicyGrid', {
    extend : 'Ext.grid.Panel',
    alias : 'widget.policygrid',
    requires: [
    'Stackops.portal.plugin.firewall.model.Rules', 
    'Stackops.portal.plugin.firewall.store.Firewall',
    'Stackops.portal.plugin.firewall.store.Rules',
    'Stackops.portal.plugin.firewall.store.Policy',
    'Ext.tree.Column',
    'Ext.data.Model',
    'Ext.grid.column.Template',
    'Ext.menu.Menu',
   	'Ext.button.Button',
   	'Ext.toolbar.Toolbar',   		
   	'Ext.data.Store',
    ],
    layout: 'fit',
    /*layout : {
    	type: 'anchor',
    	align: 'stretch'
    },*/
    anchor : '100%',
    initComponent: function(){
    	var me = this;
    	
    	
    	me.store = Ext.create('Ext.data.Store', {
		    model: 'Stackops.portal.plugin.firewall.model.Rules',
		    proxy   : {type    : 'memory'}, 
		    data : []
		});
		
		
		me.rules_store = Ext.create('Stackops.portal.plugin.firewall.store.Rules');
		me.policy_store = Ext.create('Stackops.portal.plugin.firewall.store.Policy');		
		me.rules_store.load();
		me.policy_store.load();
    
    	
    	me.mon(me.rules_store, 'load', me.onLoadRules, me);
    	me.mon(me.policy_store, 'load', me.onLoadPolicy, me);
		
    	
		me.columns = [
            {   
            	//xtype: 'treecolumn',  
            	//sortable: true,         	
            	header: Portal.getText('firewall', 'fwaas-grid-head-name'),
            	dataIndex: 'name',    
            }, 
            {
            	header: Portal.getText('firewall', 'fwaas-grid-head-id'),
            	dataIndex: 'id'
            },
            {
            	header: Portal.getText('firewall', 'fwaas-grid-head-enabled'),
            	dataIndex: 'enabled',
            	align : 'center',
            	renderer : function(value){
            		if(value)
            			return  '<img align="left" src="plugin/static/firewall/images/fw-ok.png">';
            	}
            },
            {
            	header: Portal.getText('firewall', 'fwaas-grid-head-shared'),
            	dataIndex: 'shared',
            	renderer : me.shared
            },
            
            {
            	header: Portal.getText('firewall', 'fwaas-grid-head-position'),
            	dataIndex: 'position'
            }, 
            {
            	header: Portal.getText('firewall', 'fwaas-grid-head-protocol'),
            	dataIndex: 'protocol'
            },  
            {
            	header: Portal.getText('firewall', 'fwaas-grid-head-ip_version'),
            	dataIndex: 'ip_version'
            },  
            {
            	header: Portal.getText('firewall', 'fwaas-grid-head-source_ip_address'),
            	dataIndex: 'source_ip_address',
            	renderer : me.ipKind
            },  
            {
            	header: Portal.getText('firewall', 'fwaas-grid-head-destination_ip_address'),
            	dataIndex: 'destination_ip_address',
            	renderer : me.ipKind
            },  
            {
            	header: Portal.getText('firewall', 'fwaas-grid-head-source_port'),
            	dataIndex: 'source_port',
            	renderer : me.portValue
            },  
            {
            	header: Portal.getText('firewall', 'fwaas-grid-head-destination_port'),
            	dataIndex: 'destination_port',
            	renderer : me.portValue
            },   
            {
            	header: Portal.getText('firewall', 'fwaas-grid-head-description'),
            	dataIndex: 'description'
            }, 
            {
            	header: Portal.getText('firewall', 'fwaas-grid-head-tenant_id'),
            	dataIndex: 'tenant_id'
            },          
            
    	];
    	
    	me.mon(me,'itemcontextmenu',me.onContextMenu, me);
	   	me.mon(me,'select',me.onActionMenu, me);
	   	me.mon(me,'itemclick',me.onActionMenu, me);
	   	me.mon(me, 'itemdblclick', me.dbClick, me);
        me.callParent(arguments);
        
    },
    dbClick : function(grid, record, item, index, e, eOpts ){
    	var me = this;
    	me.section.section.detailsCall.call(me.section.section);
    },
    
    onLoadPolicy : function(store, records, siccess){
    	var me = this;
    	me.policy_collection = new Ext.util.MixedCollection();
    	
    	
    	Ext.Array.each (records, function(record){
    		var policy = {
    			id : record.get('id'),
    			name : record.get('name'),
    			enabled : record.get('enabled'),
    			shared : record.get('shared'),
    			description : record.get('description'),
    			tenant_id : record.get('tenant_id'),
    			audited : record.get('audited'),
    			firewall_rules : record.get('firewall_rules')
    		};
    		
    		me.policy_collection.add(record.get('id'), policy);
    	});
    	
    	me.policyLoaded = true;
    	me.initGrid();
    },
    
    onLoadRules : function(store, records, success){
    	var me = this;
    	me.rules_collection = new Ext.util.MixedCollection();
    	
    	Ext.Array.each(records, function(record){
    		var rules = {
    			id : record.get('id'),
    			name : record.get('name'),
    			enabled : record.get('enabled'),
    			action : record.get('action'),
    			protocol : record.get('protocol'),
    			description : record.get('description'),
    			ip_version : record.get('ip_version'),
    			tenant_id : record.get('tenant_id'),
    			source_ip_address : record.get('source_ip_address'),
    			destination_ip_address : record.get('destination_ip_address'),
    			firewall_policy_id : record.get('firewall_policy_id'),
    			shared : record.get('shared'),
    			source_port : record.get('source_port'),
    			destination_port : record.get('destination_por'),
    			firewall_rules : record.get('firewall_rules'),
    			position : record.get('position')
    		};
    		
    		me.rules_collection.add(record.get('id'), rules);
    	});
    	
    	me.rulesLoaded = true;
    	me.initGrid();
    }, 
    
   
    
    initGrid : function(){
    	var me = this;
    	var rule_list = [];
    	if( me.rulesLoaded && me.policyLoaded){
    	
    		me.rulesLoaded = false;
    		me.policyLoaded = false;
    		
    		
    		var policy = me.policy_collection.getByKey(me.policy_id); //here we select the firewall    		
    		var rules = policy.firewall_rules;
    		Ext.Array.each(rules, function(rule_id){
    			rule_list.push(me.rules_collection.getByKey(rule_id));
    		});
    		me.store.loadData(rule_list);
    		me.section.section.setLoading(false);
    	}
    },
    
    refresh : function(){
    	var me = this;
    	me.section.section.setLoading(true);
    	me.rules_store.load();
		me.policy_store.load();
    },
    
    
    onContextMenu : function(grid, record, item, index, event, opts){
    	var me = this;
    	event.stopEvent();
    	//me.grid.getSelectionModel().select(record);
    	
    	
    	me.section.section.fwCreateR.setVisible(false);
		me.section.section.fwDeleteR.setVisible(false);
		me.section.section.fwEditR.setVisible(false);
		me.section.section.ruleCreateR.setVisible(false);
		me.section.section.ruleDeleteR.setVisible(false);
		me.section.section.ruleEditR.setVisible(false);
		me.section.section.policyCreateR.setVisible(false);
		me.section.section.policyDeleteR.setVisible(false);
		me.section.section.policyEditR.setVisible(false);
		me.section.section.insertCreateR.setVisible(true);
		me.section.section.ruleRemoveR.setVisible(true);
		me.section.section.auditPolicyR.setVisible(false);
		me.section.section.detailsR.setVisible(true);
		me.section.section.detailspR.setVisible(false);
		me.section.section.detailsfR.setVisible(false);
		if(record.get('enabled'))	{
			me.section.section.disableRuleR.setVisible(true);
			me.section.section.enableRuleR.setVisible(false);
		}
		else{
			 me.section.section.enableRuleR.setVisible(true);
			 me.section.section.disableRuleR.setVisible(false);
		}
		
		
		
		me.section.section.rightMenu.showAt(event.xy);
    },
    
    onActionMenu: function(grid,record,index,opts){
    	var me = this;
    	
		me.section.section.fwCreateB.setVisible(false);
		me.section.section.fwDeleteB.setVisible(false);
		me.section.section.fwEditB.setVisible(false);
		me.section.section.ruleCreateB.setVisible(false);
		me.section.section.ruleDeleteB.setVisible(false);
		me.section.section.ruleEditB.setVisible(false);
		me.section.section.policyCreateB.setVisible(false);
		me.section.section.policyDeleteB.setVisible(false);
		me.section.section.policyEditB.setVisible(false);
		me.section.section.insertCreateB.setVisible(true);		
		me.section.section.auditPolicyB.setVisible(false);		
		me.section.section.detailsB.setVisible(false);
		me.section.section.detailspB.setVisible(false);
		me.section.section.detailsfB.setVisible(false);
		
		if(record!=null) {
			me.section.section.ruleRemoveB.setVisible(true);
			me.section.section.detailsB.setVisible(true);
			if(record.get('enabled'))	{
				me.section.section.disableRuleB.setVisible(true);
				me.section.section.enableRuleB.setVisible(false);
			}
			else{
				 me.section.section.enableRuleB.setVisible(true);
				 me.section.section.disableRuleB.setVisible(false);
			}
		}
		else {
			me.section.section.ruleRemoveB.setVisible(false);
			me.section.section.detailsB.setVisible(false);
		}
    },
    
   
    
    
     ipKind : function(value){
    	var me = this;
    	//return '<div><p style="float: left;"><img src="plugin/static/firewall/images/fw-ip.png" ></p> <p>\t' + value +'</p></div>'
    	if(value!=null && value!="")
    		return  '<img align="left" src="plugin/static/firewall/images/fw-ip.png">\t' +value;
    },
    
    shared : function(value){
    	if(value){
    		return  '<img align="left" src="plugin/static/firewall/images/fw-shared.png">' ;
    	}
    },
    
    portValue : function(value){
    	if(value!=null && value !="")
    		return '<img align="left" src="plugin/static/firewall/images/port_16.png">\t' +value;
    }
    

});