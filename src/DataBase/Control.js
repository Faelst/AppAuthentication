
const con = require('./Connection')

const select = async (sqlQuery , callback) => {   
    con.query(sqlQuery, (error, res) => {
        if (error) throw error;
        callback(null , res)
    });
    
}

module.exports = { select }
