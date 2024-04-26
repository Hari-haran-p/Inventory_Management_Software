const db = require("./database/db.js");


const getTransferData = function (req, res, next) {

    const user_dept = req.body.dept_code;

    if (req.body.role == 'slbincharge') {
        db.query("SELECT * FROM transferview WHERE transfered_from = ? AND current_status = ?", [user_dept, "INITIATED"])
            .catch((error) => { return res.status(500).json({ error: "There was some Error" }) })
            .then((response) => {
                if (response.length > 0) {
                    return res.status(200).json({ data: response })
                } else {
                    return res.status(200).json({ data: "No Data" })
                }
            })
    } else if (req.body.role == 'slsincharge' && user_dept == "SLBS") {
        db.query("SELECT * FROM transferview WHERE (current_status = ?) OR (current_status = ? AND transfered_from = ? )", ["LABAPPROVED", "INITIATED",  "SLBS"])
            .catch((error) => { return res.status(500).json({ error: "There was some Error" }) })
            .then((response) => {
                // console.log("from now : ", response);
                if (response.length > 0) {
                    return res.status(200).json({ data: response })
                } else {
                    return res.status(200).json({ data: "No Data" })
                }
            })
    }
}

// const transferRequest = async function (req, res, next) {

//     let connection;
//     try {
//         connection = await db.getConnection();
//         await connection.beginTransaction();
//         const apex_no = req.body.resData.apex_no;
//         const item_code = req.body.resData.itemcode;
//         const manufacturer_id = req.body.resData.manufacturerId;
//         const supplier_id = req.body.resData.supplierId;
//         const transfer_qty = req.body.resData.stockReq;
//         const transfer_to = req.body.resData.reqLabId;
//         const transfer_from = req.body.resData.fromLabId;
//         const user_id = req.body.resData.user_id;

//         if (transfer_to.toUpperCase() == transfer_from.toUpperCase()) {
//             res.status(500).json({ Data: "Requested lab cannot be your lab" });
//             return;
//         }

//         const transferResult = await new Promise((resolve, reject) => {
//             connection.query("SELECT * FROM admin_stock_view WHERE item_code = ? AND dept_id = ? ", [item_code, transfer_from], async (error, result) => {
//                 if (error) {
//                     await connection.rollback();
//                     res.status(500).json({ "Data": "Some internal error" });
//                     return;
//                     reject(error);
//                 } else
//                     resolve(result);
//             });
//         })
//         // if (transferResult.length > 0 && transferResult[0].stock_qty >= transfer_qty) {
//         const insertResult = await new Promise((resolve, reject) => {
//             connection.query("INSERT INTO transfertable (apex_no, item_code, manufacturer_id, supplier_id, transfer_qty, transfer_to, transfered_from, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
//                 ["APX001", item_code, manufacturer_id, supplier_id, transfer_qty, transfer_to, transfer_from, user_id], async (error, result) => {
//                     if (error) {
//                         await connection.rollback();

//                         res.status(400).json({ "Data": "Stock quantity not available" });
//                         return;
//                         reject(error);
//                     } else
//                         resolve(result);
//                 })
//         })

//         // } else {
//         //     res.status(400).json({ "Data": "Stock quantity not available" });
//         //     return;
//         // }
//         await connection.commit();
//         res.status(200).json({ "Data": "Request raised sucessfully" });
//         return;

//     } catch (error) {
//         if (connection)
//             await connection.rollback()
//     } finally {
//         if (connection)
//             connection.release();
//     }
// }

const transferRequest = async function (req, res, next) {
    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        const item_code = req.body.items.id;
        const manufacturer_id = req.body.items.manufacturer_id;
        const supplier_id = req.body.items.supplier_id;
        const apex_no = req.body.items.apex_no;
        const transfer_from = req.body.items.dept_id;
        const transfer_qty = req.body.items.required_stock;
        const transfer_to = req.body.user_id.dept_code;
        const user_id = req.body.user_id.user_id;


        if (transfer_to.toUpperCase() == transfer_from.toUpperCase()) {
            return res.status(500).json({ Data: "Requested lab cannot be your lab" });

        }

        const transferResult = await new Promise((resolve, reject) => {
            connection.query("SELECT * FROM admin_stock_view WHERE id = ? AND dept_id = ? ", [item_code, transfer_from], async (error, result) => {
                if (error) {
                    await connection.rollback();
                    return res.status(500).json({ "Data": "Some internal error" });
                    reject(error);
                } else
                    resolve(result);
            });
        })
        const transferResult2 = await new Promise((resolve, reject) => {
            connection.query("SELECT SUM(transfer_qty) as transfer FROM transfertable WHERE stock_id = ? AND status != ?", [item_code, "ACKNOWLEDGED"], async (error, result) => {
                if (error) {
                    await connection.rollback();
                    return res.status(500).json({ "Data": "Some internal error" });
                    reject(error);

                } else
                    resolve(result);
            });
        })

        if (transferResult2.length > 0) {
            const transfer = parseInt(transferResult2[0].transfer) + parseInt(transfer_qty);
            if (transfer > transferResult[0].stock_qty) {
                return res.status(500).json({ "Data": "The requested item is in progress" });
            }
        }

        if (transferResult.length > 0 && parseInt(transferResult[0].stock_qty) >= transfer_qty) {
            const insertResult = await new Promise((resolve, reject) => {
                connection.query("INSERT INTO transfertable (apex_no, stock_id , transfer_qty, transfer_to, transfered_from ,faculty_id) VALUES ( ?, ?, ?, ?, ?, ?)",
                    [apex_no, item_code, transfer_qty, transfer_to, transfer_from, user_id], async (error, result) => {
                        if (error) {
                            await connection.rollback();
                            return res.status(400).json({ "Data": "Stock quantity not available" });

                            reject(error);
                        } else
                            resolve(result);
                    })
            })

        } else {
            return res.status(400).json({ "Data": "Stock quantity not available" });

        }
        await connection.commit();
        return res.status(200).json({ "Data": "Request raised sucessfully" });
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
        console.log(req.body);
        connection = await db.getConnection();
        await connection.beginTransaction();

        const selectResult = await new Promise((resolve, reject) => {
            connection.query("SELECT * FROM transfertable WHERE id = ? AND transfer_to = ?", [req.body.transfer_id, req.body.dept_id], async (error, result) => {
                if (error) {
                    await connection.rollback();
                    return res.status(400).json({ "Data": "Seome internal error" });
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

                            return res.status(400).json({ "Data": "Some Internal error" });

                            reject(error)
                        } else
                            resolve(result);
                    })
            })

            await connection.commit();
            return res.status(200).json({ "Data": "Canceled sucessfully" });
        } else {
            return res.status(400).json({ "Data": "Some Internal Error" });
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
            connection.query("SELECT * FROM transfertable WHERE id = ? AND transfer_to = ?", [req.body.transfer_id, req.body.dept_id], async (error, result) => {
                if (error) {
                    await connection.rollback();
                    return res.status(400).json({ "Data": "Seome internal error" });
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
                            return res.status(400).json({ "Data": "Some Internal error" });
                            reject(error)
                        } else
                            resolve(result);
                    })
            })

            await connection.commit();
            return res.status(200).json({ "Data": "Deleted sucessfully" });

        } else {
            return res.status(400).json({ "Data": "Some Internal Error" });
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
    // console.log(req.body);
    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        if (req.body.role == 'slbincharge' && req.body.current_status == "INITIATED") {
            const result1 = await new Promise((resolve, reject) => {
                connection.query("UPDATE transfertable SET status = ? WHERE id = ?", ["LABAPPROVED", req.body.transfer_id], async (error, result) => {
                    if (error) {
                        await connection.rollback();
                        return res.status(400).json({ "data": "some Error" });
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });

            const result2 = await new Promise((resolve, reject) => {
                connection.query("INSERT INTO transferlogs SET transfer_id = ? ,approval_status = ?, approved_by = ?", [req.body.transfer_id, "LABAPPROVED", req.body.faculty_id], async (error, result) => {
                    if (error) {
                        await connection.rollback();
                        return res.status(400).json({ "data": "some Error" });
                        reject(error);
                    } else {
                        resolve(result);
                    }
                })
            })

        } else if (req.body.role == "slsincharge" && (req.body.current_status == "LABAPPROVED" || req.body.current_status == "INITIATED")) {
            const result1 = await new Promise((resolve, reject) => {
                connection.query("UPDATE transfertable SET status = ? WHERE id = ?", ["STORESAPPROVED", req.body.transfer_id], async (error, result) => {
                    if (error) {
                        await connection.rollback();
                        return res.status(400).json({ "data": "some Error" });
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
            if (req.body.current_status == "INITIATED") {
                const result2 = await new Promise((resolve, reject) => {
                    connection.query("INSERT INTO transferlogs SET transfer_id = ? ,approval_status = ?, approved_by = ?", [req.body.transfer_id, "LABAPPROVED", req.body.faculty_id], async (error, result) => {
                        if (error) {
                            await connection.rollback();
                            return res.status(400).json({ "data": "some Error" });
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    })
                })
                const result3 = await new Promise((resolve, reject) => {
                    connection.query("INSERT INTO transferlogs SET transfer_id = ? ,approval_status = ?, approved_by = ?", [req.body.transfer_id, "STORESAPPROVED", req.body.faculty_id], async (error, result) => {
                        if (error) {
                            await connection.rollback();
                            return res.status(400).json({ "data": "some Error" });
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    })
                })
            } else {
                const result3 = await new Promise((resolve, reject) => {
                    connection.query("INSERT INTO transferlogs SET transfer_id = ? ,approval_status = ?, approved_by = ?", [req.body.transfer_id, "STORESAPPROVED", req.body.faculty_id], async (error, result) => {
                        if (error) {
                            await connection.rollback();
                            return res.status(400).json({ "data": "some Error" });
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    })
                })
            }

        }
        await connection.commit();
        return res.status(201).send({ "Data": "AcceptedSucessfully" });
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

        // const updateResult = await new Promise((resolve, reject) => {
        //     connection.query("UPDATE transfertable SET status = ?, reject_description = ?   WHERE id = ?", ["REJECTED", req.body.rejectDesc, req.body.id], async (error, result) => {
        //         if (error) {
        //             await connection.rollback();
        //             res.status(500).json({ "Data": "Some Internal Error" });
        //             return;
        //             reject(error);
        //         } else
        //             resolve(result);
        //     })
        // })

        const result1 = await new Promise((resolve, reject) => {
            connection.query("UPDATE transfertable SET current_status = ? WHERE id = ?", ["REJECTED", req.body.transfer_id], async (error, result) => {
                if (error) {
                    await connection.rollback();
                    return res.status(400).json({ "data": "some Error" });
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });

        const result2 = await new Promise((resolve, reject) => {
            connection.query("INSERT INTO transferlogs SET transfer_id = ? ,approval_status = ?, approved_by = ? , description = ?", [req.body.transfer_id, "REJECTED", req.body.faculty_id, req.body.rejectDesc], async (error, result) => {
                if (error) {
                    await connection.rollback();
                    return res.status(400).json({ "data": "some Error" });
                    reject(error);
                } else {
                    resolve(result);
                }
            })
        })

        await connection.commit();
        return res.status(201).json({ "Data": "Rejected Sucessfully" });

    } catch (error) {
        if (connection)
            await connection.rollback();
    } finally {
        if (connection)
            connection.release();
    }
}


const acknowledgeTransfer = async function (req, res, next) {
    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();

        const fromDataResult = await new Promise((resolve, reject) => {
            connection.query("SELECT * FROM admin_stock_view WHERE dept_id = ? AND id = ? AND apex_no = ? ", [req.body.transfered_from, req.body.stock_id, req.body.apex_no], async (error, result) => {
                if (error) {
                    await connection.rollback();
                    return res.status(400).json({ "data": "some Error" });
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
        // console.log(fromDataResult); 
        if (fromDataResult.length > 0 && fromDataResult[0].stock_qty >= req.body.transfer_qty) {
            const stockMinus = fromDataResult[0].stock_qty - req.body.transfer_qty;
            const inventoryMinus = fromDataResult[0].inventory_value - (fromDataResult[0].inventory_value / fromDataResult[0].stock_qty) * req.body.transfer_qty;
            const fromUpdateResult = await new Promise((resolve, reject) => {
                connection.query("UPDATE stocktable SET quantity = ?, cost = ? WHERE dept_id = ?  and id = ? and apexno = ?",
                    [stockMinus, inventoryMinus, req.body.transfered_from.toUpperCase(), req.body.stock_id, req.body.apex_no],
                    async (error, result) => {
                        if (error) {
                            await connection.rollback();
                            return res.status(400).json({ "data": "some Error" });
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    });
            });
        } else {
            return res.status(500).json({ "Data": "Stock Quantity not available" })
        }

        const toDataResult = await new Promise((resolve, reject) => {
            connection.query("SELECT * FROM admin_stock_view WHERE dept_id = ? AND id = ? AND apex_no = ?", [req.body.transfer_to, req.body.stock_id, req.body.apex_no], async (error, result) => {
                if (error) {
                    console.log(error);
                    await connection.rollback();
                    return res.status(400).json({ "data": "some Error" });
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });

        // if (toDataResult.length > 0) {
        //     const stockAdd = req.body.transfer_qty + toDataResult[0].stock_qty;
        //     const inventoryAdd = toDataResult[0].inventory_value + req.body.transfer_qty * req.body.cost_per_item;

        //     const toUpdateResult = await new Promise((resolve, reject) => {
        //         connection.query("UPDATE stocktable SET stock_qty = ?, inventory_value = ? WHERE dept_id = ? AND item_code = ? AND apex_no = ?",
        //             [stockAdd, inventoryAdd, req.body.transfer_to.toUpperCase(), req.body.item_code, req.body.apex_no], async (error, result) => {
        //                 if (error) {
        //                     await connection.rollback();
        //                     res.status(400).json({ "data": "some Error" });
        //                     return;
        //                     reject(error);
        //                 } else {
        //                     resolve(result)
        //                 }
        //             });
        //     });
        // } else {
        // const item_code = fromDataResult[0];
        const type = fromDataResult[0].item_type;
        const name = fromDataResult[0].item_name;
        const subname = fromDataResult[0].item_subname;
        const description = fromDataResult[0].item_description;
        const quantity_units = fromDataResult[0].quantity_units;
        const manufacturer_id = fromDataResult[0].manufacturer_id;
        const supplier_id = fromDataResult[0].supplier_id;
        const apex_reason = fromDataResult[0].apex_reason;
        const stockAdd = req.body.transfer_qty;
        const inventoryAdd = Math.round(req.body.transfer_qty * (fromDataResult[0].inventory_value / fromDataResult[0].stock_qty));
        const user_id = req.body.faculty_id;
        const dept_id = req.body.transfer_to;
        const apex_no = fromDataResult[0].apex_no;
        const toInsertResult = await new Promise((resolve, reject) => {
            connection.query("INSERT INTO  stocktable  (apexno,type,name,subname,description,  quantity , cost,quantity_units,faculty_id, dept_id,apex_reason, manufacturer_id, supplier_id ) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?)",
                [apex_no, type, name, subname, description, stockAdd, inventoryAdd, quantity_units, user_id, dept_id, apex_reason, manufacturer_id, supplier_id], async (error, result) => {
                    if (error) {
                        console.log(error);
                        await connection.rollback()
                        return res.status(400).json({ "data": "Some error" });
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
        });
        // }

        const transferUpdateResult = await new Promise((resolve, reject) => {
            connection.query("UPDATE transfertable SET status = ? WHERE id = ?", ["ACKNOWLEDGED", req.body.id], async (error, result) => {
                if (error) {
                    await connection.rollback();
                    return res.status(400).json({ "data": "Some Error" });
                    reject(error);
                } else
                    resolve(result);
            })
        })

        const result3 = await new Promise((resolve, reject) => {
            connection.query("INSERT INTO transferlogs SET transfer_id = ? ,approval_status = ?, approved_by = ?", [req.body.transfer_id, "ACKNOWLEDGED", req.body.user_id], async (error, result) => {
                if (error) {
                    await connection.rollback();
                    return res.status(400).json({ "data": "some Error" });
                    reject(error);
                } else {
                    resolve(result);
                }
            })
        })

        await connection.commit();
        return res.status(200).json({ "Data": "Item Transfer completed sucessfully check after few mins" });
    } catch (error) {
        if (connection)
            connection.rollback();
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
    deleteTransferRequest: deleteTransferRequest,
    acknowledgeTransfer: acknowledgeTransfer
}