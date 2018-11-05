const KEYCODE_w   =87;
const KEYCODE_a   =65;
const KEYCODE_s   =83;
const KEYCODE_d   =68;

const KEYCODE_up_arrow    =38;
const KEYCODE_left_arrow  =37;
const KEYCODE_down_arrow  =40;
const KEYCODE_right_arrow =39;

const KEYCODE_i   =73;
const KEYCODE_j   =74;
const KEYCODE_k   =75;
const KEYCODE_l   =76;

const KEYCODE_numpad_8    =104;
const KEYCODE_numpad_4    =100;
const KEYCODE_numpad_5    =101;
const KEYCODE_numpad_6    =102;

class Input {
    constructor()
    {
        // set up key dictionary
        this.keyDict = {};

        this.keyDict[KEYCODE_w] = false;
        this.keyDict[KEYCODE_a] = false;
        this.keyDict[KEYCODE_s] = false;
        this.keyDict[KEYCODE_d] = false;

        this.keyDict[KEYCODE_up_arrow]    = false;
        this.keyDict[KEYCODE_left_arrow]  = false;
        this.keyDict[KEYCODE_down_arrow]  = false;
        this.keyDict[KEYCODE_right_arrow] = false;

        this.keyDict[KEYCODE_i] = false;
        this.keyDict[KEYCODE_j] = false;
        this.keyDict[KEYCODE_k] = false;
        this.keyDict[KEYCODE_l] = false;

        this.keyDict[KEYCODE_numpad_8] = false;
        this.keyDict[KEYCODE_numpad_4] = false;
        this.keyDict[KEYCODE_numpad_5] = false;
        this.keyDict[KEYCODE_numpad_6] = false;
    }

    onKeyDown(event) {
        let key = event.keyCode;
        if (key in this.keyDict) {
            this.keyDict[key] = true;
        }
    }

    onKeyUp(event) {
        let key = event.keyCode;
        if (key in this.keyDict) {
            this.keyDict[key] = false;
        }
    }
}

