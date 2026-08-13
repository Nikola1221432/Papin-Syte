node -e "const sqlite3=require('sqlite3'); const db=new sqlite3.Database('./server/notes.db'); db.exec('DELETE FROM repose_notes;'); db.close();"
