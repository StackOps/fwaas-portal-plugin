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
Ext.define('Stackops.portal.plugin.firewall.view.RuleCreate', {
	extend : 'Ext.form.Panel',
	alias : 'widget.fwaasrulecreate',
	requires : ['Stackops.portal.util.JsonFormPanel', 'Ext.form.field.Checkbox', 'Ext.data.JsonStore', 'Ext.data.reader.Json'],

	border : false,
	buttonAlign : 'center',
	bodyPadding : 5,
	layout : 'anchor',
	align : 'center',
	defaults : {
		labelAlign : 'left',
		margin : '10 5 10 5',
		labelWidth : 180,
		width : 430,
	},

	defaultType : 'textfield',
	initComponent : function() {
		var me = this;
		me.protocolsStore = Ext.create('Ext.data.Store', {
			fields : ['id', 'name'],
			data : [{
				"id" : "tcp",
				"name" : "TCP"
			}, {
				"id" : "udp",
				"name" : "UDP"
			}, {
				"id" : "icmp",
				"name" : "ICMP"
			}, {
				"id" : "None",
				"name" : "NONE"
			}]
		});
		me.actionsStore = Ext.create('Ext.data.Store', {
			fields : ['id', 'name'],
			data : [{
				"id" : "allow",
				"name" : "ALLOW"
			}, {
				"id" : "deny",
				"name" : "DENY"
			}]
		});
		me.tenantsStore = Ext.create('Ext.data.Store', {
			fields : ['id', 'name'],
			data : me.section.tenantsData
		});

		me.items = [{
			fieldLabel : Portal.getText('firewall', 'rule-create-name'),
			emptyText : Portal.getText('firewall', 'emptyText'),
			name : 'name',
			allowBlank : false
		}, me.protocols_combo = {
			xtype : 'combo',
			//labelWidth : 180,
			//width : 400,
			fieldLabel : Portal.getText('firewall', 'rule-create-protocol'),
			displayField : 'name',
			valueField : 'id',
			value : 'tcp',
			forceSelection : true,
			allowBlank : false,
			queryMode : 'local',
			typeAhead : true,
			name : 'protocol',
			store : me.protocolsStore,
			//fwaasmandatory : true
		}, me.actions_combo = {
			xtype : 'combo',
			fieldLabel : Portal.getText('firewall', 'rule-create-action'),
			displayField : 'name',
			valueField : 'id',
			value : 'deny',
			forceSelection : true,
			allowBlank : false,
			queryMode : 'local',
			typeAhead : true,
			name : 'action',
			store : me.actionsStore,
		}, me.s_ip = {
			xtype : 'textfield',
			//labelWidth : 180,
			//width : 400,

			fieldLabel : Portal.getText('firewall', 'rule-create-s_address'),
			name : 's_address',
			vtype : 'cidr'
		}, me.d_ip = {
			xtype : 'textfield',
			//labelWidth : 180,
			//width : 400,
			fieldLabel : Portal.getText('firewall', 'rule-create-d_address'),
			name : 'd_address',
			vtype : 'cidr'
		}, me.s_port = {
			xtype : 'textfield',
			//labelWidth : 180,
			//width : 400,
			fieldLabel : Portal.getText('firewall', 'rule-create-s_port'),
			name : 's_port',
			vtype : 'ports',
			fwaashelpText : 'Integer (single port number or in the format of a \':\' separated range)'
		}, me.d_port = {
			xtype : 'textfield',
			//labelWidth : 180,
			//width : 400,
			fieldLabel : Portal.getText('firewall', 'rule-create-d_port'),
			name : 'd_port',
			vtype : 'ports',
			fwaashelpText : 'Integer (single port number or in the format of a \':\' separated range)'
		}, me.tenants_combo = {
			xtype : 'combo',
			fieldLabel : 'Tenant',
			displayField : 'name',
			valueField : 'id',
			queryMode : 'local',
			typeAhead : true,
			name : 'tenant_id',
			store : me.tenantsStore,
			hidden : me.section.admin ? false : true
		}, me.description = Ext.create('Ext.form.field.TextArea', {

			grow : true,
			labelWidth : 180,
			//width : 400,
			//margin : '10 5 10 5',
			fieldLabel : Portal.getText('firewall', 'rule-create-description'),
			name : 'description',
		}), me.sharedBox = Ext.create('Ext.form.field.Checkbox', {
			fieldLabel : Portal.getText('firewall', 'rule-create-shared'),
			// margin: '2 2 2 2',
			labelWidth : 180,
			margin : '10 5 10 5',
			align : 'right',
			style : 'font-size:11px;',
			value : 'false',
			name : 'shared',
			scope : me
		}), me.enabledBox = Ext.create('Ext.form.field.Checkbox', {
			fieldLabel : Portal.getText('firewall', 'rule-create-enabled'),
			labelWidth : 180,
			margin : '10 50 10 5',
			align : 'right',
			style : 'font-size:11px;',
			value : 'true',
			checked : 'true',
			name : 'enabled',
			scope : me
		})];
		me.callParent(arguments);

	},
	buttons : [{
		text : Portal.getText('firewall', 'cancel'),
		handler : function() {
			this.up('form').up('window').close();
		}
	}, {
		text : Portal.getText('firewall', 'create'),
		formBind : true,
		handler : function() {
			var form = this.up('form').getForm();
			var me = this.up('form');
			var mainPanel = me.section;
			var treePanel = mainPanel.treePanel;
			this.json = {
				firewall_rule : {
					name : form.findField('name').getValue(),
					action : form.findField('action').getValue(),
					protocol : form.findField('protocol').getValue(),
					enabled : form.findField('enabled').getValue(),
					shared : form.findField('shared').getValue()
				}
			};
			if (form.findField('tenant_id') != null && form.findField('tenant_id') != undefined && form.findField('tenant_id') != "" && form.findField('tenant_id').getValue() != "" && form.findField('tenant_id').getValue() != null && form.findField('tenant_id').getValue() != undefined) {
				this.json.firewall_rule.tenant_id = form.findField('tenant_id').getValue();
			} else {
				delete this.json.firewall_rule.tenant_id;
			}

			if (form.findField('s_address').getValue() != "" && form.findField('s_address').getValue() != null) {
				this.json.firewall_rule.source_ip_address = form.findField('s_address').getValue();
			}
			if (form.findField('d_address').getValue() != "" && form.findField('d_address').getValue() != null) {
				this.json.firewall_rule.destination_ip_address = form.findField('d_address').getValue();
			}
			if (form.findField('s_port').getValue() != "" && form.findField('s_port').getValue() != null) {
				this.json.firewall_rule.source_port = form.findField('s_port').getValue();
			}
			if (form.findField('d_port').getValue() != "" && form.findField('d_port').getValue() != null) {
				this.json.firewall_rule.destination_port = form.findField('d_port').getValue();
			}
			if (form.findField('description').getValue() != "" && form.findField('description').getValue() != null) {
				this.json.firewall_rule.description = form.findField('description').getValue();
			}

			if (form.isValid()) {
				Ext.Ajax.request({
					headers : {
						'Accept' : 'application/json',
						'Content-Type' : 'application/json'
					},
					url : 'proxy/network/' + Portal.firewall.neutronProxy + 'fw/firewall_rules',
					params : null,
					method : 'POST',
					jsonData : this.json,
					callback : function(options, success, response) {
						if (success) {
							me.up('window').close();
							mainPanel.refresh();
						} else {
							var msg = Portal.getText('firewall', 'rule-create-error');
							mainPanel.errorMsgs(msg, response);
							me.up('window').close();
							mainPanel.refresh();
						}
					},
					scope : this
				});

			}

		}
	}]
});