PGDMP                     	    z            machine-test    13.2    13.2     ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    34791    machine-test    DATABASE     j   CREATE DATABASE "machine-test" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_India.1252';
    DROP DATABASE "machine-test";
                postgres    false            ?            1259    34798    users    TABLE     ?   CREATE TABLE public.users (
    name character varying(100),
    email character varying(100),
    password character varying(100),
    token character varying(255),
    id integer NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            ?            1259    34803 
   users_data    TABLE     ?  CREATE TABLE public.users_data (
    user_id integer,
    father_name character varying(100),
    mother_name character varying(100),
    sibling character varying(50),
    children character varying(50),
    height character varying(20),
    eye_color character varying(20),
    weight double precision,
    hair_color character varying(20),
    gender character(6),
    body_measerment character varying(20),
    birth_place character varying(50),
    zodic_sign character varying(50),
    relign character varying(20),
    school character varying(50),
    graduation character varying(50),
    "homeTown" character varying(50),
    home_address character varying(50),
    id integer NOT NULL
);
    DROP TABLE public.users_data;
       public         heap    postgres    false            ?            1259    34820    users_data_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.users_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_data_id_seq;
       public          postgres    false    201            ?           0    0    users_data_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_data_id_seq OWNED BY public.users_data.id;
          public          postgres    false    203            ?            1259    34811    users_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    200            ?           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    202            *           2604    34813    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    202    200            +           2604    34822    users_data id    DEFAULT     n   ALTER TABLE ONLY public.users_data ALTER COLUMN id SET DEFAULT nextval('public.users_data_id_seq'::regclass);
 <   ALTER TABLE public.users_data ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    201            ?          0    34798    users 
   TABLE DATA           A   COPY public.users (name, email, password, token, id) FROM stdin;
    public          postgres    false    200   ?       ?          0    34803 
   users_data 
   TABLE DATA           ?   COPY public.users_data (user_id, father_name, mother_name, sibling, children, height, eye_color, weight, hair_color, gender, body_measerment, birth_place, zodic_sign, relign, school, graduation, "homeTown", home_address, id) FROM stdin;
    public          postgres    false    201   ?       ?           0    0    users_data_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_data_id_seq', 2, true);
          public          postgres    false    203            ?           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 1, true);
          public          postgres    false    202            /           2606    34824    users_data users_data_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.users_data
    ADD CONSTRAINT users_data_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.users_data DROP CONSTRAINT users_data_pkey;
       public            postgres    false    201            -           2606    34815    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    200            ?   ?   x??Mo?0 ??3??87?F??jG?$m7?˒?/i?v??D????M???R??L+??9?^?k?Ձ?W;*=??p?Q_p??ACp?$v?͚? ?YP?=?E?>%??	?GY?in?,??*?ٝB???&YU????????`???????R???XzD<=B~??"_ &??i?x??Lkp?c?d:Q??%??{?5?????t???????I?      ?   g   x?%?;? ??q
`L?`??Zy?1l
????)???	c?#<?-?(???ֽ??lc?o?}???U?W݀$?#?-???!X??%?ۿF??R?G?u     