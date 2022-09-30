--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: 0_todoNode; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "0_todoNode" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United Kingdom.1252';


ALTER DATABASE "0_todoNode" OWNER TO postgres;

\connect "0_todoNode"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Tag" (
    name text,
    id integer NOT NULL
);


ALTER TABLE public."Tag" OWNER TO postgres;

--
-- Name: TABLE "Tag"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."Tag" IS 'This is the table of tags';


--
-- Name: COLUMN "Tag".name; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."Tag".title IS 'This is the name of the tag';


--
-- Name: COLUMN "Tag".id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."Tag".id IS 'This is the id of the tag';


--
-- Name: Tag_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Tag" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Tag_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Todo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Todo" (
    id integer NOT NULL,
    title text,
    complete boolean NOT NULL,
    "order" integer,
    url text
);


ALTER TABLE public."Todo" OWNER TO postgres;

--
-- Name: TABLE "Todo"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public."Todo" IS 'This are the todos';


--
-- Name: COLUMN "Todo".id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."Todo".id IS 'This is the id column';


--
-- Name: COLUMN "Todo".title; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."Todo".title IS 'This is the main content of the todo';


--
-- Name: COLUMN "Todo".complete; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."Todo".completed IS 'The is the competion flag of the todo';


--
-- Name: COLUMN "Todo"."order"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."Todo"."order" IS 'This is the order of the todo';


--
-- Name: Todo_has_tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Todo_has_tag" (
    id_todo integer NOT NULL,
    id_tag integer NOT NULL
);


ALTER TABLE public."Todo_has_tag" OWNER TO postgres;

--
-- Name: Todos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."Todo" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Todos_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: Tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Tag" (title, id) FROM stdin;
\.


--
-- Data for Name: Todo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Todo" (id, title, completed, "order", url) FROM stdin;
1	build an API	f	1	http://localhost:8080/todo/1
2	?????	f	2	http://localhost:8080/todo/2
3	profit!	f	3	http://localhost:8080/todo/3
\.


--
-- Data for Name: Todo_has_tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Todo_has_tag" (id_todo, id_tag) FROM stdin;
\.


--
-- Name: Tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Tag_id_seq"', 1, false);


--
-- Name: Todos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Todos_id_seq"', 3, true);


--
-- Name: Todo pkey_tag; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Todo"
    ADD CONSTRAINT pkey_tag PRIMARY KEY (id);


--
-- Name: Tag pkey_todo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tag"
    ADD CONSTRAINT pkey_todo PRIMARY KEY (id);


--
-- Name: Todo_has_tag fkey_tag_id_tag; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Todo_has_tag"
    ADD CONSTRAINT fkey_tag_id_tag FOREIGN KEY (id_tag) REFERENCES public."Tag"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Todo_has_tag fkey_todo_is_todo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Todo_has_tag"
    ADD CONSTRAINT fkey_todo_is_todo FOREIGN KEY (id_todo) REFERENCES public."Todo"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

