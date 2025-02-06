create sequence "User_id_seq"
    as integer;
alter sequence "User_id_seq" owner to slavik;
create type user_role as enum ('client', 'photographer');
alter type user_role owner to slavik;
create table users
(
    id            integer default nextval('"User_id_seq"'::regclass) not null
        constraint "User_pkey"
            primary key,
    name          varchar(255)                                       not null,
    email         varchar(255)                                       not null
        constraint "User_email_key"
            unique,
    password_hash varchar(255)                                       not null,
    phone_number  varchar(255),
    registry_date timestamp(6),
    active        boolean default true,
    role          varchar(255)                                       not null
);
alter table users
    owner to slavik;
alter sequence "User_id_seq" owned by users.id;
create table style
(
    id          serial
        primary key,
    name        varchar(100) not null,
    description varchar(255)
);
alter table style
    owner to slavik;
create table fee
(
    id          serial
        primary key,
    name        varchar(100)   not null,
    price       numeric(10, 2) not null,
    description varchar(255)
);
alter table fee
    owner to slavik;
create table user_style
(
    photographer_id integer not null
        references users
            on delete cascade,
    style_id        integer not null
        references style
            on delete cascade,
    primary key (photographer_id, style_id)
);
alter table user_style
    owner to slavik;
create table user_fee
(
    photographer_id integer not null
        references users
            on delete cascade,
    fee_id          integer not null
        references fee
            on delete cascade,
    primary key (photographer_id, fee_id)
);
alter table user_fee
    owner to slavik;
create table service
(
    id              serial
        primary key,
    photographer_id integer      not null
        references users
            on delete cascade,
    name            varchar(255) not null,
    description     varchar(255),
    price           integer      not null,
    style_id        integer      not null
        references style
            on delete set null,
    availability    text
);
alter table service
    owner to slavik;
create table booking
(
    id           serial
        primary key,
    client_id    integer      not null
        references users
            on delete set null,
    booking_date timestamp(6) not null,
    date         timestamp(6),
    state        varchar(255) not null
        constraint booking_state_check
            check ((state)::text = ANY
                   ((ARRAY ['active'::character varying, 'done'::character varying, 'cancelled'::character varying])::text[])),
    service_id   integer      not null
        references service
            on delete set null
);
alter table booking
    owner to slavik;
create table rating
(
    id         serial
        primary key,
    booking_id integer not null
        references booking
            on delete cascade,
    rating     integer
        constraint rating_rating_check
            check ((rating >= 1) AND (rating <= 5)),
    comment    text
);
alter table rating
    owner to slavik;
create function enforce_booking_roles() returns trigger
    language plpgsql
as
$$
BEGIN
    -- Ensure client_id refers to a client
    IF (SELECT role FROM "User" WHERE id = NEW.client_id) <> 'client' THEN
        RAISE EXCEPTION 'client_id must refer to a user with the role client';
    END IF;
    -- Ensure photographer_id refers to a photographer
    IF (SELECT role FROM "User" WHERE id = NEW.photographer_id) <> 'photographer' THEN
        RAISE EXCEPTION 'photographer_id must refer to a user with the role photographer';
    END IF;
    RETURN NEW;
END;
$$;
alter function enforce_booking_roles() owner to slavik;
create trigger booking_role_check
    before insert or update
    on booking
    for each row
execute procedure enforce_booking_roles();
create function enforce_user_style_roles() returns trigger
    language plpgsql
as
$$
BEGIN
    -- Ensure photographer_id refers to a photographer
    IF (SELECT role FROM "User" WHERE id = NEW.photographer_id) <> 'photographer' THEN
        RAISE EXCEPTION 'photographer_id must refer to a user with the role photographer';
    END IF;
    RETURN NEW;
END;
$$;
alter function enforce_user_style_roles() owner to slavik;
create trigger user_style_role_check
    before insert or update
    on user_style
    for each row
execute procedure enforce_user_style_roles();
create function enforce_user_fee_roles() returns trigger
    language plpgsql
as
$$
BEGIN
    -- Ensure photographer_id refers to a photographer
    IF (SELECT role FROM "User" WHERE id = NEW.photographer_id) <> 'photographer' THEN
        RAISE EXCEPTION 'photographer_id must refer to a user with the role photographer';
    END IF;
    RETURN NEW;
END;
$$;
alter function enforce_user_fee_roles() owner to slavik;
create trigger user_fee_role_check
    before insert or update
    on user_fee
    for each row
execute procedure enforce_user_fee_roles();
