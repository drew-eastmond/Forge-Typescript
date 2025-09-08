
document.addEventListener("DOMContentLoaded", async function (e) {
    console.log("Example page has loaded!");

    return;

    setTimeout(function () {

        const where = undefined; // new Set(document.body.querySelectorAll(`[name="target[{}]"]`));
        console.error(Parse(document.body.querySelector(`form[name="form{}"]`)));

    }, 125);

    setTimeout(function () {

        const writeData = {
            "enabled": true,
            "filters": ".happy",
            "types": false,
            "manifest": false,
            "platform": "browser",
            "format": "iife",
            "entry": "./src/tsx/index.tsx",
            "source_drop": "",
            "target_drop": "",
            "target[{}]": [
                {
                    "file": "file",
                    "transform": "minify",
                    "overwrite": true
                },
                {
                    "file": "two",
                    "transform": "none",
                    "overwrite": false
                },
                {
                    "file": "three",
                    "transform": "none",
                    "overwrite": false
                }
            ],
            "subform{}": {
                "text-a": "drew",
                "text-b": "tyna",
                "text-c": "option 1",
                "inner-form{}": {
                    "text-a": "",
                    "text-b": "",
                    "fav_language": {
                        "name": "fav_language",
                        "value": "JS"
                    },
                    "fav_language[]": [
                        "option 3",
                        "option 1"
                    ]
                }
            }
        };

        Write(document.body.querySelector(`[name="form{}"]`), writeData);

    }, 500);

});

class Formless {

    root;
    _whereElements;
    _ignoreElements;


    constructor(root, options) {

        this.root = root;

        this._whereElements = new Set(options?.where);
        this._ignoreElements = new Set(options?.ignore);

        this._getter = options?.getter;
    }

    _getter(inputElement) {

        const name = inputElement.getAttribute("name");

        switch (inputElement.tagName.toLowerCase()) {

            case "input":

                switch (inputElement.type.toLowerCase()) {

                    case "checkbox":
                        return { name, value: inputElement.checked };

                    case "radio":

                        {

                            const name = inputElement.getAttribute("name");
                            const formElement = inputElement.closest("form, subform");
                            const radioElement = formElement.querySelector(`input[type="radio"][name="${name}"]:checked:not(& form *, & subform *)`);
                            return { name, value: radioElement?.value };

                        }

                    case "text":
                    default:
                        return { name, value: inputElement.value };

                }
                break;

            case "select":

            default:
                return { name, value: inputElement.value };

        }

    }

    _parse(element, options) {

        if (element === undefined) throw "undefined element for Parse ( ... )";

        const where = options?.where;
        const ignore = options?.ignore;
        const getter = options?.getter;

        const nameAttribute = element.getAttribute("name");
        const name = /(?<name>.+?)\s*\[|\{/.exec(nameAttribute)?.groups?.name || nameAttribute;

        if (/.+?(\s*\[\s*\{\s*\}\s*\]\s*)$/.test(nameAttribute) || /.+?\s*\{\s*\}\s*$/.test(nameAttribute)) {

            // filter out entries
            const children = new Set(element.querySelectorAll(`[name]:not(& [name] [name])`));
            if (where) for (const child of children) if (where.has(child) === false) children.delete(child);
            if (ignore) for (const child of children) if (ignore.has(child) === true) children.delete(child);

            const values = {};
            for (const child of children) {

                // is the current child an compostie
                const nameAttribute = child.getAttribute("name");
                const compositeResults = /(?<name>.+?)\s*\[\s*\]\s*/.exec(nameAttribute) || /(?<name>.+?)\s*\[\s*\{\s*\}\s*\]\s*/.exec(nameAttribute);
                if (compositeResults) {

                    const childName = compositeResults.groups.name;

                    const { name, value } = Parse(child, options);
                    const subValues = (values[childName] instanceof Array) ? values[childName] : values[childName] = [];
                    if (name !== undefined && value !== undefined) subValues.push(value);

                } else {

                    const { name, value } = Parse(child, options);
                    if (name !== undefined && value !== undefined) values[name] = value;

                }

            }

            return { name, value: values };

        }

        const arrayResult = /(?<name>.+?)\s*\[\]\s*/.exec(name);
        if (arrayResult) {

            const name = arrayResult.groups.name;
            const value = (getter && getter(element)) || this._getter(element);

            return { name, value };

        }

        return (getter && getter(element)) || this._getter(element);

    }

    parse(options) {

        const { name, value } = this._parse(this.root, options);
        return value;

    }

    use(iStores) {

        const elements = new Set(Array.from(this.root.querySelectorAll(`[data-selector]`)));

        for (const iStore of iStores) {

            for (const element of elements) {

                if (MatchElement(element)) {



                    element.delete(element);
                    break;

                }

            }

        }

    }

}

function Parse(element) {

    if(element === undefined) new Error(`HTMLElement is undefined for Parse ( ... )`);

    const nameAttribute = element.getAttribute("name");

    // is this just a non-composite. Just return the value via whatever parse delegate is available
    if (/^[\w-_]+$/.test(nameAttribute) || /^.+?\[\]$/.test(nameAttribute)) {

        return GetValue(element);

    }

    
    

    // grab all children at any level but not any decendents of composites. They will be parsed recursively
    const children = new Set(Array.from(element.querySelectorAll(`[name]:not(& [name] [name])`)));

    // intersect all HTMLElements. ONLY elements in `_whereElements` are kept
    // if (this._whereElements.size) for (const child of [...children]) if (this._whereElements.has(child) === false) children.delete(child);
    // intersect all HTMLElements. ANY elements in `_ignoreElements` will be discarded
    // if (this._ignoreElements.size) for (const child of [...children]) if (this._ignoreElements.has(child) === true) children.delete(child);

    const result = {};
    for (const child of children) {

        const childName = child.getAttribute("name");
        const childValue = Parse(child);

        //
        //
        //

        if (/^(?<name>.+?)\[\{\}\]$/.test(childName) || /^(?<name>.+?)\[\]$/.test(childName)) {

            // const name: string = multiRecordResults.groups.name;
            const values = (result[childName] instanceof Array) ? result[childName] : result[childName] = [];
            values.push(childValue);

        } else {

            result[childName] = childValue;

        }

    }

    return result;

}

function Write(element, value) {

    const nameAttribute = element.getAttribute("name");

    if (/^(?<name>.+?)((\{\})|(\[\{\}\]))$/.test(nameAttribute)) {

        console.log(nameAttribute); // target[{}]

        for (const [key, subValue] of Object.entries(value)) {

            try {

                if (/^(?<name>.+?)\[\{\}\]$/.test(key)) {

                    // const groupName: string = `${key}\[\{\}\]`;

                    const values = subValue;
                    let cursor = 0;
                    const children = Array.from(element.querySelectorAll(`[name="${key}"]:not(& [name] [name])`));
                    for (const childElement of children) Write(childElement, values[cursor++]);

                } else if (/^(?<name>.+?)\[\]$/.exec(key)) {

                    const values = subValue;
                    let cursor = 0;
                    const children = Array.from(element.querySelectorAll(`[name="${key}"]:not(& [name] [name]`));
                    for (const childElement of children) Write(childElement, values[cursor++]);

                } else { // if (/^(?<name>.+?)\{\}$/.exec(key))

                    const childElement = element.querySelector(`[name="${key}"]`);
                    Write(childElement, subValue);

                }


                // const childElement: HTMLInputElement = element.querySelector(`[name="${name}"]`);
                // WriteElement(childElement, subValue);

            } catch (error) {

                console.error(error);
                console.warn(`WriteElement: \n`, element, "\n", subValue);
                console.log(" ");

            }

        }

    } else {

        SetValue(element, value);

    }

}
 
function GetValue(inputElement) {

    const name = inputElement.getAttribute("name");

    switch (inputElement.tagName.toLowerCase()) {

        case "input":

            switch (inputElement.type.toLowerCase()) {

                case "checkbox":
                    return inputElement.checked;

                case "radio":

                    { 

                        const name = inputElement.getAttribute("name");
                        const formElement = inputElement.closest("form, subform");
                        const radioElement = formElement.querySelector(`input[type="radio"][name="${name}"]:checked:not(& form *, & subform *)`);
                        return { name, value: radioElement?.value };

                    }

                case "text":
                default:
                    return inputElement.value;

            }
            break;

        case "select":

        default:
            return inputElement.value;

    }

}

function SetValue(inputElement, value) {

    // console.log(inputElement);
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

function MatchElement(element) {

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

    }

    return true;

}


                    /*

                    function ParseOLD(element, options) {

    if (element === undefined) throw "undefined element for Parse ( ... )";

    const where = options?.where;
    const ignore = options?.ignore;
    const getter = options?.getter;

    const nameAttribute = element.getAttribute("name");
    const name = /(?<name>.+?)\s*\[|\{/.exec(nameAttribute)?.groups?.name || nameAttribute;

    if (/.+?(\s*\[\s*\{\s*\}\s*\]\s*)$/.test(nameAttribute) || /.+?\s*\{\s*\}\s*$/.test(nameAttribute)) {

        // filter out entries
        const children = new Set(element.querySelectorAll(`[name]:not(& [name] [name])`));
        // if (where) for (const child of [...children]) if (where.has(child) === false) children.delete(child);
        // if (ignore) for (const child of [...children]) if (ignore.has(child) === true) children.delete(child);

        const values = {};
        for (const child of children) {

            // is the current child an compostie
            const nameAttribute = child.getAttribute("name");
            const compositeResults = /(?<name>.+?)\s*\[\s*\]\s* /.exec(nameAttribute) || /(?<name>.+?)\s*\[\s*\{\s*\}\s*\]\s* /.exec(nameAttribute);
if (compositeResults) {

    const childName = compositeResults.groups.name;

    const { name, value } = Parse(child, options);
    const subValues = (values[childName] instanceof Array) ? values[childName] : values[childName] = [];
    if (name !== undefined && value !== undefined) subValues.push(value);

} else {

    const { name, value } = Parse(child, options);
    if (name !== undefined && value !== undefined) values[name] = value;

}

        }

return { name, value: values };

    }

const arrayResult = /(?<name>.+?)\s*\[\]\s* /.exec(name);
if (arrayResult) {

    const name = arrayResult.groups.name;
    const value = (getter && getter(element)) || GetValue(element, getter);

    return { name, value };

}

return (getter && getter(element)) || GetValue(element);

} */