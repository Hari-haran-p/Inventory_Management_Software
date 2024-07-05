const { response } = require("express");
const db = require("./database/db.js");

const getConsumeCardData = async function (req, res, next) {
    const user = req.params.id;
    try {
        const [
            scrapPendingResult,
            scrapApprovedResult,
            scrapRejectedResult,
        ] = await Promise.all([
            db.query("SELECT * FROM consume_table_view WHERE (status = ? OR status = ?) AND user_id = ?", ["INITIATED", "CANCELLED", user]),
            db.query("SELECT * FROM consume_table_view WHERE status = ? AND user_id = ?", ["APPROVED", user]),
            // db.query("SELECT * FROM consume_table_view WHERE status = ? AND user_id = ?", ["ACKNOWLEDGED", user]),
            db.query("SELECT * FROM consume_table_view WHERE status = ? AND user_id = ?", ["REJECTED", user]),
        ]);
        res.status(200).json({
            pending: scrapPendingResult,
            approved: scrapApprovedResult,
            rejected: scrapRejectedResult,
        });
    } catch (error) {
        console.error("Error executing the queries:", error);
        res.status(500).json({ error: "There was some error" });
    }
}

const consumeRequest = async function (req, res, next) {
    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        const apex_no = req.body.items.apex_no;
        const stock_id = req.body.items.id;
        const consume_qty = req.body.items.required_stock;
        const user_id = req.body.user.user_id;
        const inventory_value = req.body.items.required_stock * (req.body.items.inventory_value / req.body.items.stock_qty);
        const dept_id = req.body.items.dept_id;

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

        if (transferResult.length > 0 && transferResult[0].quantity >= consume_qty) {
            const insertResult = await new Promise((resolve, reject) => {
                connection.query("INSERT INTO consumetable (apex_no, stock_id, consume_qty, faculty_id, created_at, inventory_value, dept_id, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                    [apex_no, stock_id, consume_qty, user_id, null, inventory_value, dept_id, "INITIATED"], async (error, result) => {
                        if (error) {
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
    db.query("SELECT * FROM consume_table_view WHERE req_labcode = ? ORDER BY date DESC", [id])
        .then((response) => {
            if (response.length > 0) {
                res.status(200).json({ Data: response })
            } else {
                res.status(200).json({ Data: "No Data" });
            }
        })
        .catch((error) => {
            res.status(500).json({ Data: "Some internal error" })
        });
}

const getAllConsumeData = async function (req, res, next) {
    db.query("SELECT * FROM consume_table_view WHERE status = ?  ORDER BY date ASC", ["INITIATED"])
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
    db.query("SELECT * FROM consume_table_view ORDER BY date DESC")
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

const getRequestTableData = async function (req, res, next) {
    db.query("SELECT * FROM admin_stock_view WHERE dept_id = ?", [req.params.id])
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

        if (req.body.role != "slsincharge") {
            await connection.rollback();
            return res.status(500).json({ "Data": "Not Authorized" });
        }

        const fromDataResult = await new Promise((resolve, reject) => {
            connection.query("SELECT * FROM stocktable WHERE id = ?", [req.body.stock_id], async (error, result) => {
                if (error) {
                    await connection.rollback();
                    return res.status(400).json({ "Data": "some Error" });
                } else {
                    resolve(result);
                }
            });
        });

        if (!(fromDataResult.length > 0 && fromDataResult[0].quantity >= req.body.consume_qty)) {
            await connection.rollback();
            return res.status(500).json({ "Data": "Stock Not Found" });
        }

        const stockMinus = fromDataResult[0].quantity - req.body.consume_qty;
        const inventoryMinus = fromDataResult[0].cost - req.body.inventory_value;

        const fromUpdateResult = await new Promise((resolve, reject) => {
            connection.query("UPDATE stocktable SET quantity = ?, cost = ? WHERE id = ?",
                [stockMinus, inventoryMinus, req.body.stock_id],
                async (error, result) => {
                    if (error) {
                        await connection.rollback();
                        return res.status(400).json({ "Data": "some Error" });
                    } else {
                        resolve(result);
                    }
                });
        });

        const UpdateResult = await new Promise((resolve, reject) => {
            connection.query("UPDATE consumetable SET status = ?, approved_by = ? WHERE id = ?", ["APPROVED", req.body.user_id, req.body.id], async (error, result) => {
                if (error) {
                    await connection.rollback();
                    return res.status(500).json({ "Data": "some Error" });
                } else {
                    resolve(result);
                }
            })
        });

        res.status(201).json({ "Data": "Approved Successfully" })
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
}

const cancelConsumeRequest = async function (req, res, next) {
    let connection;
    try {

        connection = await db.getConnection();
        await connection.beginTransaction();

        const selectResult = await new Promise((resolve, reject) => {
            connection.query("SELECT * FROM consumetable WHERE id = ?", [req.body.consume_id], async (error, result) => {
                if (error) {
                    await connection.rollback();
                    res.status(400).json({ "Data": "Some internal error" });
                    return;
                } else
                    resolve(result);
            })
        })

        if (selectResult.length > 0 && selectResult[0].dept_id == req.body.dept_id) {
            const updateResult = await new Promise((resolve, reject) => {
                connection.query("UPDATE consumetable SET status = ?, approved_by = ? WHERE id = ?",
                    ["CANCELLED", req.body.user_id, req.body.consume_id],
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
            res.status(200).json({ success: true, "Data": "Canceled sucessfully" });

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
            connection.query("SELECT * FROM consumetable WHERE id = ?", [req.body.consume_id], async (error, result) => {
                if (error) {
                    await connection.rollback();
                    res.status(400).json({ "Data": "Some internal error" });
                    return;
                } else
                    resolve(result);
            })
        })

        if (selectResult.length > 0 && selectResult[0].dept_id == req.body.dept_id && selectResult[0].status == "CANCELLED") {
            const deleteResult = await new Promise((resolve, reject) => {
                connection.query("DELETE FROM consumetable WHERE id = ? AND status = ?",
                    [req.body.consume_id, "CANCELLED"],
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

module.exports = {
    consumeRequest: consumeRequest,
    getConsumeCardData: getConsumeCardData,
    getConsumeData: getConsumeData,
    getRequestTableData: getRequestTableData,
    getAllConsumeData: getAllConsumeData,
    rejectConsumeRequest: rejectConsumeRequest,
    acceptConsumeRequest: acceptConsumeRequest,
    cancelConsumeRequest: cancelConsumeRequest,
    deleteConsumeRequest: deleteConsumeRequest,
    getTableConsumeData: getTableConsumeData,
}