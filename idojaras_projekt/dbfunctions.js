module.exports.mindenAdat=function(db){
    return new Promise((reject,resolve)=>{
        db.all("select * from idojarasadatok",(error,rows)=>{
            if(error){
                reject(error);
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports.getEv=function(db,ev){
    return new Promise((reject,resolve)=>{
        db.all(
            "select * from idojarasadatok where ev=?",
            [ev],
            (error,rows)=>{
                if(error){
                    reject(error);
                } else {
                    resolve(rows);
                }

            });

    });
}

module.exports.getNap=function(db,ev,honap,nap){
    return new Promise((reject,resolve)=>{
        db.all(
            "select * from idojarasadatok where ev=? and honap=? and nap=?",
            [ev,honap,nap],
            (error,rows)=>{
                if(error) {
                    reject(error);
                } else {
                    resolve(rows);
                }

            }
            );

    });
}