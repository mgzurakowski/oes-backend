exports.getTestData =  (req, res, next) => {
    res.status(200).json({info: "Test GET "});
};