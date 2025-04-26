--
-- PostgreSQL database dump
--

-- Dumped from database version 15.12 (Debian 15.12-1.pgdg120+1)
-- Dumped by pg_dump version 15.12 (Debian 15.12-1.pgdg120+1)

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
-- Name: achievements; Type: TABLE; Schema: public; Owner: kanagame_user_db
--

CREATE TABLE public.achievements (
    achievement_id integer NOT NULL,
    title character varying(50) NOT NULL,
    description text NOT NULL,
    icon character varying(100),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.achievements OWNER TO kanagame_user_db;

--
-- Name: achievements_achievement_id_seq; Type: SEQUENCE; Schema: public; Owner: kanagame_user_db
--

CREATE SEQUENCE public.achievements_achievement_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.achievements_achievement_id_seq OWNER TO kanagame_user_db;

--
-- Name: achievements_achievement_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kanagame_user_db
--

ALTER SEQUENCE public.achievements_achievement_id_seq OWNED BY public.achievements.achievement_id;


--
-- Name: kana_groups; Type: TABLE; Schema: public; Owner: kanagame_user_db
--

CREATE TABLE public.kana_groups (
    group_id integer NOT NULL,
    name character varying(50) NOT NULL,
    description text,
    display_order integer NOT NULL,
    is_hiragana boolean NOT NULL
);


ALTER TABLE public.kana_groups OWNER TO kanagame_user_db;

--
-- Name: kana_groups_group_id_seq; Type: SEQUENCE; Schema: public; Owner: kanagame_user_db
--

CREATE SEQUENCE public.kana_groups_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.kana_groups_group_id_seq OWNER TO kanagame_user_db;

--
-- Name: kana_groups_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kanagame_user_db
--

ALTER SEQUENCE public.kana_groups_group_id_seq OWNED BY public.kana_groups.group_id;


--
-- Name: kana_variants; Type: TABLE; Schema: public; Owner: kanagame_user_db
--

CREATE TABLE public.kana_variants (
    variant_id integer NOT NULL,
    base_kana_id integer,
    "character" character varying(10) NOT NULL,
    romaji character varying(10) NOT NULL,
    variant_type character varying(20) NOT NULL
);


ALTER TABLE public.kana_variants OWNER TO kanagame_user_db;

--
-- Name: kana_variants_variant_id_seq; Type: SEQUENCE; Schema: public; Owner: kanagame_user_db
--

CREATE SEQUENCE public.kana_variants_variant_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.kana_variants_variant_id_seq OWNER TO kanagame_user_db;

--
-- Name: kana_variants_variant_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kanagame_user_db
--

ALTER SEQUENCE public.kana_variants_variant_id_seq OWNED BY public.kana_variants.variant_id;


--
-- Name: kanas; Type: TABLE; Schema: public; Owner: kanagame_user_db
--

CREATE TABLE public.kanas (
    kana_id integer NOT NULL,
    "character" character varying(10) NOT NULL,
    romaji character varying(10) NOT NULL,
    group_id integer,
    display_order integer NOT NULL
);


ALTER TABLE public.kanas OWNER TO kanagame_user_db;

--
-- Name: kanas_kana_id_seq; Type: SEQUENCE; Schema: public; Owner: kanagame_user_db
--

CREATE SEQUENCE public.kanas_kana_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.kanas_kana_id_seq OWNER TO kanagame_user_db;

--
-- Name: kanas_kana_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kanagame_user_db
--

ALTER SEQUENCE public.kanas_kana_id_seq OWNED BY public.kanas.kana_id;


--
-- Name: kanji_examples; Type: TABLE; Schema: public; Owner: kanagame_user_db
--

CREATE TABLE public.kanji_examples (
    example_id integer NOT NULL,
    kanji_id integer,
    word character varying(50) NOT NULL,
    reading character varying(50) NOT NULL,
    meaning character varying(100)
);


ALTER TABLE public.kanji_examples OWNER TO kanagame_user_db;

--
-- Name: kanji_examples_example_id_seq; Type: SEQUENCE; Schema: public; Owner: kanagame_user_db
--

CREATE SEQUENCE public.kanji_examples_example_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.kanji_examples_example_id_seq OWNER TO kanagame_user_db;

--
-- Name: kanji_examples_example_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kanagame_user_db
--

ALTER SEQUENCE public.kanji_examples_example_id_seq OWNED BY public.kanji_examples.example_id;


--
-- Name: kanji_levels; Type: TABLE; Schema: public; Owner: kanagame_user_db
--

CREATE TABLE public.kanji_levels (
    level_id integer NOT NULL,
    name character varying(20) NOT NULL,
    description text,
    display_order integer NOT NULL
);


ALTER TABLE public.kanji_levels OWNER TO kanagame_user_db;

--
-- Name: kanji_levels_level_id_seq; Type: SEQUENCE; Schema: public; Owner: kanagame_user_db
--

CREATE SEQUENCE public.kanji_levels_level_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.kanji_levels_level_id_seq OWNER TO kanagame_user_db;

--
-- Name: kanji_levels_level_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kanagame_user_db
--

ALTER SEQUENCE public.kanji_levels_level_id_seq OWNED BY public.kanji_levels.level_id;


--
-- Name: kanji_meanings; Type: TABLE; Schema: public; Owner: kanagame_user_db
--

CREATE TABLE public.kanji_meanings (
    meaning_id integer NOT NULL,
    kanji_id integer,
    meaning character varying(100) NOT NULL,
    language_code character varying(5) DEFAULT 'fr'::character varying NOT NULL,
    is_primary boolean DEFAULT false NOT NULL
);


ALTER TABLE public.kanji_meanings OWNER TO kanagame_user_db;

--
-- Name: kanji_meanings_meaning_id_seq; Type: SEQUENCE; Schema: public; Owner: kanagame_user_db
--

CREATE SEQUENCE public.kanji_meanings_meaning_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.kanji_meanings_meaning_id_seq OWNER TO kanagame_user_db;

--
-- Name: kanji_meanings_meaning_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kanagame_user_db
--

ALTER SEQUENCE public.kanji_meanings_meaning_id_seq OWNED BY public.kanji_meanings.meaning_id;


--
-- Name: kanji_readings; Type: TABLE; Schema: public; Owner: kanagame_user_db
--

CREATE TABLE public.kanji_readings (
    reading_id integer NOT NULL,
    kanji_id integer,
    reading character varying(50) NOT NULL,
    reading_type character varying(10) NOT NULL,
    is_common boolean DEFAULT true NOT NULL
);


ALTER TABLE public.kanji_readings OWNER TO kanagame_user_db;

--
-- Name: kanji_readings_reading_id_seq; Type: SEQUENCE; Schema: public; Owner: kanagame_user_db
--

CREATE SEQUENCE public.kanji_readings_reading_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.kanji_readings_reading_id_seq OWNER TO kanagame_user_db;

--
-- Name: kanji_readings_reading_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kanagame_user_db
--

ALTER SEQUENCE public.kanji_readings_reading_id_seq OWNED BY public.kanji_readings.reading_id;


--
-- Name: kanjis; Type: TABLE; Schema: public; Owner: kanagame_user_db
--

CREATE TABLE public.kanjis (
    kanji_id integer NOT NULL,
    "character" character varying(10) NOT NULL,
    level_id integer,
    strokes integer NOT NULL,
    jlpt_level integer,
    school_grade integer
);


ALTER TABLE public.kanjis OWNER TO kanagame_user_db;

--
-- Name: kanjis_kanji_id_seq; Type: SEQUENCE; Schema: public; Owner: kanagame_user_db
--

CREATE SEQUENCE public.kanjis_kanji_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.kanjis_kanji_id_seq OWNER TO kanagame_user_db;

--
-- Name: kanjis_kanji_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kanagame_user_db
--

ALTER SEQUENCE public.kanjis_kanji_id_seq OWNED BY public.kanjis.kanji_id;


--
-- Name: session_logs; Type: TABLE; Schema: public; Owner: kanagame_user_db
--

CREATE TABLE public.session_logs (
    session_id integer NOT NULL,
    user_id integer,
    start_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    end_time timestamp without time zone,
    group_id integer,
    correct_answers integer DEFAULT 0 NOT NULL,
    wrong_answers integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.session_logs OWNER TO kanagame_user_db;

--
-- Name: session_logs_session_id_seq; Type: SEQUENCE; Schema: public; Owner: kanagame_user_db
--

CREATE SEQUENCE public.session_logs_session_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.session_logs_session_id_seq OWNER TO kanagame_user_db;

--
-- Name: session_logs_session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kanagame_user_db
--

ALTER SEQUENCE public.session_logs_session_id_seq OWNED BY public.session_logs.session_id;


--
-- Name: user_kanji_progress; Type: TABLE; Schema: public; Owner: kanagame_user_db
--

CREATE TABLE public.user_kanji_progress (
    progress_id integer NOT NULL,
    user_id integer NOT NULL,
    kanji_id integer NOT NULL,
    correct_count integer DEFAULT 0 NOT NULL,
    incorrect_count integer DEFAULT 0 NOT NULL,
    last_practiced timestamp without time zone,
    mastery_level integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.user_kanji_progress OWNER TO kanagame_user_db;

--
-- Name: user_kanji_progress_progress_id_seq; Type: SEQUENCE; Schema: public; Owner: kanagame_user_db
--

CREATE SEQUENCE public.user_kanji_progress_progress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_kanji_progress_progress_id_seq OWNER TO kanagame_user_db;

--
-- Name: user_kanji_progress_progress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kanagame_user_db
--

ALTER SEQUENCE public.user_kanji_progress_progress_id_seq OWNED BY public.user_kanji_progress.progress_id;


--
-- Name: user_progress; Type: TABLE; Schema: public; Owner: kanagame_user_db
--

CREATE TABLE public.user_progress (
    progress_id integer NOT NULL,
    user_id integer NOT NULL,
    kana_id integer NOT NULL,
    correct_count integer DEFAULT 0 NOT NULL,
    incorrect_count integer DEFAULT 0 NOT NULL,
    last_practiced timestamp without time zone,
    mastery_level integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.user_progress OWNER TO kanagame_user_db;

--
-- Name: user_progress_progress_id_seq; Type: SEQUENCE; Schema: public; Owner: kanagame_user_db
--

CREATE SEQUENCE public.user_progress_progress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_progress_progress_id_seq OWNER TO kanagame_user_db;

--
-- Name: user_progress_progress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kanagame_user_db
--

ALTER SEQUENCE public.user_progress_progress_id_seq OWNED BY public.user_progress.progress_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: kanagame_user_db
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password_hash character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_login timestamp without time zone,
    is_active boolean DEFAULT true NOT NULL,
    profile_image character varying(255)
);


ALTER TABLE public.users OWNER TO kanagame_user_db;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: kanagame_user_db
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO kanagame_user_db;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kanagame_user_db
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: achievements achievement_id; Type: DEFAULT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.achievements ALTER COLUMN achievement_id SET DEFAULT nextval('public.achievements_achievement_id_seq'::regclass);


--
-- Name: kana_groups group_id; Type: DEFAULT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.kana_groups ALTER COLUMN group_id SET DEFAULT nextval('public.kana_groups_group_id_seq'::regclass);


--
-- Name: kana_variants variant_id; Type: DEFAULT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.kana_variants ALTER COLUMN variant_id SET DEFAULT nextval('public.kana_variants_variant_id_seq'::regclass);


--
-- Name: kanas kana_id; Type: DEFAULT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.kanas ALTER COLUMN kana_id SET DEFAULT nextval('public.kanas_kana_id_seq'::regclass);


--
-- Name: kanji_examples example_id; Type: DEFAULT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.kanji_examples ALTER COLUMN example_id SET DEFAULT nextval('public.kanji_examples_example_id_seq'::regclass);


--
-- Name: kanji_levels level_id; Type: DEFAULT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.kanji_levels ALTER COLUMN level_id SET DEFAULT nextval('public.kanji_levels_level_id_seq'::regclass);


--
-- Name: kanji_meanings meaning_id; Type: DEFAULT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.kanji_meanings ALTER COLUMN meaning_id SET DEFAULT nextval('public.kanji_meanings_meaning_id_seq'::regclass);


--
-- Name: kanji_readings reading_id; Type: DEFAULT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.kanji_readings ALTER COLUMN reading_id SET DEFAULT nextval('public.kanji_readings_reading_id_seq'::regclass);


--
-- Name: kanjis kanji_id; Type: DEFAULT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.kanjis ALTER COLUMN kanji_id SET DEFAULT nextval('public.kanjis_kanji_id_seq'::regclass);


--
-- Name: session_logs session_id; Type: DEFAULT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.session_logs ALTER COLUMN session_id SET DEFAULT nextval('public.session_logs_session_id_seq'::regclass);


--
-- Name: user_kanji_progress progress_id; Type: DEFAULT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.user_kanji_progress ALTER COLUMN progress_id SET DEFAULT nextval('public.user_kanji_progress_progress_id_seq'::regclass);


--
-- Name: user_progress progress_id; Type: DEFAULT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.user_progress ALTER COLUMN progress_id SET DEFAULT nextval('public.user_progress_progress_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: achievements; Type: TABLE DATA; Schema: public; Owner: kanagame_user_db
--

COPY public.achievements (achievement_id, title, description, icon, created_at, user_id) FROM stdin;
\.


--
-- Data for Name: kana_groups; Type: TABLE DATA; Schema: public; Owner: kanagame_user_db
--

COPY public.kana_groups (group_id, name, description, display_order, is_hiragana) FROM stdin;
1	Voyelles	Les 5 voyelles de base en hiragana	1	t
2	K	Groupe des kanas commençant par K	2	t
3	S	Groupe des kanas commençant par S	3	t
4	T	Groupe des kanas commençant par T	4	t
5	N	Groupe des kanas commençant par N	5	t
6	H	Groupe des kanas commençant par H	6	t
7	M	Groupe des kanas commençant par M	7	t
8	Y	Groupe des kanas commençant par Y	8	t
9	R	Groupe des kanas commençant par R	9	t
10	W	Groupe des kanas commençant par W	10	t
11	N final	Le N final	11	t
12	Voyelles Katakana	Les 5 voyelles de base en katakana	12	f
13	K Katakana	Groupe des katakana commençant par K	13	f
14	S Katakana	Groupe des katakana commençant par S	14	f
15	T Katakana	Groupe des katakana commençant par T	15	f
16	N Katakana	Groupe des katakana commençant par N	16	f
17	H Katakana	Groupe des katakana commençant par H	17	f
18	M Katakana	Groupe des katakana commençant par M	18	f
19	Y Katakana	Groupe des katakana commençant par Y	19	f
20	R Katakana	Groupe des katakana commençant par R	20	f
21	W Katakana	Groupe des katakana commençant par W	21	f
22	N final Katakana	Le N final en katakana	22	f
\.


--
-- Data for Name: kana_variants; Type: TABLE DATA; Schema: public; Owner: kanagame_user_db
--

COPY public.kana_variants (variant_id, base_kana_id, "character", romaji, variant_type) FROM stdin;
1	6	が	ga	dakuten
2	7	ぎ	gi	dakuten
3	8	ぐ	gu	dakuten
4	9	げ	ge	dakuten
5	10	ご	go	dakuten
6	11	ざ	za	dakuten
7	12	じ	ji	dakuten
8	13	ず	zu	dakuten
9	14	ぜ	ze	dakuten
10	15	ぞ	zo	dakuten
11	16	だ	da	dakuten
12	17	ぢ	ji	dakuten
13	18	づ	zu	dakuten
14	19	で	de	dakuten
15	20	ど	do	dakuten
16	26	ば	ba	dakuten
17	27	び	bi	dakuten
18	28	ぶ	bu	dakuten
19	29	べ	be	dakuten
20	30	ぼ	bo	dakuten
21	16	ガ	ga	dakuten
22	17	ギ	gi	dakuten
23	18	グ	gu	dakuten
24	19	ゲ	ge	dakuten
25	20	ゴ	go	dakuten
26	26	ザ	za	dakuten
27	27	ジ	ji	dakuten
28	28	ズ	zu	dakuten
29	29	ゼ	ze	dakuten
30	30	ゾ	zo	dakuten
31	36	ダ	da	dakuten
32	37	ヂ	ji	dakuten
33	38	ヅ	zu	dakuten
34	39	デ	de	dakuten
35	40	ド	do	dakuten
36	56	バ	ba	dakuten
37	57	ビ	bi	dakuten
38	58	ブ	bu	dakuten
39	59	ベ	be	dakuten
40	60	ボ	bo	dakuten
41	56	パ	pa	handakuten
42	57	ピ	pi	handakuten
43	58	プ	pu	handakuten
44	59	ペ	pe	handakuten
45	60	ポ	po	handakuten
46	26	ぱ	pa	handakuten
47	27	ぴ	pi	handakuten
48	28	ぷ	pu	handakuten
49	29	ぺ	pe	handakuten
50	30	ぽ	po	handakuten
51	17	キャ	kya	yoon
52	17	キュ	kyu	yoon
53	17	キョ	kyo	yoon
54	27	シャ	sha	yoon
55	27	シュ	shu	yoon
56	27	ショ	sho	yoon
57	37	チャ	cha	yoon
58	37	チュ	chu	yoon
59	37	チョ	cho	yoon
60	47	ニャ	nya	yoon
61	47	ニュ	nyu	yoon
62	47	ニョ	nyo	yoon
63	57	ヒャ	hya	yoon
64	57	ヒュ	hyu	yoon
65	57	ヒョ	hyo	yoon
66	67	ミャ	mya	yoon
67	67	ミュ	myu	yoon
68	67	ミョ	myo	yoon
69	83	リャ	rya	yoon
70	83	リュ	ryu	yoon
71	83	リョ	ryo	yoon
72	17	ギャ	gya	dakuten-yoon
73	17	ギュ	gyu	dakuten-yoon
74	17	ギョ	gyo	dakuten-yoon
75	27	ジャ	ja	dakuten-yoon
76	27	ジュ	ju	dakuten-yoon
77	27	ジョ	jo	dakuten-yoon
78	57	ビャ	bya	dakuten-yoon
79	57	ビュ	byu	dakuten-yoon
80	57	ビョ	byo	dakuten-yoon
81	57	ピャ	pya	handakuten-yoon
82	57	ピュ	pyu	handakuten-yoon
83	57	ピョ	pyo	handakuten-yoon
84	8	ヴ	vu	foreign
85	58	ファ	fa	foreign-combo
86	58	フィ	fi	foreign-combo
87	58	フェ	fe	foreign-combo
88	58	フォ	fo	foreign-combo
89	39	ティ	ti	foreign-combo
90	40	トゥ	tu	foreign-combo
91	\N	ディ	di	foreign-combo
92	\N	ドゥ	du	foreign-combo
93	8	ウィ	wi	foreign-combo
94	8	ウェ	we	foreign-combo
95	8	ウォ	wo	foreign-combo
96	37	チェ	che	foreign-combo
97	27	シェ	she	foreign-combo
98	\N	ジェ	je	foreign-combo
\.


--
-- Data for Name: kanas; Type: TABLE DATA; Schema: public; Owner: kanagame_user_db
--

COPY public.kanas (kana_id, "character", romaji, group_id, display_order) FROM stdin;
1	あ	a	1	1
2	い	i	1	2
3	う	u	1	3
4	え	e	1	4
5	お	o	1	5
6	ア	a	12	1
7	イ	i	12	2
8	ウ	u	12	3
9	エ	e	12	4
10	オ	o	12	5
11	か	ka	2	1
12	き	ki	2	2
13	く	ku	2	3
14	け	ke	2	4
15	こ	ko	2	5
16	カ	ka	13	1
17	キ	ki	13	2
18	ク	ku	13	3
19	ケ	ke	13	4
20	コ	ko	13	5
21	さ	sa	3	1
22	し	shi	3	2
23	す	su	3	3
24	せ	se	3	4
25	そ	so	3	5
26	サ	sa	14	1
27	シ	shi	14	2
28	ス	su	14	3
29	セ	se	14	4
30	ソ	so	14	5
31	た	ta	4	1
32	ち	chi	4	2
33	つ	tsu	4	3
34	て	te	4	4
35	と	to	4	5
36	タ	ta	15	1
37	チ	chi	15	2
38	ツ	tsu	15	3
39	テ	te	15	4
40	ト	to	15	5
41	な	na	5	1
42	に	ni	5	2
43	ぬ	nu	5	3
44	ね	ne	5	4
45	の	no	5	5
46	ナ	na	16	1
47	ニ	ni	16	2
48	ヌ	nu	16	3
49	ネ	ne	16	4
50	ノ	no	16	5
51	は	ha	6	1
52	ひ	hi	6	2
53	ふ	fu	6	3
54	へ	he	6	4
55	ほ	ho	6	5
56	ハ	ha	17	1
57	ヒ	hi	17	2
58	フ	fu	17	3
59	ヘ	he	17	4
60	ホ	ho	17	5
61	ま	ma	7	1
62	み	mi	7	2
63	む	mu	7	3
64	め	me	7	4
65	も	mo	7	5
66	マ	ma	18	1
67	ミ	mi	18	2
68	ム	mu	18	3
69	メ	me	18	4
70	モ	mo	18	5
71	や	ya	8	1
72	ゆ	yu	8	2
73	よ	yo	8	3
74	ヤ	ya	19	1
75	ユ	yu	19	2
76	ヨ	yo	19	3
77	ら	ra	9	1
78	り	ri	9	2
79	る	ru	9	3
80	れ	re	9	4
81	ろ	ro	9	5
82	ラ	ra	20	1
83	リ	ri	20	2
84	ル	ru	20	3
85	レ	re	20	4
86	ロ	ro	20	5
87	わ	wa	10	1
88	を	wo	10	2
89	ワ	wa	21	1
90	ヲ	wo	21	2
91	ん	n	11	1
92	ン	n	22	1
93	ー	-	22	2
94	・	·	22	3
95	゛	″	22	4
96	゜	°	22	5
97	ッ	small tsu	22	6
98	ャ	small ya	22	7
99	ュ	small yu	22	8
100	ョ	small yo	22	9
101	ァ	small a	22	10
102	ィ	small i	22	11
103	ゥ	small u	22	12
104	ェ	small e	22	13
105	ォ	small o	22	14
\.


--
-- Data for Name: kanji_examples; Type: TABLE DATA; Schema: public; Owner: kanagame_user_db
--

COPY public.kanji_examples (example_id, kanji_id, word, reading, meaning) FROM stdin;
\.


--
-- Data for Name: kanji_levels; Type: TABLE DATA; Schema: public; Owner: kanagame_user_db
--

COPY public.kanji_levels (level_id, name, description, display_order) FROM stdin;
\.


--
-- Data for Name: kanji_meanings; Type: TABLE DATA; Schema: public; Owner: kanagame_user_db
--

COPY public.kanji_meanings (meaning_id, kanji_id, meaning, language_code, is_primary) FROM stdin;
\.


--
-- Data for Name: kanji_readings; Type: TABLE DATA; Schema: public; Owner: kanagame_user_db
--

COPY public.kanji_readings (reading_id, kanji_id, reading, reading_type, is_common) FROM stdin;
\.


--
-- Data for Name: kanjis; Type: TABLE DATA; Schema: public; Owner: kanagame_user_db
--

COPY public.kanjis (kanji_id, "character", level_id, strokes, jlpt_level, school_grade) FROM stdin;
\.


--
-- Data for Name: session_logs; Type: TABLE DATA; Schema: public; Owner: kanagame_user_db
--

COPY public.session_logs (session_id, user_id, start_time, end_time, group_id, correct_answers, wrong_answers) FROM stdin;
\.


--
-- Data for Name: user_kanji_progress; Type: TABLE DATA; Schema: public; Owner: kanagame_user_db
--

COPY public.user_kanji_progress (progress_id, user_id, kanji_id, correct_count, incorrect_count, last_practiced, mastery_level) FROM stdin;
\.


--
-- Data for Name: user_progress; Type: TABLE DATA; Schema: public; Owner: kanagame_user_db
--

COPY public.user_progress (progress_id, user_id, kana_id, correct_count, incorrect_count, last_practiced, mastery_level) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: kanagame_user_db
--

COPY public.users (user_id, username, email, password_hash, created_at, last_login, is_active, profile_image) FROM stdin;
\.


--
-- Name: achievements_achievement_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kanagame_user_db
--

SELECT pg_catalog.setval('public.achievements_achievement_id_seq', 1, false);


--
-- Name: kana_groups_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kanagame_user_db
--

SELECT pg_catalog.setval('public.kana_groups_group_id_seq', 22, true);


--
-- Name: kana_variants_variant_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kanagame_user_db
--

SELECT pg_catalog.setval('public.kana_variants_variant_id_seq', 98, true);


--
-- Name: kanas_kana_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kanagame_user_db
--

SELECT pg_catalog.setval('public.kanas_kana_id_seq', 105, true);


--
-- Name: kanji_examples_example_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kanagame_user_db
--

SELECT pg_catalog.setval('public.kanji_examples_example_id_seq', 1, false);


--
-- Name: kanji_levels_level_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kanagame_user_db
--

SELECT pg_catalog.setval('public.kanji_levels_level_id_seq', 1, false);


--
-- Name: kanji_meanings_meaning_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kanagame_user_db
--

SELECT pg_catalog.setval('public.kanji_meanings_meaning_id_seq', 1, false);


--
-- Name: kanji_readings_reading_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kanagame_user_db
--

SELECT pg_catalog.setval('public.kanji_readings_reading_id_seq', 1, false);


--
-- Name: kanjis_kanji_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kanagame_user_db
--

SELECT pg_catalog.setval('public.kanjis_kanji_id_seq', 1, false);


--
-- Name: session_logs_session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kanagame_user_db
--

SELECT pg_catalog.setval('public.session_logs_session_id_seq', 1, false);


--
-- Name: user_kanji_progress_progress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kanagame_user_db
--

SELECT pg_catalog.setval('public.user_kanji_progress_progress_id_seq', 1, false);


--
-- Name: user_progress_progress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kanagame_user_db
--

SELECT pg_catalog.setval('public.user_progress_progress_id_seq', 1, false);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: kanagame_user_db
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, false);


--
-- Name: achievements achievements_pkey; Type: CONSTRAINT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.achievements
    ADD CONSTRAINT achievements_pkey PRIMARY KEY (achievement_id);


--
-- Name: kana_groups kana_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.kana_groups
    ADD CONSTRAINT kana_groups_pkey PRIMARY KEY (group_id);


--
-- Name: kana_variants kana_variants_pkey; Type: CONSTRAINT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.kana_variants
    ADD CONSTRAINT kana_variants_pkey PRIMARY KEY (variant_id);


--
-- Name: kanas kanas_pkey; Type: CONSTRAINT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.kanas
    ADD CONSTRAINT kanas_pkey PRIMARY KEY (kana_id);


--
-- Name: kanji_examples kanji_examples_pkey; Type: CONSTRAINT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.kanji_examples
    ADD CONSTRAINT kanji_examples_pkey PRIMARY KEY (example_id);


--
-- Name: kanji_levels kanji_levels_pkey; Type: CONSTRAINT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.kanji_levels
    ADD CONSTRAINT kanji_levels_pkey PRIMARY KEY (level_id);


--
-- Name: kanji_meanings kanji_meanings_pkey; Type: CONSTRAINT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.kanji_meanings
    ADD CONSTRAINT kanji_meanings_pkey PRIMARY KEY (meaning_id);


--
-- Name: kanji_readings kanji_readings_pkey; Type: CONSTRAINT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.kanji_readings
    ADD CONSTRAINT kanji_readings_pkey PRIMARY KEY (reading_id);


--
-- Name: kanjis kanjis_pkey; Type: CONSTRAINT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.kanjis
    ADD CONSTRAINT kanjis_pkey PRIMARY KEY (kanji_id);


--
-- Name: session_logs session_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.session_logs
    ADD CONSTRAINT session_logs_pkey PRIMARY KEY (session_id);


--
-- Name: user_kanji_progress user_kanji_progress_pkey; Type: CONSTRAINT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.user_kanji_progress
    ADD CONSTRAINT user_kanji_progress_pkey PRIMARY KEY (progress_id);


--
-- Name: user_progress user_progress_pkey; Type: CONSTRAINT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.user_progress
    ADD CONSTRAINT user_progress_pkey PRIMARY KEY (progress_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: achievements achievements_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.achievements
    ADD CONSTRAINT achievements_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: kana_variants kana_variants_base_kana_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.kana_variants
    ADD CONSTRAINT kana_variants_base_kana_id_fkey FOREIGN KEY (base_kana_id) REFERENCES public.kanas(kana_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: kanas kanas_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.kanas
    ADD CONSTRAINT kanas_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.kana_groups(group_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: kanji_examples kanji_examples_kanji_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.kanji_examples
    ADD CONSTRAINT kanji_examples_kanji_id_fkey FOREIGN KEY (kanji_id) REFERENCES public.kanjis(kanji_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: kanji_meanings kanji_meanings_kanji_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.kanji_meanings
    ADD CONSTRAINT kanji_meanings_kanji_id_fkey FOREIGN KEY (kanji_id) REFERENCES public.kanjis(kanji_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: kanji_readings kanji_readings_kanji_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.kanji_readings
    ADD CONSTRAINT kanji_readings_kanji_id_fkey FOREIGN KEY (kanji_id) REFERENCES public.kanjis(kanji_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: kanjis kanjis_level_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.kanjis
    ADD CONSTRAINT kanjis_level_id_fkey FOREIGN KEY (level_id) REFERENCES public.kanji_levels(level_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: session_logs session_logs_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.session_logs
    ADD CONSTRAINT session_logs_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.kana_groups(group_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: session_logs session_logs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.session_logs
    ADD CONSTRAINT session_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: user_kanji_progress user_kanji_progress_kanji_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.user_kanji_progress
    ADD CONSTRAINT user_kanji_progress_kanji_id_fkey FOREIGN KEY (kanji_id) REFERENCES public.kanjis(kanji_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: user_kanji_progress user_kanji_progress_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.user_kanji_progress
    ADD CONSTRAINT user_kanji_progress_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: user_progress user_progress_kana_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.user_progress
    ADD CONSTRAINT user_progress_kana_id_fkey FOREIGN KEY (kana_id) REFERENCES public.kanas(kana_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: user_progress user_progress_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kanagame_user_db
--

ALTER TABLE ONLY public.user_progress
    ADD CONSTRAINT user_progress_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

