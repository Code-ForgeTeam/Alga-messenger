-- Alga Messenger full DB reset (DANGEROUS: deletes all data)
-- 1) Run this file.
-- 2) Then run backend/sql/beget_init.sql to recreate schema.

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS support_messages;
DROP TABLE IF EXISTS support_tickets;
DROP TABLE IF EXISTS notification_dismissals;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS privacy_settings;
DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS push_tokens;
DROP TABLE IF EXISTS story_views;
DROP TABLE IF EXISTS stories;
DROP TABLE IF EXISTS message_reactions;
DROP TABLE IF EXISTS attachments;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS chat_read_state;
DROP TABLE IF EXISTS chat_participants;
DROP TABLE IF EXISTS chats;
DROP TABLE IF EXISTS users;

SET FOREIGN_KEY_CHECKS = 1;
