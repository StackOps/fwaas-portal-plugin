Ext.define('Stackops.portal.plugin.firewall.view.RulesGrid', {
    extend : 'Ext.grid.Panel',
    alias : 'widget.rulesrid',
    requires: [
    'Stackops.portal.plugin.firewall.model.Rules',
    'Ext.tree.Column',
    'Ext.data.Model',
    'Ext.grid.column.Template',
    'Ext.menu.Menu',
   	'Ext.button.Button',
   	'Ext.toolbar.Toolbar',   		
   	'Ext.data.Store',
    ],
   	viewConfig: {
   		loadMask : false,
		loadingText: undefined
	},
   //layout: 'fit',
  	layout : {
    	type: 'anchor',
    	align: 'stretch'
    },
    anchor : '100%',
    initComponent: function(){
    	var me = this;
    	
    	
    	me.store = Ext.create('Stackops.portal.plugin.firewall.store.Rules');	
		me.store.load();
    	
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
            	header : Portal.getText('firewall', 'fwaas-grid-head-available'),
            	dataIndex: 'firewall_policy_id',
            	align : 'center',
            	renderer : function(value){
            		if(value==""||value==undefined||value==null)
            			return  '<img align="middle" src="plugin/static/firewall/images/fw-ok.png">';
            	}
            },
            {
            	header : Portal.getText('firewall', 'fwaas-grid-head-policy_id'),
            	dataIndex : 'firewall_policy_id',
            	align : 'center',            	
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
	   	me.mon(me.store,'load',me.onLoadStore, me);
	   	me.mon(me, 'itemdblclick', me.dbClick, me);
        me.callParent(arguments);
        
    },
    dbClick : function(grid, record, item, index, e, eOpts ){
    	var me = this;
    	me.section.section.details.call(me.section.section);
    },
    
    onContextMenu : function(grid, record, item, index, event, opts){
    	var me = this;
    	event.stopEvent();
    	
    	
    	me.section.section.fwCreateR.setVisible(false);
		me.section.section.fwDeleteR.setVisible(false);
		me.section.section.fwEditR.setVisible(false);
		me.section.section.ruleDeleteR.setVisible(true);
		me.section.section.ruleEditR.setVisible(true);
		me.section.section.policyCreateR.setVisible(false);
		me.section.section.policyDeleteR.setVisible(false);
		me.section.section.policyEditR.setVisible(false);
		me.section.section.insertCreateR.setVisible(false);
		me.section.section.ruleRemoveR.setVisible(false);		
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
		me.section.section.ruleCreateB.setVisible(true);
		me.section.section.policyCreateB.setVisible(false);
		me.section.section.policyDeleteB.setVisible(false);
		me.section.section.policyEditB.setVisible(false);
		me.section.section.insertCreateB.setVisible(false);
		me.section.section.ruleRemoveB.setVisible(false);
		me.section.section.auditPolicyB.setVisible(false);
		me.section.section.detailspB.setVisible(false);
		me.section.section.detailsfB.setVisible(false);
		if(record!=null){
			me.section.section.ruleEditB.setVisible(true);
			me.section.section.ruleDeleteB.setVisible(true);
			if(record.get('enabled'))	{
				me.section.section.disableRuleB.setVisible(true);
				me.section.section.enableRuleB.setVisible(false);
			}
			else{
				 me.section.section.enableRuleB.setVisible(true);
				 me.section.section.disableRuleB.setVisible(false);
			}
			
			me.section.section.detailsB.setVisible(true);
			
		}
		else{
			me.section.section.ruleEditB.setVisible(false);
			me.section.section.ruleDeleteB.setVisible(false);
			me.section.section.detailsB.setVisible(false);
		}

    },
    
    refresh : function(){
    	var me = this;
    	//me.setLoading(true);
    	me.section.section.setLoading(true);
    	me.store.load();
    },
    
    onLoadStore : function(store, record, success){
    	var me = this;
    	if(success)
    		me.section.section.setLoading(false);
    },
    
   
    
    
    ipKind : function(value){
    	var me = this;
    	//return '<div><p style="float: left;"><img src="plugin/static/firewall/images/fw-ip.png" ></p> <p>\t' + value +'</p></div>'
    	if(value!=null && value!="")
    		return  '<img align="left" src="plugin/static/firewall/images/fw-ip.png">\t' +value;
    },
    
    shared : function(value){
    	if(value){
    		return  '<img align="middle" src="plugin/static/firewall/images/fw-shared.png">';
    	}
    },
    
    portValue : function(value){
    	if(value!=null && value !="")
    		return '<img align="left" src="plugin/static/firewall/images/port_16.png">\t' +value;
    },
    
    
	showDetails : function() {
		var me = this;
		var record = me.getSelectionModel().getSelection()[0];
		var data_ = me.getRecordData(record);
		if (!me.detailView) {
			me.detailView = Ext.create('Stackops.portal.plugin.firewall.view.DataWindow', {//poner el nombre
				grid : me,
				title : 'Detailed View of the rule '+ record.get('name'),
				section : me,
				onDestroy : function() {
					var me = this;
					me.refresh();
					me.section.detailView = null;
				}
			});
			//me.stopRefresh();
		}
		me.detailView.loadData(data_);
		me.detailView.show({
			icon : me.detailView.INFO
		});
	},

	/** Here we Take the fields and values of a given device*/ 
	getRecordData : function(record) {
		var me = this;
		var data = [];
		record.fields.each(function(item, index, length) {
			data[index] = {};
			data[index]['field'] = item.name;
			var renderer = null;
			var scope = null;
			Ext.each(me.headerCt.initialConfig.items, function(citem) {
				if (citem.dataIndex == item.name && citem.renderer != undefined && citem.renderer != null) {
					renderer = citem.renderer;
					scope = citem.scope;
				}

			});
			if (renderer != null) {
				data[index]['value'] = renderer.call(scope, record.get(item.name));
			} else {
				data[index]['value'] = record.get(item.name);
			}

		});
		return data;
	},

    

});