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
Ext.define('Stackops.portal.plugin.firewall.store.Policy', {
	extend : 'Ext.data.Store',
	requires : ['Ext.data.proxy.Ajax', 'Ext.data.JsonStore', 'Ext.data.reader.Json', 'Stackops.portal.plugin.firewall.model.Policy'],
	model : 'Stackops.portal.plugin.firewall.model.Policy',
	constructor : function() {
		var me = this;
		me.model = Ext.ModelManager.getModel(me.model);
		var url = me.model.getProxy().url;
		me.model.getProxy().url = url.replace('$firewall_proxy', Portal.firewall.neutronProxy);
		me.callParent(arguments);
	},
	sorters : ['name'],
	groupDir : 'ASC',
	//autoLoad: false
});