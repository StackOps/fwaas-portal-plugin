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
Ext.define('Stackops.portal.plugin.firewall.view.DataWindow', {
	extend : 'Ext.window.Window',
	requires : ['Ext.grid.Panel', 'Stackops.portal.plugin.firewall.view.StToolbar', 'Ext.button.Button', 'Ext.layout.container.Anchor', 'Ext.layout.container.HBox'],
	alias : 'widget.datawindow',
	layout : 'fit',
	margin : '4 4 4 4',
	width : 600,
	height : 400,
	minWidth : 250,
	minHeight : 325,
	constrain : true,
	hidden : true,
	shadow : false,
	modal : true,
	closable : true,
	maximizable : false,
	hideMode : 'offsets',
	closeAction : 'hide',
	resizable : true,
	buttonText : Portal.getText('firewall', 'close'),
	/**
	 * The CSS class that provides the INFO icon image
	 *
	 * @type String
	 */
	INFO : 'firewall-info-detail',
	/**
	 * The CSS class that provides the WARNING icon image
	 *
	 * @type String
	 */
	WARNING : 'icon_warning_16',
	/**
	 * The CSS class that provides the QUESTION icon image
	 *
	 * @type String
	 */
	QUESTION : 'icon_bell_16',
	/**
	 * The CSS class that provides the ERROR icon image
	 *
	 * @type String
	 */
	ERROR : 'icon_error_16',
	initComponent : function() {
		var me = this;
		me.content = Ext.create('Ext.grid.Panel', {
			border : false,
			columns : [{
				header : Portal.getText('firewall', 'field'),
				dataIndex : 'field',
				draggable : false,
				flex : 1
			}, // , renderer:
			// Ext.util.Format.dateRenderer(Ext.Date.patterns.ISO8601Long)},
			{
				header : Portal.getText('firewall', 'value'),
				dataIndex : 'value',
				draggable : false,
				flex : 2
			}],
			store : Ext.create('Ext.data.ArrayStore', {
				idIndex : 0,
				fields : [{
					name : 'field',
					type : 'string'
				}, {
					name : 'value',
					type : 'auto'
				}]
			})
		});
		me.items = [me.content];
		me.bottomTb = Ext.create('Stackops.portal.plugin.firewall.view.StToolbar', {
			ui : 'footer',
			dock : 'bottom',
			layout : {
				pack : 'center'
			},
			items : [me.okButton = Ext.create('Ext.button.Button', {
				handler : me.okCallBack,
				scope : me,
				text : me.buttonText,
				minWidth : 75
			})]
		});
		me.dockedItems = [me.bottomTb];
		me.mon(me, 'close', me.onDestroy, me);
		me.callParent(arguments);
	},
	show : function(cfg) {
		var me = this;
		// Show the title
		if (cfg.title) {
			me.setTitle(cfg.title || '&#160;');
		}
		me.setPosition(-10000, -10000);
		me.setIconCls(cfg.icon);
		me.addCls(cfg.cls);
		me.callParent();
		me.center();
		return me;
	},
	loadData : function(data) {
		var me = this;
		me.content.store.loadData(data);
	},
	okCallBack : function() {
		var me = this;
		me.okButton.blur();
		//me.hide();
		me.destroy();
	}
});