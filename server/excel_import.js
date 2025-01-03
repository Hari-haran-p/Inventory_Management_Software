
const db = require("./database/db.js");

const importManufacturers = async function (req, res, next) {

    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();
        const data = req.body.items;

        const manuData = await new Promise((resolve, reject) => {
            connection.query("SELECT * FROM manufacturer", (error, result) => {
                if (error) {
                    console.log(error);
                    reject(error)
                }
                else
                    resolve(result)
            })
        })

        const manuTableSet = new Set();
        for (const manu of manuData) {
            manuTableSet.add(manu.name.toUpperCase());
        }

        for (let i = 0; i < data.length; i++) {
            const currData = data[i];
            if (manuTableSet.has(currData.name.toUpperCase())) {
                res.status(401).json({ Data: `Manufacturer name at row ${i + 1} is duplicate` });
                return;
            }
        }

        const values = data.map((d) => [d.name]);

        const result = await new Promise((resolve, reject) => {
            connection.query("INSERT INTO manufacturer (name) VALUES ?", [values], (error, result) => {
                if (error) {
                    reject(error)
                }
                else
                    resolve(result)
            })
        })

        await connection.commit();
        res.status(200).json({ Data: "Data sucessfully imported" })

    } catch (error) {
        if (connection) {
            await connection.rollback();
            res.status(401).json({ Data: `Some internal error` });
        }
    } finally {
        if (connection) {
            await connection.release();
        }
    }
}

const importSuppliers = async function (req, res, next) {

    let connection;
    try {
        connection = await db.getConnection();
        await connection.beginTransaction();
        const data = req.body.items;

        const supplierData = await new Promise((resolve, reject) => {
            connection.query("SELECT * FROM supplier", (error, result) => {
                if (error) {
                    console.log(error);
                    reject(error)
                }
                else
                    resolve(result)
            })
        })

        const supplierTableSet = new Set();
        for (const data of supplierData) {
            supplierTableSet.add(data.name.toUpperCase());
        }

        for (let i = 0; i < data.length; i++) {
            const currData = data[i];
            if (typeof currData.name != "string") {
                return res.status(401).json({ Data: `Supplier name at row ${i + 1} is not valid` });
            }
            if (supplierTableSet.has(currData.name.toUpperCase())) {
                return res.status(401).json({ Data: `Supplier name at row ${i + 1} is duplicate` });
            }
            if(!Number.isInteger(currData.contact)){
                return res.status(401).json({ Data: `Supplier Contact at row ${i + 1} is not valid` });
            }
            if(currData.contact.toString().length != 10){
                return res.status(401).json({ Data: `Supplier Contact at row ${i + 1} is not valid` });
            }
        }

        const values = data.map((d) => [d.name, d.address, d.contact]);

        const result = await new Promise((resolve, reject) => {
            connection.query("INSERT INTO supplier (name, address, contact) VALUES ?", [values], (error, result) => {
                if (error) {
                    console.log(error);
                    reject(error)
                }
                else
                    resolve(result)
            })
        })

        await connection.commit();
        res.status(200).json({ Data: "Data sucessfully imported" })

    } catch (error) {
        if (connection) {
            console.log(error);
            await connection.rollback();
            res.status(401).json({ Data: `Some internal error` });
        }
    } finally {
        if (connection) {
            await connection.release();
        }
    }
}


const importItems = async function (req, res, next) {


    let connection;
    try {

        connection = await db.getConnection();
        await connection.beginTransaction();
        const data = req.body.items;

        const itemTableData = await new Promise((resolve, reject) => {
            connection.query("SELECT * FROM itemtable", (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            })
        })

        const itemTypeData = await new Promise((resolve, reject) => {
            connection.query("SELECT * FROM categories", (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            })
        })

        const quantityData = await new Promise((resolve, reject) => {
            connection.query("SELECt * FROM quantity_units", (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            })
        })

        const manufacturerData = await new Promise((resolve, reject) => {
            connection.query("SELECT * FROM manufacturer", (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            })
        })

        const supplierData = await new Promise((resolve, reject) => {
            connection.query("SELECt * FROM supplier", (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            })
        })

        //<<<<-------------Check for item name duplicates -------------------->>>>

        const itemTableSet = new Set();
        for (const item of itemTableData) {
            itemTableSet.add(item.item_name.toUpperCase());
        }
        const itemTypeSet = new Set();
        for (const type of itemTypeData) {
            itemTypeSet.add(type.name);
        }
        const quantitySet = new Set();
        for (const quantity of quantityData) {
            quantitySet.add(quantity.name)
        }
        const manufacturerSet = new Set();
        for (const manu of manufacturerData) {
            manufacturerSet.add(manu.id);
        }
        const supplierSet = new Set();
        for (const sup of supplierData) {
            supplierSet.add(sup.id);
        }

        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            const result = itemTableData.find((ite) => ite.item_name.toUpperCase() === item.item_name.toUpperCase() && ite.item_subname.toUpperCase() === item.item_subname.toUpperCase())
            if (result) {
                // console.log("from import : ", i , result);
                res.status(401).json({ Data: `Item subname duplicate entry at row ${i + 1}` })
                return;
            }
            if (itemTypeSet.has(item.item_type)) {
            } else {
                res.status(401).json({ Data: `Item type mismatch at row ${i + 1}` });
                return;
            }
            if (item.cost_per_item <= 0) {
                res.status(401).json({ Data: `Check for Cost value at row ${i + 1}` });
                return;
            }
            if (quantitySet.has(item.quantity_units)) {
            } else {
                res.status(401).json({ Data: `Check for Quantity units at row ${i + 1}` });
                return;
            }
            if (manufacturerSet.has(item.manufacturer_id)) {
            } else {
                res.status(401).json({ Data: `Check for manufacturer data at row ${i + 1}` });
                return;
            }
            if (supplierSet.has(item.supplier_id)) {
            } else {
                res.status(401).json({ Data: `Check for supplier data at row ${i + 1}` });
                return;
            }
        }

        let errorOccured = false;
        let errorMessage = `Some internal error`;

        const result = data.map(async (d, index) => {

            if (Object.values(d).length < 9) {
                await connection.rollback();
                errorOccured = true
                errorMessage = `Some values are missing at row ${index + 1}`
                // res.status(401).json({ Data: `Some values are missing at row ${index + 1}` });
                return
            };


            const insert = await new Promise((resolve, reject) => {
                connection.query("INSERT INTO itemtable (item_type, item_name, item_subname, item_description, cost_per_item, quantity_units, manufacturer_id, supplier_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                    [d.item_type, d.item_name.toUpperCase(), d.item_subname, d.item_description, d.cost_per_item, d.quantity_units, d.manufacturer_id, d.supplier_id],
                    async (error, result) => {
                        if (error) {
                            console.log(error);
                            errorOccured = true;
                            reject(error);
                            return;
                        } else {
                            resolve(result);
                        }
                    })
            })

        })

        await Promise.all(result).catch(async (error) => {
            await connection.rollback();
            return;
        });

        if (!errorOccured) {
            await connection.commit();
            res.status(200).json({ Data: "Data Imported Sucessfully" })
            return;
        } else {
            res.status(401).json({ Data: errorMessage });
            return;
        }

    } catch (error) {
        if (connection) {
            await connection.rollback();
        }
    } finally {
        if (connection) {
            await connection.release();
        }
    }

}

const importStocks = async function (req, res, next) {

    const data = req.body.items;
    const user = req.body.user_id;
    let errorMessage = `Some Internal Error`;
    console.log(data);
    let connection;
    try {
        let errorOccured = false;
        connection = await db.getConnection();
        await connection.beginTransaction();

        // const itemData = await new Promise((resolve, reject) => {
        //     connection.query("SELECT * FROM itemtable", (error, result) => {
        //         if (error) {
        //             reject(error);
        //         } else {
        //             resolve(result);
        //         }
        //     })
        // })

        // const stockData = await new Promise((resolve, reject) => {
        //     connection.query("SELECT * FROM stocktable", (error, result) => {
        //         if (error) {
        //             reject(error);
        //         } else {
        //             resolve(result);
        //         }
        //     })
        // })

        const manufacturerData = await new Promise((resolve, reject) => {
            connection.query("SELECT * FROM manufacturer", (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            })
        })

        const supplierData = await new Promise((resolve, reject) => {
            connection.query("SELECt * FROM supplier", (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            })
        })

        const labDetails = await new Promise((resolve, reject) => {
            connection.query("SELECT * FROM labdetails", (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            })
        })

        const facultyData = await new Promise((resolve, reject) => {
            connection.query("SELECT * FROM faculty", (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            })
        })

        // const itemSet = new Set();
        // for (const item of itemData) {
        //     itemSet.add(item.item_code);
        // }

        const manufacturerSet = new Set();
        for (const manu of manufacturerData) {
            manufacturerSet.add(manu.id);
        }
        const supplierSet = new Set();
        for (const sup of supplierData) {
            supplierSet.add(sup.id);
        }
        const facultySet = new Set();
        for (const fac of facultyData) {
            facultySet.add(fac.faculty_id);
        }
        const labDataSet = new Set();
        for (const lab of labDetails) {
            labDataSet.add(lab.labcode);
        }

        for (let i = 0; i < data.length; i++) {
            const stock = data[i];
            // if (itemSet.has(stock.item_code)) {
            // } else {
            //     res.status(401).json({ Data: `Item code mismatch at row ${i + 1}` });
            //     return;
            // }
            if (manufacturerSet.has(stock.manufacturer_id)) {
            } else {
                res.status(401).json({ Data: `Check for Manufacturer id at row ${i + 1}` });
                return;
            };
            if (supplierSet.has(stock.supplier_id)) {
            } else {
                res.status(401).json({ Data: `Check for Supplier id at row ${i + 1}` });
                return;
            };
            if (stock.stock_qty < 0 || stock.stock_qty == 0) {
                res.status(401).json({ Data: `Cost value must be vaild at row ${i + 1}` });
                return;
            }
            if (facultySet.has(stock.faculty_id)) {
            } else {
                res.status(401).json({ Data: `User not fount at row ${i + 1}` });
                return;
            }
            if (labDataSet.has(stock.dept_id)) {
            } else {
                res.status(401).json({ Data: `Check for department code at row ${i + 1}` });
                return;
            }
        }

        // const itemDataMap = {};
        // itemData.forEach((m) => {
        //     itemDataMap[m.item_code] = m;
        // });

        // data.forEach(async (d, index) => {
        //     const m = itemDataMap[d.item_code];
        //     if (m) {
        //         // console.log(m.cost_per_item, "   ", d.stock_qty, "    ", d.inventory_value);
        //         if (m.cost_per_item * d.stock_qty !== d.inventory_value) {
        //             await connection.rollback();
        //             errorOccured = true
        //             errorMessage = `Inventory value is not equivalent to cost of item at row ${index + 1}`
        //             // res.status(401).json({ Data: `Inventory value is not equivalent to cost of item at row ${index + 1}` });
        //             return;
        //         }
        //     }
        // });


        const date = new Date();
        const curr_date = date.toISOString().split("T")[0];


        const result = data.map(async (d, index) => {

            if (Object.values(d).length < 14) {
                await connection.rollback();
                errorOccured = true
                errorMessage = `Some values are missing at row ${index + 1}`
                return
            };

            // const result = stockData.find((s) => s.item_code.toUpperCase() == d.item_code.toUpperCase() && s.dept_id.toUpperCase() == d.dept_id.toUpperCase() && s.apex_no.toUpperCase() == d.apex_no.toUpperCase())

            // if (result) {
            //     console.log("update");
            //     const stockAdd = result.stock_qty + d.stock_qty;
            //     const inventoryValue = result.inventory_value + d.inventory_value;
            //     console.log(stockAdd, "   ", inventoryValue);
            //     const update = await new Promise((resolve, reject) => {
            //         connection.query("UPDATE stocktable SET stock_qty = ?, inventory_value = ? WHERE stock_id = ?", [stockAdd, inventoryValue, result.stock_id],
            //             async (error, result) => {
            //                 if (error) {
            //                     errorOccured = true;
            //                     reject(error);
            //                     return;
            //                 } else {
            //                     resolve(result);
            //                 }
            //             })
            //     })
            // } else {
            console.log("insert");
            // console.log(d, curr_date)
            const insert = await new Promise((resolve, reject) => {
                connection.query("INSERT INTO stocktable (apexno, consumable, type, name, subname, description, quantity, cost, quantity_units, faculty_id, dept_id, apex_reason, manufacturer_id, supplier_id ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [d.apexno.toString().toUpperCase(), d.consumable.toUpperCase(), d.type, d.name.toUpperCase(),d.subname.toUpperCase(),d.description.toUpperCase(), d.quantity, d.cost,d.quantity_units.toUpperCase(), d.faculty_id.toUpperCase(),d.dept_id.toUpperCase(), d.apex_reason.toUpperCase(),d.manufacturer_id.toUpperCase(),d.supplier_id.toUpperCase()],
                    async (error, result) => {
                        if (error) {
                            console.log(error);
                            errorOccured = true;
                            reject(error);
                            return;
                        } else {
                            resolve(result);
                        }
                    })
            })
        })

        await Promise.all(result).catch(async (error) => {
            console.log(error);
            await connection.rollback();
            return;
        });

        if (!errorOccured) {
            await connection.commit();
            res.status(200).json({ Data: "Accepted Sucessfully" })
            return;
        } else {
            res.status(401).json({ Data: errorMessage });
            return;
        }

    } catch (error) {
        console.log(error);
        if (connection) {
            await connection.rollback();
        }
        return;
    } finally {
        if (connection) {
            await connection.release();
        }
    }
}

const importTransferItems = async function (req, res, next) {
    let connection;
    try {

        connection = await db.getConnection();
        await connection.beginTransaction();
        const data = req.body.items;
        // console.log(data);

        const stockTableData = await new Promise((resolve, reject) => {
            connection.query("SELECT * FROM stocktable", (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            })
        })


        for (var i = 0; i < data.length; i++) {

            const stockResult = stockTableData.filter((f) => {
                console.log(f.dept_id == data[i].transfered_from);
                if (f.apexno.toString() == data[i].apex_no.toString() && f.id == data[i].stock_id && f.dept_id == data[i].transfered_from) {
                    return f;
                }
            })

            const transferResult2 = await new Promise((resolve, reject) => {
                connection.query("SELECT SUM(transfer_qty) as transfer FROM transfertable WHERE stock_id = ? AND status != ?", [data[i].stock_id, "ACKNOWLEDGED"], async (error, result) => {
                    if (error) {
                        await connection.rollback();
                        return res.status(500).json({ "Data": "Some internal error" });
                        reject(error);

                    } else
                        resolve(result);
                });
            })
console.log(stockResult);
            if (transferResult2.length > 0) {
                const transfer = parseInt(transferResult2[0].transfer_qty) + parseInt(data[i].transfer_qty);
                if (transfer > stockResult[0].quantity) {
                    return res.status(500).json({ "Data": `Item is in Progress at ${i + 1} row` });
                }
            }

            if (stockResult) {
                if (stockResult[0].quantity >= data[i].transfer_qty) {

                    const update = await new Promise((resolve, reject) => {
                        connection.query(
                            "INSERT INTO transfertable (apex_no, stock_id, transfer_qty, transfer_to, transfered_from, faculty_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
                            [
                                data[i].apex_no.toString().toUpperCase(),
                                data[i].stock_id,
                                data[i].transfer_qty,
                                data[i].transfer_to.toString().toUpperCase(),
                                data[i].transfered_from.toString().toUpperCase(),
                                data[i].faculty_id.toString().toUpperCase(),
                                "STORESAPPROVED"
                            ],
                            async (error, result) => {
                                if (error) {
                                    console.log(error);
                                    res.status(401).json({ Data: `Quantity mismatch at ${i + 1} row` });
                                    reject(error);
                                    return
                                } else {
                                    resolve(result);

                                }
                            }
                        );
                    });

                    if (update.affectedRows > 0) {
                        const transferlog = await new Promise((resolve, reject) => {
                            connection.query("INSERT INTO transferlogs SET transfer_id = ? ,approval_status = ?, approved_by = ?",
                                [update.insertId, "LABAPPROVED", stockResult[0].faculty_id],
                                async (error, result) => {
                                    if (error) {
                                        console.log(error);
                                        res.status(401).json({ Data: "some internal error" });
                                        reject(error);
                                        return
                                    } else {
                                        resolve(result)
                                    }
                                })
                        })
                        const transferlog1 = await new Promise((resolve, reject) => {
                            connection.query("INSERT INTO transferlogs SET transfer_id = ? ,approval_status = ?, approved_by = ?",
                                [update.insertId, "STORESAPPROVED", stockResult[0].faculty_id],
                                async (error, result) => {
                                    if (error) {
                                        console.log(error);
                                        res.status(401).json({ Data: "some internal error" });
                                        reject(error);
                                        return
                                    } else {
                                        resolve(result)
                                    }
                                })
                        })
                    } else {
                        res.status(401).json({ Data: "some Internal error" })
                    }

                } else {
                    res.status(401).json({ Data: `Quantity mismatch at ${i + 1} row` });
                    return
                }

            } else {
                res.status(401).json({ Data: `Item not Found at ${i + 1} row` });
                return
            }
        }

        await connection.commit();

        res.status(200).json({ Data: "Data sucessfully imported" });

    } catch (error) {
        console.log(error);
        if (connection) {
            await connection.rollback();
        }
    } finally {
        if (connection) {
            await connection.release();
        }
    }

}

module.exports = {
    importManufacturers: importManufacturers,
    importSuppliers: importSuppliers,
    importItems: importItems,
    importStocks: importStocks,
    importTransferItems: importTransferItems,

}