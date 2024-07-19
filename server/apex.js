const { response } = require('express');
const db = require('./database/db.js');

const apexAdd = async function (req, res, next) {
    console.log("Triggerd");
    try {
        const { apexNo, facId, facName, deptId, materialNature, apexType, apexBy, budget, advance, outcome, requestFor, detailReason, materialPurpose, userId } = req.body;
        console.log(apexNo, facId, facName, deptId, materialNature, apexType, apexBy, budget, advance, outcome, requestFor, detailReason, materialPurpose, userId);

        await db.query("INSERT INTO apextable (apex_no, faculty_id, dept_id, material_nature, apex_by, apex_type, budget, advance, outcome, material_request, detailed_reason, material_purpose) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [apexNo, facId, deptId, materialNature, apexBy, apexType, budget, advance, outcome, requestFor, detailReason, materialPurpose]).then((response) => {
                return res.status(201).json({ Data: "Apex Created Sucessfully" });
            })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "Data": "Some Internal Error" });
    }
}

const getApexTableData = async function (req, res, next) {
    try {
        await db.query("SELECT * FROM apexview ORDER BY created_at DESC").then((response) => res.status(200).json({ Data: response }))
    } catch (error) {
        res.status(500).json({ error: "There was some error" });
    }
}


const getApexCardData = async function (req, res, next) {
    const user = req.params.id;
    try {
        const [
            apexPendingResult,
            apexApprovedResult,
            apexStockedResult,
            apexRejectedResult,
        ] = await Promise.all([
            db.query("SELECT * FROM apexview WHERE (status = ? OR status = ?) AND faculty_id = ?", ["INITIATED", "CANCELLED", user]),
            db.query("SELECT * FROM apexview WHERE status = ? AND faculty_id = ?", ["APPROVED", user]),
            db.query("SELECT * FROM apexview WHERE status = ? AND faculty_id = ?", ["STOCKED", user]),
            db.query("SELECT * FROM apexview WHERE status = ? AND faculty_id = ?", ["REJECTED", user]),
        ]);
        res.status(200).json({
            pending: apexPendingResult,
            approved: apexApprovedResult,
            stocked: apexStockedResult,
            rejected: apexRejectedResult,
        });
    } catch (error) {
        console.error("Error executing the queries:", error);
        res.status(500).json({ error: "There was some error" });
    }
}


module.exports = {
    apexAdd: apexAdd,
    getApexTableData: getApexTableData,
    getApexCardData: getApexCardData,
}
