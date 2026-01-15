import { eq, like } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, manualCategories, manualItems, files, searchLogs } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * 매뉴얼 카테고리 관련 함수
 */
export async function getManualCategories() {
  const db = await getDb();
  if (!db) return [];
  
  try {
    return await db.select().from(manualCategories).orderBy(manualCategories.order);
  } catch (error) {
    console.error("[Database] Failed to get manual categories:", error);
    return [];
  }
}

export async function getManualItemsByCategory(categoryId: number) {
  const db = await getDb();
  if (!db) return [];
  
  try {
    return await db
      .select()
      .from(manualItems)
      .where(eq(manualItems.categoryId, categoryId))
      .orderBy(manualItems.order);
  } catch (error) {
    console.error("[Database] Failed to get manual items:", error);
    return [];
  }
}

export async function searchManualContent(query: string) {
  const db = await getDb();
  if (!db) return [];
  
  try {
    const searchPattern = `%${query}%`;
    return await db
      .select()
      .from(manualItems)
      .where(
        // Search in title or content
        like(manualItems.title, searchPattern)
      );
  } catch (error) {
    console.error("[Database] Failed to search manual content:", error);
    return [];
  }
}

/**
 * 파일 관련 함수
 */
export async function getFiles() {
  const db = await getDb();
  if (!db) return [];
  
  try {
    return await db.select().from(files).orderBy(files.createdAt);
  } catch (error) {
    console.error("[Database] Failed to get files:", error);
    return [];
  }
}

export async function insertFile(fileData: {
  key: string;
  url: string;
  name: string;
  mimeType?: string;
  size?: number;
  uploadedBy: number;
  description?: string;
}) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  
  try {
    const result = await db.insert(files).values(fileData);
    return result;
  } catch (error) {
    console.error("[Database] Failed to insert file:", error);
    throw error;
  }
}

export async function deleteFile(fileId: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  
  try {
    return await db.delete(files).where(eq(files.id, fileId));
  } catch (error) {
    console.error("[Database] Failed to delete file:", error);
    throw error;
  }
}

/**
 * 검색 로그 관련 함수
 */
export async function logSearch(userId: number, query: string, resultCount: number) {
  const db = await getDb();
  if (!db) return;
  
  try {
    await db.insert(searchLogs).values({
      userId,
      query,
      resultCount,
    });
  } catch (error) {
    console.error("[Database] Failed to log search:", error);
  }
}
