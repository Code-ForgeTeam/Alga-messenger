-- Alga Messenger DB bootstrap for SQL-only hosting (MySQL 8+)
-- Run this file in Beget SQL console.

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS users (
  id            CHAR(36) PRIMARY KEY,
  username      VARCHAR(64) NOT NULL UNIQUE,
  full_name     VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  avatar        VARCHAR(1024) NULL,
  bio           TEXT NULL,
  badge         VARCHAR(64) NULL,
  status        ENUM('online','offline','away','hidden') NOT NULL DEFAULT 'offline',
  last_seen     DATETIME NULL,
  is_banned     TINYINT(1) NOT NULL DEFAULT 0,
  ban_reason    VARCHAR(1024) NULL,
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS chats (
  id            CHAR(36) PRIMARY KEY,
  name          VARCHAR(255) NULL,
  type          ENUM('private','group','saved','ai') NOT NULL,
  avatar        VARCHAR(1024) NULL,
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS chat_participants (
  chat_id       CHAR(36) NOT NULL,
  user_id       CHAR(36) NOT NULL,
  archived      TINYINT(1) NOT NULL DEFAULT 0,
  pinned        TINYINT(1) NOT NULL DEFAULT 0,
  muted         TINYINT(1) NOT NULL DEFAULT 0,
  blocked       TINYINT(1) NOT NULL DEFAULT 0,
  unread_count  INT NOT NULL DEFAULT 0,
  PRIMARY KEY (chat_id, user_id),
  CONSTRAINT fk_cp_chat FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE,
  CONSTRAINT fk_cp_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS messages (
  id            CHAR(36) PRIMARY KEY,
  chat_id       CHAR(36) NOT NULL,
  user_id       CHAR(36) NOT NULL,
  text          TEXT NOT NULL,
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  edited        TINYINT(1) NOT NULL DEFAULT 0,
  edited_at     DATETIME NULL,
  reply_to_id   CHAR(36) NULL,
  CONSTRAINT fk_msg_chat FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE,
  CONSTRAINT fk_msg_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_msg_reply FOREIGN KEY (reply_to_id) REFERENCES messages(id) ON DELETE SET NULL,
  INDEX idx_messages_chat_created (chat_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS attachments (
  id            CHAR(36) PRIMARY KEY,
  message_id    CHAR(36) NOT NULL,
  name          VARCHAR(255) NOT NULL,
  url           VARCHAR(2048) NOT NULL,
  type          VARCHAR(64) NOT NULL,
  size          INT NOT NULL,
  CONSTRAINT fk_att_msg FOREIGN KEY (message_id) REFERENCES messages(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS contacts (
  id              CHAR(36) PRIMARY KEY,
  owner_user_id   CHAR(36) NOT NULL,
  contact_user_id CHAR(36) NOT NULL,
  display_name    VARCHAR(255) NOT NULL,
  UNIQUE KEY uq_contacts_owner_contact (owner_user_id, contact_user_id),
  CONSTRAINT fk_contacts_owner FOREIGN KEY (owner_user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_contacts_user FOREIGN KEY (contact_user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS privacy_settings (
  user_id            CHAR(36) PRIMARY KEY,
  last_seen          JSON NOT NULL,
  profile_photo      JSON NOT NULL,
  bio                JSON NOT NULL,
  search_by_username JSON NOT NULL,
  hide_read_time     TINYINT(1) NOT NULL DEFAULT 0,
  CONSTRAINT fk_priv_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS notifications (
  id                CHAR(36) PRIMARY KEY,
  title             VARCHAR(255) NULL,
  message           TEXT NULL,
  icon              VARCHAR(64) NULL,
  bg_color          VARCHAR(32) NULL,
  text_color        VARCHAR(32) NULL,
  button_text       VARCHAR(255) NULL,
  button_url        VARCHAR(2048) NULL,
  button_color      VARCHAR(32) NULL,
  button_text_color VARCHAR(32) NULL,
  dismissable       TINYINT(1) NOT NULL DEFAULT 1,
  show_once         TINYINT(1) NOT NULL DEFAULT 1,
  min_version_code  INT NOT NULL DEFAULT 1,
  is_active         TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS support_tickets (
  id            CHAR(36) PRIMARY KEY,
  author_id     CHAR(36) NOT NULL,
  agent_id      CHAR(36) NULL,
  category      VARCHAR(128) NOT NULL,
  subject       VARCHAR(255) NOT NULL,
  status        ENUM('open','in_progress','closed') NOT NULL DEFAULT 'open',
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  closed_at     DATETIME NULL,
  CONSTRAINT fk_ticket_author FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_ticket_agent FOREIGN KEY (agent_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS support_messages (
  id            CHAR(36) PRIMARY KEY,
  ticket_id     CHAR(36) NOT NULL,
  user_id       CHAR(36) NOT NULL,
  text          TEXT NOT NULL,
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_smsg_ticket FOREIGN KEY (ticket_id) REFERENCES support_tickets(id) ON DELETE CASCADE,
  CONSTRAINT fk_smsg_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
