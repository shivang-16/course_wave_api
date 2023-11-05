//use this middleware in the function instead of try catch
const catchAsyncError = (functionPassed) => (req, res, next) =>{
   Promise.resolve(functionPassed(req, res, next)).catch(next)
}

export default catchAsyncError