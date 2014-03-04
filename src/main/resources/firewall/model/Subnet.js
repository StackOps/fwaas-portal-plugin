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
Ext.define('Stackops.portal.plugin.firewall.model.Subnet', {
	extend : 'Ext.data.Model',
	requires : ['Ext.data.proxy.Ajax', 'Ext.data.JsonStore', 'Ext.data.reader.Json'],
	fields : [{
		"name" : 'id'
	}, {
		"name" : 'name'
	}],

	proxy : {
		model : 'Stackops.portal.plugin.firewall.model.Subnet',
		noCache : false,
		pageParam : undefined,
		startParam : undefined,
		limitParam : undefined,
		sortParam : undefined,
		type : 'ajax',
		headers : {
			'Content-Type' : 'application/json; charset=utf-8; Cache-Control: no-cache',
			'Accept' : 'application/json'
		},
		url : 'proxy/network' + '/v2.0/' + 'networks',
		reader : {
			type : 'json',
			root : 'networks'
		}
	}
});