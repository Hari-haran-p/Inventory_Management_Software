const db = require("./database/db.js");


const manufacturerAdd = async function (req, res, next) {
    try {
        const name = req.body.name;
        db.query("INSERT INTO manufacturer (name) VALUES (?)", [name])
            .then((response) => {
                res.status(201).json({ Data: "Manufacturer created sucessfully" })
            }).catch((error) => {
                res.status(400).json({ Data: "Some internal error" });
            })
    } catch {
        console.log("Error Inserting the Manufacturer Name");
    }
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
    let match4 = selectResult4.some((s) => s.item_name == itemName && s.item_subname == subName);

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
    console.log("called");
    try {
        const apex_no = req.body.apexno.toUpperCase();
        const consumable = req.body.consumable.toUpperCase();
        const type = req.body.type;
        const name = req.body.name.toUpperCase();
        const subname = req.body.subname.toUpperCase();
        const description = req.body.description.toUpperCase();
        const qunatity = req.body.quantity;
        const cost = parseFloat(req.body.cost);
        const quantity_units = req.body.quantity_units;
        const faculty_id = req.body.userId.toUpperCase();
        const dept_id = req.body.dept_id.toUpperCase();
        const apex_reason = req.body.apex_reason.toUpperCase();
        const manufacturerId = req.body.manufacturerId.toUpperCase();
        const supplierId = req.body.supplierId.toUpperCase();

        await db.query("INSERT INTO stocktable (apexno, consumable, type, name, subname, description, quantity, cost, quantity_units, faculty_id, dept_id, apex_reason, manufacturer_id, supplier_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [apex_no, consumable, type, name, subname, description, qunatity, cost, quantity_units, faculty_id, dept_id, apex_reason, manufacturerId, supplierId]).then((response) => {
                return res.status(201).json({ Data: "Stock Created Sucessfully" });
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ Data: "Some Internal Error" });
    }
}

module.exports = {
    manufacturerAdd: manufacturerAdd,
    supplierAdd: supplierAdd,
    itemAdd: itemAdd,
    stockAdd: stockAdd,
}