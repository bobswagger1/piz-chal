const errorHandler =(error) =>{
  
    if(error.response) return error.response.data
     
    return {
        status: error.status || 400,
        Error: error.message || 'Server Error!'
    }
}

module.exports = errorHandler