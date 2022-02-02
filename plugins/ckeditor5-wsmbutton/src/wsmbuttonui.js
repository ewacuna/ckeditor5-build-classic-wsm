import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import analyticsIcon from './theme/icons/analytics_icon.svg';

export default class WSMButtonUI extends Plugin {
    init() {
        const editor = this.editor;
        const t = editor.t;

        // Register this toolbar creating function under the name of 'wsmButton'
        editor.ui.componentFactory.add('wsmbutton', (locale) => {
            const btn = new ButtonView(locale);

            btn.set({
                label: t('Insert Metric'),
                withText: true,
                tooltip: false,
                // icon: analyticsIcon,
            });

            // Execute the command when the button is clicked
            this.listenTo(btn, 'execute', () => {
                window.addEventListener("onClickWsmBtnData", function (event) {
                    const data = event.detail.value || '';
                    editor.execute('wsmbutton', {value: data});
                }, false);
                window.dispatchEvent(new Event('onClickWsmButton'));
            });

            return btn;
        });
    }
}
