Ext.define('Stackops.portal.plugin.firewall.view.EmptyPanel', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.emptypanel',
    requires: [
   	'Ext.toolbar.Separator',
    'Ext.menu.Separator',
    'Ext.toolbar.TextItem',
    ],
    title: Portal.getText('firewall', 'emptypanel-title'),
    html: Portal.getText('firewall', 'emptypanel-html'),
    
    layout: 'fit',
    
    initComponent : function(){
    	var me = this;
    	me.mon(me, 'beforeremove', me.onBeforeRemove, me);
    	me.mon(me, 'add', me.onAddC, me);
    	me.callParent(arguments);
    },
    
    onBeforeRemove : function(container, componente){
    	var me = this;
    	me.setMask(true);
    },
    
    onAddC: function(container, componente){
    	var me = this;
    	me.setMask(false);
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
    /*autoScroll: false,
    defaults: {
      anchor: '100%'
    },*/

   
    /*initComponent: function(){
    	var me = this;
    	me.callParent(arguments);
    },*/
});