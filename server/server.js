const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const {
    verifyToken,
    createSession,
    getUser,
    authenticate,
    credentialLogin,
} = require("./auth/loginMiddleware.js");

const db = require("./database/db.js");
const { getTransferData, transferRequest, acceptRequest, rejectRequest, cancelTransferRequest, deleteTransferRequest, acknowledgeTransfer } = require("./transfer.js");
const { itemEdit, stockEdit } = require("./edit.js");
const { manufacturerAdd, supplierAdd, itemAdd, stockAdd } = require("./vendor.js");
const { scrapRequest, getScrapData, getAllScrapData, rejectScrapRequest, acceptScrapRequest, cancelScrapRequest, deleteScrapRequest, getTableScrapData, getScrapCardData } = require("./scrap.js");
const { importItems, importStocks, importTransferItems, importManufacturers, importSuppliers } = require("./excel_import.js");
const { error } = require("console");
const { consumeRequest, getAllConsumeData, getConsumeData, rejectConsumeRequest, acceptConsumeRequest, cancelConsumeRequest, deleteConsumeRequest, getTableConsumeData, getConsumeCardData } = require("./consume.js");


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/api/", (req, res) => {
    db.query("SELECT * FROM itemtable").then((res) => console.log(res)).catch((err) => console.log(err));
    res.send("Hello from backend");
});

app.post("/api/loginUser", verifyToken, createSession, (req, res) => {
    const token = res.locals.token;
    res.send(token);
});

app.post('/api/credentiallogin', credentialLogin, createSession, (req, res) => {
    const token = res.locals.token;
    console.log(token);
    res.send(token);
});

app.post("/api/getUser", getUser);

app.post("/api/manufacturerAdd", manufacturerAdd);

app.post("/api/supplierAdd", supplierAdd);

app.post("/api/itemEdit", itemEdit);

app.post("/api/stockEdit", stockEdit);

app.post("/api/itemAdd", itemAdd);

app.post("/api/stockAdd", stockAdd);

app.get("/api/getManufacturer", authenticate, (req, res) => {
    db.query("SELECT * FROM manufacturer")
        .catch((error) => res.send(error))
        .then((response) => res.send(response))
});

app.get("/api/getCategories", authenticate, (req, res) => {
    db.query("SELECT SUM(stock) as stock , name FROM (SELECT SUM(Stock) AS stock, NAME  FROM labs_stock_view GROUP BY  labname, NAME) AS subquery GROUP BY NAME", (error, result) => {
        res.send(result);
    });
});

app.get("/api/getInventory", authenticate, (req, res) => {
    db.query("SELECT * FROM areachart_view", (error, result) => {

        res.send(result);
    });
});

app.get("/api/getLabItem", authenticate, (req, res) => {
    db.query("SELECT * FROM lab_item_view", (error, result) => {

        res.send(result);
    });
});


app.get("/api/getItems", authenticate, (req, res) => {
    db.query("SELECT * FROM itemtable", (error, result) => {
        if (error) console.log(error);
        else {
            if (result.length == 0) {
                return res.send("No Data");
            };
            return res.send(result);
        }
    })
});

app.get("/api/getSupplier", authenticate, (req, res) => {
    db.query("SELECT * FROM supplier", (error, result) => {
        res.send(result);
    });
});

app.get("/api/getItems", (req, res) => {
    db.query("SELECT * FROM itemtable", (error, result) => {
        if (error) console.log(error);
        else {
            res.send(result);
        }
    });
});

app.get("/api/getStock", authenticate, (req, res) => {
    db.query("SELECT * FROM stocktable WHERE quantity > 0 ", (error, result) => {
        if (error) console.log(error);
        else {
            res.send(result);
        }
    });
});

app.get("/api/getAdminStockData", authenticate, (req, res) => {
    db.query("SELECT * FROM admin_stock_view", (error, result) => {
        if (error) console.log(error);
        res.send(result);
    });
});

app.get("/api/getAdminScrapStockData/:id", authenticate, (req, res) => {
    const id = req.params.id;

    try {
        db.query(`SELECT * FROM admin_stock_view WHERE dept_id = "${id}"`, (error, result) => {
            if (error) {
                console.error("Error executing query:", error);
                return res.status(500).send("Internal Server Error");
            }
            res.send(result);
        });
    } catch (err) {
        console.error("Error in try-catch block:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/api/getAdminTransferStockData/:id", authenticate, (req, res) => {
    const id = req.params.id;

    try {
        db.query(`SELECT * FROM admin_stock_view WHERE dept_id != "${id}"`, (error, result) => {
            if (error) {
                console.error("Error executing query:", error);
                return res.status(500).send("Internal Server Error");
            }
            res.send(result);
        });
    } catch (err) {
        console.error("Error in try-catch block:", err);
        res.status(500).send("Internal Server Error");
    }
});




app.get("/api/getQuantityUnits", authenticate, (req, res) => {
    db.query("SELECT * FROM quantity_units", (error, result) => {
        if (error) console.log(error);
        else {
            res.send(result);
        }
    })
})

app.get("/api/getTotalStockValueData", authenticate, (req, res) => {
    db.query("SELECT SUM(stock) AS stock FROM overall_stock_view", (error, result) => {
        if (error) console.log(error);
        else {
            res.send(result);
        }
    })
})

app.get("/api/getTotalScrapValueData", authenticate, (req, res) => {
    db.query("SELECT SUM(scrap_value) AS name FROM overall_scrap_value", (error, result) => {
        if (error) console.log(error);
        else {
            res.send(result);
        }
    })
})

app.get("/api/getTotalInventoryValueData", authenticate, (req, res) => {
    db.query("SELECT SUM(Cost) AS cost FROM inventory_view", (error, result) => {
        if (error) console.log(error);
        else {
            res.send(result);
        }
    })
})

app.get("/api/getScrapData", authenticate, (req, res) => {
    db.query("SELECT * FROM overall_scrap_value", (error, result) => {
        if (error) console.log(error);
        res.send(result);
    });
});

app.get("/api/getLabDetails", authenticate, (req, res) => {
    db.query("SELECT * FROM labdetails", (error, result) => {
        if (error) console.log(error);
        res.send(result);
    });
});

app.get("/api/getLabsStock", authenticate, (req, res) => {
    db.query("SELECT Stock as stock, name, labname FROM labs_stock_view", (error, result) => {
        if (error) console.log(error);
        res.send(result);
    });
});

app.get("/api/getOverallLabsStock", authenticate, (req, res) => {
    db.query("SELECT * FROM overall_stock_view", (error, result) => {
        if (error) console.log(error);
        res.send(result);
    });
});

app.get("/api/getInventoryData", authenticate, (req, res) => {
    db.query("SELECT * FROM lab_inventory_view", (error, result) => {
        if (error) console.log(error);
        res.send(result);
    });
});

// app.get("/api/getLabDetails", (req, res) => {
//     db.query("SELECT * FROM labdetails", (error, result) => {
//         if (error) console.log(error);
//         res.send(result);
//     });
// });

app.get("/api/getLabsStock", (req, res) => {
    db.query("SELECT * FROM labs_stock_view", (error, result) => {
        if (error) console.log(error);
        res.send(result);
    });
});

app.get("/api/getOverallLabsStock", (req, res) => {
    db.query("SELECT * FROM overall_stock_view", (error, result) => {
        if (error) console.log(error);
        res.send(result);
    });
});

app.get("/api/getOverallTransferedData", authenticate, (req, res) => {
    db.query("SELECT * FROM transferview", (error, result) => {
        if (error) console.log(error);
        res.send(result);
    });
});



app.get("/api/getTransferCardData/:id", async (req, res) => {
    const user = req.params.id;

    try {
        const [
            transferPendingResult,
            transferApprovedResult,
            transferLabApprovedResult,
            transferAcknowledgedResult,
            transferRejectedResult,
        ] = await Promise.all([
            db.query("SELECT * FROM transferview WHERE (current_status = ? OR current_status = ?) AND faculty_id = ?", ["INITIATED", "CANCELED", user]),
            db.query("SELECT * FROM transferview WHERE current_status = ? AND faculty_id = ?", ["STORESAPPROVED", user]),
            db.query("SELECT * FROM transferview WHERE current_status = ? AND faculty_id = ?", ["LABAPPROVED", user]),
            db.query("SELECT * FROM transferview WHERE current_status = ? AND faculty_id = ?", ["ACKNOWLEDGED", user]),
            db.query("SELECT * FROM transferview WHERE current_status = ? AND faculty_id = ?", ["REJECTED", user]),
        ]);

        res.status(200).json({
            pending: transferPendingResult,
            approved: transferApprovedResult,
            labapproved: transferLabApprovedResult,
            acknowledged: transferAcknowledgedResult,
            rejected: transferRejectedResult,
        });
    } catch (error) {
        console.error("Error executing the queries:", error);
        res.status(500).json({ error: "There was some error" });
    }
});

app.get("/api/getScrapCardData/:id", async (req, res) => {

    const user = req.params.id;
    try {
        const [
            scrapPendingResult,
            scrapApprovedResult,
            scrapAcknowledgedResult,
            scrapRejectedResult,
        ] = await Promise.all([
            db.query("SELECT * FROM scrap_table_view WHERE (status = ? OR status = ?) AND user_id = ?", ["PENDING", "CANCELED", user]),
            db.query("SELECT * FROM scrap_table_view WHERE status = ? AND user_id = ?", ["APPROVED", user]),
            db.query("SELECT * FROM scrap_table_view WHERE status = ? AND user_id = ?", ["ACKNOWLEDGED", user]),
            db.query("SELECT * FROM scrap_table_view WHERE status = ? AND user_id = ?", ["REJECTED", user]),
        ]);


        res.status(200).json({
            pending: scrapPendingResult,
            approved: scrapApprovedResult,
            acknowledged: scrapAcknowledgedResult,
            rejected: scrapRejectedResult,
        });
    } catch (error) {
        console.error("Error executing the queries:", error);
        res.status(500).json({ error: "There was some error" });
    }
});




app.get("/api/getStock/:id", (req, res) => {
    db.query("SELECT * FROM admin_stock_view WHERE dept_id = ?", [req.params.id])
        .then((response) => res.send(response))
        .catch((error) => res.send(error));
})

app.post("/api/getTransferData", authenticate, getTransferData)

app.post("/api/transferRequest", transferRequest)

app.post("/api/cancelTransferRequest", cancelTransferRequest);

app.post("/api/deleteTransferrequest", deleteTransferRequest);

app.post("/api/getTrackTransfer", (req, res) => {
    try {
        const user_dept = req.body.user_id;
        db.query("Select * FROM transferview WHERE faculty_id = ? ORDER BY created_at DESC", [user_dept])
            .catch((error) => res.status(500).json({ error: "There was some Error" }))
            .then((response) => {
                res.status(200).json({ data: response })
            });
    } catch (error) {
        console.log(error);
    }
})

app.post("/api/acceptRequest", acceptRequest);

app.post("/api/rejectRequest", rejectRequest);

app.post("/api/acknowledgeTransfer", acknowledgeTransfer);

app.post("/api/importItems", importItems);

app.post("/api/importTransferItems", importTransferItems);

app.post("/api/importStocks", importStocks);

app.post("/api/importManufacturers", importManufacturers);

app.post("/api/importSuppliers", importSuppliers);


//Scrap Related  API's
app.post("/api/scrapRequest", scrapRequest);

app.get("/api/getScrap", authenticate, getAllScrapData);

app.get("/api/getScrapData/:id", authenticate, getScrapData);

app.post("/api/rejectScrapRequest", rejectScrapRequest);

app.post("/api/acceptScrapRequest", acceptScrapRequest);

app.post("/api/cancelScrapRequest", cancelScrapRequest);

app.post("/api/deleteScrapRequest", deleteScrapRequest);

app.get("/api/getTableScrapData", authenticate, getTableScrapData);


app.get("/api/getScrapCardData/:id", authenticate, getScrapCardData);



//Consume Related API's
app.post("/api/consumeRequest", consumeRequest);

app.get("/api/getConsume",authenticate,  getAllConsumeData);

app.get("/api/getConsumeData/:id", authenticate, getConsumeData);

app.post("/api/rejectConsumeRequest", rejectConsumeRequest);

app.post("/api/acceptConsumeRequest", acceptConsumeRequest);

app.post("/api/cancelConsumeRequest", cancelConsumeRequest);

app.post("/api/deleteConsumeRequest", deleteConsumeRequest);

app.get("/api/getTableConsumeData",authenticate, getTableConsumeData);

app.get("/api/getConsumeCardData/:id", authenticate, getConsumeCardData);

app.listen(4000, () => console.log("App listening on port 4000"));