CREATE TABLE CLIENT(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15),
    registry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    active TINYINT(1) DEFAULT 1
);

CREATE TABLE STYLE(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE FEE(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price FLOAT NOT NULL,
    description VARCHAR(255) NOT NULL,
    discount FLOAT,
    CONSTRAINT chk_fee_discount CHECK (discount <= 1 AND discount >= 0)
);

    CREATE TABLE PHOTOGRAPHER(
        id INT AUTO_INCREMENT PRIMARY KEY,  
        name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone_number VARCHAR(15),
        registry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        active TINYINT(1) DEFAULT 1,
        fee_id INT NOT NULL,
       -- CONSTRAINT fk_photographers_style FOREIGN KEY (style) REFERENCES STYLE(id),
        -- CONSTRAINT fk_photographers_fee FOREIGN KEY (fee_id) REFERENCES FEE(id)
    );

    CREATE TABLE BOOKING(
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_client INT NOT NULL,
        id_photographer INT NOT NULL,
        state INT NOT NULL,
        date DATE NOT NULL,
        CONSTRAINT fk_bookings_client FOREIGN KEY (id_client) REFERENCES CLIENT(id),
        CONSTRAINT fk_bookings_photographer FOREIGN KEY (id_photographer) REFERENCES PHOTOGRAPHER(id)
    );

    CREATE TABLE RATING(
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_booking INT NOT NULL,
        rating INT NOT NULL,
        comment VARCHAR(255) NOT NULL,
        date_rating DATE NOT NULL,
        CONSTRAINT fk_rating_photographer FOREIGN KEY (id_booking) REFERENCES BOOKING(id)
    );

    CREATE TABLE PHOTOGRAPHER_STYLE(
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_photographer INT NOT NULL,
        id_style INT NOT NULL,
        CONSTRAINT fk_photographer_style_photographer FOREIGN KEY (id_photographer) REFERENCES PHOTOGRAPHER(id),
        CONSTRAINT fk_photographer_style_style FOREIGN KEY (id_style) REFERENCES STYLE(id)
    );

    CREATE TABLE PHOTOGRAPHER_FEE(
    photographer_id INT NOT NULL,
    fee_id INT NOT NULL,
    PRIMARY KEY (photographer_id, fee_id),
    CONSTRAINT fk_photographer FOREIGN KEY (photographer_id) REFERENCES PHOTOGRAPHER(id),
    CONSTRAINT fk_fee FOREIGN KEY (fee_id) REFERENCES FEE(id)
    );


-- ALTER TABLE PHOTOGRAPHER DROP CONSTRAINT fk_photographers_style;