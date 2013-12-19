Ext.define('Stackops.portal.plugin.firewall.FirewallPluginDescriptor', {
    extend: 'Stackops.portal.PluginDescriptor',
    controllers: ['Stackops.portal.plugin.firewall.controller.UpTree'],
    requires: ['Stackops.portal.plugin.firewall.view.FwaasPluginPanel'],
    debug: true,
    id: 'firewall-win',
    shortcutTitle: Portal.getText('firewall', 'pluginName'),
    shortcutCls: 'fwplugin-shortcut',
    init : function(){
    	Portal.firewall = {};
        this.launcher = {
            text: Portal.getText('firewall', 'pluginName'),
            handler : this.createWindow,
            iconCls: 'fwplugin-icon',
            scope: this
        };
        
        
          Ext.override(Ext.LoadMask, { 
            toFront: function(preventFocus) {
                var me = this;
                /*if (me.zIndexParent) {
                    me.zIndexParent.toFront(true);
                }*/
                if (me.zIndexManager.bringToFront(me)) {
                    if (!Ext.isDefined(preventFocus)) {
                        preventFocus = !me.focusOnToFront;
                    }
                    if (!preventFocus) {
                        // Kick off a delayed focus request.
                        // If another floating Component is toFronted before the delay expires
                        // this will not receive focus.
                        me.focus(false, true);
                    }
                }
                return me;
            }
        });
        if (Portal.intercept_help != true) {
			Portal.intercept_help = true;
			Ext.Function.interceptBefore(Ext.form.Field.prototype, 'initComponent', function() {
				
				var f = this.fieldLabel, fl = this.labelSeparator, h = this.fwaashelpText, i =this.fwaasInfo, oo = this.fwaasmandatory;
				
				if (h && h !== '' && fl) {
					//this.labelSeparator = fl+'<span style="font-weight:bold; color:red;" data-qtip="'+h+'">'+" *"+'</span> ';
					
					
					//this.labelSeparator =fl + '<span style="font-weight:bold; color:#5882FA; font-size: 15px;" data-qtip="' + h + '">' + " *" + '</span> ';
					
					this.fieldLabel = '<span data-qtip="' + h + '">' + f +'</span>';
					
					//this.labelSeparator = fl+'<img align="middle" src="../portal/plugin/static/fwaas/images/info-icon.png" data-qtip="'+h+'"</img>';
					//this.labelSeparator = fl + '<span style="font-weight:bold; color:#5882FA; font-size: 15px;" data-qtip=">' + " *" + '</span> ';
				}
				else if(i && i !== '' && fl){
					this.labelSeparator = fl+'<img align="middle" src="../portal/plugin/static/fwaas/images/info-icon.png" data-qtip="'+i+'"</img>';
				}
				else if(oo && oo !== '' && fl){
					this.labelSeparator = fl + '<span style="font-weight:bold; color:red; font-size: 15px;" data-qtip="' + "mandatory" + '">' + " *" + '</span> ';
				}
				

			});
		}
    },
    createWindow : function() {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow(this.id);
        if(!win){
            win = desktop.createWindow({
                id: this.id,
                title: Portal.getText('firewall', 'pluginName'),
                width:1024,
                height:480,
                animCollapse:false,
                iconCls: 'fwplugin-icon',
                constrainHeader:true,
                layout: 'fit',
                items: [{
                    xtype: 'fwaaspluginpanel'
                }]
            });
        }
        win.show();
        return win;
    }
});
