import { eq, like } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, manualCategories, manualItems, files, searchLogs, manualItemImages } from "../drizzle/schema";
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


/**
 * 카테고리 CRUD 함수
 */
export async function createCategory(data: { title: string; description?: string; order?: number }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  try {
    const result = await db.insert(manualCategories).values({
      title: data.title,
      description: data.description,
      order: data.order ?? 0,
    });
    return result;
  } catch (error) {
    console.error("[Database] Failed to create category:", error);
    throw error;
  }
}

export async function updateCategory(id: number, data: { title?: string; description?: string; order?: number }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  try {
    const updateData: Record<string, any> = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.order !== undefined) updateData.order = data.order;
    
    return await db.update(manualCategories).set(updateData).where(eq(manualCategories.id, id));
  } catch (error) {
    console.error("[Database] Failed to update category:", error);
    throw error;
  }
}

export async function deleteCategory(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  try {
    // 카테고리 삭제 전 하위 항목들도 삭제
    await db.delete(manualItems).where(eq(manualItems.categoryId, id));
    return await db.delete(manualCategories).where(eq(manualCategories.id, id));
  } catch (error) {
    console.error("[Database] Failed to delete category:", error);
    throw error;
  }
}

/**
 * 항목 CRUD 함수
 */
export async function createItem(data: { categoryId: number; title: string; content: string; order?: number }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  try {
    const result = await db.insert(manualItems).values({
      categoryId: data.categoryId,
      title: data.title,
      content: data.content,
      order: data.order ?? 0,
    });
    return result;
  } catch (error) {
    console.error("[Database] Failed to create item:", error);
    throw error;
  }
}

export async function updateItem(id: number, data: { title?: string; content?: string; order?: number }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  try {
    const updateData: Record<string, any> = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.content !== undefined) updateData.content = data.content;
    if (data.order !== undefined) updateData.order = data.order;
    
    return await db.update(manualItems).set(updateData).where(eq(manualItems.id, id));
  } catch (error) {
    console.error("[Database] Failed to update item:", error);
    throw error;
  }
}

export async function deleteItem(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  try {
    return await db.delete(manualItems).where(eq(manualItems.id, id));
  } catch (error) {
    console.error("[Database] Failed to delete item:", error);
    throw error;
  }
}


/**
 * 항목 이미지 CRUD 함수
 */
export async function createItemImage(data: { itemId: number; imageKey: string; imageUrl: string; imageName: string; mimeType?: string; size?: number; order?: number }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  try {
    const result = await db.insert(manualItemImages).values({
      itemId: data.itemId,
      imageKey: data.imageKey,
      imageUrl: data.imageUrl,
      imageName: data.imageName,
      mimeType: data.mimeType,
      size: data.size,
      order: data.order ?? 0,
    });
    return result;
  } catch (error) {
    console.error("[Database] Failed to create item image:", error);
    throw error;
  }
}

export async function getItemImages(itemId: number) {
  const db = await getDb();
  if (!db) return [];
  
  try {
    return await db.select().from(manualItemImages).where(eq(manualItemImages.itemId, itemId)).orderBy(manualItemImages.order);
  } catch (error) {
    console.error("[Database] Failed to get item images:", error);
    return [];
  }
}

export async function deleteItemImage(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  try {
    return await db.delete(manualItemImages).where(eq(manualItemImages.id, id));
  } catch (error) {
    console.error("[Database] Failed to delete item image:", error);
    throw error;
  }
}

export async function updateItemImageOrder(id: number, order: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  try {
    return await db.update(manualItemImages).set({ order }).where(eq(manualItemImages.id, id));
  } catch (error) {
    console.error("[Database] Failed to update item image order:", error);
    throw error;
  }
}
