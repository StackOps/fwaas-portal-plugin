/*
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
    
        http://www.apache.org/licenses/LICENSE-2.0
    
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
Ext.define('Stackops.portal.plugin.firewall.view.FirewallGrid', {
    extend : 'Ext.grid.Panel',
    alias : 'widget.firewallgrid',
    requires: [
    'Stackops.portal.plugin.firewall.model.Rules', 
    'Stackops.portal.plugin.firewall.store.Firewall',
    'Stackops.portal.plugin.firewall.store.Rules',
    'Stackops.portal.plugin.firewall.store.Policy', 
    'Ext.data.Model',
    'Ext.grid.column.Template',
    'Ext.menu.Menu',
   	'Ext.button.Button',
   	'Ext.toolbar.Toolbar',   
    ],
    
    
     plugins: [ Ext.create('Ext.grid.plugin.CellEditing', { ptype: 'cellediting' })  ], 
                                                
    layout : {
    	type: 'anchor',
    	align: 'stretch'
    },
    anchor : '100%',
   //layout: 'fit',
  
    initComponent: function(){
    	var me = this;
    	
    	me.store = Ext.create('Ext.data.Store', {
		    model: 'Stackops.portal.plugin.firewall.model.Rules',
		    proxy   : {type    : 'memory'}, 
		    data : [],
		    sorters : ['position']
		});
		
		me.firewall_store = Ext.create('Stackops.portal.plugin.firewall.store.Firewall');
		me.rules_store = Ext.create('Stackops.portal.plugin.firewall.store.Rules');
		me.policy_store = Ext.create('Stackops.portal.plugin.firewall.store.Policy');
		me.firewall_store.load();
		me.rules_store.load();
		me.policy_store.load();
    
    	me.mon(me.firewall_store, 'load', me.onLoadFirewall, me);
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
            	header : Portal.getText('firewall', 'fwaas-grid-head-action'),
            	dataIndex : 'action',
            	renderer : function(value){
            		if(value=="allow"){
            			return  '<img align="left" src="plugin/static/firewall/images/allow-icon.png">'+ value;
            		}
            		else{
            			return  '<img align="left" src="plugin/static/firewall/images/deny-icon.png">' + value;
            		}
            	}        	
            },
            {
            	header: Portal.getText('firewall', 'fwaas-grid-head-enabled'),
            	dataIndex: 'enabled',
            	align : 'center',
            	renderer : function(value){
            		if(value)
            			return  '<img align="middle" src="plugin/static/firewall/images/fw-ok.png">';
            	}
            },
            {
            	header: Portal.getText('firewall', 'fwaas-grid-head-shared'),
            	dataIndex: 'shared',
            	align :'center',
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
            }            
    	];
    	me.mon(me,'itemcontextmenu',me.onContextMenu, me);
    	me.mon(me, 'itemdblclick', me.dbClick, me);
	   	me.mon(me,'select',me.onActionMenu, me);
    	me.mon(me,'itemclick',me.onActionMenu, me);
        me.callParent(arguments);
        
    },
    
    dbClick : function(grid, record, item, index, e, eOpts ){
    	var me = this;
    	me.section.section.details.call(me.section.section);
    },
    
    onLoadFirewall : function(store, records, success){
    	var me = this;
    	me.firewall_collection = new Ext.util.MixedCollection();
    	
    	Ext.Array.each(records, function(record){
    		var firewall = {
    			name : record.get('name'),
    			id : record.get('id'),
    			admin_state_up : record.get('admin_state_up'),
    			description : record.get('description'),
    			tenant_id : record.get('tenant_id'),
    			firewall_policy_id : record.get('firewall_policy_id'),
    			status : record.get('status'),
    			rules : new Ext.util.MixedCollection()
    		};
    		
    		me.firewall_collection.add(record.get('id'), firewall);
    		
    	});
    	
    	me.firewallLoaded = true;
    	me.initGrid();
    	
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
    	if(me.firewallLoaded && me.rulesLoaded && me.policyLoaded){
    		me.firewallLoaded = false;
    		me.rulesLoaded = false;
    		me.policyLoaded = false;
    		
    		
    		var firewall = me.firewall_collection.getByKey(me.firewall_id); //here we select the firewall    		
    		var policy_id = firewall.firewall_policy_id;
    		
    		var policy = me.policy_collection.getByKey(policy_id);
    		var rules = policy.firewall_rules;
    		
    		Ext.Array.each(rules, function(rule_id){
    			rule_list.push(me.rules_collection.getByKey(rule_id));
    		});
    		
    		
    		me.store.loadData(rule_list);
    		me.section.section.setLoading(false);
    	}
    },
    
    
    
    
    onContextMenu : function(grid, record, item, index, event, opts){
    	var me = this;
    	event.stopEvent(); 
    	me.section.section.fwCreateR.setVisible(false);
		me.section.section.fwDeleteR.setVisible(false);
		me.section.section.fwEditR.setVisible(false);
		me.section.section.ruleDeleteR.setVisible(false);
		me.section.section.ruleEditR.setVisible(false);
		me.section.section.policyCreateR.setVisible(false);
		me.section.section.policyDeleteR.setVisible(false);
		me.section.section.policyEditR.setVisible(false);
		me.section.section.insertCreateR.setVisible(false);
		me.section.section.ruleRemoveR.setVisible(false);		
		me.section.section.auditPolicyR.setVisible(false);
		me.section.section.disableRuleR.setVisible(false);
		me.section.section.enableRuleR.setVisible(false);		
		me.section.section.detailsR.setVisible(true);
		me.section.section.detailspR.setVisible(false);
		me.section.section.detailsfR.setVisible(false);
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
		me.section.section.insertCreateB.setVisible(false);
		me.section.section.ruleRemoveB.setVisible(false);		
		me.section.section.auditPolicyB.setVisible(false);
		me.section.section.disableRuleB.setVisible(false);
		me.section.section.enableRuleB.setVisible(false);		
		me.section.section.detailsB.setVisible(true);
		me.section.section.detailspB.setVisible(false);
		me.section.section.detailsfB.setVisible(false);

    	
    },
    
    refresh : function(){
    	var me = this;
    	me.section.section.setLoading(true);
    	me.firewall_store.load();
		me.rules_store.load();
		me.policy_store.load();
    },
    
    
    
    
    
    ipKind : function(value){
    	var me = this;
    	//return '<div><p style="float: left;"><img src="plugin/static/firewall/images/fw-ip.png" ></p> <p>\t' + value +'</p></div>'
    	if(value!=null && value!="")
    		return  '<img align="left" src="plugin/static/firewall/images/fw-ip.png">\t' +value;
    },
    
    shared : function(value){
    	if(value){
    		return  '<img align="left" src="plugin/static/firewall/images/fw-shared.png">';
    	}
    },
    
    portValue : function(value){
    	if(value!=null && value !="")
    		return '<img align="left" src="plugin/static/firewall/images/port_16.png">\t' +value;
    }
});