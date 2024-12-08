-- 创建用户表
CREATE TABLE user (
    studentid BIGINT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    phonenumber BIGINT NOT NULL
);

-- 创建失物表
CREATE TABLE stuff (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    type BOOLEAN NOT NULL,
    name VARCHAR(255) NOT NULL,
    area VARCHAR(255) NOT NULL,
    photo LONGTEXT NOT NULL,
    FOREIGN KEY (username) REFERENCES user (username)
);
