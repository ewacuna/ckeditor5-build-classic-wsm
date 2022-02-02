import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import {
    toWidget,
    toWidgetEditable,
    viewToModelPositionOutsideModelElement,
} from '@ckeditor/ckeditor5-widget/src/utils';

import WSMButtonCommand from './wsmbuttoncommand';
import './theme/wsmbutton.css';

const WSMBTN = 'wsmbutton';

export default class WSMButtonEditing extends Plugin {
    static get requires() {
        return [Widget];
    }

    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add(
            WSMBTN,
            new WSMButtonCommand(this.editor)
        );

        this.editor.editing.mapper.on(
            'viewToModelPosition',
            viewToModelPositionOutsideModelElement(
                this.editor.model,
                (viewElement) => viewElement.hasClass('wsmbutton-text')
            )
        );

        this.editor.config.define('wsmButtonProps', {
            types: ['name', 'date'],
        });

        this.editor.config.define('wsmButtonBrackets', {
            open: '{{',
            close: '}}',
        });
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register(WSMBTN, {
            // Allow wherever text is allowed:
            allowWhere: '$text',

            // It will act as an inline node:
            isInline: false,

            // The inline widget is self-contained so it cannot be split by the caret and it can be selected:
            isObject: false,

            // The placeholder can have many types, like date, name, surname, etc:
            allowAttributes: ['name', 'id'],
        });
    }

    _defineConverters() {
        const conversion = this.editor.conversion;
        const config = this.editor.config;

        // conversion.for('upcast').elementToElement({
        //     view: {
        //         name: 'span',
        //         classes: ['wsmbutton-text'],
        //     },
        //     model: (viewElement, writer) => {
        //         const name = viewElement
        //             .getChild(0)
        //             .data.slice(
        //                 config.get('wsmButtonBrackets.open').length,
        //                 0 - config.get('wsmButtonBrackets.close').length
        //             );

        //         const modelWriter = writer.writer || writer;

        //         return modelWriter.createElement(WSMBTN, {name});
        //     },
        // });

        conversion.for('editingDowncast').elementToElement({
            model: WSMBTN,
            view: (modelItem, writer) => {
                const viewWriter = writer.writer || writer;

                const widgetElement = createWSMButtonView(
                    modelItem,
                    viewWriter
                );

                // return toWidget(widgetElement, viewWriter);
                return toWidgetEditable(widgetElement, viewWriter);
            },
        });

        conversion.for('dataDowncast').elementToElement({
            model: WSMBTN,
            view: (modelItem, writer) => {
                const viewWriter = writer.writer || writer;

                return createWSMButtonView(modelItem, viewWriter);
            },
        });

        // Helper method for both downcast converters.
        function createWSMButtonView(modelItem, viewWriter) {
            const name = modelItem.getAttribute('name');
            // const id = modelItem.getAttribute('id');

            const wsmButtonView = viewWriter.createContainerElement('span', {
                class: 'wsmbutton-text',
                // id: id
            });

            const innerText = viewWriter.createText(
                config.get('wsmButtonBrackets.open') +
                name +
                config.get('wsmButtonBrackets.close')
            );

            viewWriter.insert(
                viewWriter.createPositionAt(wsmButtonView, 0),
                innerText
            );

            return wsmButtonView;
        }
    }
}
