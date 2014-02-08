Ext.define('Stackops.portal.plugin.firewall.FirewallPluginDescriptor', {
	extend : 'Stackops.portal.PluginDescriptor',
	controllers : ['Stackops.portal.plugin.firewall.controller.UpTree'],
	requires : ['Stackops.portal.plugin.firewall.view.FwaasPluginPanel'],
	debug : true,
	id : 'firewall-win',
	shortcutTitle : Portal.getText('firewall', 'pluginName'),
	shortcutCls : 'fwplugin-shortcut',
	init : function() {
		Portal.firewall = {};
		this.launcher = {
			text : Portal.getText('firewall', 'pluginName'),
			handler : this.createWindow,
			iconCls : 'fwplugin-icon',
			scope : this
		};
		
		Ext.MessageBox.msgButtons['yes'].text = Portal.getText('firewall', 'yes');
		Ext.MessageBox.msgButtons['no'].text = Portal.getText('firewall', 'no');

		var cidrTest = /^((([0-9])|([1-9][0-9])|([1][0-9][0-9])|([2][0-4][0-9])|(25[0-5]))[.]){3}(([0-9])|([1-9][0-9])|([1][0-9][0-9])|([2][0-4][0-9])|(25[0-5]))(\/([0-9]|[1-2][0-9]|3[0-2])){0,1}$/;
		Ext.apply(Ext.form.field.VTypes, {
			cidr : function(val, field) {
				return cidrTest.test(val);
			},
			cidrText : Portal.getText('firewall', 'rule-create-vtype-cidr-text'),
			cidrMask : /[\d\.\/]/i
		});

		var portsTest = /^([0-9]|[1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|(65)[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])(:([0-9]|[1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|(65)[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])){0,1}$/;
		Ext.apply(Ext.form.field.VTypes, {
			ports : function(val, field) {
				return portsTest.test(val);
			},
			portsText : Portal.getText('firewall', 'rule-create-vtype-ports-text'),
			portsMask : /[\d\:]/i
		});

		Ext.override(Ext.LoadMask, {
			toFront : function(preventFocus) {
				var me = this;
				if (me.zIndexManager.bringToFront(me)) {
					if (!Ext.isDefined(preventFocus)) {
						preventFocus = !me.focusOnToFront;
					}
					if (!preventFocus) {
						me.focus(false, true);
					}
				}
				return me;
			}
		});

	},
	createWindow : function() {
		var desktop = this.app.getDesktop();
		var win = desktop.getWindow(this.id);
		if (!win) {
			win = desktop.createWindow({
				id : this.id,
				title : Portal.getText('firewall', 'pluginName'),
				width : 1024,
				height : 480,
				animCollapse : false,
				iconCls : 'fwplugin-icon',
				constrainHeader : true,
				layout : 'fit',
				items : [{
					xtype : 'fwaaspluginpanel'
				}]
			});
		}
		win.show();
		return win;
	}
}); 