module.exports = {
    FormatErr(e) {
        const error = { ...e.errors[0] }
        return error
    },
    ErrorBadRequest(msg) {
        return {
            "error": {
                "name": "Error",
                "message": msg
            }
        }
    },
    ErrorNotfound(msg) {
        return {
            "error": {
                "name": "Error",
                "message": msg
            }
        }
    }
}