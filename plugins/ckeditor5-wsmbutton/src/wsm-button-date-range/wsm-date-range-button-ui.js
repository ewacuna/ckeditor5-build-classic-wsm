import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import calendar_plus_icon from '../theme/icons/calendar_plus_icon.svg';

export default class WsmDateRangeButtonUI extends Plugin{
    init() {
        const editor = this.editor;
        const t = editor.t;

        // Register this toolbar creating function under the name of 'wsmButton'
        editor.ui.componentFactory.add('wsm-date-range-button',(locale) => {
            const btn = new ButtonView(locale);

            btn.set({
                icon: calendar_plus_icon,
                tooltip: 'Add date'
            });

            // Execute the command when the button is clicked
            this.listenTo(btn, 'execute', () => {
                window.addEventListener("onClickWsmDateRangeBtnData", function(event){
                    if(event.detail && event.detail.value){
                        const data = event.detail.value || '';
                        editor.execute('wsm-date-range-button', {value: data})
                    }
                }, {once: true})
                window.dispatchEvent(new Event('onClickWsmDateRangeButton'));
            });
            return btn;
        });
    }
}