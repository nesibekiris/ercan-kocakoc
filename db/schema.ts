import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const documents = sqliteTable('documents', { key: text('key').primaryKey(), value: text('value').notNull(), updatedAt: text('updated_at').notNull() });
export const revisions = sqliteTable('revisions', { id: integer('id').primaryKey({autoIncrement:true}), key: text('key').notNull(), value: text('value').notNull(), editor: text('editor').notNull(), createdAt: text('created_at').notNull() });
