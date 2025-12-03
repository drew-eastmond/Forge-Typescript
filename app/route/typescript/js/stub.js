const NUMBER_SIZE = 8;
const CHAR_SIZE = 2;

function EncodeString(value) {

    const size = NUMBER_SIZE + value.length * CHAR_SIZE;
    const buffer = new ArrayBuffer(size);
    const dataView = new DataView(buffer);

    dataView.setFloat64(0, size);

    const uint16Array = new Uint16Array(buffer, NUMBER_SIZE, value.length);
    for (let i = 0; i < value.length; i++) uint16Array[i] = value.charCodeAt(i);

    return buffer;

}

function Revivor(key, value, context) {

    if (value._buffer_ !== undefined && value._base64_ === true) {

        if (value._buffer_ == "") return new ArrayBuffer();

        const base64 = atob(value._buffer_);
        const buffer = Uint8Array.from(base64, CharPointAt_0).buffer;

        return buffer;

    }

    return value;

}

function DecodeString(buffer) {

    return String.fromCharCode.apply(null, new Uint16Array(buffer, 8));

}

function DecodeAttributes(...rest) {

    if (rest.length == 1) {

        const [buffer] = rest;
        const content = DecodeString(buffer);
        return JSON.parse(content, Revivor);

    } else {

        const [buffer, revivor] = rest;
        const content = DecodeString(buffer);
        return JSON.parse(content, revivor);

    }


}

function CharPointAt_0(value) { return value.codePointAt(0) }


class FormStorePermission {

    _permission

}

class ClientStore {

    _key;
    _htmlElement;
    _permission;

    attributes;
    mime;
    buffer;
    constructor(key, attributes, permission) {

        this._key = key;
        this.attributes = attributes;
        this._permission = permission;

    }

    _onChangeInput(event) {

        console.log("changing input", this.value, this._htmlElement);

        // const inputElement = event.currentTarget;
        const value = GetValue(this._htmlElement);

        console.warn("exporting value");
        console.warn("exporting value");
        console.log(value);

        $write(`http://localhost:1234/model/random`,
            this._permission,
            this._key,
            EncodeString(JSON.stringify({ value }))
        )
            .then(function (response) {

                window.location.reload();

            })



    }

    get value() {

        return GetValue(this._htmlElement);

    }

    set value(value) {

        SetValue(this._htmlElement, value);

    }

    write(mime, buffer) {

        this.mime = mime;
        this.buffer = buffer;

    }

    use(htmlElement, signal) {

        // check if a element has already been assigned
        if (this._htmlElement) return false;

        const selector = htmlElement.getAttribute("data-selector");

        const regExp = /\.?(?<query>\w+)\((?<parameters>\{.+?\})\)/g;
        let result;
        while (result = regExp.exec(selector)) {

            if (result === null) return false;

            const query = result.groups.query;
            const parameters = JSON.parse(result.groups.parameters);

            switch (query.toLowerCase()) {

                case "and":

                    for (const [key, value] of Object.entries(parameters)) if (value != this.attributes[key]) return false;
                    break;

                case "or":

                    {

                        let matched = false;
                        for (const [key, value] of Object.entries(parameters)) if (value == this.attributes[key]) matched = true;

                        if (matched === false) return false;

                    }
                    break;

                case "not":

                    for (const [key, value] of Object.entries(parameters)) if (value == this.attributes[key]) return false;
                    break;

                default:
                    throw new Error(`Invalid query : "${query}"`);

            }

            // we found something
            console.log("foundddddddddddddddd", htmlElement);

            this._htmlElement = htmlElement;
            if (this._htmlElement.tagName.toLowerCase() == "subform") {

                for (const inputElement of this._htmlElement.querySelectorAll("[name]")) {

                    console.log("set", inputElement);
                    inputElement.addEventListener("change", this._onChangeInput.bind(this), { signal });

                }

            } else {

                this._htmlElement.addEventListener("change", this._onChangeInput.bind(this), { signal });

            }

            try {

                const data = DecodeAttributes(this.buffer)
                this.value = data.value;

            } catch (error) {

                console.error(error);

            }

        }

        return true;

    }

}


function GetValue(inputElement) {

    if (inputElement === undefined) return;

    const name = inputElement.getAttribute("name");
    if (/.+?\s*\{\s*\}\s*/.test(name)) {

        console.log("array")

    }

    switch (inputElement.tagName.toLowerCase()) {

        case "input":

            switch (inputElement.type.toLowerCase()) {

                case "checkbox":
                    return inputElement.checked;

                case "radio":
                    const name = inputElement.getAttribute("name");
                    const formElement = inputElement.closest("form, subform");
                    const radioElement = formElement.querySelector(`input[type="radio"][name="${name}"]:checked:not(& form *, & subform *)`);
                    return radioElement?.value;

                case "text":
                case "select":
                default:
                    return inputElement.value;

            }
            break;

        case "subform":

            const value = {};
            for (const childInput of inputElement.querySelectorAll("& [name]:not(& form *, & subform *)")) {

                try {

                    value[childInput.getAttribute("name")] = GetValue(childInput);

                } catch (error) {

                    console.log(" ");
                    console.error(error);
                    console.warn(`Invalid element ${childInput.getAttribute("name")} for: \n`, inputElement);

                }

            }
            return value;

        case "select":
        default:
            return inputElement.value;

    }

}

function SetValue(inputElement, value) {

    //console.log(inputElement);
    switch (inputElement.tagName.toLowerCase()) {

        case "input":

            switch (inputElement.type.toLowerCase()) {

                case "checkbox":

                    inputElement.checked = value;
                    break;

                case "radio":
                    const name = inputElement.getAttribute("name");
                    const formElement = inputElement.closest("form, subform");
                    const radioElement = formElement.querySelector(`input[type="radio"][name="${name}"][value="${value}"]:not(& form *, & subform *)`);
                    if (radioElement) radioElement.checked = value;
                    break;

                case "text":
                default:
                    inputElement.value = value;

            }

            break;

        case "select":
            inputElement.value = value;
            break;

        case "subform":
            for (const [name, subValue] of Object.entries(value)) {

                try {

                    const childElement = inputElement.querySelector(`[name="${name}"]`);
                    SetValue(childElement, subValue);

                } catch (error) {

                    console.error(error);
                    console.warn(`Invalid Selector ${name} for: \n`, inputElement, "\n", subValue);
                    console.log(" ");

                }

            }
            break;

    }

}