const db = require("./database/db.js");

const itemEdit = async function (req, res, next) {

    const item_type = req.body.item_type;
    const item_name = req.body.item_name;
    const item_subname = req.body.item_subname;
    const item_description = req.body.item_description;
    const manufacturer_id = req.body.manufacturer_id;
    const quantity_units = req.body.quantity_units;
    const supplier_id = req.body.supplier_id;
    const cost_per_item = req.body.cost_per_item;
    const item_code = req.body.item_code;

    db.query(
        `UPDATE itemtable  SET item_type = ?, item_name = ?, item_subname = ?, item_description = ?, cost_per_item = ?, quantity_units = ?, manufacturer_id = ?,  supplier_id = ? WHERE item_code = ?`,
        [ item_type, item_name, item_subname, item_description, cost_per_item, quantity_units, manufacturer_id, supplier_id, item_code ] )
        .then(() => res.status(201).json({ Data: "Updated Item data sucessfully" }))
        .catch((error) => res.status(400).json({Data:"Some internal error"}));
;}


const stockEdit = async function(req, res, next){

        const manufacturer_id = req.body.manufacturer_id;
        const supplier_id = req.body.supplier_id;
        const stock_qty = req.body.quantity;
        const dept_id = req.body.dept_id;
        const inventory_value = req.body.cost;
        const user_id = req.body.faculty_id;
        const stock_id = req.body.id;
    
        db.query(
            "UPDATE stocktable SET manufacturer_id = ?, supplier_id = ?, quantity = ?, dept_id = ?, cost = ?, faculty_id = ? WHERE id = ?",
            [manufacturer_id,supplier_id, stock_qty, dept_id, inventory_value, user_id, stock_id ]
        ).then((response) => {console.log(response);res.status(201).json({ Data: "Stock Updated sucessfully "})})
        .catch((error) => {console.log(error);res.status(400).json({Data:"Some Internal Error"})});

}

module.exports = {
    itemEdit : itemEdit,
    stockEdit: stockEdit,
    
}