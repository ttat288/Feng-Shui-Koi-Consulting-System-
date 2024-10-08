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