Ext.define('Stackops.portal.plugin.firewall.view.RuleEdit', {
	extend : 'Ext.form.Panel',
	alias : 'widget.fwaasruleedit',
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
				"id" : "any",
				"name" : "ANY"
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

		me.items = [{
			fieldLabel : Portal.getText('firewall', 'rule-edit-name'),
			emptyText : Portal.getText('firewall', 'emptyText'),
			name : 'name',
			value : me.record.get('name'),
			allowBlank : false
		}, me.protocols_combo = {
			xtype : 'combo',
			fieldLabel : Portal.getText('firewall', 'rule-edit-protocol'),
			displayField : 'name',
			valueField : 'id',
			value : me.record.get('protocol'),
			forceSelection : true,
			allowBlank : false,
			queryMode : 'local',
			typeAhead : true,
			name : 'protocol',
			store : me.protocolsStore
		}, me.actions_combo = {
			xtype : 'combo',
			fieldLabel : Portal.getText('firewall', 'rule-edit-action'),
			displayField : 'name',
			valueField : 'id',
			value : me.record.get('action'),
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
			fieldLabel : Portal.getText('firewall', 'rule-edit-s_address'),
			name : 's_address',
			vtype : 'cidr',
			value : me.record.get('source_ip_address'),
		}, me.d_ip = {
			xtype : 'textfield',
			fieldLabel : Portal.getText('firewall', 'rule-edit-d_address'),
			name : 'd_address',
			vtype : 'cidr',
			value : me.record.get('destination_ip_address'),
		}, me.s_port = {
			xtype : 'textfield',
			fieldLabel : Portal.getText('firewall', 'rule-edit-s_port'),
			name : 's_port',
			vtype : 'ports',
			value : me.record.get('source_port'),
		}, me.d_port = {
			xtype : 'textfield',
			fieldLabel : Portal.getText('firewall', 'rule-edit-d_port'),
			name : 'd_port',
			vtype : 'ports',
			value : me.record.get('destination_port'),
		}, me.description = Ext.create('Ext.form.field.TextArea', {

			grow : true,
			labelWidth : 180,
			fieldLabel : Portal.getText('firewall', 'rule-edit-description'),
			name : 'description',
			value : me.record.get('description')
		}), me.sharedBox = Ext.create('Ext.form.field.Checkbox', {
			fieldLabel : Portal.getText('firewall', 'rule-edit-shared'),
			labelWidth : 180,
			margin : '10 5 10 5',
			align : 'right',
			style : 'font-size:11px;',
			value : me.record.get('shared'),
			checked : me.record.get('shared'),
			name : 'shared',
			scope : me
		}), me.enabledBox = Ext.create('Ext.form.field.Checkbox', {
			fieldLabel : Portal.getText('firewall', 'rule-edit-enabled'),
			labelWidth : 180,
			margin : '10 50 10 5',
			align : 'right',
			style : 'font-size:11px;',
			value : me.record.get('enabled'),
			checked : me.record.get('enabled'),
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
		text : Portal.getText('firewall', 'submit'),
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
					shared : form.findField('shared').getValue(),
					description : form.findField('description').getValue()
				}
			};

			if (form.findField('s_address').getValue() == "") {
				this.json.firewall_rule.source_ip_address = null;
			}
			if (form.findField('d_address').getValue() == "") {
				this.json.firewall_rule.destination_ip_address = null;
			}
			if (form.findField('s_port').getValue() == "") {
				this.json.firewall_rule.source_port = null;
			}
			if (form.findField('d_port').getValue() == "") {
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
							me.up('window').close();
							mainPanel.refresh();
						} else {
							var msg = Portal.getText('firewall', 'rule-edit-error');
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
