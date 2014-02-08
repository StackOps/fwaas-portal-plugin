Ext.define('Stackops.portal.plugin.firewall.view.HelpContainer', {
	extend : 'Ext.container.Container',
	alias : 'widget.fwaashelpcontainer',
	requires : ['Ext.button.Button', 'Ext.container.Container'],

	//width : 310,
	cls : 'fwaas-container-white-icon',
	//minWidth : 310,
	//height : 300,
	//minHeight : 300,
	autoScroll : true,
	style : {
		border : 0
	},
	padding : 5,

	layout : {
		type : 'vbox',
		align : 'stretch'
	},

	initComponent : function() {
		var me = this;

		me.image_section = Ext.create('Ext.Img', {
			style : {
				'max-width' : '100%',
				'margin-left' : 'auto',
				'margin-right' : 'auto',
				'display' : 'block',
				'vertical-align' : 'middle',
				height : 'auto',
				width : 'auto'
			},

			src : me.image_help
		});

		me.text_section = Ext.create('Ext.form.field.TextArea', {
			hideLabel : true,
			style : {
				'margin-left' : 10,
				'margin-right' : 10,
				//'margin-top' : 10,
			},
			width : me.twidth,
			minWidth : me.twidth,
			maxWidth : me.twidth,
			height : me.theight,
			maxHeight : me.theight,
			minHeight : me.theight,
			//layout : 'fit',

			fieldStyle : "border:none 0px black;background:none;font-size:11px;",
			readOnly : true,
			padding : 2,
			// anchor : '100%',
			value : me.text_help

		});

		var container_ = Ext.create('Ext.container.Container', {
			width : me.cwidth,

			minWidth : me.cwidth,
			maxWidth : me.cwidth,
			height : me.cheight,
			maxHeight : me.cheight,
			minHeight : me.cheight,
			padding : 2,
			style : {
				border : 0
			},
			items : [me.image_section]
		});

		me.items = [];
		me.items.push(container_);
		me.items.push(me.text_section);
		me.callParent(arguments);
	}
}); 