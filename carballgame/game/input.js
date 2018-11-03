const KEYCODE_w   =87;
const KEYCODE_a   =65;
const KEYCODE_s   =83;
const KEYCODE_d   =68;

const KEYCODE_up_arrow    =38;
const KEYCODE_left_arrow  =37;
const KEYCODE_down_arrow  =40;
const KEYCODE_right_arrow     =39;

const KEYCODE_escape  =27;

const KEYCODE_1   =49;
const KEYCODE_2   =50;
const KEYCODE_3   =51;

class Input {
    constructor()
    {
        this.keyDict = {};

        this.keyDict[KEYCODE_w] = false;
        this.keyDict[KEYCODE_a] = false;
        this.keyDict[KEYCODE_s] = false;
        this.keyDict[KEYCODE_d] = false;

        this.keyDict[KEYCODE_up_arrow]    = false;
        this.keyDict[KEYCODE_left_arrow]  = false;
        this.keyDict[KEYCODE_down_arrow]  = false;
        this.keyDict[KEYCODE_right_arrow] = false;

        this.keyDict[KEYCODE_escape] = false;

        this.keyDict[KEYCODE_1] = false;
        this.keyDict[KEYCODE_2] = false;
        this.keyDict[KEYCODE_3] = false;
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

