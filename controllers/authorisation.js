/** Testowy GET 
 * req -request
 * res - response
 * next - kolejne zdarzenie 
 */
exports.getTestData =  (req, res, next) => {
    res.status(200).json({info: "Test GET "});
};