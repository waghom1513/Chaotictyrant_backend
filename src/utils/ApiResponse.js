class ApiResponse {
    constructor (
        statusCode,
        message="somethong went wrong",
        data 
    ){
        super(message)
        this.statuscode = statuscode
        this.data = data
        this.message = message
    }
}