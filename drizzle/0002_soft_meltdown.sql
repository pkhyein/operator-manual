CREATE TABLE `manual_item_images` (
	`id` int AUTO_INCREMENT NOT NULL,
	`itemId` int NOT NULL,
	`imageKey` varchar(512) NOT NULL,
	`imageUrl` text NOT NULL,
	`imageName` varchar(255) NOT NULL,
	`mimeType` varchar(100),
	`size` int,
	`order` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `manual_item_images_id` PRIMARY KEY(`id`)
);
