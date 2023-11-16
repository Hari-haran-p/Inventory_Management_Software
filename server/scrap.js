const { response } = require("express");
const db = require("./database/db.js");


const scrapRequest = async function (req, res, next) {

    const formData = req.body.formData;
    const resultData = req.body.resultData[0];

    if (formData.stockReq > resultData.stock_qty) {
        res.status(500).json({ Data: "Check for entered stock quantity" });
        return;
    }

    db.query("INSERT INTO scraptable (item_code, manufacturer_id, supplier_id, scrap_qty, user_id, inventory_value, dept_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [formData.itemcode, resultData.manufacturer_id, resultData.supplier_id, formData.stockReq, req.body.user_id, formData.stockReq * resultData.cost_per_item, req.body.dept_id]
    ).then((response) => {
        res.status(200).json({ Data: "Request sucessfully Initiated" });
    }).catch((error) => {
        res.status(500).json({ Data: "Some internal Error" });
    })

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


    db.query("UPDATE  scraptable SET status = ?, reject_description = ?, updated_by= ? WHERE id = ?", ["REJECTED", req.body.rejectDesc, req.body.user_id, req.body.id])
        .then((response) => res.status(201).json({ "Data": "Rejected Sucessfully" })).catch((error) => res.status(500).json({ "Data": "Some Internal Error" }))

}


const acceptScrapRequest = async function (req, res, next) {

    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        if (req.body.role == "slsincharge") {
            const fromDataResult = await new Promise((resolve, reject) => {
                connection.query("SELECT * FROM stocktable WHERE dept_id = ? AND item_code = ?", [req.body.req_labcode, req.body.item_code], async (error, result) => {
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
                const stockMinus = fromDataResult[0].stock_qty - req.body.scrap_qty;
                const inventoryMinus = fromDataResult[0].inventory_value - req.body.cost_per_item * req.body.scrap_qty;

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

                    connection.query("UPDATE scraptable SET status = ?, updated_by= ? WHERE id = ?", ["APPROVED", req.body.user_id, req.body.id], async (error, result) => {
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

const cancelScrapRequest = async function (req, res, next) {
    let connection;
    try {

        connection = await db.getConnection();
        await connection.beginTransaction();

        const selectResult = await new Promise((resolve, reject) => {
            connection.query("SELECT * FROM scraptable WHERE id = ? AND dept_id = ?", [req.body.scrap_id, req.body.dept_id], async (error, result) => {
                if (error) {
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
                connection.query("UPDATE scraptable SET status = ?, updated_by = ? WHERE id = ? AND dept_id = ? ",
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