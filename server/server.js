const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const {
    verifyToken,
    createSession,
    getUser,
} = require("./auth/loginMiddleware.js");

const db = require("./database/db.js");
const { getTransferData, transferRequest, acceptRequest, rejectRequest, cancelTransferRequest, deleteTransferRequest } = require("./transfer.js");
const { itemEdit, stockEdit } = require("./edit.js");
const { manufacturerAdd, supplierAdd, itemAdd, stockAdd } = require("./vendor.js");
const { scrapRequest, getScrapData, getAllScrapData, rejectScrapRequest ,acceptScrapRequest, cancelScrapRequest, deleteScrapRequest, getTableScrapData} = require("./scrap.js");
const {importItems, importStocks} = require("./excel_import.js")

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/api/", (req, res) => {
    db.query("SELECT * FROM itemtable").then((res)=>console.log(res)).catch((err)=>console.log(err));
    res.send("Hello from backend");
});

app.post("/api/loginUser", verifyToken, createSession, (req, res) => {
    const token = res.locals.token;
    // console.log(token)
    res.send(token);
});

app.post("/api/getUser", getUser);

app.post("/api/manufacturerAdd", manufacturerAdd);

app.post("/api/supplierAdd", supplierAdd);

app.post("/api/itemEdit", itemEdit);

app.post("/api/stockEdit", stockEdit);

app.post("/api/itemAdd", itemAdd);

app.post("/api/stockAdd", stockAdd);

app.get("/api/getManufacturer", (req, res) => {
    db.query("SELECT * FROM manufacturer")
        .catch((error) => res.send(error))
        .then((response) => res.send(response))
});

app.get("/api/getCategories", (req, res) => {
    db.query("SELECT * FROM categories_view", (error, result) => {
        console.log(result);
        res.send(result);
    });
});

app.get("/api/getInventory", (req, res) => {
    db.query("SELECT * FROM inventory_view", (error, result) => {
        console.log(result);

        res.send(result);
    });
});

app.get("/api/getLabItem", (req, res) => {
    db.query("SELECT * FROM lab_item_view", (error, result) => {
        
        res.send(result);
    });
});


app.get("/api/getItems", (req, res) => {
    db.query("SELECT * FROM itemtable", (error, result) => {
        if (error) console.log(error);
        else {
            res.send(result);
        }
    })
});

app.get("/api/getSupplier", (req, res) => {
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

app.get("/api/getStock", (req, res) => {
    db.query("SELECT * FROM stocktable", (error, result) => {
        if (error) console.log(error);
        else {
            res.send(result);
        }
    });
});


app.get("/api/getAdminStockData", (req, res) => {
    db.query("SELECT * FROM admin_stock_view", (error, result) => {
        if (error) console.log(error);
        res.send(result);
    });
});

app.get("/api/getQuantityUnits", (req, res) => {
    db.query("SELECT * FROM quantity_units", (error, result) => {
        if (error) console.log(error);
        else {
            res.send(result);
        }
    })
})

app.get("/api/getTotalStockValueData", (req, res) => {
    db.query("SELECT SUM(stock) AS stock FROM overall_stock_view", (error, result) => {
        if (error) console.log(error);
        else {
            res.send(result);
        }
    })
})

app.get("/api/getTotalScrapValueData", (req, res) => {
    db.query("SELECT SUM(scrap_value) AS name FROM overall_scrap_value", (error, result) => {
        if (error) console.log(error);
        else {
            res.send(result);
        }
    })
})

app.get("/api/getTotalInventoryValueData", (req, res) => {
    db.query("SELECT SUM(Cost) AS cost FROM inventory_view", (error, result) => {
        if (error) console.log(error);
        else {
            res.send(result);
        }
    })
})

app.get("/api/getInventoryData", (req, res) => {
    db.query("SELECT * FROM lab_inventory_view", (error, result) => {
        if (error) console.log(error);
        res.send(result);
    });
});

app.get("/api/getScrapData", (req, res) => {
    db.query("SELECT * FROM overall_scrap_value", (error, result) => {
        if (error) console.log(error);
        res.send(result);
    });
});




app.get("/api/getLabDetails", (req, res) => {
    db.query("SELECT * FROM labdetails", (error, result) => {
        if (error) console.log(error);
        res.send(result);
    });
});

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

app.get("/api/getInventoryData", (req, res) => {
    db.query("SELECT * FROM lab_inventory_view", (error, result) => {
        if (error) console.log(error);
        res.send(result);
    });
});

app.get("/api/getLabDetails", (req, res) => {
    db.query("SELECT * FROM labdetails", (error, result) => {
        if (error) console.log(error);
        res.send(result);
    });
});

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

app.get("/api/getOverallTransferedData", (req, res) => {
    db.query("SELECT * FROM transfer_request_merged_view", (error, result) => {
        if (error) console.log(error);
        res.send(result);
    });
});

app.get("/api/getStock/:id", (req, res)=>{
    db.query("SELECT * FROM admin_stock_view WHERE dept_id = ?", [req.params.id])
    .then((response)=>res.send(response))
    .catch((error)=>res.send(error));
})

app.post("/api/getTransferData", getTransferData)

app.post("/api/transferRequest", transferRequest)

app.post("/api/cancelTransferRequest", cancelTransferRequest);

app.post("/api/deleteTransferrequest", deleteTransferRequest);

app.post("/api/getTrackTransfer", (req, res) => {
    try {
        const user_dept = req.body.dept_code;
        db.query("Select * FROM transfer_request_merged_view WHERE transfer_to = ? ORDER BY date DESC", [user_dept])
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

app.post("/api/importItems", importItems);

app.post("/api/importStocks", importStocks);

app.post("/api/scrapRequest", scrapRequest);

app.get("/api/getScrap", getAllScrapData);

app.get("/api/getScrapData/:id", getScrapData);

app.post("/api/rejectScrapRequest", rejectScrapRequest);

app.post("/api/acceptScrapRequest", acceptScrapRequest);

app.post("/api/cancelScrapRequest", cancelScrapRequest);

app.post("/api/deleteScrapRequest", deleteScrapRequest);

app.get("/api/getTableScrapData", getTableScrapData);

const server = https.createServer()

app.listen(4000, () => console.log("App listening on port 4000"));       