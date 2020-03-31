async function returnResponse(res, controllerFunction) {
    const { status, data } = await controllerFunction;
    return res.status(status).json(data);
}

module.exports = returnResponse;