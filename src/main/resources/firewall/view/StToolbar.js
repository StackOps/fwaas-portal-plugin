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