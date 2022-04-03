// permittedRoles = ["seller", "admin"]

const authorise = (permittedRoles) => {
     
    return (req,res,next) => {
        // getting the user;
        // const user = req.user
        let isPermitted = false;
        permittedRoles.map(role => {
            if(req.user.role.includes(role)){
                isPermitted = true;
            }
        })

        // if permitted, he can go ahead
          if(isPermitted){
              return next()
          }
          else{
              return res.status(401).send({message : "You are not authorised to perform this operation"})
          }
      }

}


module.exports = authorise