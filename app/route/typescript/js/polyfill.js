function require(name) {

    switch (name) {
        case "buffer":
            return {
                Buffer: ArrayBuffer

            }
        case "tty":
            return {
                isatty() {

                }
            };
        case "util":
            return {
                require_util_inspect() {

                }
            };

    }

    return {};
}

var process = {
    env: {},
    cwd() {

    }
};

class Test {

    "sdfsdfdsfdsfsd";
    exposed() {

    }

}