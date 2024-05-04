const { response } = require("express");
const db = require("./database/db.js");


// const scrapRequest = async function (req, res, next) {

//     const formData = req.body.formData;
//     const resultData = req.body.resultData[0];

//     if (formData.stockReq > resultData.stock_qty) {
//         res.status(500).json({ Data: "Check for entered stock quantity" });
//         return;
//     }

//     db.query("INSERT INTO scraptable (item_code, manufacturer_id, supplier_id, scrap_qty, user_id, inventory_value, dept_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
//         [formData.itemcode, resultData.manufacturer_id, resultData.supplier_id, formData.stockReq, req.body.user_id, formData.stockReq * resultData.cost_per_item, req.body.dept_id]
//     ).then((response) => {
//         res.status(200).json({ Data: "Request sucessfully Initiated" });
//     }).catch((error) => {
//         res.status(500).json({ Data: "Some internal Error" });
//     })

// }

const scrapRequest = async function (req, res, next) {  
    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        const apex_no = req.body.items.apex_no;
        const item_code = req.body.items.id;
        const manufacturer_id = req.body.items.manufacturer_id;
        const supplier_id = req.body.items.supplier_id;
        const scrap_qty = req.body.items.required_stock;
        const user_id = req.body.user.user_id;
        const inventory_value = Math.round((req.body.items.inventory_value / req.body.items.stock_qty) * (scrap_qty));
        const dept_id = req.body.items.dept_id;

        // console.log(req.body);
        // if (transfer_to.toUpperCase() == transfer_from.toUpperCase()) {
        //     res.status(500).json({ Data: "Requested lab cannot be your lab" });
        //     return;
        // }

        const transferResult = await new Promise((resolve, reject) => {
            connection.query("SELECT * FROM stocktable WHERE apexno = ? AND id = ? AND dept_id = ? ", [apex_no, item_code, dept_id], async (error, result) => {
                if (error) {
                    console.log(error);
                    await connection.rollback();
                    res.status(500).json({ "Data": "Some internal error" });
                    return;
                    reject(error);
                } else {

                    resolve(result);
                }
            });
        })

        if (transferResult.length > 0 && transferResult[0].quantity >= scrap_qty) {
            const insertResult = await new Promise((resolve, reject) => {
                connection.query("INSERT INTO scraptable (apex_no, stock_id, scrap_qty, faculty_id, inventory_value, dept_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    [apex_no, item_code, scrap_qty, user_id, inventory_value, dept_id, "PENDING"], async (error, result) => {
                        if (error) {
                            console.log(error);
                            await connection.rollback();
                            res.status(400).json({ "Data": "Some Internal Error" });
                            return;
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    })
            })
        } else {
            res.status(400).json({ "Data": "Stock quantity not available" });
            return;
        }

        await connection.commit();
        res.status(200).json({ "Data": "Request raised sucessfully" });
        return;

    } catch (error) {
        if (connection)
            await connection.rollback()
    } finally {
        if (connection)
            connection.release();

    }

}


const getScrapData = async function (req, res, next) {
    const id = req.params.id;
    db.query("SELECT * FROM scrap_table_view WHERE req_labcode = ? ORDER BY date DESC", [id])
        .then((response) => {
            if (response.length > 0) {
                res.status(200).json({ Data: response })
            } else {
                res.status(200).json({ Data: "No Data" });
            }
        })
        .catch((error) => res.status(500).json({ Data: "Some internal error" }));
}

const getAllScrapData = async function (req, res, next) {
    db.query("SELECT * FROM scrap_table_view WHERE status = ?  ", ["PENDING"])
        .then((response) => {
            if (response.length > 0) {
                res.status(200).json({ Data: response });
            } else {
                res.status(200).json({ "Data": "No Data" })
            }
        })
        .catch((error) => {
            res.send(error)
        });
}

const getTableScrapData = async function (req, res, next) {
    db.query("SELECT * FROM scrap_table_view")
        .then((response) => {
            if (response.length > 0) {
                res.status(200).json({ Data: response });
                return;
            } else {
                res.status(200).json({ Data: "No Data" });
                return;
            }
        }).catch((error) => {
            res.status(500).json({ Data: "Some Internal Error" });
        })
}


const rejectScrapRequest = async function (req, res, next) {



    db.query("UPDATE  scraptable SET status = ?, description = ?, approved_by = ? WHERE id = ?", ["REJECTED", req.body.rejectDesc, req.body.user_id, req.body.id])
        .then((response) => res.status(201).json({ "Data": "Rejected Sucessfully" })).catch((error) => res.status(500).json({ "Data": "Some Internal Error" }))

}


const acceptScrapRequest = async function (req, res, next) {
   
    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        if (req.body.role == "slsincharge") {
            const fromDataResult = await new Promise((resolve, reject) => {
                connection.query("SELECT * FROM stocktable WHERE dept_id = ? AND id = ?", [req.body.req_labcode, req.body.stock_id], async (error, result) => {
                    if (error) {
                        console.log(error);
                        await connection.rollback();
                        res.status(400).json({ "Data": "some Error" });
                        return;
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });

            if (fromDataResult.length > 0 && fromDataResult[0].quantity >= req.body.scrap_qty) {
                const stockMinus = fromDataResult[0].quantity - req.body.scrap_qty;
                const inventoryMinus = fromDataResult[0].cost - req.body.inventory_value;

                const fromUpdateResult = await new Promise((resolve, reject) => {
                    connection.query("UPDATE stocktable SET quantity = ?, cost = ? WHERE dept_id = ?  and id = ?",
                        [stockMinus, inventoryMinus, req.body.req_labcode.toUpperCase(), req.body.stock_id],
                        async (error, result) => {
                            if (error) {
                                console.log(error);
                                await connection.rollback();
                                res.status(400).json({ "Data": "some Error" });
                                return;
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        });
                });


                const UpdateResult = await new Promise((resolve, reject) => {

                    connection.query("UPDATE scraptable SET status = ?, approved_by= ? WHERE id = ?", ["APPROVED", req.body.user_id, req.body.id], async (error, result) => {
                        if (error) {
                            console.log(error);
                            await connection.rollback();
                            res.status(500).json({ "Data": "some Error" });
                            return;
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    })
                });
                res.status(201).json({ "Data": "Approved Successfully" })
                await connection.commit();
            } else {
                await connection.rollback();
                res.status(500).json({ "Data": "Stock Not Found" });
            }
        }

    } catch (error) {
        if (connection) {
            await connection.rollback();
        }
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

const cancelScrapRequest = async function (req, res, next) {

    let connection;
    try {

        connection = await db.getConnection();
        await connection.beginTransaction();

        const selectResult = await new Promise((resolve, reject) => {
            connection.query("SELECT * FROM scraptable WHERE id = ? AND dept_id = ?", [req.body.scrap_id, req.body.dept_id], async (error, result) => {
                if (error) {
                    console.log(error);
                    await connection.rollback();
                    res.status(400).json({ "Data": "Seome internal error" });
                    return;
                    reject(error);
                } else
                    resolve(result);
            })
        })
        
        if (selectResult.length > 0 && selectResult[0].dept_id == req.body.dept_id) {
            
            const updateResult = await new Promise((resolve, reject) => {
                connection.query("UPDATE scraptable SET status = ?, approved_by = ? WHERE id = ? AND dept_id = ? ",
                    ["CANCELED", req.body.user_id, req.body.scrap_id, req.body.dept_id],
                    async (error, result) => {
                        if (error) {
                            
                            await connection.rollback();
                            res.status(400).json({ "Data": "Some Internal error" });
                            reject(error)
                        } else
                            resolve(result);
                    })
            })

            await connection.commit();
            res.status(200).json({ "Data": "Canceled sucessfully" });

        } else {
            res.status(400).json({ "Data": "Some Internal Error" });
            return;
        }

    } catch (error) {
        if (connection)
            connection.rollback();
    } finally {
        if (connection)
            connection.release();
    }
}


const deleteScrapRequest = async function (req, res, next) {

    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        const selectResult = await new Promise((resolve, reject) => {
            connection.query("SELECT * FROM scraptable WHERE id = ? AND dept_id = ?", [req.body.scrap_id, req.body.dept_id], async (error, result) => {
                if (error) {
                    await connection.rollback();
                    res.status(400).json({ "Data": "Some internal error" });
                    return;
                    reject(error);
                } else
                    resolve(result);
            })
        })

        console.log(selectResult);
        console.log(req.body);
     
        if (selectResult.length > 0 && selectResult[0].dept_id == req.body.dept_id && selectResult[0].status == "CANCELED") {
            
            const deleteResult = await new Promise((resolve, reject) => {
                connection.query("DELETE FROM scraptable WHERE id = ? AND dept_id = ? AND status = ?",
                    [req.body.scrap_id, req.body.dept_id, "CANCELED"],
                    async (error, result) => {
                        if (error) {
                            console.log(error)
                            await connection.rollback();
                            res.status(400).json({ "Data": "Some Internal error" });
                            reject(error)
                        } else
                            resolve(result);
                    })
            })
            await connection.commit();
            res.status(200).json({ "Data": "Deleted sucessfully" });

        } else {
            res.status(400).json({ "Data": "Some Internal Error" });
            return;
        }
    } catch (error) {
        if (connection)
            connection.rollback();
    } finally {
        if (connection)
            connection.release();
    }
}

module.exports = {
    scrapRequest: scrapRequest,
    getScrapData: getScrapData,
    getAllScrapData: getAllScrapData,
    rejectScrapRequest: rejectScrapRequest,
    acceptScrapRequest: acceptScrapRequest,
    cancelScrapRequest: cancelScrapRequest,
    deleteScrapRequest: deleteScrapRequest,
    getTableScrapData: getTableScrapData,
}