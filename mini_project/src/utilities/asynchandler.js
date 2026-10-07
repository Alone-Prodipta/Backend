// const asynchandler = (fn) => async (req, res, next) => {
//   try {
//   } catch (err) {
//     res.status(err.code || 500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };
// export { asynchandler };







const asynchandler=(requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next))
    .catch((err)=> next(err));
    }
}
export {asynchandler};