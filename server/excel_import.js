const db = require("./database/db.js");

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
        // console.log(itemTableSet.has('clear varnish'));
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
            if (itemTableSet.has(item.item_name.toUpperCase())) {
                res.status(401).json({ Data: `Item name is not unique in row ${i + 1}` });
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

        const values = data.map((d) => [d.item_code, d.item_type, d.item_name.toUpperCase(), d.item_subname, d.item_description, d.cost_per_item, d.quantity_units, d.manufacturer_id, d.supplier_id])

        const response = await new Promise((resolve, reject) => {
            connection.query(`INSERT INTO itemtable (item_code, item_type, item_name, item_subname, item_description, cost_per_item, quantity_units, manufacturer_id, supplier_id) VALUES ?`, [values],
                (error, result) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    } else {
                        console.log(result);
                        resolve(result);
                    }
                })
        })

        connection.commit();
        res.status(200).json({ Data: "Data sucessfully imported" });

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

    let connection;
    try {

        connection = await db.getConnection();
        await connection.beginTransaction();

        const itemData = await new Promise((resolve, reject) => {
            connection.query("SELECT * FROM itemtable", (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            })
        })

        const stockData = await new Promise((resolve, reject) => {
            connection.query("SELECT * FROM stocktable", (error, result) => {
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

        const itemSet = new Set();
        for (const item of itemData) {
            itemSet.add(item.item_code);
        }
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
            if (itemSet.has(stock.item_code)) {
            } else {
                res.status(401).json({ Data: `Item code mismatch at row ${i + 1}` });
                return;
            }
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
                res.status(401).json({ Data: `Cost value must be vaild ${i + 1}` });
                return;
            }
            if (facultySet.has(stock.user_id)) {
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

        const itemDataMap = {};
        itemData.forEach((m) => {
            itemDataMap[m.item_code] = m;
        });

        data.forEach(async (d, index) => {
            const m = itemDataMap[d.item_code];
            if (m) {
                // console.log(m.cost_per_item, "   ", d.stock_qty, "    ", d.inventory_value);
                if (m.cost_per_item * d.stock_qty !== d.inventory_value) {
                    await connection.rollback();
                    res.status(401).json({ Data: `Inventory value is not equivalent to cost of item at row ${index + 1}` });
                    return;
                }
            }
        });


        const date = new Date();
        const curr_date = date.toISOString().split("T")[0];

        let errorOccured = false;
        const result = data.map(async (d, index) => {

            if (Object.values(d).length < 9) {
                await connection.rollback();
                res.status(401).json({ Data: `Some values are missing at row ${index + 1}` });
                return
            };

            const result = stockData.find((s) => s.item_code.toUpperCase() == d.item_code.toUpperCase() && s.dept_id.toUpperCase() == d.dept_id.toUpperCase())



            if (result) {
                console.log("update");
                const stockAdd = result.stock_qty + d.stock_qty;
                const inventoryValue = result.inventory_value + d.inventory_value;
                console.log(stockAdd, "   ", inventoryValue);
                const update = await new Promise((resolve, reject) => {
                    connection.query("UPDATE stocktable SET stock_qty = ?, inventory_value = ? WHERE stock_id = ?", [stockAdd, inventoryValue, result.stock_id],
                        async (error, result) => {
                            if (error) {
                                errorOccured = true;
                                reject(error);
                                return;
                            } else {
                                resolve(result);
                            }
                        })
                })
            } else {

                console.log("insert");
                // console.log(d, curr_date)
                const insert = await new Promise((resolve, reject) => {
                    connection.query("INSERT INTO stocktable (apex_no, item_code, manufacturer_id, supplier_id, stock_qty, inventory_value, user_id, created_at, dept_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                        [d.apex_no, d.item_code, d.manufacturer_id, d.supplier_id, d.stock_qty, d.inventory_value, d.user_id, curr_date, d.dept_id],
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
            }
        })

        await Promise.all(result).catch(async (error) => {
            await connection.rollback();
            return;
        });

        if (!errorOccured) {
            await connection.commit();
            res.status(200).json({ Data: "Accepted Sucessfully" })
            return;
        } else {
            res.status(401).json({ Data: `Some Internal Error` });
            return;
        }

        console.log("imported");

    } catch (error) {
        console.log(error);
        if (connection) {
            await connection.rollback();
        }
        res.status(401).json({ Data: `Some Internal Error` });
        return;
    } finally {
        if (connection) {
            await connection.release();
        }
    }

}



module.exports = {
    importItems: importItems,
    importStocks: importStocks,

}