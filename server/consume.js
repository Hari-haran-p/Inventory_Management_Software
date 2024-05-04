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


const getConsumeCardData = async function (req, res, next) {

    const user = req.params.id;
    try {
        const [
            scrapPendingResult,
            scrapApprovedResult,
            scrapAcknowledgedResult,
            scrapRejectedResult,
        ] = await Promise.all([
            db.query("SELECT * FROM consume_table_view WHERE (status = ? OR status = ?) AND user_id = ?", ["INITIATED", "CANCELED", user]),
            db.query("SELECT * FROM consume_table_view WHERE status = ? AND user_id = ?", ["APPROVED", user]),
            db.query("SELECT * FROM consume_table_view WHERE status = ? AND user_id = ?", ["ACKNOWLEDGED", user]),
            db.query("SELECT * FROM consume_table_view WHERE status = ? AND user_id = ?", ["REJECTED", user]),
        ]);

        res.status(200).json({
            pending: scrapPendingResult,
            approved: scrapApprovedResult,
            acknowledged: scrapAcknowledgedResult,
            rejected: scrapRejectedResult,
        });
    } catch (error) {
        console.error("Error executing the queries:", error);
        res.status(500).json({ error: "There was some error" });
    }
}

const consumeRequest = async function (req, res, next) {
console.log(req.body);
    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        const apex_no = req.body.items.apex_no;
        const stock_id = req.body.items.id;
        const consume_qty = req.body.items.required_stock;
        const user_id = req.body.user.user_id;
        const inventory_value = req.body.items.required_stock * (req.body.items.inventory_value / req.body.items.stock_qty);
        console.log("this is the inventory value : "+ inventory_value);
        const dept_id = req.body.items.dept_id;

        // console.log(req.body);
        // if (transfer_to.toUpperCase() == transfer_from.toUpperCase()) {
        //     res.status(500).json({ Data: "Requested lab cannot be your lab" });
        //     return;
        // }

        const transferResult = await new Promise((resolve, reject) => {
            connection.query("SELECT * FROM stocktable WHERE id = ?", [stock_id], async (error, result) => {
                if (error) {
                    await connection.rollback();
                    res.status(500).json({ "Data": "Some internal error" });
                    return;
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        })

        console.log(transferResult[0]);
        if (transferResult.length > 0 && transferResult[0].quantity >= consume_qty) {
            const insertResult = await new Promise((resolve, reject) => {
                connection.query("INSERT INTO consumetable (apex_no, stock_id, consume_qty, faculty_id, created_at, inventory_value, dept_id, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                    [apex_no, stock_id, consume_qty, user_id,null,  inventory_value, dept_id, "INITIATED"], async (error, result) => {
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


const getConsumeData = async function (req, res, next) {
    const id = req.params.id;
    db.query("SELECT * FROM consume_table_view WHERE dept_id = ? ORDER BY creayed_at DESC", [id])
        .then((response) => {
            if (response.length > 0) {
                res.status(200).json({ Data: response })
            } else {
                res.status(200).json({ Data: "No Data" });
            }
        })
        .catch((error) => res.status(500).json({ Data: "Some internal error" }));
}

const getAllConsumeData = async function (req, res, next) {
    db.query("SELECT * FROM scrap_table_view WHERE status = ?  ", ["INITIATED"])
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

const getTableConsumeData = async function (req, res, next) {
    db.query("SELECT * FROM consume_table_view")
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


const rejectConsumeRequest = async function (req, res, next) {

    db.query("UPDATE  consumetable SET status = ?, description = ?, approved_by = ? WHERE id = ?", ["REJECTED", req.body.rejectDesc, req.body.user_id, req.body.id])
        .then((response) => res.status(201).json({ "Data": "Rejected Sucessfully" })).catch((error) => res.status(500).json({ "Data": "Some Internal Error" }))

}


const acceptConsumeRequest = async function (req, res, next) {

    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        if (req.body.role == "slsincharge") {
            const fromDataResult = await new Promise((resolve, reject) => {
                connection.query("SELECT * FROM stocktable WHERE dept_id = ? AND id = ?", [req.body.req_labcode, req.body.stock_id], async (error, result) => {
                    if (error) {
                        await connection.rollback();
                        res.status(400).json({ "Data": "some Error" });
                        return;
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });

            if (fromDataResult.length > 0 && fromDataResult[0].stock_qty >= req.body.scrap_qty) {
                const stockMinus = fromDataResult[0].stock_qty - req.body.consume_qty;
                const inventoryMinus = fromDataResult[0].inventory_value - req.body.cost_per_item * req.body.consume_qty;

                const fromUpdateResult = await new Promise((resolve, reject) => {
                    connection.query("UPDATE stocktable SET stock_qty = ?, inventory_value = ? WHERE dept_id = ?  and item_code = ?",
                        [stockMinus, inventoryMinus, req.body.req_labcode.toUpperCase(), req.body.item_code],
                        async (error, result) => {
                            if (error) {
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

                    connection.query("UPDATE scraptable SET status = ?, approved_by = ? WHERE id = ?", ["APPROVED", req.body.user_id, req.body.id], async (error, result) => {
                        if (error) {
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

const cancelConsumeRequest = async function (req, res, next) {
    let connection;
    try {

        connection = await db.getConnection();
        await connection.beginTransaction();

        const selectResult = await new Promise((resolve, reject) => {
            connection.query("SELECT * FROM consumetable WHERE id = ? AND dept_id = ?", [req.body.consume_id, req.body.dept_id], async (error, result) => {
                if (error) {
                    await connection.rollback();
                    res.status(400).json({ "Data": "Some internal error" });
                    return;
                    reject(error);
                } else
                    resolve(result);
            })
        })

        if (selectResult.length > 0 && selectResult[0].dept_id == req.body.dept_id) {
            const updateResult = await new Promise((resolve, reject) => {
                connection.query("UPDATE consumetable SET status = ?, approved_by = ? WHERE id = ? AND dept_id = ? ",
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

const deleteConsumeRequest = async function (req, res, next) {

    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        const selectResult = await new Promise((resolve, reject) => {
            connection.query("SELECT * FROM consumetable WHERE id = ? AND dept_id = ?", [req.body.consume_id, req.body.dept_id], async (error, result) => {
                if (error) {
                    await connection.rollback();
                    res.status(400).json({ "Data": "Some internal error" });
                    return;
                    reject(error);
                } else
                    resolve(result);
            })
        })

        if (selectResult.length > 0 && selectResult[0].dept_id == req.body.dept_id && selectResult[0].status == "CANCELED") {
            const deleteResult = await new Promise((resolve, reject) => {
                connection.query("DELETE FROM consumetable WHERE id = ? AND dept_id = ? AND status = ?",
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
    consumeRequest: consumeRequest,
    getConsumeCardData:getConsumeCardData,  
    getConsumeData: getConsumeData,
    getAllConsumeData: getAllConsumeData,
    rejectConsumeRequest: rejectConsumeRequest,
    acceptConsumeRequest: acceptConsumeRequest,
    cancelConsumeRequest: cancelConsumeRequest,
    deleteConsumeRequest: deleteConsumeRequest,
    getTableConsumeData: getTableConsumeData,
}