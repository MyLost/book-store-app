-- liquibase formatted sql

-- changeset midas:1735030554920-1
-- DROP DATABASE IF EXISTS bookStore

-- changeset midas:1735030554921-1
CREATE SEQUENCE if not exists revinfo_seq INCREMENT BY 50 START WITH 1;

-- changeset midas:1735030554921-2
CREATE TABLE if not exists revinfo
(
    rev      INT NOT NULL,
    revtstmp BIGINT NULL,
    CONSTRAINT pk_revinfo PRIMARY KEY (rev)
);

-- changeset midas:1735030555058-1
CREATE TABLE if not exists bookStore.api_token
(
    id         BIGINT AUTO_INCREMENT NOT NULL,
    token      VARCHAR(255) NULL,
    expired_at datetime NULL,
    user_id    BINARY(16) NOT NULL,
    token_type VARCHAR(255) NULL,
    revoked    BIT(1) NULL,
    expired    BIT(1) NULL,
    CONSTRAINT pk_api_token PRIMARY KEY (id)
);

-- changeset midas:1735030555058-2
CREATE TABLE if not exists bookStore.articles
(
    id           BIGINT AUTO_INCREMENT NOT NULL,
    title        VARCHAR(255) NULL,
    slug         VARCHAR(100) NULL,
    content      VARCHAR(255) NULL,
    published_at datetime NULL,
    CONSTRAINT pk_articles PRIMARY KEY (id)
);

-- changeset midas:1735030555058-3
CREATE TABLE if not exists bookStore.book_genres
(
    id           BIGINT AUTO_INCREMENT NOT NULL,
    name         VARCHAR(255) NULL,
    descriptions VARCHAR(255) NULL,
    CONSTRAINT pk_book_genres PRIMARY KEY (id)
);

-- changeset midas:1735030555058-4
CREATE TABLE if not exists bookStore.books
(
    id               BIGINT AUTO_INCREMENT NOT NULL,
    author           VARCHAR(255) NULL,
    title            VARCHAR(255) NULL,
    price            DECIMAL NULL,
    promotion        BIT(1) NULL,
    genre_id         BIGINT NULL,
    cover            VARCHAR(50) NULL,
    number_of_books  INT NULL,
    rating           INT NULL,
    cover_image      BLOB NULL,
    inventory_status VARCHAR(255) NULL,
    price_status     VARCHAR(255) NULL,
    CONSTRAINT pk_books PRIMARY KEY (id)
);

-- changeset midas:1735030555058-5
CREATE TABLE if not exists bookStore.comments
(
    id          BIGINT AUTO_INCREMENT NOT NULL,
    author_name VARCHAR(255) NULL,
    content     VARCHAR(255) NULL,
    article_id  BIGINT NOT NULL,
    CONSTRAINT pk_comments PRIMARY KEY (id)
);

-- changeset midas:1735030555058-6
CREATE TABLE if not exists bookStore.users
(
    id           BINARY(16) NOT NULL,
    first_name   VARCHAR(255) NULL,
    last_name    VARCHAR(255) NULL,
    username     VARCHAR(255) NULL,
    password     VARCHAR(255) NULL,
    born_on      date NULL,
    email        VARCHAR(255) NULL,
    is_active    BIT(1) NULL,
    `role`       SMALLINT NULL,
    phone_number VARCHAR(255) NULL,
    google_email VARCHAR(255) NULL,
    CONSTRAINT pk_users PRIMARY KEY (id)
);

-- changeset midas:1735030555058-7
ALTER TABLE bookStore.api_token
    ADD CONSTRAINT FK_API_TOKEN_ON_USER FOREIGN KEY IF NOT EXISTS (user_id) REFERENCES bookStore.users (id);

-- changeset midas:1735030555058-8
ALTER TABLE bookStore.books
    ADD CONSTRAINT FK_BOOKS_ON_GENRE FOREIGN KEY IF NOT EXISTS (genre_id) REFERENCES bookStore.book_genres (id);

-- changeset midas:1735030555058-9
ALTER TABLE bookStore.comments
    ADD CONSTRAINT FK_COMMENTS_ON_ARTICLE FOREIGN KEY IF NOT EXISTS (article_id) REFERENCES bookStore.articles (id);

-- changeset midas:1735030555058-10
SET FOREIGN_KEY_CHECKS = 0;
truncate bookStore.books;
truncate bookStore.book_genres;
SET FOREIGN_KEY_CHECKS = 1;

