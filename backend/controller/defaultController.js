

const defaultHandler = (req,res) =>{
    res.status(200).json({message:"Default route"})
}

module.exports = {defaultHandler}