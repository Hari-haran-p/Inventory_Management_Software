const db = require('./database/db.js');

const apexAdd = async function(req, res, next){
    console.log("Triggerd");
    try{
        const {apexNo, facId, facName, deptId, materialNature, apexType, apexBy, budget, advance, outcome, requestFor,  detailReason, materialPurpose, userId } = req.body;
        console.log( apexNo, facId, facName, deptId, materialNature, apexType, apexBy, budget, advance, outcome, requestFor,  detailReason, materialPurpose, userId );

        await db.query("INSERT INTO apextable (apex_no, faculty_id, dept_id, material_nature, apex_by, apex_type, budget, advance, outcome, material_request, detailed_reason, material_purpose) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
            [apexNo, facId, deptId, materialNature, apexBy, apexType, budget, advance, outcome, requestFor, detailReason, materialPurpose]).then((response)=>{
                return res.status(201).json({ Data: "Apex Created Sucessfully" });
            })
    }catch(error){
        console.log(error);
        return res.status(500).json({ Data: "Some Internal Error" });
    }
}

module.exports={
    apexAdd:apexAdd,
}
