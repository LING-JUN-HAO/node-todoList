const sendSuccess = ({res, msg = {}, statusCode = 200}) => {
    const response = {
        status: 'Success',
        ...msg
    }
    res.statusCode = statusCode;
    res.write(JSON.stringify(response));
    res.end()
}

const sendFailed = ({res, msg = {}, statusCode = 500}) => {
    const response = {
        status: 'Failed',
        error: msg
    }
    res.statusCode = statusCode;
    res.write(JSON.stringify(response));
    res.end()
}

module.exports = { sendSuccess, sendFailed}