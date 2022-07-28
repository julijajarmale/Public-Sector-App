const express = require('express')
const app = express()
const port = 3003

const cors = require("cors");
app.use(express.json({ limit: '10mb' }));
app.use(cors());
const mysql = require("mysql");
const md5 = require('js-md5');
const uuid = require('uuid');
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


const doAuth = function(req, res, next) {
  if (0 === req.url.indexOf('/admin')) { // admin
      const sql = `
      SELECT
      name, role
      FROM users
      WHERE session = ?
  `;
      con.query(
          sql, [req.headers['authorization'] || ''],
          (err, results) => {
              if (err) throw err;
              if (!results.length || results[0].role !== 'admin') {
                  res.status(401).send({});
                  req.connection.destroy();
              } else {
                  next();
              }
          }
      );
  } else if (0 === req.url.indexOf('/login-check') || 0 === req.url.indexOf('/login') || 0 === req.url.indexOf('/')) {
      next();
  } else { 
      const sql = `
      SELECT
      name, role
      FROM users
      WHERE session = ?
  `;
      con.query(
          sql, [req.headers['authorization'] || ''],
          (err, results) => {
              if (err) throw err;
              if (!results.length) {
                  res.status(401).send({});
                  req.connection.destroy();
              } else {
                  next();
              }
          }
      );
  }
}
app.use(doAuth)

// AUTH
app.get("/login-check", (req, res) => {
  let sql;
  let requests;
  if (req.query.role === 'admin') {
      sql = `
      SELECT
      name
      FROM users
      WHERE session = ? AND role = ?
      `;
      requests = [req.headers['authorization'] || '', req.query.role];
  } else {
      sql = `
      SELECT
      name
      FROM users
      WHERE session = ?
      `;
      requests = [req.headers['authorization'] || ''];
  }
  con.query(sql, requests, (err, result) => {
      if (err) throw err;
      if (!result.length) {
          res.send({ msg: 'error' });
      } else {
          res.send({ msg: 'ok' });
      }
  });
});

app.post("/login", (req, res) => {
  const key = uuid.v4();
  const sql = `
  UPDATE users
  SET session = ?
  WHERE name = ? AND pass = ?
`;
  con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
      if (err) throw err;
      if (!result.affectedRows) {
          res.send({ msg: 'error', key: '' });
      } else {
          res.send({ msg: 'ok', key });
      }
  });
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

// Read Front Proposals
app.get("/proposals", (req, res) => {
  const sql = `
  SELECT proposals.title, proposals.comment, sectors.title AS sector, municipalities.name AS muni

FROM proposals
LEFT JOIN sectors
ON sectors.id = proposals.sector_id
LEFT JOIN municipalities
ON municipalities.id = proposals.muni_id

`;
  con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
  });
});

// Read Back Proposals
app.get("/admin/proposals", (req, res) => {
  const sql = `
  SELECT *
  FROM proposals
  
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
  (title, sector_id, muni_id, comment)
  VALUES (?, ?, ?, ?)
  `;
  con.query(
    sql,
    [
      req.body.title,
      req.body.sector,
      req.body.municipality,
      req.body.comment,
      
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


//Delete Proposal


app.delete("/admin/proposals/:id", (req, res) => {
  const sql = `
  DELETE FROM proposals
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: 'OK, Cat gone', type: 'success' } });
  });
});




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Portas ${port} klauso!`)
})

