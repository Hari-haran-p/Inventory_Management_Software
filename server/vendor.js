const db = require("./database/db.js");


const manufacturerAdd = async function (req, res, next) {
    const name = req.body.name;
    db.query("INSERT INTO manufacturer (name) VALUES (?)", [name])
        .then((response) => {
            res.status(201).json({ Data: "Manufacturer created sucessfully" })
        }).catch((error) => {
            res.status(400).json({ Data: "Some internal error" });
        })
}

const supplierAdd = async function (req, res, next) {
    const name = req.body.name;
    const address = req.body.address;
    const contact = req.body.contact;
    if (name.length > 0 && address.length > 0 && contact.length == 10) {
        db.query("INSERT INTO supplier (name,address,contact) VALUES (?,?,?)", [name, address, contact])
            .then((response) => {
                res.status(201).json({ Data: "Supplier created sucessfully" });
            }).catch((error) => {
                res.status(400).json({ Data: "Some internal Error" });
            })
    } else {
        res.status(400).json({ Data: "Enter correct data" });
    }

}

const itemAdd = async function (req, res, next) {

    const itemType = req.body.itemType;
    const manufacturerId = req.body.manufacturerName;
    const supplierId = req.body.supplierName;
    const itemName = req.body.itemName.toUpperCase();
    const subName = req.body.subName.toUpperCase();
    const description = req.body.description.toUpperCase();
    const cost = req.body.cost;
    const unit = req.body.units;

    const selectResult1 = await new Promise((resolve, reject) => {
        db.query("SELECT * FROM manufacturer").catch((error) => {
            res.status(400).json({ Data: "Some internal Error" });
            reject(error);
            return;
        }).then((response) => resolve(response))
    })

    const selectResult2 = await new Promise((resolve, reject) => {
        db.query("SELECT * FROM supplier").catch((error) => {
            res.status(400).json({ Data: "Some internal Error" });
            reject(error);
            return;
        }).then((response) => resolve(response))
    })

    const selectResult3 = await new Promise((resolve, reject) => {
        db.query("SELECT * FROM quantity_units").catch((error) => {
            res.status(400).json({ Data: "Some internal Error" });
            reject(error);
            return;
        }).then((response) => resolve(response))
    })

    const selectResult4 = await new Promise((resolve, reject) => {
        db.query("SELECT * FROM itemtable").catch((error) => {
            res.status(400).json({ Data: "Some internal Error" });
            reject(error)
            return;
        }).then((response) => resolve(response))
    })

    let match1 = selectResult1.some((s) => s.id == manufacturerId); 
    
    let match2 = selectResult2.some((s) => s.id == supplierId);
    let match3 = selectResult3.some((s) => s.name == unit);
    let match4 = selectResult4.some((s) => s.item_name == itemName &&  s.item_subname == subName);

    if (match1 && match2 && match3 && cost > 0) {
        if (match4) {
            res.status(400).json({ Data: "Item already exists" });
        } else {
            db.query(
                `INSERT INTO itemtable 
                            (item_type, item_name, item_subname, item_description, cost_per_item, quantity_units, manufacturer_id, supplier_id) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [itemType, itemName, subName, description, cost, unit, manufacturerId, supplierId,]
            ).then((response) => {
                res.status(201).json({ Data: "Item added sucessfully" });
            }).catch((error) => {
                res.status(400).json({ Data: "Some internal error" });
            });
        }

    } else {
        res.status(400).json({ Data: "Enter data in correct format" });
    }
}

const stockAdd = async function (req, res, next) {


    const item_code = req.body.itemcode;
    const manufacturerId = req.body.manufacturerId;
    const supplierId = req.body.supplierId;
    const stockQty = req.body.stock_qty;
    const inventoryValue = req.body.inventoryValue;
    const userId = req.body.userId.toUpperCase();
    const labCode = req.body.labCode.toUpperCase();
    const currDate = new Date();
    const apex_no = req.body.apex_no.toUpperCase();
    const userDept = req.body.user_dept_id.toLowerCase();

    const selectResult = await new Promise((resolve, reject) => {
        db.query("SELECT * FROM itemtable").catch((error) => {
            res.status(400).json({ Data: "Some internal Error" });
            reject(error);
            return;
        }).then((response) => {
            resolve(response);
        })
    })

    

    const selectResult2 = await new Promise((resolve, reject) => {
        db.query("SELECT * FROM stocktable").catch((error) => {
            res.status(400).json({ Data: "Some internal Error" });
            reject(error);
            return;
        }).then((response) => {
            resolve(response);
        })
    })

    const findResult = selectResult2.find((f) => f.apex_no.toUpperCase() == apex_no.toUpperCase() && f.item_code.toUpperCase() == item_code.toUpperCase() && f.dept_id.toUpperCase() == labCode);

    if (selectResult.some((s) => s.item_code == item_code) && stockQty > 0) {
        if (userDept != 'slbs' && labCode.toLowerCase() == userDept) {
            if (findResult) {
                const stockAdd = parseInt(findResult.stock_qty, 10) + parseInt(stockQty, 10);
                const inventoryAdd = parseInt(findResult.inventory_value, 10) + parseInt(inventoryValue, 10)
                db.query("UPDATE stocktable SET stock_qty = ?, inventory_value = ?, user_id = ? WHERE stock_id = ?", [stockAdd, inventoryAdd, userId, findResult.stock_id])
                    .then((response) => {
                        if (response.affectedRows > 0) {
                            res.status(201).json({ Data: "Stock value updated in existing data" });
                        } else {
                            res.status(400).json({ Data: "Data Not Inserted check for errors" });
                        }
                    })
                    .catch((error) => res.status(400).json({ Data: "Some internal error" }));
                return;
            }else {
                db.query(
                    `INSERT INTO stocktable (apex_no, item_code, manufacturer_id, supplier_id, stock_qty, inventory_value, user_id, created_at, dept_id) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [apex_no, item_code, manufacturerId, supplierId, stockQty, inventoryValue, userId, currDate.toISOString().split("T")[0], labCode])
                    .then((response) => {
                        if (response.affectedRows > 0) {
                            res.status(201).json({ Data: "Stock Created Sucessfully" });
                            return;
                        } else {
                            res.status(400).json({ Data: "Data Not Inserted check for errors" });
                            return;
                        }
                    }).catch((error) => {

                        res.status(400).json({ Data: "Some internal error" });
                        return;
                    });
                return;
            }
        } else {
            res.status(400).json({ Data: "Unable to create stock, check for authority" });
            return;
        }

    } else {
        res.status(400).json({ Data: "Check for Itemname and stock quantity" });
        return;
    }
}

module.exports = {
    manufacturerAdd: manufacturerAdd,
    supplierAdd: supplierAdd,
    itemAdd: itemAdd,
    stockAdd: stockAdd,
}