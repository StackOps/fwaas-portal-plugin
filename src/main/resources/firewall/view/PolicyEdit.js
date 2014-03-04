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
Ext.define('Stackops.portal.plugin.firewall.view.PolicyEdit', {
	extend : 'Ext.form.Panel',
	alias : 'widget.policyedit',
	requires : ['Stackops.portal.util.JsonFormPanel', 'Stackops.portal.plugin.firewall.model.Firewall_Rule', 'Stackops.portal.plugin.firewall.store.Rules', 'Ext.form.field.Checkbox', 'Ext.data.JsonStore', 'Ext.data.reader.Json'],

	bodyPadding : 5,
	layout : 'anchor',
	align : 'center',
	defaults : {
		labelAlign : 'left',
		padding : '3 0 2 0',
		width : 380
	},
	border : false,
	buttonAlign : 'center',

	defaultType : 'textfield',
	initComponent : function() {
		var me = this;

		me.rulesStore = Ext.create('Ext.data.Store', {
			model : 'Stackops.portal.plugin.firewall.model.Firewall_Rule',
			data : me.rules_store
		});

		me.multiCombo = Ext.create('Ext.form.field.ComboBox', {
			fieldLabel : Portal.getText('firewall', 'fwaas-action-edit-policy-rule'),
			multiSelect : true,
			displayField : 'name',
			valueField : 'id',
			labelWidth : 150,
			margin : '5 5 5 5',
			store : me.rulesStore,
			forceSelection : true,
			queryMode : 'local',
			value : me.record.get('firewall_rules')
		});

		me.items = [{
			fieldLabel : Portal.getText('firewall', 'fwaas-action-edit-policy-name'),
			name : 'name',
			labelWidth : 150,
			margin : '5 5 5 5',
			allowBlank : false,
			value : me.record.get('name'),
			emptyText : Portal.getText('firewall', 'emptyText')
		}, me.description = Ext.create('Ext.form.field.TextArea', {

			grow : true,
			labelWidth : 150,
			margin : '5 5 5 5',
			fieldLabel : Portal.getText('firewall', 'fwaas-action-edit-policy-description'),
			name : 'description',
			value : me.record.get('description')
		}), me.sharedBox = Ext.create('Ext.form.field.Checkbox', {
			boxLabel : Portal.getText('firewall', 'fwaas-action-edit-policy-shared'),
			margin : '5 5 5 5',
			align : 'right',
			style : 'font-size:11px;',
			value : me.record.get('shared'),
			checked : me.record.get('shared'),
			name : 'shared',
			/*handler: function(){
			 me.checkBoxOn.call(me);
			 },*/
			scope : me
		}), me.auditedBox = Ext.create('Ext.form.field.Checkbox', {
			boxLabel : Portal.getText('firewall', 'fwaas-action-edit-policy-audited'),
			margin : '10 5 5 5',
			style : 'font-size:11px;',
			value : me.record.get('audited'),
			checked : me.record.get('audited'),
			name : 'audited',
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
		text : Portal.getText('firewall', 'submit'),
		formBind : true,
		handler : function() {
			var form = this.up('form').getForm();
			var me = this.up('form');
			var mainPanel = me.section;
			var treePanel = mainPanel.treePanel;
			this.json = {
				firewall_policy : {
					name : form.findField('name').getValue(),
					audited : form.findField('audited').getValue(),
					shared : form.findField('shared').getValue(),
					firewall_rules : []
				}
			};
			if (me.description.getValue() != "" && me.description.getValue() != null) {
				this.json.firewall_policy.description = me.description.getValue();
			}

			if (me.multiCombo.getValue() != "" && me.multiCombo.getValue() != null) {
				this.json.firewall_policy.firewall_rules = me.multiCombo.getValue();
			}

			if (form.isValid()) {
				me.multiCombo.getValue();
				Ext.Ajax.request({
					headers : {
						'Accept' : 'application/json',
						'Content-Type' : 'application/json'
					},
					url : 'proxy/network/' + Portal.firewall.neutronProxy + 'fw/firewall_policies/' + me.record.get('id'),
					params : null,
					method : 'PUT',
					jsonData : this.json,
					callback : function(options, success, response) {
						if (success) {
							me.up('window').close();
							mainPanel.refresh();
						} else {
							var msg = Portal.getText('firewall', 'fwaas-error-edit-policy');
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