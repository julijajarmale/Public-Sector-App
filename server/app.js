const express = require('express')
const app = express()
const port = 3003

const cors = require("cors");
app.use(express.json({ limit: '10mb' }));
app.use(cors());
const mysql = require("mysql");
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "public_sector",
});

//Create Muni

app.post("/admin/municipalities", (req, res) => {
    const sql = `
    INSERT INTO municipalities
    (name, herbas)
    VALUES (?, ?)
    `;
    con.query(sql, [req.body.name, req.body.picture], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, new and shiny product was created', type: 'success' } });
    });
});

// Read Muni
app.get("/admin/municipalities", (req, res) => {
    const sql = `
    SELECT *
    FROM municipalities
    ORDER BY name
`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//Delete Muni

app.delete("/admin/municipalities/:id", (req, res) => {
    const sql = `
    DELETE FROM municipalities
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, Cat gone', type: 'success' } });
    });
});

//Edit Muni
app.put("/admin/municipalities/:id", (req, res) => {
    const sql = `
    UPDATE municipalities
    SET name = ? , herbas = ?
    WHERE id = ?
    `;
    con.query(sql, [req.body.name, req.body.picture, req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, Cat updated. Now it is as new', type: 'success' } });
    });
});


//READ SECTORS
app.get("/admin/sectors", (req, res) => {
  const sql = `
SELECT sectors.id, sectors.title, municipalities.name AS muniname

FROM sectors 
LEFT JOIN municipalities
ON municipalities.id = sectors.muni_id
ORDER BY title
`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//CREATE SECTORS
app.post("/admin/sectors", (req, res) => {
  const sql = `
  INSERT INTO sectors
  (title, muni_id)
  VALUES (?, ?)
  `;
  con.query(
    sql,
    [
      req.body.title,
      req.body.municipality
      
    ],
    (err, result) => {
      if (err) throw err;
      res.send({
        result,
        msg: { text: "OK, new and shiny product was created", type: "success" },
      });
    }
  );
});

//Delete Sector

app.delete("/admin/sectors/:id", (req, res) => {
  const sql = `
  DELETE FROM sectors
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: 'OK, Cat gone', type: 'success' } });
  });
});

//Edit Sector
app.put("/admin/sectors/:id", (req, res) => {
  const sql = `
  UPDATE sectors
  SET title = ? , muni_id = ?
  WHERE id = ?
  `;
  con.query(sql, [req.body.title, req.body.municipality, req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: 'OK, Cat updated. Now it is as new', type: 'success' } });
  });
});

// Read Front Muni
app.get("/municipalities", (req, res) => {
  const sql = `
  SELECT *
  FROM municipalities
  ORDER BY name
`;
  con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});

// Read Front Sector
app.get("/sectors", (req, res) => {
  const sql = `
  SELECT *
  FROM sectors
  ORDER BY title
`;
  con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});

//CREATE PROPOSAL FRONT
app.post("/proposals", (req, res) => {
  const sql = `
  INSERT INTO proposals
  (title, sector_id)
  VALUES (?, ?)
  `;
  con.query(
    sql,
    [
      req.body.title,
      req.body.sector
      
    ],
    (err, result) => {
      if (err) throw err;
      res.send({
        result,
        msg: { text: "OK, new and shiny product was created", type: "success" },
      });
    }
  );
});




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Portas ${port} klauso!`)
})

