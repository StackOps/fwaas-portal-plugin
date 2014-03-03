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
Ext.define('Stackops.portal.plugin.firewall.view.StToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.fwaassttoolbar',
    alternateClassName: 'Ext.Toolbar',
    
    
    //Fires before any Ext.Component is added or inserted into the container. A handler can return false to cancel the add.
    onBeforeAdd: function(component) {
        if (component.is('field') && this.ui != 'footer') { // if the toolbar is not a footer
            component.ui = component.ui + '-toolbar';
        }
     
        // Any separators needs to know if is vertical or not
        if (component instanceof Ext.toolbar.Separator) {
            component.setUI((this.vertical) ? 'vertical' : 'horizontal');
        }
    }
});