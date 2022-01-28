const express = require("express");
const pl = require("tau-prolog");

/*** Load clauses into the prolog session */
const load_db = (session, db) => {
  return new Promise((resolve, reject) => {
    session.consult(db, { success: resolve, error: reject });
  });
};

/*** Load query into the prolog session */
const load_query = (session, query) => {
  return new Promise((resolve, reject) => {
    session.query(query, {
      success: function (goal) {
        resolve(goal);
      },
      error: function (err) {
        /* Error parsing goal */
        reject(err);
      },
    });
  });
};

/*** Get answer from the last query loaded into session */
const get_answer = (session) => {
  const substitutionToMap = (sub) => {
    ret = {};
    for (const [varName, link] of Object.entries(sub.links)) {
      if (link["id"] !== undefined) {
        ret[varName] = link.id;
      } else {
        ret[varName] = link.value;
      }
    }
    return ret;
  };

  return new Promise((resolve, reject) => {
    session.answer({
      success: (answer) => {
        resolve({
          status: "ok",
          results: [substitutionToMap(answer)],
        });
      },
      fail: () => {
        /* No more answers */
        resolve({
          status: "ok",
          results: [],
        });
      },
      error: (err) => {
        /* Uncaught exception */
        reject({
          status: "error",
          type: "error",
          message: "Error ocurred",
          data: err,
        });
      },
      limit: () => {
        /* Limit Reached */
        reject({
          status: "error",
          type: "limit_error",
          message: "Limit Exceeded",
        });
      },
    });
  });
};

/*** Given a query, get all matching results */
const query_db = (session, query_str) => {
  return new Promise(async (resolve, reject) => {
    // First load the query
    await load_query(session, query_str).catch((error) => reject(error));

    // Load all the answers from the knowledge base
    let answersExist = true;

    const response = {
      status: "ok",
      results: [],
    };

    while (answersExist) {
      try {
        const res = await get_answer(session);

        if (res["status"] === "ok") {
          if (res["results"].length) {
            response["results"].push(...res["results"]);
          } else {
            answersExist = false;
          }
        } else {
          answersExist = false;
          break;
        }
      } catch (error) {
        response["status"] = "error";
        break;
      }
    }

    resolve(response);
  });
};

/***  Starts Express App */
const startServer = async () => {
  const app = express();
  const host = "localhost";
  const port = 3000;

  const session = pl.create();

  await load_db(session, `${__dirname}/database.pl`);

  express.json();

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("/scenes", async (req, res) => {
    res.json({
      ...(await query_db(session, "scene(ID).")),
    });
  });

  app.get("/clues", async (req, res) => {
    res.json({
      ...(await query_db(session, "clue(ID, SCENE, _, _).")),
    });
  });

  app.get("/clues/:id", async (req, res) => {
    const clueId = req.params["id"];
    res.json({
      ...(await query_db(
        session,
        `clue(${clueId}, SCENE, DESCRIPTION, FOUND).`
      )),
    });
  });

  app.get("/scenes/:id", async (req, res) => {
    const sceneId = req.params["id"];
    res.json({
      ...(await query_db(session, `scene_name(NUM, ${sceneId}, NAME).`)),
    });
  });

  app.get("/query/:query_str", async (req, res) => {
    const queryStr = req.params["query_str"];
    res.json({
      ...(await query_db(session, queryStr)),
    });
  });

  app.listen(port, host, () => {
    console.log(`Example app listening on port http://${host}:${port}`);
  });
};

const main = async () => {
  startServer();
};

main();
