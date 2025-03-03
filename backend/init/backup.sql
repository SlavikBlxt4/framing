--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0 (Debian 17.0-1.pgdg110+1)
-- Dumped by pg_dump version 17.0 (Debian 17.0-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


--
-- Name: user_role; Type: TYPE; Schema: public; Owner: slavik
--

CREATE TYPE public.user_role AS ENUM (
    'client',
    'photographer'
);


ALTER TYPE public.user_role OWNER TO slavik;

--
-- Name: check_photographer_role(integer); Type: FUNCTION; Schema: public; Owner: slavik
--

CREATE FUNCTION public.check_photographer_role(photographer_id integer) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    user_role TEXT;
BEGIN
    -- Obtener el rol del usuario
    SELECT role INTO user_role FROM users WHERE id = photographer_id;

    -- Si el usuario no es 'PHOTOGRAPHER', lanzar error
    IF user_role <> 'PHOTOGRAPHER' THEN
        RAISE EXCEPTION 'Acción permitida solo para fotógrafos';
    END IF;
END;
$$;


ALTER FUNCTION public.check_photographer_role(photographer_id integer) OWNER TO slavik;

--
-- Name: enforce_booking_roles(); Type: FUNCTION; Schema: public; Owner: slavik
--

CREATE FUNCTION public.enforce_booking_roles() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Update this line to reference the correct table name
    IF (SELECT role FROM "users" WHERE id = NEW.client_id) <> 'CLIENT' THEN
        RAISE EXCEPTION 'Only clients can make bookings';
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.enforce_booking_roles() OWNER TO slavik;

--
-- Name: enforce_minimum_duration(); Type: FUNCTION; Schema: public; Owner: slavik
--

CREATE FUNCTION public.enforce_minimum_duration() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    min_duration INTEGER;
BEGIN
    -- Obtener la duración mínima del servicio reservado
    SELECT duracion_minima INTO min_duration FROM service WHERE id = NEW.service_id;

    -- Validar que la duración reservada sea igual o mayor a la mínima
    IF NEW.horas_reservadas < min_duration THEN
        RAISE EXCEPTION 'La reserva debe cumplir con la duración mínima establecida para este servicio';
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.enforce_minimum_duration() OWNER TO slavik;

--
-- Name: enforce_photographer_service(); Type: FUNCTION; Schema: public; Owner: slavik
--

CREATE FUNCTION public.enforce_photographer_service() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    PERFORM check_photographer_role(NEW.photographer_id);
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.enforce_photographer_service() OWNER TO slavik;

--
-- Name: enforce_user_fee_roles(); Type: FUNCTION; Schema: public; Owner: slavik
--

CREATE FUNCTION public.enforce_user_fee_roles() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Ensure photographer_id refers to a photographer
    IF (SELECT role FROM "User" WHERE id = NEW.photographer_id) <> 'photographer' THEN
        RAISE EXCEPTION 'photographer_id must refer to a user with the role photographer';
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.enforce_user_fee_roles() OWNER TO slavik;

--
-- Name: enforce_user_style_roles(); Type: FUNCTION; Schema: public; Owner: slavik
--

CREATE FUNCTION public.enforce_user_style_roles() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Ensure photographer_id refers to a photographer
    IF (SELECT role FROM "User" WHERE id = NEW.photographer_id) <> 'photographer' THEN
        RAISE EXCEPTION 'photographer_id must refer to a user with the role photographer';
    END IF;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.enforce_user_style_roles() OWNER TO slavik;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: slavik
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    phone_number character varying(255),
    registry_date timestamp(6) without time zone,
    active boolean DEFAULT true,
    role character varying(255) NOT NULL,
    description character varying(255),
    url_portfolio character varying(255),
    url_profile_image character varying(255)
);


ALTER TABLE public.users OWNER TO slavik;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: slavik
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO slavik;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: slavik
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public.users.id;


--
-- Name: booking; Type: TABLE; Schema: public; Owner: slavik
--

CREATE TABLE public.booking (
    id integer NOT NULL,
    client_id integer NOT NULL,
    booking_date timestamp(6) without time zone NOT NULL,
    state character varying(255) NOT NULL,
    service_id integer NOT NULL,
    date timestamp without time zone NOT NULL,
    url_images character varying(255),
    price double precision,
    booked_hours integer,
    CONSTRAINT booking_state_check CHECK (((state)::text = ANY (ARRAY[('active'::character varying)::text, ('done'::character varying)::text, ('cancelled'::character varying)::text, ('pending'::character varying)::text])))
);


ALTER TABLE public.booking OWNER TO slavik;

--
-- Name: booking_id_seq; Type: SEQUENCE; Schema: public; Owner: slavik
--

CREATE SEQUENCE public.booking_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.booking_id_seq OWNER TO slavik;

--
-- Name: booking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: slavik
--

ALTER SEQUENCE public.booking_id_seq OWNED BY public.booking.id;


--
-- Name: category; Type: TABLE; Schema: public; Owner: slavik
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255)
);


ALTER TABLE public.category OWNER TO slavik;

--
-- Name: week_days; Type: TABLE; Schema: public; Owner: slavik
--

CREATE TABLE public.week_days (
    id integer NOT NULL,
    name character varying(20) NOT NULL
);


ALTER TABLE public.week_days OWNER TO slavik;

--
-- Name: dias_semana_id_seq; Type: SEQUENCE; Schema: public; Owner: slavik
--

CREATE SEQUENCE public.dias_semana_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dias_semana_id_seq OWNER TO slavik;

--
-- Name: dias_semana_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: slavik
--

ALTER SEQUENCE public.dias_semana_id_seq OWNED BY public.week_days.id;


--
-- Name: favourites; Type: TABLE; Schema: public; Owner: slavik
--

CREATE TABLE public.favourites (
    id integer NOT NULL,
    user_id integer NOT NULL,
    service_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.favourites OWNER TO slavik;

--
-- Name: favoritos_id_seq; Type: SEQUENCE; Schema: public; Owner: slavik
--

CREATE SEQUENCE public.favoritos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.favoritos_id_seq OWNER TO slavik;

--
-- Name: favoritos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: slavik
--

ALTER SEQUENCE public.favoritos_id_seq OWNED BY public.favourites.id;


--
-- Name: photographer_availability; Type: TABLE; Schema: public; Owner: slavik
--

CREATE TABLE public.photographer_availability (
    id integer NOT NULL,
    photographer_id integer NOT NULL,
    day_id integer NOT NULL,
    schedule_id integer NOT NULL
);


ALTER TABLE public.photographer_availability OWNER TO slavik;

--
-- Name: fotografo_disponibilidad_id_seq; Type: SEQUENCE; Schema: public; Owner: slavik
--

CREATE SEQUENCE public.fotografo_disponibilidad_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.fotografo_disponibilidad_id_seq OWNER TO slavik;

--
-- Name: fotografo_disponibilidad_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: slavik
--

ALTER SEQUENCE public.fotografo_disponibilidad_id_seq OWNED BY public.photographer_availability.id;


--
-- Name: schedule; Type: TABLE; Schema: public; Owner: slavik
--

CREATE TABLE public.schedule (
    id integer NOT NULL,
    starting_hour time without time zone NOT NULL,
    ending_hour time without time zone NOT NULL
);


ALTER TABLE public.schedule OWNER TO slavik;

--
-- Name: horarios_id_seq; Type: SEQUENCE; Schema: public; Owner: slavik
--

CREATE SEQUENCE public.horarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.horarios_id_seq OWNER TO slavik;

--
-- Name: horarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: slavik
--

ALTER SEQUENCE public.horarios_id_seq OWNED BY public.schedule.id;


--
-- Name: locations; Type: TABLE; Schema: public; Owner: slavik
--

CREATE TABLE public.locations (
    id integer NOT NULL,
    photographer_id integer NOT NULL,
    coordinates public.geography(Point,4326) NOT NULL
);


ALTER TABLE public.locations OWNER TO slavik;

--
-- Name: locations_id_seq; Type: SEQUENCE; Schema: public; Owner: slavik
--

CREATE SEQUENCE public.locations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.locations_id_seq OWNER TO slavik;

--
-- Name: locations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: slavik
--

ALTER SEQUENCE public.locations_id_seq OWNED BY public.locations.id;


--
-- Name: rating; Type: TABLE; Schema: public; Owner: slavik
--

CREATE TABLE public.rating (
    id integer NOT NULL,
    rating integer,
    comment character varying(255),
    service_id integer NOT NULL,
    client_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT rating_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.rating OWNER TO slavik;

--
-- Name: rating_id_seq; Type: SEQUENCE; Schema: public; Owner: slavik
--

CREATE SEQUENCE public.rating_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rating_id_seq OWNER TO slavik;

--
-- Name: rating_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: slavik
--

ALTER SEQUENCE public.rating_id_seq OWNED BY public.rating.id;


--
-- Name: service; Type: TABLE; Schema: public; Owner: slavik
--

CREATE TABLE public.service (
    id integer NOT NULL,
    photographer_id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255),
    price double precision NOT NULL,
    category_id integer NOT NULL,
    discount numeric(5,2) DEFAULT 0,
    minimum_hours integer,
    CONSTRAINT service_discount_check CHECK (((discount >= (0)::numeric) AND (discount <= (100)::numeric))),
    CONSTRAINT service_duracion_minima_check CHECK ((minimum_hours >= 15))
);


ALTER TABLE public.service OWNER TO slavik;

--
-- Name: service_id_seq; Type: SEQUENCE; Schema: public; Owner: slavik
--

CREATE SEQUENCE public.service_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.service_id_seq OWNER TO slavik;

--
-- Name: service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: slavik
--

ALTER SEQUENCE public.service_id_seq OWNED BY public.service.id;


--
-- Name: style_id_seq; Type: SEQUENCE; Schema: public; Owner: slavik
--

CREATE SEQUENCE public.style_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.style_id_seq OWNER TO slavik;

--
-- Name: style_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: slavik
--

ALTER SEQUENCE public.style_id_seq OWNED BY public.category.id;


--
-- Name: booking id; Type: DEFAULT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.booking ALTER COLUMN id SET DEFAULT nextval('public.booking_id_seq'::regclass);


--
-- Name: category id; Type: DEFAULT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.style_id_seq'::regclass);


--
-- Name: favourites id; Type: DEFAULT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.favourites ALTER COLUMN id SET DEFAULT nextval('public.favoritos_id_seq'::regclass);


--
-- Name: locations id; Type: DEFAULT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.locations ALTER COLUMN id SET DEFAULT nextval('public.locations_id_seq'::regclass);


--
-- Name: photographer_availability id; Type: DEFAULT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.photographer_availability ALTER COLUMN id SET DEFAULT nextval('public.fotografo_disponibilidad_id_seq'::regclass);


--
-- Name: rating id; Type: DEFAULT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.rating ALTER COLUMN id SET DEFAULT nextval('public.rating_id_seq'::regclass);


--
-- Name: schedule id; Type: DEFAULT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.schedule ALTER COLUMN id SET DEFAULT nextval('public.horarios_id_seq'::regclass);


--
-- Name: service id; Type: DEFAULT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.service ALTER COLUMN id SET DEFAULT nextval('public.service_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Name: week_days id; Type: DEFAULT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.week_days ALTER COLUMN id SET DEFAULT nextval('public.dias_semana_id_seq'::regclass);


--
-- Data for Name: booking; Type: TABLE DATA; Schema: public; Owner: slavik
--

COPY public.booking (id, client_id, booking_date, state, service_id, date, url_images, price, booked_hours) FROM stdin;
16	11	2024-11-18 12:01:47.7044	active	55	2025-01-12 14:00:00	\N	\N	\N
17	1	2024-11-18 20:37:08.116424	done	55	2025-01-16 14:00:00	\N	\N	\N
18	1	2024-11-18 20:49:10.11312	done	55	2025-01-19 14:00:00	\N	\N	\N
19	11	2024-11-19 01:48:43.547593	done	57	2024-12-12 14:00:00	\N	\N	\N
20	11	2024-11-19 02:01:09.073132	pending	57	2025-01-12 14:00:00	\N	\N	\N
21	1	2024-11-19 02:06:26.32199	pending	57	2025-01-14 14:00:00	\N	\N	\N
23	1	2024-11-19 02:13:28.578145	pending	57	2025-02-14 14:00:00	\N	\N	\N
24	1	2024-11-19 02:16:23.267493	pending	57	2025-02-15 14:00:00	\N	\N	\N
22	1	2024-11-19 02:06:57.702641	active	57	2025-01-15 14:00:00	\N	\N	\N
25	1	2024-11-19 03:17:53.074478	pending	57	2025-02-01 14:00:00	\N	\N	\N
26	1	2024-11-19 03:20:09.4988	pending	57	2025-02-04 14:00:00	\N	\N	\N
27	1	2024-11-19 03:23:17.105656	pending	57	2026-01-01 14:00:00	\N	\N	\N
28	1	2024-11-19 03:30:21.282588	pending	57	2027-01-01 14:00:00	\N	\N	\N
29	1	2024-11-19 03:40:35.447439	pending	57	2029-01-01 14:00:00	\N	\N	\N
30	1	2024-11-19 03:49:38.308425	pending	57	2030-01-01 14:00:00	\N	\N	\N
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: slavik
--

COPY public.category (id, name, description) FROM stdin;
2	Retrato	Fotografía enfocada en capturar la esencia de una persona, ideal para perfiles y retratos familiares o de amigos.
3	Bodas	Fotografía de eventos nupciales, capturando momentos especiales, emociones y detalles significativos de la ceremonia y recepción.
4	Lifestyle	Fotografía casual y espontánea que refleja momentos de la vida cotidiana con un enfoque artístico y natural.
5	Moda	Fotografía centrada en ropa, estilo y tendencias, adecuada para editoriales de moda y contenido promocional.
6	Producto	Fotografía enfocada en destacar productos individuales o colecciones, ideal para e-commerce y publicidad.
7	Paisaje	Fotografía de la naturaleza, como montañas, playas y otros espacios al aire libre, destacando la belleza de los paisajes.
8	Arquitectura	Fotografía de edificios y estructuras, resaltando el diseño, simetría y estética arquitectónica.
9	Deportes	Fotografía de eventos deportivos, capturando momentos de acción y movimiento en diferentes disciplinas deportivas.
10	Comida	Fotografía especializada en la presentación de alimentos y bebidas, ideal para restaurantes y blogs de cocina.
11	Documental	Fotografía realista y narrativa, capturando momentos auténticos y cotidianos con un enfoque más íntimo y natural.
\.


--
-- Data for Name: favourites; Type: TABLE DATA; Schema: public; Owner: slavik
--

COPY public.favourites (id, user_id, service_id, created_at) FROM stdin;
1	1	57	2025-02-28 12:38:18.208666
\.


--
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: slavik
--

COPY public.locations (id, photographer_id, coordinates) FROM stdin;
3	2	0101000020E6100000C503CAA65CA10DC03ED00A0C59354440
\.


--
-- Data for Name: photographer_availability; Type: TABLE DATA; Schema: public; Owner: slavik
--

COPY public.photographer_availability (id, photographer_id, day_id, schedule_id) FROM stdin;
3	3	1	17
4	3	1	18
5	3	1	19
6	3	1	20
7	3	1	21
8	3	1	22
9	3	1	23
10	3	1	24
11	3	1	25
12	3	1	26
13	3	1	27
14	3	1	28
15	3	1	35
16	3	1	36
17	3	1	37
18	3	1	38
19	3	1	39
20	3	1	40
21	3	1	41
22	3	1	42
\.


--
-- Data for Name: rating; Type: TABLE DATA; Schema: public; Owner: slavik
--

COPY public.rating (id, rating, comment, service_id, client_id, created_at) FROM stdin;
5	5	Cojonudo!!	55	1	2024-11-18 22:02:13.509626
6	5	Un servicio cojonudo, para repetir!!!	57	11	2024-11-19 01:52:29.333637
\.


--
-- Data for Name: schedule; Type: TABLE DATA; Schema: public; Owner: slavik
--

COPY public.schedule (id, starting_hour, ending_hour) FROM stdin;
1	00:00:00	00:30:00
2	00:30:00	01:00:00
3	01:00:00	01:30:00
4	01:30:00	02:00:00
5	02:00:00	02:30:00
6	02:30:00	03:00:00
7	03:00:00	03:30:00
8	03:30:00	04:00:00
9	04:00:00	04:30:00
10	04:30:00	05:00:00
11	05:00:00	05:30:00
12	05:30:00	06:00:00
13	06:00:00	06:30:00
14	06:30:00	07:00:00
15	07:00:00	07:30:00
16	07:30:00	08:00:00
17	08:00:00	08:30:00
18	08:30:00	09:00:00
19	09:00:00	09:30:00
20	09:30:00	10:00:00
21	10:00:00	10:30:00
22	10:30:00	11:00:00
23	11:00:00	11:30:00
24	11:30:00	12:00:00
25	12:00:00	12:30:00
26	12:30:00	13:00:00
27	13:00:00	13:30:00
28	13:30:00	14:00:00
29	14:00:00	14:30:00
30	14:30:00	15:00:00
31	15:00:00	15:30:00
32	15:30:00	16:00:00
33	16:00:00	16:30:00
34	16:30:00	17:00:00
35	17:00:00	17:30:00
36	17:30:00	18:00:00
37	18:00:00	18:30:00
38	18:30:00	19:00:00
39	19:00:00	19:30:00
40	19:30:00	20:00:00
41	20:00:00	20:30:00
42	20:30:00	21:00:00
43	21:00:00	21:30:00
44	21:30:00	22:00:00
45	22:00:00	22:30:00
46	22:30:00	23:00:00
47	23:00:00	23:30:00
48	23:30:00	24:00:00
\.


--
-- Data for Name: service; Type: TABLE DATA; Schema: public; Owner: slavik
--

COPY public.service (id, photographer_id, name, description, price, category_id, discount, minimum_hours) FROM stdin;
55	2	servicio3	servicioooooo	3000	2	0.00	\N
57	2	servicio deportes	deportes	300	9	0.00	\N
59	3	Sesión de Retrato	Retrato profesional	150	2	0.00	\N
\.


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: slavik
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: slavik
--

COPY public.users (id, name, email, password_hash, phone_number, registry_date, active, role, description, url_portfolio, url_profile_image) FROM stdin;
1	Test	test@test.com	$2a$10$D1dkWK6pFK3WMSy0fu9ErucKQfHANRsvMKnV/YZpsbz5d7zZk6TkS	999999999	2024-11-01 20:17:04.562162	t	CLIENT	\N	\N	\N
3	ejemplo	ejemplo@ejemplo.com	$2a$10$S.KXWQbV1FDhpKiYCH3n6uDWl1DEu.BWUcpb.i1al2Tk2hshYyVdu	999999999	2024-11-04 08:37:58.63661	t	PHOTOGRAPHER	\N	\N	\N
4	fotografo 1	1@fotografo.com	$2a$10$XOYCXfFcgCcsmxVm9nCfCOxEB0JPOIXVAc/ARIhR7kdi82L7JvFmO	999999999	2024-11-04 12:41:07.121033	t	PHOTOGRAPHER	\N	\N	\N
5	fotografo 2	2@fotografo.com	$2a$10$DE.CCKiTH3c57mOa8xhfB.vDhj0A1u17aeOCjFFeYAmwrqgVmxCVC	666666666	2024-11-04 12:41:42.308834	t	PHOTOGRAPHER	\N	\N	\N
6	fotografo 3	3@fotografo.com	$2a$10$1zH.k8qR9glYv7ZVFz6/q.8E4K6SMXTi4esQUP6Wi6hLpB68G18My	888888888	2024-11-04 12:42:17.245764	t	PHOTOGRAPHER	\N	\N	\N
7	fotografo 5	5@fotografo.com	$2a$10$EBcwvlLjjdED9pfLpbUzcuh/6xo.5z/TCTf3emq//dUIyjYv4Q7gm	999999999	2024-11-04 12:42:38.674279	t	PHOTOGRAPHER	\N	\N	\N
8	cliente 1	1@cliente.com	$2a$10$C9BGWQP87Vg/gweKiIn2r.OUq1uEfh.nw6jzttNdEHUeeLr8z.ISK	111111111	2024-11-04 12:43:32.733257	t	CLIENT	\N	\N	\N
9	cliente 2	2@cliente.com	$2a$10$rqMwkmj8ZDGGH/qcltgmRuAZX3A4hF0cTl95ePqtkC0LVNVc1Fvvi	222222222	2024-11-04 12:43:47.898367	t	CLIENT	\N	\N	\N
10	cliente 3	3@cliente.com	$2a$10$jV9Q5g7.SAVvwI82wUsFDulZcLbyMdIgNmtrrQF.I29T5H/BI6f0i	888888888	2024-11-04 12:44:07.02887	t	CLIENT	\N	\N	\N
11	Slavik	slavikiftodii5@gmail.com	$2a$10$brgP5GeTvPTJ5DgipwL6RuiCwiy0QI.bBbh5MmZ01fcU3rU.WcXkK	642239216	2024-11-09 12:29:47.518399	t	CLIENT	\N	\N	\N
15	test10	test10@test.com	$2a$10$qPJbXaaOwhYHQm8ocvdsEeuSYwk6/mSMg4BJMgigwuuzWwV9NdynC	111111111	2024-11-09 13:17:58.173932	t	CLIENT	\N	\N	\N
16	Test14	test14@test.com	$2a$10$E1/jlDL8asT3WSqtAMV3NOB.gySy6c8MQux6zSBF6qsBg.OCp0MfK	999999999	2024-11-09 13:35:48.76944	t	CLIENT	\N	\N	\N
17	test15	test15@test.com	$2a$10$vkHNcln9J3yMKfj.181xQOCHkTs1aCe1bRbb18uK4AN0R2Dpl2ISe	555555555	2024-11-09 13:36:24.278162	t	PHOTOGRAPHER	\N	\N	\N
2	test2	test2@test.com	$2a$10$KE01aHWR2MuFOjrir6KE9u/QsTuNfe9.VgLMNu799VKxKdMLE/QYS	666666666	2024-11-02 18:57:16.912571	t	PHOTOGRAPHER	\N	\N	\N
\.


--
-- Data for Name: week_days; Type: TABLE DATA; Schema: public; Owner: slavik
--

COPY public.week_days (id, name) FROM stdin;
1	Lunes
2	Martes
3	Miércoles
4	Jueves
5	Viernes
6	Sábado
7	Domingo
\.


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: slavik
--

SELECT pg_catalog.setval('public."User_id_seq"', 17, true);


--
-- Name: booking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: slavik
--

SELECT pg_catalog.setval('public.booking_id_seq', 30, true);


--
-- Name: dias_semana_id_seq; Type: SEQUENCE SET; Schema: public; Owner: slavik
--

SELECT pg_catalog.setval('public.dias_semana_id_seq', 7, true);


--
-- Name: favoritos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: slavik
--

SELECT pg_catalog.setval('public.favoritos_id_seq', 1, true);


--
-- Name: fotografo_disponibilidad_id_seq; Type: SEQUENCE SET; Schema: public; Owner: slavik
--

SELECT pg_catalog.setval('public.fotografo_disponibilidad_id_seq', 22, true);


--
-- Name: horarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: slavik
--

SELECT pg_catalog.setval('public.horarios_id_seq', 48, true);


--
-- Name: locations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: slavik
--

SELECT pg_catalog.setval('public.locations_id_seq', 4, true);


--
-- Name: rating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: slavik
--

SELECT pg_catalog.setval('public.rating_id_seq', 6, true);


--
-- Name: service_id_seq; Type: SEQUENCE SET; Schema: public; Owner: slavik
--

SELECT pg_catalog.setval('public.service_id_seq', 59, true);


--
-- Name: style_id_seq; Type: SEQUENCE SET; Schema: public; Owner: slavik
--

SELECT pg_catalog.setval('public.style_id_seq', 11, true);


--
-- Name: users User_email_key; Type: CONSTRAINT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "User_email_key" UNIQUE (email);


--
-- Name: users User_pkey; Type: CONSTRAINT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: booking booking_pkey; Type: CONSTRAINT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.booking
    ADD CONSTRAINT booking_pkey PRIMARY KEY (id);


--
-- Name: week_days dias_semana_nombre_key; Type: CONSTRAINT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.week_days
    ADD CONSTRAINT dias_semana_nombre_key UNIQUE (name);


--
-- Name: week_days dias_semana_pkey; Type: CONSTRAINT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.week_days
    ADD CONSTRAINT dias_semana_pkey PRIMARY KEY (id);


--
-- Name: favourites favoritos_pkey; Type: CONSTRAINT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.favourites
    ADD CONSTRAINT favoritos_pkey PRIMARY KEY (id);


--
-- Name: favourites favoritos_user_id_service_id_key; Type: CONSTRAINT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.favourites
    ADD CONSTRAINT favoritos_user_id_service_id_key UNIQUE (user_id, service_id);


--
-- Name: photographer_availability fotografo_disponibilidad_fotografo_id_dia_id_horario_id_key; Type: CONSTRAINT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.photographer_availability
    ADD CONSTRAINT fotografo_disponibilidad_fotografo_id_dia_id_horario_id_key UNIQUE (photographer_id, day_id, schedule_id);


--
-- Name: photographer_availability fotografo_disponibilidad_pkey; Type: CONSTRAINT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.photographer_availability
    ADD CONSTRAINT fotografo_disponibilidad_pkey PRIMARY KEY (id);


--
-- Name: schedule horarios_pkey; Type: CONSTRAINT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT horarios_pkey PRIMARY KEY (id);


--
-- Name: locations locations_pkey; Type: CONSTRAINT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);


--
-- Name: rating rating_pkey; Type: CONSTRAINT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_pkey PRIMARY KEY (id);


--
-- Name: service service_pkey; Type: CONSTRAINT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.service
    ADD CONSTRAINT service_pkey PRIMARY KEY (id);


--
-- Name: category style_pkey; Type: CONSTRAINT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT style_pkey PRIMARY KEY (id);


--
-- Name: booking booking_role_check; Type: TRIGGER; Schema: public; Owner: slavik
--

CREATE TRIGGER booking_role_check BEFORE INSERT OR UPDATE ON public.booking FOR EACH ROW EXECUTE FUNCTION public.enforce_booking_roles();


--
-- Name: booking trigger_enforce_minimum_duration; Type: TRIGGER; Schema: public; Owner: slavik
--

CREATE TRIGGER trigger_enforce_minimum_duration BEFORE INSERT ON public.booking FOR EACH ROW EXECUTE FUNCTION public.enforce_minimum_duration();


--
-- Name: service trigger_enforce_photographer_service; Type: TRIGGER; Schema: public; Owner: slavik
--

CREATE TRIGGER trigger_enforce_photographer_service BEFORE INSERT ON public.service FOR EACH ROW EXECUTE FUNCTION public.enforce_photographer_service();


--
-- Name: booking booking_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.booking
    ADD CONSTRAINT booking_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: booking booking_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.booking
    ADD CONSTRAINT booking_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.service(id) ON DELETE SET NULL;


--
-- Name: rating fk_clientid_rating; Type: FK CONSTRAINT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT fk_clientid_rating FOREIGN KEY (client_id) REFERENCES public.users(id);


--
-- Name: photographer_availability fk_dia; Type: FK CONSTRAINT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.photographer_availability
    ADD CONSTRAINT fk_dia FOREIGN KEY (day_id) REFERENCES public.week_days(id) ON DELETE CASCADE;


--
-- Name: photographer_availability fk_fotografo; Type: FK CONSTRAINT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.photographer_availability
    ADD CONSTRAINT fk_fotografo FOREIGN KEY (photographer_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: photographer_availability fk_horario; Type: FK CONSTRAINT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.photographer_availability
    ADD CONSTRAINT fk_horario FOREIGN KEY (schedule_id) REFERENCES public.schedule(id) ON DELETE CASCADE;


--
-- Name: locations fk_photographer; Type: FK CONSTRAINT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT fk_photographer FOREIGN KEY (photographer_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: favourites fk_service; Type: FK CONSTRAINT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.favourites
    ADD CONSTRAINT fk_service FOREIGN KEY (service_id) REFERENCES public.service(id) ON DELETE CASCADE;


--
-- Name: favourites fk_user; Type: FK CONSTRAINT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.favourites
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: rating rating_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.service(id);


--
-- Name: service service_photographer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.service
    ADD CONSTRAINT service_photographer_id_fkey FOREIGN KEY (photographer_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: service service_style_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: slavik
--

ALTER TABLE ONLY public.service
    ADD CONSTRAINT service_style_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

