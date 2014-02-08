Ext.define('Stackops.portal.plugin.firewall.view.PolicyCreate', {
	extend : 'Ext.form.Panel',
	alias : 'widget.policycreate',
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
			fieldLabel : Portal.getText('firewall', 'fwaas-action-create-policy-rule'),
			//renderTo: 'multiSelectCombo',
			multiSelect : true,
			displayField : 'name',
			valueField : 'id',
			labelWidth : 150,
			margin : '5 5 5 5',
			store : me.rulesStore,
			forceSelection : true,
			queryMode : 'local'
		});
		me.tenantsStore = Ext.create('Ext.data.Store', {
			fields : ['id', 'name'],
			data : me.section.tenantsData
		});
		me.items = [{
			fieldLabel : Portal.getText('firewall', 'fwaas-action-create-policy-name'),
			name : 'name',
			labelWidth : 150,
			margin : '5 5 5 5',
			allowBlank : false,
			emptyText : Portal.getText('firewall', 'emptyText')
		}, me.tenants_combo = {
			xtype : 'combo',
			margin : '5 5 5 5',
			fieldLabel : 'Tenant',
			displayField : 'name',
			valueField : 'id',
			queryMode : 'local',
			typeAhead : true,
			labelWidth : 150,
			name : 'tenant_id',
			store : me.tenantsStore,
			hidden : me.section.admin ? false : true
		}, me.description = Ext.create('Ext.form.field.TextArea', {
			grow : true,
			labelWidth : 150,
			margin : '5 5 5 5',
			fieldLabel : Portal.getText('firewall', 'fwaas-action-create-policy-description'),
			name : 'description',
		}), me.sharedBox = Ext.create('Ext.form.field.Checkbox', {
			boxLabel : Portal.getText('firewall', 'fwaas-action-create-policy-shared'),
			margin : '5 5 5 5',
			align : 'right',
			style : 'font-size:11px;',
			value : 'false',
			name : 'shared'
		}), me.auditedBox = Ext.create('Ext.form.field.Checkbox', {
			boxLabel : Portal.getText('firewall', 'fwaas-action-create-policy-audited'),
			margin : '10 5 15 5',
			style : 'font-size:11px;',
			value : 'true',
			name : 'audited',
			scope : me,
			hidden : me.section.admin ? false : true
		})];
		me.callParent(arguments);

	},

	buttons : [{
		text : Portal.getText('firewall', 'cancel'),
		handler : function() {
			var me = this.up('form');
			me.up('window').close();
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
				firewall_policy : {
					name : form.findField('name').getValue(),
					audited : form.findField('audited').getValue(),
					shared : form.findField('shared').getValue(),
					firewall_rules : []
				}
			};

			if (form.findField('tenant_id') != null && form.findField('tenant_id') != undefined && form.findField('tenant_id') != "" && form.findField('tenant_id').getValue() != "" && form.findField('tenant_id').getValue() != null && form.findField('tenant_id').getValue() != undefined) {
				this.json.firewall_policy.tenant_id = form.findField('tenant_id').getValue();
			} else {
				delete this.json.firewall_policy.tenant_id;
			}

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
					url : 'proxy/network/' + Portal.firewall.neutronProxy + 'fw/firewall_policies',
					params : null,
					method : 'POST',
					jsonData : this.json,
					callback : function(options, success, response) {
						if (success) {
							var resp = Ext.decode(response.responseText);
							var firewall_policy = resp.firewall_policy;
							treePanel.created = true;
							treePanel.created_id = firewall_policy.id;
							treePanel.nodeExpanded.add('epolicy', 'epolicy');
							me.up('window').close();
							mainPanel.refresh();
						} else {
							var msg = Portal.getText('firewall', 'fwaas-error-create-policy');
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