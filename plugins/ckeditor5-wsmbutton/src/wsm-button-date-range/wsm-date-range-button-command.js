import Command from '@ckeditor/ckeditor5-core/src/command';


export default class WSMRangeDateButtonCommand extends Command{
    execute({value}) {
        const editor = this.editor;

        editor.model.change((modelWriter) => {
            // Create <wsm-date-range-button> elment with name attribute...
            const wsmDateRangeButton = modelWriter.createElement('wsm-date-range-button', {
                name: value
            });

            // ... and insert it into the document.
            editor.model.insertContent(wsmDateRangeButton);

        });
    }

    refresh(){
        const model = this.editor.model;
        const selection = model.document.selection;
        const isAllowed = model.schema.checkChild(selection.focus.parent, 'wsm-date-range-button');
        this.isEnabled = isAllowed;
    }
}

