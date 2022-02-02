import Command from '@ckeditor/ckeditor5-core/src/command';

export default class WSMButtonCommand extends Command {
    execute({value}) {
        const editor = this.editor;

        editor.model.change((modelWriter) => {
            // Create <wsmbutton> elment with name attribute...
            const wsmbutton = modelWriter.createElement('wsmbutton', {
                name: value
            });

            // ... and insert it into the document.
            editor.model.insertContent(wsmbutton);

            // Put the selection on inserted element.
            // modelWriter.setSelection(wsmbutton, 'on');
        });
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const isAllowed = model.schema.checkChild(selection.focus.parent, 'wsmbutton');
        this.isEnabled = isAllowed;
    }
}
