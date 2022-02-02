import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import WSMButtonEditing from './wsmbuttonediting';
import WSMButtonUI from './wsmbuttonui';

export default class WSMButton extends Plugin {
    // Array of plugins required by this plugin
    static get requires() {
        return [WSMButtonEditing, WSMButtonUI];
    }

    // Makes the plugin available in the PluginCollection.get('name')
    static get pluginName() {
        return 'WSMButton';
    }

    init() {
    }
}
