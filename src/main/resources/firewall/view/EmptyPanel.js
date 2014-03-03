
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
    }
});