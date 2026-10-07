import {asynchandler} from "../utilities/asynchandler.js";
const registerUser= asynchandler (async (req, res)=>{
    res.status(200).json({
        message: "Hey! whats up?",
    })
})
export default registerUser;