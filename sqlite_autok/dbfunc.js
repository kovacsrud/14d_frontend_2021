module.exports.db_all=function(db){
    return new Promise((reject,resolve)=>{
        db.all("select * from autok",(error,rows)=>{
            if(error){
                reject("Error:"+error);
            }
            else {
                resolve(rows);
            }

        });
    });
}