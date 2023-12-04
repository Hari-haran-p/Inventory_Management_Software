const db = require("./database/db.js");


const getTransferData = function (req, res, next) {

    const user_dept = req.body.dept_code;
    if (req.body.role == 'slbincharge') {
        db.query("SELECT * FROM transfer_request_merged_view WHERE transfered_from = ? AND status = ? ", [user_dept, "PENDING"])
            .catch((error) => res.status(500).json({ error: "There was some Error" }))
            .then((response) => {
                if (response.length > 0) {
                    res.status(200).json({ data: response })
                } else {
                    res.status(200).json({ data: "No Data" })
                }
            })
    } else if (req.body.role == 'slsincharge') {
        db.query("SELECT * FROM transfer_request_merged_view WHERE status = ?", ["LABAPPROVED"])
            .catch((error) => res.status(500).json({ error: "There was some Error" }))
            .then((response) => {
                if (response.length > 0) {
                    res.status(200).json({ data: response })
                } else {
                    res.status(200).json({ data: "No Data" })
                }
            })
    }

}


const transferRequest = async function (req, res, next) {

    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        const item_code = req.body.resData.itemcode;
        const manufacturer_id = req.body.resData.manufacturerId;
        const supplier_id = req.body.resData.supplierId;
        const transfer_qty = req.body.resData.stockReq;
        const transfer_to = req.body.resData.reqLabId;
        const transfer_from = req.body.resData.fromLabId;
        const user_id = req.body.resData.user_id;

        if(transfer_to.toUpperCase() == transfer_from.toUpperCase()){
            res.status(500).json({Data: "Requested lab cannot be your lab"});
            return;
        }

        const transferResult = await new Promise((resolve, reject) => {
            connection.query("SELECT * FROM admin_stock_view WHERE item_code = ? AND dept_id = ? ", [item_code, transfer_from], async (error, result) => {
                if (error) {
                    await connection.rollback();
                    res.status(500).json({ "Data": "Some internal error" });
                    return;
                    reject(error);
                } else
                    resolve(result);
            });
        })

        if (transferResult.length > 0 && transferResult[0].stock_qty >= transfer_qty) {
            const insertResult = await new Promise((resolve, reject) => {
                connection.query("INSERT INTO transfertable (item_code, manufacturer_id, supplier_id, transfer_qty, transfer_to, transfered_from, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    [item_code, manufacturer_id, supplier_id, transfer_qty, transfer_to, transfer_from, user_id], async (error, result) => {
                        if (error) {
                            await connection.rollback();

                            res.status(400).json({ "Data": "Stock quantity not available" });
                            return;
                            reject(error);
                        } else
                            resolve(result);
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

const cancelTransferRequest = async function (req, res, next) {

    let connection;
    try {

        connection = await db.getConnection();
        await connection.beginTransaction();

        const selectResult = await new Promise((resolve, reject) => {
            connection.query("SELECT * FROM transfertable WHERE id = ? AND transfer_to = ?", [req.body.transfer_id, req.body.dept_id], async (error, result) => {
                if (error) {
                    await connection.rollback();
                    res.status(400).json({ "Data": "Seome internal error" });
                    return;
                    reject(error);
                } else
                    resolve(result);
            })
        })

        if (selectResult.length > 0 && selectResult[0].transfer_to == req.body.dept_id) {
            const updateResult = await new Promise((resolve, reject) => {
                connection.query("UPDATE transfertable SET status = ? WHERE id = ? AND transfer_to = ? ",
                    ["CANCELED", req.body.transfer_id, req.body.dept_id],
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

const deleteTransferRequest = async function (req, res, next) {
    let connection;
    try {

        connection = await db.getConnection();
        await connection.beginTransaction();

        const selectResult = await new Promise((resolve, reject) => {
            connection.query("SELECT * FROM transfertable WHERE id = ? AND transfer_to = ?", [req.body.transfer_id, req.body.dept_id], async(error, result) => {
                if (error) {
                    await connection.rollback();
                    res.status(400).json({ "Data": "Seome internal error" });
                    return;
                    reject(error);
                } else
                    resolve(result);
            })
        })

        if (selectResult.length > 0 && selectResult[0].transfer_to == req.body.dept_id && selectResult[0].status == "CANCELED") {
            const deleteResult = await new Promise((resolve, reject) => {
                connection.query("DELETE FROM transfertable WHERE id = ? AND transfer_to = ? AND status = ?",
                    [req.body.transfer_id, req.body.dept_id, "CANCELED"],
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



const acceptRequest = async function (req, res, next) {
    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        if (req.body.role == 'slbincharge') {
            const result1 = await new Promise((resolve, reject) => {
                connection.query("UPDATE transfertable SET status = ? WHERE id = ?", ["LABAPPROVED", req.body.id], async (error, result) => {
                    if (error) {
                        await connection.rollback();
                        res.status(400).json({ "data": "some Error" });
                        return;
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });


        } else if (req.body.role == "slsincharge") {
            const fromDataResult = await new Promise((resolve, reject) => {
                connection.query("SELECT * FROM admin_stock_view WHERE dept_id = ? AND item_code = ?", [req.body.transfered_from, req.body.item_code], async (error, result) => {
                    if (error) {
                        await connection.rollback();
                        res.status(400).json({ "data": "some Error" });
                        return;
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });

            if (fromDataResult.length > 0 && fromDataResult[0].stock_qty >= req.body.transfer_qty) {
                const stockMinus = fromDataResult[0].stock_qty - req.body.transfer_qty;
                const inventoryMinus = fromDataResult[0].inventory_value - req.body.cost_per_item * req.body.transfer_qty;

                const fromUpdateResult = await new Promise((resolve, reject) => {
                    connection.query("UPDATE stocktable SET stock_qty = ?, inventory_value = ? WHERE dept_id = ?  and item_code = ?",
                        [stockMinus, inventoryMinus, req.body.transfered_from.toUpperCase(), req.body.item_code],
                        async (error, result) => {
                            if (error) {
                                await connection.rollback();
                                res.status(400).json({ "data": "some Error" });
                                return;
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        });
                });
            } else {
                res.status(500).json({ "Data": "Stock Quantity not available" })
                return;
            }

            const toDataResult = await new Promise((resolve, reject) => {
                connection.query("SELECT * FROM admin_stock_view WHERE dept_id = ? AND item_code = ?", [req.body.transfer_to, req.body.item_code], async (error, result) => {
                    if (error) {
                        await connection.rollback();
                        res.status(400).json({ "data": "some Error" });
                        return;
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });

            if (toDataResult.length > 0) {
                const stockAdd = req.body.transfer_qty + toDataResult[0].stock_qty;
                const inventoryAdd = toDataResult[0].inventory_value + req.body.transfer_qty * req.body.cost_per_item;

                const toUpdateResult = await new Promise((resolve, reject) => {
                    connection.query("UPDATE stocktable SET stock_qty = ?, inventory_value = ? WHERE dept_id = ? AND item_code = ? ",
                        [stockAdd, inventoryAdd, req.body.transfer_to.toUpperCase(), req.body.item_code], async (error, result) => {
                            if (error) {
                                await connection.rollback();
                                res.status(400).json({ "data": "some Error" });
                                return;
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        });
                });
            }else {
                const item_code = req.body.item_code;
                const manufacturer_id = req.body.manufacturer_id;
                const supplier_id = req.body.supplier_id;
                const stockAdd = req.body.transfer_qty;
                const inventoryAdd = req.body.transfer_qty * req.body.cost_per_item;
                const user_id = req.body.user_id;
                const dept_id = req.body.transfer_to;
                const currDate = new Date();
                const apex_no = fromDataResult[0].apex_no;

                const toInsertResult = await new Promise((resolve, reject) => {
                    connection.query("INSERT INTO  stocktable  (apex_no, item_code, manufacturer_id, supplier_id,  stock_qty , inventory_value, user_id, dept_id, created_at ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                        [apex_no, item_code, manufacturer_id, supplier_id, stockAdd, inventoryAdd, user_id, dept_id, currDate.toISOString().split("T")[0] ], async (error, result) => {
                            if (error) {
                                await connection.rollback()
                                res.status(400).json({ "data": "Some error" });
                                return;
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        });
                });
            }

            const transferUpdateResult = await new Promise((resolve, reject) => {
                connection.query("UPDATE transfertable SET status = ? WHERE id = ?", ["APPROVED", req.body.id], async (error, result) => {
                    if (error) {
                        await connection.rollback();
                        res.status(400).json({ "data": "Some Error" });
                        return;
                        reject(error);
                    } else
                        resolve(result);
                })
            })
        }

        res.status(201).send({ "Data": "AcceptedSucessfully" });
        await connection.commit();

    } catch (error) {
        if (connection) {
            await connection.rollback();
        }
    } finally {
        if (connection) {
            connection.release();
        }
    }
};


const rejectRequest = async function (req, res, next) {
    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        const updateResult = await new Promise((resolve, reject) => {
            connection.query("UPDATE transfertable SET status = ?, reject_description = ?   WHERE id = ?", ["REJECTED", req.body.rejectDesc, req.body.id], async (error, result) => {
                if (error) {
                    await connection.rollback();
                    res.status(500).json({ "Data": "Some Internal Error" });    
                    return;
                    reject(error);
                } else
                    resolve(result);
            })
        })

        await connection.commit();
        res.status(201).json({ "Data": "Rejected Sucessfully" });

    } catch (error) {
        if (connection)
            await connection.rollback();
    } finally {
        if (connection)
            connection.release();
    }
}


module.exports = {
    getTransferData: getTransferData,
    transferRequest: transferRequest,
    acceptRequest: acceptRequest,
    rejectRequest: rejectRequest,
    cancelTransferRequest: cancelTransferRequest,
    deleteTransferRequest: deleteTransferRequest
}