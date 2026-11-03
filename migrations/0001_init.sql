-- LIRIS Drop 001 — initial schema
CREATE TABLE IF NOT EXISTS clearances (
  email TEXT PRIMARY KEY,
  access_key TEXT NOT NULL,
  preference TEXT NOT NULL DEFAULT 'All Editions',
  issued_at TEXT NOT NULL,
  utm_source TEXT DEFAULT '',
  utm_medium TEXT DEFAULT '',
  utm_campaign TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS emails (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  from_addr TEXT NOT NULL,
  to_addr TEXT NOT NULL,
  subject TEXT DEFAULT '',
  body TEXT DEFAULT '',
  received_at TEXT NOT NULL,
  message_id TEXT DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_emails_received ON emails (received_at);
CREATE INDEX IF NOT EXISTS idx_clearances_issued ON clearances (issued_at);
