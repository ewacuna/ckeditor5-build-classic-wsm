import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import WsmDateRangeButtonEditing from "./wsm-date-range-button-editing";
import WsmDateRangeButtonUI from "./wsm-date-range-button-ui";

export default class WsmDateRangeButton extends Plugin{
    
    static get requires() {
        return [WsmDateRangeButtonEditing, WsmDateRangeButtonUI];
    }

    static get pluginName() {
        return 'wsm-date-range-button';
    }

    init() {}
}

