--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: tasks; Type: TABLE; Schema: public; Owner: jeevanndc
--

CREATE TABLE tasks (
    id integer NOT NULL,
    description text NOT NULL,
    status boolean NOT NULL
);


ALTER TABLE tasks OWNER TO jeevanndc;

--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: jeevanndc
--

CREATE SEQUENCE tasks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tasks_id_seq OWNER TO jeevanndc;

--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jeevanndc
--

ALTER SEQUENCE tasks_id_seq OWNED BY tasks.id;


--
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: jeevanndc
--

ALTER TABLE ONLY tasks ALTER COLUMN id SET DEFAULT nextval('tasks_id_seq'::regclass);


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: jeevanndc
--

COPY tasks (id, description, status) FROM stdin;
614	test todo 1	f
615	2	f
616	3	f
617	abc	f
618	qwerty	f
\.


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jeevanndc
--

SELECT pg_catalog.setval('tasks_id_seq', 618, true);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: jeevanndc
--

ALTER TABLE ONLY tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

