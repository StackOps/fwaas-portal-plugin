Ext.define('Stackops.portal.plugin.firewall.view.FwaasPluginPanel', {
    extend : 'Ext.Panel',
    alias : 'widget.fwaaspluginpanel',
    requires: [

   	'Ext.toolbar.Separator',
    'Ext.menu.Separator',
    'Ext.toolbar.TextItem',
    'Ext.toolbar.Toolbar',
    //'Stackops.portal.plugin.firewall.view.LeftPanel',
    //'Stackops.portal.plugin.firewall.view.FirewallXGrid',
    'Stackops.portal.plugin.firewall.view.HelpContainer',
    'Stackops.portal.plugin.firewall.model.Firewall',
    'Stackops.portal.plugin.firewall.view.FirewallCreate',
    'Stackops.portal.plugin.firewall.view.RuleInsert',
    'Stackops.portal.plugin.firewall.store.Policy',
    'Stackops.portal.plugin.firewall.store.Subnet',
    'Stackops.portal.plugin.firewall.store.Rules',
    'Stackops.portal.plugin.firewall.store.Firewall',
    'Stackops.portal.plugin.firewall.view.StToolbar',
    'Stackops.portal.plugin.firewall.view.PolicyEdit'
    ],
    
   
  
    layout : 'border',
        //align: 'stretch'
   
    
    initComponent: function(){
    	var me = this;
    	me.items = [];    
    	Portal.firewall.neutronProxy = "v2.0/";
    	
    	
    	/*** HERE WE DEFINE THE TWO PANEL THAT WILL DIVIDE THE MAIN PANEL **/
    	me.treePanel = Ext.create('Stackops.portal.plugin.firewall.view.UpTree', {
    		region : 'west',
    		flex : 1,
    		split : true,
    		section : me
    	});
    	
    	me.emptyPanel = Ext.create('Stackops.portal.plugin.firewall.view.EmptyPanel',{
    		region : 'center',
    		flex : 7,
    		split : true,
    		section : me
    	});
    	me.items = [me.treePanel, me.emptyPanel];
    	/*********************************************************************/
    	
    	
    	
    	/** IN THIS SECTION WE ADD THE BUTTON CONFIGURATIONS ****/
    	
		me.createPolicyConfig = {
			text : Portal.getText('firewall', 'fwaas-create-policy'),
			iconCls : 'policy-create-icon',
			style : {
				border : false
			},
			frame : false,
			handler : function(){
				me.createPcall(me);
			},
			hidden : true,
			scope : me	
		},
		me.createFirewallConfig = {
			text : Portal.getText('firewall', 'fwaas-create-firewall'),
			iconCls : 'fwaas-create-icon',
			style : {
				border : false
			},
			hidden : true,
			frame : false,
			handler : function(){
				me.createFWcall(me);
			},
			scope : me	
		},
		
		me.createRuleConfig = {
			text : Portal.getText('firewall', 'fwaas-create-rule'),
			iconCls : 'rule-create-icon',
			style : {
				border : false
			},
			hidden : true,
			frame : false,
			handler : function(){
				me.createRcall(me);
			},
			scope : me	
		},
		
		me.insertRuleConfig = {
			text : Portal.getText('firewall', 'fwaas-insert-rule'),
			iconCls : 'policy-add-rule',
			style : {
				border : false
			},
			hidden : true,
			frame : false,
			handler : function(){
				me.insertRcall(me);
			},
			scope : me	
		},
		
		me.deletePolicyConfig = {
			text : Portal.getText('firewall', 'fwaas-delete-policy'),
			iconCls : 'policy-delete-icon',
			style : {
				border : false
			},
			hidden : true,
			frame : false,
			handler : function(){
				me.deletePcall(me);
			},
			scope : me	
		},
		me.deleteFirewallConfig = {
			text : Portal.getText('firewall', 'fwaas-delete-firewall'),
			iconCls : 'fwaas-delete-icon',
			style : {
				border : false
			},
			frame : false,
			hidden : true,
			handler : function(){
				me.deleteFWcall(me);
			},
			scope : me	
		},
		
		me.deleteRuleConfig = {
			text : Portal.getText('firewall', 'fwaas-delete-rule'),
			iconCls : 'rule-delete-icon',
			style : {
				border : false
			},
			hidden : true,
			frame : false,
			handler : function(){
				me.deleteRcall(me);
			},
			scope : me	
		},
		
		me.deleteRuleRemoveConfig = {
			text : Portal.getText('firewall', 'fwaas-remove-rule'),
			iconCls : 'policy-remove-rule',
			style : {
				border : false
			},
			hidden : true,
			frame : false,
			handler : function(){
				me.removeRcall(me);
			},
			scope : me	
		},
		
		
		me.editPolicyConfig = {
			text : Portal.getText('firewall', 'fwaas-edit-policy'),
			iconCls : 'policy-edit-icon',
			style : {
				border : false
			},
			hidden : true,
			frame : false,
			handler : function(){
				me.editPcall(me);
			},
			scope : me	
		},
		
		
		me.auditPolicyConfig = {
			text : Portal.getText('firewall', 'fwaas-audit-policy'),
			iconCls : 'audit-icon',
			style : {
				border : false
			},
			hidden : true,
			frame : false,
			handler : function(){
				me.auditPcall(me);
			},
			scope : me
		}
		
		me.enableRuleConfig ={
			text : Portal.getText('firewall', 'fwaas-enable-rule'),
			iconCls : 'enable-rule-icon',
			style : {
				border : false
			},
			hidden : true,
			frame : false,
			handler : function(){
				me.enableRcall(me);
			},
			scope : me
		}
		
		me.disableRuleConfig = {
			text : Portal.getText('firewall', 'fwaas-disable-rule'),
			iconCls : 'disable-rule-icon',
			style : {
				border : false
			},
			hidden : true,
			frame : false,
			handler : function(){
				me.disableRcall(me);
			},
			scope : me
		}
		
		me.editFirewallConfig = {
			text : Portal.getText('firewall', 'fwaas-edit-firewall'),
			iconCls : 'fwaas-edit-icon',
			style : {
				border : false
			},
			hidden : true,
			frame : false,
			handler : function(){
				me.editFWcall(me);
			},
			scope : me	
		},
		
		me.editRuleConfig = {
			text : Portal.getText('firewall', 'fwaas-edit-rule'),
			iconCls : 'rule-edit-icon',
			style : {
				border : false
			},
			hidden : true,
			frame : false,
			handler : function(){
				me.editRCall(me);
			},
			scope : me	
		};
		
		me.detailsCurrentConfig = {
			text : Portal.getText('firewall', 'fwaas-show-details'),
			iconCls : 'firewall-info-detail',
			style : {
				border : false
			},
			hidden : true,
			frame : false,
			handler : function(){
				me.detailsCall.call(me);
			},
			scope : me	
		};
		
		me.detailpTreeConfig = {
			text : Portal.getText('firewall', 'fwaas-details-policy'),
			iconCls : 'firewall-info-detail',
			style : {
				border : false
			},
			hidden : true,
			frame : false,
			handler : function(){
				me.detailstCall.call(me);
			},
			scope : me	
		};
		
		me.detailfTreeConfig = {
			text : Portal.getText('firewall', 'fwaas-details-firewall'),
			iconCls : 'firewall-info-detail',
			style : {
				border : false
			},
			hidden : true,
			frame : false,
			handler : function(){
				me.detailstCall.call(me);
			},
			scope : me	
		};
		
		
		
		
		
		
		
		
		me.fwCreateB = Ext.create('Ext.button.Button', me.createFirewallConfig);	
		me.fwDeleteB = Ext.create('Ext.button.Button', me.deleteFirewallConfig);	
		me.fwEditB = Ext.create('Ext.button.Button', me.editFirewallConfig);		
		me.ruleCreateB = Ext.create('Ext.button.Button', me.createRuleConfig);			
		me.ruleEditB = Ext.create('Ext.button.Button', me.editRuleConfig);		
		me.ruleDeleteB = Ext.create('Ext.button.Button', me.deleteRuleConfig);				
		me.policyCreateB = Ext.create('Ext.button.Button', me.createPolicyConfig);		
		me.policyEditB = Ext.create('Ext.button.Button', me.editPolicyConfig);			
		me.policyDeleteB = Ext.create('Ext.button.Button', me.deletePolicyConfig);		
		me.insertCreateB = Ext.create('Ext.button.Button', me.insertRuleConfig);	
		me.ruleRemoveB = Ext.create('Ext.button.Button', me.deleteRuleRemoveConfig);		
		me.auditPolicyB = Ext.create('Ext.button.Button', me.auditPolicyConfig);	
		me.enableRuleB = Ext.create('Ext.button.Button', me.enableRuleConfig);	
		me.disableRuleB = Ext.create('Ext.button.Button', me.disableRuleConfig);
		
		me.detailsB = Ext.create('Ext.button.Button', me.detailsCurrentConfig);
		me.detailspB = Ext.create('Ext.button.Button', me.detailpTreeConfig);
		me.detailsfB = Ext.create('Ext.button.Button', me.detailfTreeConfig);
		
		me.auditPolicyR = Ext.create('Ext.menu.Item', me.auditPolicyConfig);	
		me.enableRuleR = Ext.create('Ext.menu.Item', me.enableRuleConfig);	
		me.disableRuleR = Ext.create('Ext.menu.Item', me.disableRuleConfig);
		me.fwCreateR = Ext.create('Ext.menu.Item', me.createFirewallConfig);
		me.fwDeleteR = Ext.create('Ext.menu.Item', me.deleteFirewallConfig);
		me.fwEditR = Ext.create('Ext.menu.Item', me.editFirewallConfig);	
		me.ruleCreateR = Ext.create('Ext.menu.Item', me.createRuleConfig);
		me.ruleEditR = Ext.create('Ext.menu.Item', me.editRuleConfig);
		me.ruleDeleteR = Ext.create('Ext.menu.Item', me.deleteRuleConfig);	
		me.policyCreateR = Ext.create('Ext.menu.Item', me.createPolicyConfig);
		me.policyEditR = Ext.create('Ext.menu.Item', me.editPolicyConfig);
		me.policyDeleteR = Ext.create('Ext.menu.Item', me.deletePolicyConfig);		
		me.insertCreateR = Ext.create('Ext.menu.Item', me.insertRuleConfig);		
		me.ruleRemoveR = Ext.create('Ext.menu.Item', me.deleteRuleRemoveConfig);
		
		
		me.detailsR = Ext.create('Ext.menu.Item', me.detailsCurrentConfig);
		me.detailspR = Ext.create('Ext.menu.Item', me.detailpTreeConfig);
		me.detailsfR = Ext.create('Ext.menu.Item', me.detailfTreeConfig);
		
		me.rightMenu = Ext.create('Ext.menu.Menu', { items: [
		me.fwCreateR, me.policyCreateR, me.policyEditR, me.ruleCreateR, me.ruleEditR, me.fwDeleteR, 
		me.fwEditR, me.policyDeleteR, me.ruleDeleteR,me.insertCreateR,me.ruleRemoveR,
		me.auditPolicyR, me.enableRuleR, me.disableRuleR, me.detailsR , me.detailspR, me.detailsfR
		]});
		
		me.newSGRefreshConfig = {
    		text:  Portal.getText('firewall', 'refresh'),
    		iconCls: 'x-tbar-loading',    		
            minWidth : 75,
    		handler: function(){
    			me.refresh.call(me);
    		},
    		scope: me
    	};
    	
    	me.refreshIcon = Ext.create('Ext.button.Button',me.newSGRefreshConfig);
    	me.menuButtons = [me.fwCreateB, me.policyCreateB, me.ruleCreateB, me.fwDeleteB, 
    	me.fwEditB, me.policyDeleteB, me.policyEditB, me.ruleDeleteB,me.insertCreateB,
    	me.ruleRemoveB, me.ruleEditB,me.auditPolicyB, me.enableRuleB, me.disableRuleB,
    	me.detailsB, me.detailspB, me.detailsfB, '->', me.refreshIcon]
    	
    	
    	 me.dockedItems = [{
            xtype: 'fwaassttoolbar',
            height : 35,
            style: {
                          border:0
                      },
                        frame: false,
            dock: 'top',
            items: me.menuButtons
        }];
    	
    	
    	me.containerHtml = Ext.create('Ext.container.Container',{
			cls : 'background-contianer',
			height : 45,
    		html: ''
    	});
    	
    	me.fbar = me.containerHtml;    	
    	
    	me.callParent(arguments);
    },
    
    detailsCall : function(){
    	var me = this;
    	var record = me.treePanel.currentPanel.getSelectionModel().getSelection()[0];
		var data_ = me.getRecordRuleData(record, me.treePanel.currentPanel);
		
		if (!me.detailView) {
			me.detailView = Ext.create('Stackops.portal.plugin.firewall.view.DataWindow', {//poner el nombre
				grid : me,
				title : Portal.getText('firewall', 'fwaas-show-details-rule').replace('$1', record.get('name')),
				section : me,
				onDestroy : function() {
					var me = this;					
					me.section.detailView = null;
				}
			});
		}
		me.detailView.loadData(data_);
		me.detailView.show({
			icon : me.detailView.INFO
		});
    },
    
    detailstCall : function(){
    	var me = this;
    	var record = me.treePanel.getSelectionModel().getSelection()[0];
    	if(record.get('type')=="firewall"){
			var data_ = me.getRecordFirewallData(record, me.treePanel);
			var message = Portal.getText('firewall', 'fwaas-show-details-firewall').replace('$1', record.get('name'));
		}
		else{
			var data_ = me.getRecordPolicyData(record, me.treePanel);
			var message = Portal.getText('firewall', 'fwaas-show-details-policy').replace('$1', record.get('name'));
		}
			
		if (!me.detailView) {
			me.detailView = Ext.create('Stackops.portal.plugin.firewall.view.DataWindow', {//poner el nombre
				grid : me,
				title : message,
				section : me,
				onDestroy : function() {
					var me = this;				
					me.section.detailView = null;
				}
			});
		}
		me.detailView.loadData(data_);
		me.detailView.show({
			icon : me.detailView.INFO
		});
    },
    
	
	getRecordRuleData : function(record, me) {
		//var me = this;
		var aux = me.section.getSelectionModel().getSelection()[0];
		
		var data = [];
		var index=0;
		
		record.fields.each(function(item, index_, length) {
			if(item.name=="id"||item.name=="tenant_id"||item.name=="name"||item.name=="description"||item.name=="firewall_policy_id"||
			item.name=="shared"||item.name=="protocol"||item.name=="ip_version"||item.name=="source_ip_address"||item.name=="destination_ip_address"||
			item.name=="source_port"||item.name=="destination_port"||item.name=="position"||item.name=="action"||item.name=="enabled"){			
				
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
				
				if(item.name=="firewall_policy_id"&&aux.get('type')=="rules"){
					data[index]['value'] = record.get(item.name);
					index++;
					data[index] = {};
					data[index]['field'] = Portal.getText('firewall', 'fwaas-rule-head-available');
					data[index]['value'] = renderer.call(scope, record.get(item.name));	
					index++;			
				}
				else{
					if (renderer != null) {
						data[index]['value'] = renderer.call(scope, record.get(item.name));
					} else {
						data[index]['value'] = record.get(item.name);
					}			
					index++;
				}
			}
		});
		return data;
	},
	
	getRecordPolicyData : function(record, me) {
		//var me = this;
		var data = [];
		var index=0;		
		record.fields.each(function(item, index_, length) {
			if(item.name=="id"||item.name=="tenant_id"||item.name=="name"||item.name=="description"||			
			item.name=="shared"||item.name=="firewall_rules"||item.name=="audited"){			
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
				index++;
			}
		});
		return data;
	},
	
	
	
	getRecordFirewallData : function(record, me) {
		//var me = this;
		var data = [];
		var index=0;		
		record.fields.each(function(item, index_, length) {
			if(item.name=="id"||item.name=="tenant_id"||item.name=="name"||item.name=="description"||			
			item.name=="firewall_policy_id"||item.name=="status"||item.name=="admin_state_up"){			
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
				index++;
			}
		});
		return data;
	},
	
    
    refresh : function(){
    	var me = this;
    	me.treePanel.refresh();    		
    	
    },
    
    onRender: function(){
    	var me = this;
    	me.callParent(arguments);
    },
    
    onSubnetLoad : function(store, records, success){
    	var me = this;
    	if(!success){
    		Portal.firewall.neutronProxy = "";
    	}
    	
    	me.firewall_store.load();
		me.rules_store.load();
		me.policy_store.load();
    	
    },
    
    
    setMask : function(show){
        var me = this;
        if(me.myMask==undefined || me.myMask == null){
            me.myMask = new Ext.LoadMask(me);
        }
        if(show){
            me.myMask.show();
        }else{
            me.myMask.hide();
        }
        return me.myMask; 
    },
    
    /** Function to handle the buttons****************/
   
   
    createRcall : function(){
    	var me = this;
		me.createForm = Ext.create('Stackops.portal.plugin.firewall.view.RuleCreate', {
			section : me
		});		
		
		me.form_section = Ext.create('Ext.container.Container', {
			width : 460,
			cls : 'fwaas-container-white-icon',
			minWidth : 460,
			height : 300,
			minHeight : 300,
			autoScroll : true,
			style : {
				border : 0
			},
			padding : 5,
			layout : {
				type : 'vbox',
				align : 'stretch'
			},
			items :me.createForm
		});
		
		var helpSection = Ext.create('Stackops.portal.plugin.firewall.view.HelpContainer', {
			height : 300,
			width : 310,
			twidth : 250,
			theight : 250,
			cwidth : 230,
			cheight : 100,
			image_help : 'plugin/static/firewall/images/blue_ruler_72.png',
			text_help : Portal.getText('firewall', 'rules-create-section-main-help')

		}); 
		
		
		


		me.createWinRule = Ext.create('Ext.window.Window', {
			title : Portal.getText('firewall', 'fwaas-create-rule'),
			height : 450,
			width : 750,
			resizable : false,
            closable : true,
            maximizable : false,            
            animCollapse:false,
            constrainHeader:true,
			layout : {
		        type : 'hbox',
		        align : 'stretch'
		    },
			section : me,
			modal : true, //this is added to make the window modal and mask everything behind it when displayed
			items : [me.form_section, helpSection]

		});
		me.createWinRule.show();

    },
    
    editRCall : function(){
    	var me = this;
    	
    	var record = me.treePanel.currentPanel.getSelectionModel().getSelection()[0];
    	//var record = me.firewallsPanel.rulesPanel.getSelectionModel().getSelection()[0];
    	
    	me.editForm = Ext.create('Stackops.portal.plugin.firewall.view.RuleEdit', {
			section : me,
			record : record
		});		
		
		me.form_section = Ext.create('Ext.container.Container', {
			width : 460,
			cls : 'fwaas-container-white-icon',
			minWidth : 460,
			height : 300,
			minHeight : 300,
			autoScroll : true,
			style : {
				border : 0
			},
			padding : 5,
			layout : {
				type : 'vbox',
				align : 'stretch'
			},
			items :me.editForm
		});
		
		var helpSection = Ext.create('Stackops.portal.plugin.firewall.view.HelpContainer', {
			height : 300,
			width : 310,
			twidth : 250,
			theight : 250,
			cwidth : 230,
			cheight : 100,
			image_help : 'plugin/static/firewall/images/blue_ruler_72.png',
			text_help : Portal.getText('firewall', 'rules-edit-section-main-help')

		}); 

		me.editWinRule = Ext.create('Ext.window.Window', {
			title : Portal.getText('firewall', 'fwaas-edit-rule'),
			height : 450,
			width : 750,
			resizable : false,
            closable : true,
            maximizable : false,            
            animCollapse:false,
            constrainHeader:true,
			layout : {
		        type : 'hbox',
		        align : 'stretch'
		    },
			section : me,
			modal : true, //this is added to make the window modal and mask everything behind it when displayed
			items : [me.form_section, helpSection]

		});
		me.editWinRule.show();

    },
    
    enableRcall : function(){
    	var me = this;
    	var record = me.treePanel.currentPanel.getSelectionModel().getSelection()[0];
    	
		Ext.Msg.show({
			msg : Portal.getText('firewall', 'fwaas-confirm-enable-rule').replace('$1', record.get('name')),
			icon : Ext.Msg.QUESTION,
			buttons : Ext.Msg.YESNO,
			fn : function(btn, text) {
				if (btn == 'yes') {
					this.json = {
		            	firewall_rule : {
			            	enabled : true
			            }
            		}; 
            		
            		
					Ext.Ajax.request({
						headers : {
							'Accept' : 'application/json',
							'Content-Type' : 'application/json'
						},
						url : 'proxy/network/' + Portal.firewall.neutronProxy + 'fw/firewall_rules/' + record.get('id'),
						params : null,
						method : 'PUT',
						jsonData : this.json,
						callback : function(options, success, response) {
							if (success) {
								me.refresh();
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
								me.refresh();
							}
						},
						scope : this
					}); 
				}
			}
		}); 

    	
    },
    
    
    disableRcall : function(){
    	var me = this;
    	var record = me.treePanel.currentPanel.getSelectionModel().getSelection()[0];
		Ext.Msg.show({
			msg : Portal.getText('firewall', 'fwaas-confirm-disable-rule').replace('$1', record.get('name')),
			icon : Ext.Msg.QUESTION,
			buttons : Ext.Msg.YESNO,
			fn : function(btn, text) {
				if (btn == 'yes') {
					this.json = {
		            	firewall_rule : {			            	
			            	enabled : false			            	
			            }
            		}; 
            		
            		
					Ext.Ajax.request({
						headers : {
							'Accept' : 'application/json',
							'Content-Type' : 'application/json'
						},
						url : 'proxy/network/' + Portal.firewall.neutronProxy + 'fw/firewall_rules/' + record.get('id'),
						params : null,
						method : 'PUT',
						jsonData : this.json,
						callback : function(options, success, response) {
							if (success) {
								me.refresh();
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
								me.refresh();
							}
						},
						scope : this
					}); 
				}
			}
		}); 

    	
    },
    
    
    insertRcall : function(){
    	var me = this;
		//var record = me.firewallsPanel.upPanel.getSelectionModel().getSelection()[0];
		var record = me.treePanel.getSelectionModel().getSelection()[0];
		
		
		Ext.Ajax.request({
			headers : {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'
			},
			url : 'proxy/network/' + Portal.firewall.neutronProxy + 'fw/firewall_rules',
			params : null,
			method : 'GET',
			jsonData : {},
			callback : function(options, success, response) {
				if (success) {
					var resp = Ext.decode(response.responseText, true);
					var rule_store = [];
					rules = resp.firewall_rules;
					Ext.Array.each(rules, function(rule){
						if(rule.firewall_policy_id == null){
							rule_store.push(rule);
						}
					});
					
					me.insertForm = Ext.create('Stackops.portal.plugin.firewall.view.RuleInsert',{
						section : me,
						policyRecord : record,
						rule_store : rule_store
				    });
					
					me.form_section = Ext.create('Ext.container.Container', {
						width : 380,
						cls : 'fwaas-container-white-icon',
						minWidth : 380,
						height : 200,
						minHeight : 200,
						autoScroll : true,
						style : {
							border : 0
						},
						padding : 5,
						layout : {
							type : 'vbox',
							align : 'stretch'
						},
						items : me.insertForm
					}); 
					
							
					var helpSection = Ext.create('Stackops.portal.plugin.firewall.view.HelpContainer', {
						height : 260,
						width : 280,
						twidth : 250,
						theight : 150,
						cwidth : 10,
						cheight : 10,
						image_help : 'plugin/static/firewall/images/white-icon.png',
						text_help : Portal.getText('firewall', 'rule-insert-section-main-help')
					}); 			
					
					me.insertWinRule = Ext.create('Ext.window.Window', {
						title : Portal.getText('firewall', 'fwaas-create-firewall'),
						height : 230,
						width : 650,
						resizable : false,
						closable : true,
						maximizable : false,
						animCollapse : false,
						constrainHeader : true,
						layout : {
							type : 'hbox',
							align : 'stretch'
						},
						section : me,
						modal : true, //this is added to make the window modal and mask everything behind it when displayed
						items : [me.form_section, helpSection]
			
					}); 			
					me.insertWinRule.show();					
				}
			}
		}); 

    		    	
    },
    
    
    
    
    
    
    
    
    deleteRcall: function(){
    	var me = this;
    	
    	var record = me.treePanel.currentPanel.getSelectionModel().getSelection()[0];
    	//var record = me.firewallsPanel.rulesPanel.getSelectionModel().getSelection()[0];
    	Ext.Msg.show({
        		msg: Portal.getText('firewall', 'fwaas-confirm-delete-rule').replace('$1', record.get('name')),
        		icon : Ext.Msg.QUESTION,
        		buttons: Ext.Msg.YESNO,
        		fn: function (btn, text) {
					if (btn == 'yes'){
				   		Ext.Ajax.request({
            				headers: {'Accept': 'application/json','Content-Type': 'application/json'},
            				url: 'proxy/network/'+Portal.firewall.neutronProxy+'fw/firewall_rules/'+record.get('id'),            			
	            			params : null,
	            			method : 'DELETE',
	            			jsonData : this.json,
	            			callback : function(options,success,response){
	            				if(success){	            					
	            					//me.startRefresh();
	            					me.refresh()
	            				}else{
	            					if(response.responseText!=null){
	                        			resp = Ext.decode(response.responseText, true);	                        			
	                        			if(resp!=null &&resp.NeutronError!=null && resp.NeutronError.message!=null){
	                        				resp = resp.NeutronError.message;
	                        			}
	                        			else if(resp!=null && resp.NeutronError!=null ){
	                        				resp = resp.NeutronError
	                        			}
	                        			else{
	                        				resp = Portal.getText('firewall', 'rule-delete-error');
	                        			}
	                    			}else{
	                        			resp = resp = Portal.getText('firewall', 'rule-delete-error');
	                    			}
	            					Ext.Msg.show({
	                                    msg : resp,
	                                    icon : Ext.Msg.ERROR,
	                                    buttons : Ext.Msg.OK,
	                                    fn : function(){},
	                                    scope : this
	                                });
	                                me.refresh();
	                        	}
            				},
			           	 	scope : this
                		});
					}
				}
        	
    		});
    },
    
    removeRcall: function(){
    	var me = this;
    	//var record = me.firewallsPanel.policyPanel.getSelectionModel().getSelection()[0];
    	var policy_id = me.treePanel.getSelectionModel().getSelection()[0].get('id');
    	var record = me.treePanel.currentPanel.getSelectionModel().getSelection()[0];
    	Ext.Msg.show({
        		msg: Portal.getText('firewall', 'fwaas-confirm-remove-rule').replace('$1', record.get('name')),
        		icon : Ext.Msg.QUESTION,
        		buttons: Ext.Msg.YESNO,
        		fn: function (btn, text) {
					if (btn == 'yes'){
				   		Ext.Ajax.request({
            				headers: {'Accept': 'application/json','Content-Type': 'application/json'},
            				url: 'proxy/network/'+Portal.firewall.neutronProxy+'fw/firewall_policies/'+policy_id+"/remove_rule",            			
	            			params : null,
	            			method : 'PUT',
	            			jsonData : {
	            				firewall_rule_id: record.get('id')
	            			},
	            			callback : function(options,success,response){
	            				if(success){	            					
	            					me.refresh();
	            				}else{
	            					if(response.responseText!=null){	            						
	                        			resp = Ext.decode(response.responseText, true);	   
	                        			if(resp!=null && resp.NeutronError!=null && resp.NeutronError.message!=null)                     			
	                        				resp = resp.NeutronError.message;
	                        			else if(resp!=null && resp.NeutronError!=null ){
	                        				resp = resp.NeutronError
	                        			}
	                        			else{
	                        				resp = Portal.getText('firewall', 'fwaas-error-remove-rule');
	                        			}
	                    			}else{
	                        			resp = Portal.getText('firewall', 'fwaas-error-remove-rule');
	                    			}
	            					Ext.Msg.show({
	                                    msg : resp,
	                                    icon : Ext.Msg.ERROR,
	                                    buttons : Ext.Msg.OK,
	                                    fn : function(){},
	                                    scope : this
	                                });
	                                me.refresh();
	                        	}
            				},
			           	 	scope : this
                		});
					}
				}
        	
    		});
    },
    
    
    
    
    
    
    createPcall : function(){
    	var me = this;
		Ext.Ajax.request({
			headers: {'Accept': 'application/json','Content-Type': 'application/json'},
			url: 'proxy/network/'+Portal.firewall.neutronProxy+'fw/firewall_rules',
			params : null,
			method : 'GET',
			jsonData : '',
			callback : function(options,success,response){
				if(success){
					var resp = Ext.decode(response.responseText, true);
					rules = resp.firewall_rules;
					var store_data = new Ext.util.HashMap();
					Ext.Array.each(rules, function(rule){
						if(rule.firewall_policy_id == null){
							store_data.add(rule.id, rule);
						}
					});
					
					me.createPForm = Ext.create('Stackops.portal.plugin.firewall.view.PolicyCreate', {
						section : me,
						rules_store : store_data.getValues(),
					});		
					
					me.form_section = Ext.create('Ext.container.Container', {
						width : 420,
						region : 'center',
						cls : 'fwaas-container-white-icon',
						minWidth : 420,
						height : 200,
						minHeight : 200,
						autoScroll : true,
						style : {
							border : 0
						},
						padding : 5,
						layout : {
							type : 'vbox',
							align : 'stretch'
						},
						items : me.createPForm
					});
					
				
					var helpSection = Ext.create('Stackops.portal.plugin.firewall.view.HelpContainer', {
						region : 'east',
						height : 300,
						width : 310,
						twidth : 230,
						theight : 160,
						cwidth : 230,
						cheight : 75,
						image_help : 'plugin/static/firewall/images/policy-help.png',
						text_help : Portal.getText('firewall', 'policy-create-section-main-help')			
					}); 
					
					
			
					me.createWinPolicy = Ext.create('Ext.window.Window', {
						title : Portal.getText('firewall', 'fwaas-create-policy'),
						
						height : 300,
						width : 670,
						resizable : false,
			            closable : true,
			            maximizable : false,            
			            animCollapse:false,
			            constrainHeader:true,
						layout : {
					        type : 'hbox',
					        align : 'stretch'
					    },
						section : me,
						modal : true, //this is added to make the window modal and mask everything behind it when displayed
						items : [me.form_section, helpSection]
			
					});
					me.createWinPolicy.show();
										
				}
			}
		});

    },
    
    editPcall : function(){
    	var me = this;
    	me.setLoading(true);
    	var record = me.treePanel.getSelectionModel().getSelection()[0];
		Ext.Ajax.request({
			headers: {'Accept': 'application/json','Content-Type': 'application/json'},
			url: 'proxy/network/'+Portal.firewall.neutronProxy+'fw/firewall_rules',
			params : null,
			method : 'GET',
			jsonData : '',
			callback : function(options,success,response){
				if(success){
					var resp = Ext.decode(response.responseText, true);
					rules = resp.firewall_rules;
					var store_data = new Ext.util.HashMap();
					
					Ext.Array.each(rules, function(rule){	
						// this is made to enter the free rules and the associated with ths policy					
						Ext.Array.each(record.get('firewall_rules'), function(id){
							if(id == rule.id || rule.firewall_policy_id == null){
								store_data.add(rule.id, rule);
							}
						});
					});
					
					me.editPForm = Ext.create('Stackops.portal.plugin.firewall.view.PolicyEdit', {
						section : me,
						rules_store : store_data.getValues(),
						record : record
					});		
					
					me.form_section = Ext.create('Ext.container.Container', {
						width : 420,
						cls : 'fwaas-container-white-icon',
						minWidth : 420,
						height : 200,
						minHeight : 200,
						autoScroll : true,
						style : {
							border : 0
						},
						padding : 5,
						layout : {
							type : 'vbox',
							align : 'stretch'
						},
						items : me.editPForm
					});
					
				
					var helpSection = Ext.create('Stackops.portal.plugin.firewall.view.HelpContainer', {
						height : 300,
						width : 310,
						twidth : 230,
						theight : 160,
						cwidth : 230,
						cheight : 75,
						image_help : 'plugin/static/firewall/images/policy-help.png',
						text_help : Portal.getText('firewall', 'policy-edit-section-main-help')			
					}); 
					
					
			
					me.editWinPolicy = Ext.create('Ext.window.Window', {
						title : Portal.getText('firewall', 'fwaas-edit-policy'),
						height : 300,
						width : 670,
						resizable : false,
			            closable : true,
			            maximizable : false,            
			            animCollapse:false,
			            constrainHeader:true,
						layout : {
					        type : 'hbox',
					        align : 'stretch'
					    },
						section : me,
						modal : true, //this is added to make the window modal and mask everything behind it when displayed
						items : [me.form_section, helpSection]
			
					});
					me.editWinPolicy.show();
										
				}
			}
		});
		me.setLoading(false);

    },
    
    auditPcall : function(){
    	var me = this;
    	var record = me.treePanel.getSelectionModel().getSelection()[0];
    	Ext.Msg.show({
        	msg: Portal.getText('firewall', 'fwaas-confirm-audit-policy').replace('$1', record.get('name')),
        	icon : Ext.Msg.QUESTION,
        	buttons: Ext.Msg.YESNO,
        	fn: function (btn, text) {
				if (btn == 'yes'){    	
					this.json = {
						firewall_policy : {
							audited : true
						}
					};
					
					
					Ext.Ajax.request({
						headers : {
							'Accept' : 'application/json',
							'Content-Type' : 'application/json'
						},
						url : 'proxy/network/' + Portal.firewall.neutronProxy + 'fw/firewall_policies/' + record.get('id'),
						params : null,
						method : 'PUT',
						jsonData : this.json,
						callback : function(options, success, response) {
							if (success) {
								me.refresh();					
							} else {
								if (response.responseText != null) {
									resp = Ext.decode(response.responseText, true);
									if (resp != null && resp.NeutronError != null && resp.NeutronError.message) {
										resp = resp.NeutronError.message
									} 
									else if(resp!=null && resp.NeutronError!=null ){
	                        				resp = resp.NeutronError
	                        		}
									else {
										resp = Portal.getText('firewall', 'fwaas-error-audit-policy').replace('$1', record.get('name'));
									}
								} else {
									resp = Portal.getText('firewall', 'fwaas-edit-policy').replace('$1', record.get('name'));
								}
								Ext.Msg.show({
									msg : resp,
									icon : Ext.Msg.ERROR,
									buttons : Ext.Msg.OK,
									fn : function() {
									},
									scope : this
								});
								me.refresh();
							}
						},
						scope : this
					}); 
				}
			}
		});
           
    },
    
    deletePcall : function(){
    	var me = this;
    	var record = me.treePanel.getSelectionModel().getSelection()[0];
    	//var record = me.firewallsPanel.upPanel.getSelectionModel().getSelection()[0];
    	
    	Ext.Msg.show({
        		msg: Portal.getText('firewall', 'fwaas-confirm-delete-policy').replace('$1', record.get('name')),
        		icon : Ext.Msg.QUESTION,
        		buttons: Ext.Msg.YESNO,
        		fn: function (btn, text) {
					if (btn == 'yes'){
				   		Ext.Ajax.request({
            				headers: {'Accept': 'application/json','Content-Type': 'application/json'},
            				url: 'proxy/network/'+Portal.firewall.neutronProxy+'fw/firewall_policies/'+record.get('id'),            			
	            			params : null,
	            			method : 'DELETE',
	            			jsonData : this.json,
	            			callback : function(options,success,response){
	            				if(success){	            					
	            					me.treePanel.deletedp = true;
	            					me.refresh();
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
	                        				resp = Portal.getText('firewall', 'fwaas-error-delete-policy').replace('$1' , record.get('name'));
	                        			}
	                    			}
	                    			else{
	                        			resp = Portal.getText('firewall', 'fwaas-error-delete-policy').replace('$1', record.get('name'));
	                    			}
	            					Ext.Msg.show({
	                                    msg : resp,
	                                    icon : Ext.Msg.ERROR,
	                                    buttons : Ext.Msg.OK,
	                                    fn : function(){},
	                                    scope : this
	                                });
	                                me.refresh();
	                        	}
            				},
			           	 	scope : this
                		});
					}
				}
        	
    		});  	
    },
    
    createFWcall : function(){
    	var me = this;
    	me.createForm = Ext.create('Stackops.portal.plugin.firewall.view.FirewallCreate',{
			section : me
	    });
	    
			    
		me.form_section = Ext.create('Ext.container.Container', {
			width : 380,
			cls : 'fwaas-container-white-icon',
			minWidth : 380,
			height : 200,
			minHeight : 200,
			autoScroll : true,
			style : {
				border : 0
			},
			padding : 5,
			layout : {
				type : 'vbox',
				align : 'stretch'
			},
			items : me.createForm
		}); 
		
				
		var helpSection = Ext.create('Stackops.portal.plugin.firewall.view.HelpContainer', {
			height : 260,
			width : 280,
			twidth : 250,
			theight : 170,
			cwidth : 230,
			cheight : 65,
			image_help : 'plugin/static/firewall/images/fw_48.png',
			text_help : Portal.getText('firewall', 'firewall-create-section-main-help')
		}); 


        
		
		me.createWinFirewall = Ext.create('Ext.window.Window', {
			title : Portal.getText('firewall', 'fwaas-create-firewall'),
			height : 270,
			width : 650,
			resizable : false,
			closable : true,
			maximizable : false,
			animCollapse : false,
			constrainHeader : true,
			layout : {
				type : 'hbox',
				align : 'stretch'
			},
			section : me,
			modal : true, //this is added to make the window modal and mask everything behind it when displayed
			items : [me.form_section, helpSection]

		}); 

		me.createWinFirewall.show();	
    	
    },
    
    
    deleteFWcall : function(){
    	var me = this;
    	
    	var record = me.treePanel.getSelectionModel().getSelection()[0];
    	//var record = me.firewallsPanel.upPanel.getSelectionModel().getSelection()[0];
    	
    	Ext.Msg.show({
        		msg: Portal.getText('firewall', 'fwaas-confirm-delete-firewall').replace('$1', record.get('name')),
        		icon : Ext.Msg.QUESTION,
        		buttons: Ext.Msg.YESNO,
        		fn: function (btn, text) {
					if (btn == 'yes'){
				   		Ext.Ajax.request({
            				headers: {'Accept': 'application/json','Content-Type': 'application/json'},
            				url: 'proxy/network/'+Portal.firewall.neutronProxy+'fw/firewalls/'+record.get('id'),            			
	            			params : null,
	            			method : 'DELETE',
	            			jsonData : this.json,
	            			callback : function(options,success,response){
	            				if(success){	            					
	            					me.treePanel.deletedf = true;
	            					me.refresh();
	            				}else{
	            					if(response.responseText!=null){
	                        			resp = Ext.decode(response.responseText, true);
	                        			if(resp!=null && resp.NeutronError!=null && resp.NeutronError.message!=null )
	                        			{
	                        				resp = resp.NeutronError.message
	                        			}
	                        			else if(resp!=null && resp.NeutronError!=null ){
	                        				resp = resp.NeutronError
	                        			}
	                        			else{
	                        				resp = Portal.getText('firewall', 'fwaas-error-delete-firewall').replace('$1', record.get('name'));
	                        			}
	                    			}else{
	                        			resp = Portal.getText('firewall', 'fwaas-error-delete-firewall').replace('$1', record.get('name'));
	                    			}
	            					Ext.Msg.show({
	                                    msg : resp,
	                                    icon : Ext.Msg.ERROR,
	                                    buttons : Ext.Msg.OK,
	                                    fn : function(){},
	                                    scope : this
	                                });
	                                me.refresh();
	                        	}
            				},
			           	 	scope : this
                		});
					}else{
						me.refresh();
					}
				}
        	
    		});  	
    },
    
    editFWcall : function(){
    	var me = this;
    	var record = me.treePanel.getSelectionModel().getSelection()[0];
    	me.editForm = Ext.create('Stackops.portal.plugin.firewall.view.FirewallEdit',{
			section : me,
			record : record
	    });
	    
	    me.form_section = Ext.create('Ext.container.Container', {
			width : 380,
			cls : 'fwaas-container-white-icon',
			minWidth : 380,
			height : 200,
			minHeight : 200,
			autoScroll : true,
			style : {
				border : 0
			},
			padding : 5,
			layout : {
				type : 'vbox',
				align : 'stretch'
			},
			items : me.editForm
		}); 
		
		var helpSection = Ext.create('Stackops.portal.plugin.firewall.view.HelpContainer', {
			height : 260,
			width : 280,
			twidth : 250,
			theight : 170,
			cwidth : 230,
			cheight : 65,
			image_help : 'plugin/static/firewall/images/fw_48.png',
			text_help : Portal.getText('firewall', 'firewall-edit-section-main-help')
		}); 

        
		me.editWinFirewall = Ext.create('Ext.window.Window', {
			title: Portal.getText('firewall', 'fwaas-edit-firewall'),
			height : 270,
			width : 650,
			resizable : false,
			closable : true,
			maximizable : false,
			animCollapse : false,
			constrainHeader : true,
			layout : {
				type : 'hbox',
				align : 'stretch'
			},
			section : me,
			modal : true, //this is added to make the window modal and mask everything behind it when displayed
			items : [me.form_section, helpSection]
					    
		});
		me.editWinFirewall.show();	
    }

}); 