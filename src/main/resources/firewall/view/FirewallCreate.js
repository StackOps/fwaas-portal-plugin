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
Ext.define('Stackops.portal.plugin.firewall.view.FirewallCreate', {
	extend : 'Ext.form.Panel',
	alias : 'widget.firewallcreate',
	requires : ['Stackops.portal.util.JsonFormPanel', 'Stackops.portal.plugin.firewall.model.Firewall_Rule', 'Ext.form.field.Checkbox', 'Ext.data.JsonStore', 'Ext.data.reader.Json'],

	bodyPadding : 5,
	layout : 'anchor',
	align : 'center',
	defaults : {
		labelAlign : 'left',
		// (top, right, bottom, left).
		padding : '3 0 2 0',
		width : 350,
	},
	border : false,
	buttonAlign : 'center',
	// The fields

	defaultType : 'textfield',
	initComponent : function() {
		var me = this;

		me.policy_store = Ext.create('Stackops.portal.plugin.firewall.store.Policy');
		me.policy_store.load();

		// ComboBox with multiple selection enabled
		me.policyCombo = Ext.create('Ext.form.field.ComboBox', {
			fieldLabel : Portal.getText('firewall', 'fwaas-action-create-firewall-policy'),
			//renderTo: 'multiSelectCombo',

			displayField : 'name',
			valueField : 'id',
			labelWidth : 120,
			margin : '5 5 5 5',
			store : me.policy_store,
			queryMode : 'local'
		});
		me.tenantsStore = Ext.create('Ext.data.Store', {
			fields : ['id', 'name'],
			data : me.section.tenantsData
		});

		me.items = [{
			fieldLabel : Portal.getText('firewall', 'fwaas-action-create-firewall-name'),
			name : 'name',
			labelWidth : 120,
			margin : '5 5 5 5',
			allowBlank : false,
			emptyText : Portal.getText('firewall', 'emptyText')
		}, {
			xtype : 'combo',
			fieldLabel : Portal.getText('firewall', 'fwaas-action-create-firewall-policy'),
			//renderTo: 'multiSelectCombo',

			displayField : 'name',
			valueField : 'id',
			labelWidth : 120,
			margin : '5 5 5 5',
			store : me.policy_store,
			queryMode : 'local',
			allowBlank : false,
			name : 'policy_id',
			emptyText : Portal.getText('firewall', 'emptyText')
		}, me.tenants_combo = {
			xtype : 'combo',
			fieldLabel : 'Tenant',
			displayField : 'name',
			valueField : 'id',
			queryMode : 'local',
			labelWidth : 120,
			margin : '5 5 5 5',
			typeAhead : true,
			name : 'tenant_id',
			store : me.tenantsStore,
			hidden : me.section.admin ? false : true
		}, me.description = Ext.create('Ext.form.field.TextArea', {
			grow : true,
			labelWidth : 120,
			margin : '5 5 5 5',
			fieldLabel : Portal.getText('firewall', 'fwaas-action-create-firewall-description'),
			name : 'description',
		}), me.adminstateBox = Ext.create('Ext.form.field.Checkbox', {
			boxLabel : Portal.getText('firewall', 'fwaas-action-create-firewall-admin_state_up'),
			//margin: '2 2 2 2',
			labelWidth : 120,
			margin : '5 5 15 5',
			align : 'right',
			style : 'font-size:11px;',
			value : 'true',
			name : 'admin_state_up',
			scope : me
		})];
		me.callParent(arguments);
	},

	buttons : [{
		text : Portal.getText('firewall', 'cancel'),
		handler : function() {
			var me = this.up('form');
			this.up('form').up('window').close();
		}
	}, {
		text : Portal.getText('firewall', 'create'),
		formBind : true,
		handler : function() {
			var form = this.up('form').getForm();
			var values = form.getValues();
			var me = this.up('form');
			var mainPanel = me.section;
			var treePanel = me.section.treePanel;
			this.json = {
				firewall : {
					name : form.findField('name').getValue(),
					admin_state_up : form.findField('admin_state_up').getValue(),
					firewall_policy_id : values.policy_id
				}
			};
			if (me.description.getValue() != "" && me.description.getValue() != null) {
				this.json.firewall.description = me.description.getValue();
			}

			if (form.findField('tenant_id') != null && form.findField('tenant_id') != undefined && form.findField('tenant_id') != "" && form.findField('tenant_id').getValue() != "" && form.findField('tenant_id').getValue() != null && form.findField('tenant_id').getValue() != undefined) {
				this.json.firewall.tenant_id = form.findField('tenant_id').getValue();
			} else {
				delete this.json.firewall.tenant_id;
			}

			if (form.isValid()) {
				Ext.Ajax.request({
					headers : {
						'Accept' : 'application/json',
						'Content-Type' : 'application/json'
					},
					url : 'proxy/network/' + Portal.firewall.neutronProxy + 'fw/firewalls',
					params : null,
					method : 'POST',
					jsonData : this.json,
					callback : function(options, success, response) {
						if (success) {
							var resp = Ext.decode(response.responseText);
							var firewall = resp.firewall;
							treePanel.created = true;
							treePanel.created_id = firewall.id;
							treePanel.nodeExpanded.add('efirewall', 'efirewall');
							me.up('window').close();
							mainPanel.refresh();
						} else {
							var msg = Portal.getText('firewall', 'fwaas-error-create-firewall');
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