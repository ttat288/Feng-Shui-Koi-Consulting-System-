Use [master]

Drop DATABASE [FengShuiKoiConsultingSystem]
GO

CREATE DATABASE [FengShuiKoiConsultingSystem];
GO

USE [FengShuiKoiConsultingSystem];
GO

CREATE TABLE Role
(
  RoleID INT NOT NULL IDENTITY(1,1),
  RoleName VARCHAR(50) NOT NULL,
  PRIMARY KEY (RoleID)
);

CREATE TABLE AppUser
(
  UserID INT NOT NULL IDENTITY(1,1),
  UserCode NVARCHAR(36) NOT NULL UNIQUE,
  UserName VARCHAR(50) NOT NULL,
  Password VARCHAR(255) NOT NULL,
  RoleID INT NOT NULL,
  CreateDate DATE NOT NULL,
  IsActive BIT NOT NULL,
  Status INT NOT NULL,
  Fullname NVARCHAR(50),
  Phone VARCHAR(12),
  Dob DATE,
  Gender VARCHAR(6),
  UpdateBy INT,
  UpdateDate DATE,
  PRIMARY KEY (UserID),
  FOREIGN KEY (RoleID) REFERENCES Role(RoleID)
);

ALTER TABLE AppUser
ALTER COLUMN UserName VARCHAR(50) COLLATE SQL_Latin1_General_CP1_CS_AS;

ALTER TABLE AppUser
ALTER COLUMN Password VARCHAR(255) COLLATE SQL_Latin1_General_CP1_CS_AS;


CREATE TABLE RefreshToken
(
  RefreshTokenID INT NOT NULL IDENTITY(1,1),
  RefreshTokenCode NVARCHAR(36) NOT NULL UNIQUE,
  RefreshTokenValue NVARCHAR(255) NOT NULL,
  UserID INT NOT NULL,
  JwtID NVARCHAR(150) NOT NULL,
  IsUsed BIT NULL,
  IsRevoked BIT NULL,
  ExpiresAt DATETIME NOT NULL,
  CreatedAt DATETIME NOT NULL,
  PRIMARY KEY (RefreshTokenID),
  FOREIGN KEY (UserID) REFERENCES AppUser(UserID)
);

-- thông tin ảo cho appUser

-- Thông tin ảo cho bảng Role
INSERT INTO Role (RoleName) VALUES ('Admin');
INSERT INTO Role (RoleName) VALUES ('Member');


-- Thông tin ảo cho bảng AppUser
INSERT INTO AppUser (UserCode, UserName, Password, RoleID, CreateDate, IsActive, Status, Fullname, Phone, Dob, Gender, UpdateBy, UpdateDate) VALUES 
('9e2a9c0a-3f94-4b6a-8ef2-123456789012', 'admin', 'YeE2JKedsIRzqg6yRuJXIw==', 1, '2024-01-01', 1, 1, 'Admin User', '1234567890', '1970-01-01', 'Male', '1', '2024-01-01');

update AppUser 
set IsActive = 1
where UserCode = '9e2a9c0a-3f94-4b6a-8ef2-123456789012'

CREATE TABLE Destiny
(
	DestinyID INT NOT NULL IDENTITY(1,1),
	DestitnyName NVARCHAR(100) NOT NULL,
	PRIMARY KEY (DestinyID)
)

CREATE TABLE FishPond
(
	FishPondID INT NOT NULL IDENTITY(1,1),
	PondName NVARCHAR(100) NOT NULL,
	ImgURL NVARCHAR(MAX),
	Description NVARCHAR(MAX),
	DestinyID INT NOT NULL,
	PRIMARY KEY (FishPondID),
	FOREIGN KEY (DestinyID) REFERENCES Destiny(DestinyID)
)

CREATE TABLE KoiFish
(
	FishID INT NOT NULL IDENTITY(1,1),
	FishName NVARCHAR(100),
	ImgURL NVARCHAR(MAX),
	Description NVARCHAR(MAX),
	DestinyID INT NOT NULL,
	PRIMARY KEY (FishID),
	FOREIGN KEY (DestinyID) REFERENCES Destiny(DestinyID)
)

CREATE TABLE Blog
(
	BlogID INT NOT NULL IDENTITY(1,1),
	BlogTitle NVARCHAR(200),
	Description NVARCHAR(MAX),
	BlogImg  NVARCHAR(MAX),
	BlogData NVARCHAR(MAX),
	CreateDate DATETIME,
	UpdateDate DATETIME,
	Status INT,
	DestinyID INT NOT NULL,
	UserID INT NOT NULL,
	PRIMARY KEY (BlogID),
	FOREIGN KEY (DestinyID) REFERENCES Destiny(DestinyID),
	FOREIGN KEY (UserID) REFERENCES AppUser(UserID)
)

CREATE TABLE Comment
(
	CommentID INT NOT NULL IDENTITY(1,1),
	CommentData NVARCHAR(MAX),
	CreateDate DATETIME,
	UpdateDate DATETIME,
	Status INT,
	DestinyID INT NOT NULL,
	UserID INT NOT NULL,
	PRIMARY KEY (CommentID),
	FOREIGN KEY (DestinyID) REFERENCES Destiny(DestinyID),
	FOREIGN KEY (UserID) REFERENCES AppUser(UserID)
)

CREATE TABLE Rating
(
	RateID INT NOT NULL IDENTITY(1,1),
	BlogID INT NOT NULL,
	UserID INT NOT NULL,
	PRIMARY KEY (RateID),
	FOREIGN KEY (BlogID) REFERENCES Blog(BlogID),
	FOREIGN KEY (UserID) REFERENCES AppUser(UserID)
)

INSERT INTO Destiny (DestitnyName)
VALUES 
(N'Kim'),
(N'Mộc'),
(N'Thủy'),
(N'Hỏa'),
(N'Thổ');

INSERT INTO KoiFish (FishName, ImgURL, Description, DestinyID)
VALUES
(N'Koi Kim Ngân', '', N'Cá Koi thuộc hành Kim, mang lại sự thịnh vượng và tài lộc.', 1),
(N'Koi Thanh Mộc', '', N'Cá Koi thuộc hành Mộc, mang lại sự phát triển và đổi mới.', 2),
(N'Koi Bạch Thủy', '', N'Cá Koi thuộc hành Thủy, mang lại sự mát lành và an bình.', 3),
(N'Koi Hồng Hỏa', '', N'Cá Koi thuộc hành Hỏa, mang lại nhiệt huyết và năng lượng.', 4),
(N'Koi Vàng Thổ', '', N'Cá Koi thuộc hành Thổ, mang lại sự ổn định và bền vững.', 5);

INSERT INTO FishPond (PondName, ImgURL, Description, DestinyID)
VALUES
(N'Hồ Bạch Kim', '', N'Hồ cá mang yếu tố Kim, thích hợp cho những người mệnh Kim.', 1),
(N'Hồ Lục Mộc', '', N'Hồ cá mang yếu tố Mộc, tượng trưng cho sự tươi mới và sinh sôi.', 2),
(N'Hồ Thủy Tinh', '', N'Hồ cá mang yếu tố Thủy, giúp cân bằng và thư giãn.', 3),
(N'Hồ Hỏa Ngọc', '', N'Hồ cá mang yếu tố Hỏa, đại diện cho sự năng động và nhiệt tình.', 4),
(N'Hồ Địa Thổ', '', N'Hồ cá mang yếu tố Thổ, mang lại sự ổn định và vững chắc.', 5);
