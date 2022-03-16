import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import {
    toWidgetEditable,
    viewToModelPositionOutsideModelElement,
} from '@ckeditor/ckeditor5-widget/src/utils';
import WSMRangeDateButtonCommand from './wsm-date-range-button-command';

const WSMDATERANGEBUTTON = 'wsm-date-range-button';

export default class WsmDateRangeButtonEditing extends Plugin {
    static get requires() {
        return [Widget];
    }

    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add(
            WSMDATERANGEBUTTON,
            new WSMRangeDateButtonCommand(this.editor)
        );

        this.editor.editing.mapper.on(
            'viewToModelPosition',
            viewToModelPositionOutsideModelElement(
                this.editor.model,
                (viewElement) => viewElement.hasClass('wsmbutton-text')
            )
        );

        this.editor.config.define('wsmDateRangeButtonProps', {
            types: ['name', 'date']
        });

        this.editor.config.define('wsmDateRangeButtonBrackets', {
            open: '{{',
            close: '}}'
        })
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register(WSMDATERANGEBUTTON, {
            // Allow wherever text is allowed:
            allowWhere: '$text',

            // It will act as an inline node:
            isInline: true,

            // The inline widget is self-contained, so it cannot be split by the caret, and it can be selected:
            isObject: true,

            // The inline widget can have the same attributes as text (for example linkHref, bold):
            allowAttributesOf: '$text',

            // The placeholder can have many types, like date, name, surname, etc:
            allowAttributes: ['name'],
        });
    }

    _defineConverters() {
         const conversion = this.editor.conversion;
         const config = this.editor.config;

         conversion.for('editingDowncast').elementToElement({
            model: WSMDATERANGEBUTTON,
            view: (modelItem, writer) => {
                const viewWriter = writer.writer || writer;
                const widgetElement = createWsmRangeDateButtonView(modelItem, viewWriter);
                return toWidgetEditable(widgetElement, viewWriter);
            }
         });

         conversion.for('dataDowncast').elementToElement({
             model: WSMDATERANGEBUTTON,
             view: (modelItem, writer) => {
                 const viewWriter = writer.writer || writer;
                 return createWsmRangeDateButtonView(modelItem, viewWriter)
             },
         })

         function createWsmRangeDateButtonView(modelItem, viewWriter) {
             const name = modelItem.getAttribute('name');
             const wsmRangeDateButtonView = viewWriter.createContainerElement('span', {class: 'wsmbutton-text'}, {isAllowedInsideAttributeElement: true});

             const innerText = viewWriter.createText(
                config.get('wsmDateRangeButtonBrackets.open') +
                name +
                config.get('wsmDateRangeButtonBrackets.close')
             );

             viewWriter.insert(viewWriter.createPositionAt(wsmRangeDateButtonView,0), innerText);
             return wsmRangeDateButtonView;
         }
    }
}

