const path = require("node:path");
const express = require("express");
const { insertNames } = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;
const MAX_NAMES = 10;

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "res")));

// Красивые URL без .html
app.use((req, res, next) => {
  // Если это GET-запрос и в пути нет точки (то есть это не файл типа .css или .png)
  if (req.method === "GET" && !req.path.includes(".")) {
    const filePath = path.join(__dirname, "..", "res", req.path + ".html");
    res.sendFile(filePath, (err) => {
      if (err) next(); // Если файла нет, идём дальше (например, к API или 404)
    });
  } else {
    next();
  }
});

function handleNotesSubmit(table) {
  return (req, res) => {
    const rawNames = Array.isArray(req.body?.names) ? req.body.names : [];
    const names = rawNames
      .filter((name) => typeof name === "string")
      .map((name) => name.trim())
      .filter((name) => name.length > 0)
      .slice(0, MAX_NAMES);

    if (names.length === 0) {
      return res
        .status(400)
        .json({ ok: false, error: "Не указано ни одного имени" });
    }

    insertNames(table, names);
    res.json({ ok: true, count: names.length });
  };
}

app.post("/api/notes/health", handleNotesSubmit("health"));
app.post("/api/notes/repose", handleNotesSubmit("repose"));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
