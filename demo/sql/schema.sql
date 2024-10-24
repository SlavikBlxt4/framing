create table client
(
    id            serial
        primary key,
    name          varchar(255) not null,
    last_name     varchar(255) not null,
    email         varchar(255) not null
        unique,
    password      varchar(255) not null,
    phone_number  varchar(255)
        constraint chk_phone_length
            check ((char_length((phone_number)::text) >= 7) AND (char_length((phone_number)::text) <= 15)),
    registry_date timestamp default CURRENT_TIMESTAMP,
    active        boolean   default true
);

alter table client
    owner to slavik;

create table photographer
(
    id            serial
        primary key,
    name          varchar(255) not null,
    last_name     varchar(255) not null,
    email         varchar(255) not null
        unique,
    password      varchar(255) not null,
    phone_number  varchar(255),
    registry_date timestamp default CURRENT_TIMESTAMP,
    active        boolean   default true
);

alter table photographer
    owner to slavik;

create table fee
(
    id          serial
        primary key,
    name        varchar(100)     not null,
    price       double precision not null,
    description varchar(255)     not null,
    discount    double precision
        constraint fee_discount_check
            check ((discount <= (1)::double precision) AND (discount >= (0)::double precision))
);

alter table fee
    owner to slavik;

create table booking
(
    id              serial
        primary key,
    id_client       integer not null
        constraint fk_bookings_client
            references client,
    id_photographer integer not null
        constraint fk_bookings_photographer
            references photographer,
    state           varchar(100) not null,
    date            date    not null
);

alter table booking
    owner to slavik;

create table photographer_fee
(
    photographer_id integer not null
        constraint fk_photographer
            references photographer,
    fee_id          integer not null
        constraint fk_fee
            references fee,
    primary key (photographer_id, fee_id)
);

alter table photographer_fee
    owner to slavik;

create table style
(
    id          serial
        primary key,
    name        varchar(100) not null,
    description varchar(255) not null
);

alter table style
    owner to slavik;

create table rating
(
    id          serial
        primary key,
    id_booking  integer      not null
        constraint fk_rating_booking
            references booking,
    rating      integer      not null,
    comment     varchar(255) not null,
    date_rating date         not null
);

alter table rating
    owner to slavik;

create table photographer_style
(
    id              serial
        primary key,
    id_photographer integer not null
        constraint fk_photographer_style_photographer
            references photographer,
    id_style        integer not null
        constraint fk_photographer_style_style
            references style
);

alter table photographer_style
    owner to slavik;