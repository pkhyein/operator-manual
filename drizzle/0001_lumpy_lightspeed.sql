CREATE TABLE `files` (
	`id` int AUTO_INCREMENT NOT NULL,
	`key` varchar(512) NOT NULL,
	`url` text NOT NULL,
	`name` varchar(255) NOT NULL,
	`mimeType` varchar(100),
	`size` int,
	`uploadedBy` int NOT NULL,
	`description` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `files_id` PRIMARY KEY(`id`),
	CONSTRAINT `files_key_unique` UNIQUE(`key`)
);
--> statement-breakpoint
CREATE TABLE `manual_categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`order` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `manual_categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `manual_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`categoryId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`order` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `manual_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `search_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`query` varchar(255) NOT NULL,
	`resultCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `search_logs_id` PRIMARY KEY(`id`)
);
