-- Table des utilisateurs pour la connexion et l'authentification
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    profile_image VARCHAR(255)
);

-- Table des groupes de kanas (hiragana divisés en groupes logiques pour l'apprentissage)
CREATE TABLE kana_groups (
    group_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    display_order INT NOT NULL,
    is_hiragana BOOLEAN NOT NULL -- TRUE pour hiragana, FALSE pour katakana
);

-- Table principale des kanas (caractères de base)
CREATE TABLE kanas (
    kana_id SERIAL PRIMARY KEY,
    character VARCHAR(10) NOT NULL,
    romaji VARCHAR(10) NOT NULL,
    group_id INT REFERENCES kana_groups(group_id),
    display_order INT NOT NULL
);

-- Table des variantes de kanas (dakuten, handakuten, etc.)
CREATE TABLE kana_variants (
    variant_id SERIAL PRIMARY KEY,
    base_kana_id INT REFERENCES kanas(kana_id),
    character VARCHAR(10) NOT NULL,
    romaji VARCHAR(10) NOT NULL,
    variant_type VARCHAR(20) NOT NULL -- ex: 'dakuten', 'handakuten', 'yoon', etc.
);

-- Table pour enregistrer les sessions d'apprentissage des utilisateurs
CREATE TABLE session_logs (
    session_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP,
    group_id INT REFERENCES kana_groups(group_id),
    correct_answers INT DEFAULT 0,
    wrong_answers INT DEFAULT 0
);

-- Table pour suivre la progression de l'utilisateur par kana
CREATE TABLE user_progress (
    progress_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    kana_id INT REFERENCES kanas(kana_id),
    correct_count INT DEFAULT 0,
    incorrect_count INT DEFAULT 0,
    last_practiced TIMESTAMP,
    mastery_level INT DEFAULT 0 -- 0-10 niveau de maîtrise
);

-- Table des niveaux JLPT ou grades scolaires
CREATE TABLE kanji_levels (
    level_id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL, -- ex: "JLPT N5", "Grade 1", etc.
    description TEXT,
    display_order INT NOT NULL
);

-- Table principale des kanji
CREATE TABLE kanjis (
    kanji_id SERIAL PRIMARY KEY,
    character VARCHAR(10) NOT NULL,
    level_id INT REFERENCES kanji_levels(level_id),
    strokes INT NOT NULL, -- nombre de traits
    jlpt_level INT,       -- niveau JLPT (5 à 1)
    school_grade INT      -- niveau scolaire japonais (1 à 6)
);

-- Table des lectures des kanji
CREATE TABLE kanji_readings (
    reading_id SERIAL PRIMARY KEY,
    kanji_id INT REFERENCES kanjis(kanji_id),
    reading VARCHAR(50) NOT NULL,
    reading_type VARCHAR(10) NOT NULL, -- 'onyomi' ou 'kunyomi'
    is_common BOOLEAN DEFAULT TRUE
);

-- Table des significations des kanji
CREATE TABLE kanji_meanings (
    meaning_id SERIAL PRIMARY KEY,
    kanji_id INT REFERENCES kanjis(kanji_id),
    meaning VARCHAR(100) NOT NULL,
    language_code VARCHAR(5) DEFAULT 'fr', -- langue de la signification
    is_primary BOOLEAN DEFAULT FALSE
);

-- Table pour les exemples de mots utilisant les kanji
CREATE TABLE kanji_examples (
    example_id SERIAL PRIMARY KEY,
    kanji_id INT REFERENCES kanjis(kanji_id),
    word VARCHAR(50) NOT NULL,
    reading VARCHAR(50) NOT NULL,
    meaning VARCHAR(100),
    language_code VARCHAR(5) DEFAULT 'fr'
);

-- Table pour suivre la progression de l'utilisateur par kanji
CREATE TABLE user_kanji_progress (
    progress_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    kanji_id INT REFERENCES kanjis(kanji_id),
    correct_count INT DEFAULT 0,
    incorrect_count INT DEFAULT 0,
    last_practiced TIMESTAMP,
    mastery_level INT DEFAULT 0 -- 0-10 niveau de maîtrise
);

-- -- Table des achievements
CREATE TABLE achievements (
    achievement_id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT REFERENCES users(user_id)
);

-- Insertion des groupes de hiragana
INSERT INTO kana_groups (name, description, display_order, is_hiragana) VALUES
('Voyelles', 'Les 5 voyelles de base en hiragana', 1, TRUE),
('K', 'Groupe des kanas commençant par K', 2, TRUE),
('S', 'Groupe des kanas commençant par S', 3, TRUE),
('T', 'Groupe des kanas commençant par T', 4, TRUE),
('N', 'Groupe des kanas commençant par N', 5, TRUE),
('H', 'Groupe des kanas commençant par H', 6, TRUE),
('M', 'Groupe des kanas commençant par M', 7, TRUE),
('Y', 'Groupe des kanas commençant par Y', 8, TRUE),
('R', 'Groupe des kanas commençant par R', 9, TRUE),
('W', 'Groupe des kanas commençant par W', 10, TRUE),
('N final', 'Le N final', 11, TRUE);

-- Insertion des groupes de katakana
INSERT INTO kana_groups (name, description, display_order, is_hiragana) VALUES
('Voyelles Katakana', 'Les 5 voyelles de base en katakana', 12, FALSE),
('K Katakana', 'Groupe des katakana commençant par K', 13, FALSE),
('S Katakana', 'Groupe des katakana commençant par S', 14, FALSE),
('T Katakana', 'Groupe des katakana commençant par T', 15, FALSE),
('N Katakana', 'Groupe des katakana commençant par N', 16, FALSE),
('H Katakana', 'Groupe des katakana commençant par H', 17, FALSE),
('M Katakana', 'Groupe des katakana commençant par M', 18, FALSE),
('Y Katakana', 'Groupe des katakana commençant par Y', 19, FALSE),
('R Katakana', 'Groupe des katakana commençant par R', 20, FALSE),
('W Katakana', 'Groupe des katakana commençant par W', 21, FALSE),
('N final Katakana', 'Le N final en katakana', 22, FALSE);

-- Insertion des hiragana de base (groupe des voyelles)
INSERT INTO kanas (character, romaji, group_id, display_order) VALUES
('あ', 'a', 1, 1),
('い', 'i', 1, 2),
('う', 'u', 1, 3),
('え', 'e', 1, 4),
('お', 'o', 1, 5);

-- Insertion des katakana de base (groupe des voyelles)
INSERT INTO kanas (character, romaji, group_id, display_order) VALUES
('ア', 'a', 12, 1),
('イ', 'i', 12, 2),
('ウ', 'u', 12, 3),
('エ', 'e', 12, 4),
('オ', 'o', 12, 5);

-- Insertion des hiragana du groupe K
INSERT INTO kanas (character, romaji, group_id, display_order) VALUES
('か', 'ka', 2, 1),
('き', 'ki', 2, 2),
('く', 'ku', 2, 3),
('け', 'ke', 2, 4),
('こ', 'ko', 2, 5);

-- Insertion des katakana du groupe K
INSERT INTO kanas (character, romaji, group_id, display_order) VALUES
('カ', 'ka', 13, 1),
('キ', 'ki', 13, 2),
('ク', 'ku', 13, 3),
('ケ', 'ke', 13, 4),
('コ', 'ko', 13, 5);

-- Insertion des hiragana du groupe S
INSERT INTO kanas (character, romaji, group_id, display_order) VALUES
('さ', 'sa', 3, 1),
('し', 'shi', 3, 2),
('す', 'su', 3, 3),
('せ', 'se', 3, 4),
('そ', 'so', 3, 5);

-- Insertion des katakana du groupe S
INSERT INTO kanas (character, romaji, group_id, display_order) VALUES
('サ', 'sa', 14, 1),
('シ', 'shi', 14, 2),
('ス', 'su', 14, 3),
('セ', 'se', 14, 4),
('ソ', 'so', 14, 5);

-- Insertion des hiragana du groupe T
INSERT INTO kanas (character, romaji, group_id, display_order) VALUES
('た', 'ta', 4, 1),
('ち', 'chi', 4, 2),
('つ', 'tsu', 4, 3),
('て', 'te', 4, 4),
('と', 'to', 4, 5);

-- Insertion des katakana du groupe T
INSERT INTO kanas (character, romaji, group_id, display_order) VALUES
('タ', 'ta', 15, 1),
('チ', 'chi', 15, 2),
('ツ', 'tsu', 15, 3),
('テ', 'te', 15, 4),
('ト', 'to', 15, 5);

-- Insertion des hiragana du groupe N
INSERT INTO kanas (character, romaji, group_id, display_order) VALUES
('な', 'na', 5, 1),
('に', 'ni', 5, 2),
('ぬ', 'nu', 5, 3),
('ね', 'ne', 5, 4),
('の', 'no', 5, 5);

-- Insertion des katakana du groupe N
INSERT INTO kanas (character, romaji, group_id, display_order) VALUES
('ナ', 'na', 16, 1),
('ニ', 'ni', 16, 2),
('ヌ', 'nu', 16, 3),
('ネ', 'ne', 16, 4),
('ノ', 'no', 16, 5);

-- Insertion des hiragana du groupe H
INSERT INTO kanas (character, romaji, group_id, display_order) VALUES
('は', 'ha', 6, 1),
('ひ', 'hi', 6, 2),
('ふ', 'fu', 6, 3),
('へ', 'he', 6, 4),
('ほ', 'ho', 6, 5);

-- Insertion des katakana du groupe H
INSERT INTO kanas (character, romaji, group_id, display_order) VALUES
('ハ', 'ha', 17, 1),
('ヒ', 'hi', 17, 2),
('フ', 'fu', 17, 3),
('ヘ', 'he', 17, 4),
('ホ', 'ho', 17, 5);

-- Insertion des hiragana du groupe M
INSERT INTO kanas (character, romaji, group_id, display_order) VALUES
('ま', 'ma', 7, 1),
('み', 'mi', 7, 2),
('む', 'mu', 7, 3),
('め', 'me', 7, 4),
('も', 'mo', 7, 5);

-- Insertion des katakana du groupe M
INSERT INTO kanas (character, romaji, group_id, display_order) VALUES
('マ', 'ma', 18, 1),
('ミ', 'mi', 18, 2),
('ム', 'mu', 18, 3),
('メ', 'me', 18, 4),
('モ', 'mo', 18, 5);

-- Insertion des hiragana du groupe Y
INSERT INTO kanas (character, romaji, group_id, display_order) VALUES
('や', 'ya', 8, 1),
('ゆ', 'yu', 8, 2),
('よ', 'yo', 8, 3);

-- Insertion des katakana du groupe Y
INSERT INTO kanas (character, romaji, group_id, display_order) VALUES
('ヤ', 'ya', 19, 1),
('ユ', 'yu', 19, 2),
('ヨ', 'yo', 19, 3);

-- Insertion des hiragana du groupe R
INSERT INTO kanas (character, romaji, group_id, display_order) VALUES
('ら', 'ra', 9, 1),
('り', 'ri', 9, 2),
('る', 'ru', 9, 3),
('れ', 're', 9, 4),
('ろ', 'ro', 9, 5);

-- Insertion des katakana du groupe R
INSERT INTO kanas (character, romaji, group_id, display_order) VALUES
('ラ', 'ra', 20, 1),
('リ', 'ri', 20, 2),
('ル', 'ru', 20, 3),
('レ', 're', 20, 4),
('ロ', 'ro', 20, 5);

-- Insertion des hiragana du groupe W
INSERT INTO kanas (character, romaji, group_id, display_order) VALUES
('わ', 'wa', 10, 1),
('を', 'wo', 10, 2);

-- Insertion des katakana du groupe W
INSERT INTO kanas (character, romaji, group_id, display_order) VALUES
('ワ', 'wa', 21, 1),
('ヲ', 'wo', 21, 2);

-- Insertion du N final
INSERT INTO kanas (character, romaji, group_id, display_order) VALUES
('ん', 'n', 11, 1);

-- Insertion du N final en katakana
INSERT INTO kanas (character, romaji, group_id, display_order) VALUES
('ン', 'n', 22, 1);

-- Insertion des variantes dakuten (sons vocalisés)
INSERT INTO kana_variants (base_kana_id, character, romaji, variant_type) VALUES
(6, 'が', 'ga', 'dakuten'),  -- か → が
(7, 'ぎ', 'gi', 'dakuten'),  -- き → ぎ
(8, 'ぐ', 'gu', 'dakuten'),  -- く → ぐ
(9, 'げ', 'ge', 'dakuten'),  -- け → げ
(10, 'ご', 'go', 'dakuten'), -- こ → ご
(11, 'ざ', 'za', 'dakuten'), -- さ → ざ
(12, 'じ', 'ji', 'dakuten'), -- し → じ
(13, 'ず', 'zu', 'dakuten'), -- す → ず
(14, 'ぜ', 'ze', 'dakuten'), -- せ → ぜ
(15, 'ぞ', 'zo', 'dakuten'), -- そ → ぞ
(16, 'だ', 'da', 'dakuten'), -- た → だ
(17, 'ぢ', 'ji', 'dakuten'), -- ち → ぢ
(18, 'づ', 'zu', 'dakuten'), -- つ → づ
(19, 'で', 'de', 'dakuten'), -- て → で
(20, 'ど', 'do', 'dakuten'), -- と → ど
(26, 'ば', 'ba', 'dakuten'), -- は → ば
(27, 'び', 'bi', 'dakuten'), -- ひ → び
(28, 'ぶ', 'bu', 'dakuten'), -- ふ → ぶ
(29, 'べ', 'be', 'dakuten'), -- へ → べ
(30, 'ぼ', 'bo', 'dakuten'); -- ほ → ぼ

-- Récupération des IDs des katakana pour les variantes
-- Groupe K (Voyelles + 1)
INSERT INTO kana_variants (base_kana_id, character, romaji, variant_type) VALUES
((SELECT kana_id FROM kanas WHERE character = 'カ'), 'ガ', 'ga', 'dakuten'),
((SELECT kana_id FROM kanas WHERE character = 'キ'), 'ギ', 'gi', 'dakuten'),
((SELECT kana_id FROM kanas WHERE character = 'ク'), 'グ', 'gu', 'dakuten'),
((SELECT kana_id FROM kanas WHERE character = 'ケ'), 'ゲ', 'ge', 'dakuten'),
((SELECT kana_id FROM kanas WHERE character = 'コ'), 'ゴ', 'go', 'dakuten');

-- Groupe S
INSERT INTO kana_variants (base_kana_id, character, romaji, variant_type) VALUES
((SELECT kana_id FROM kanas WHERE character = 'サ'), 'ザ', 'za', 'dakuten'),
((SELECT kana_id FROM kanas WHERE character = 'シ'), 'ジ', 'ji', 'dakuten'),
((SELECT kana_id FROM kanas WHERE character = 'ス'), 'ズ', 'zu', 'dakuten'),
((SELECT kana_id FROM kanas WHERE character = 'セ'), 'ゼ', 'ze', 'dakuten'),
((SELECT kana_id FROM kanas WHERE character = 'ソ'), 'ゾ', 'zo', 'dakuten');

-- Groupe T
INSERT INTO kana_variants (base_kana_id, character, romaji, variant_type) VALUES
((SELECT kana_id FROM kanas WHERE character = 'タ'), 'ダ', 'da', 'dakuten'),
((SELECT kana_id FROM kanas WHERE character = 'チ'), 'ヂ', 'ji', 'dakuten'),
((SELECT kana_id FROM kanas WHERE character = 'ツ'), 'ヅ', 'zu', 'dakuten'),
((SELECT kana_id FROM kanas WHERE character = 'テ'), 'デ', 'de', 'dakuten'),
((SELECT kana_id FROM kanas WHERE character = 'ト'), 'ド', 'do', 'dakuten');

-- Groupe H (dakuten et handakuten)
INSERT INTO kana_variants (base_kana_id, character, romaji, variant_type) VALUES
((SELECT kana_id FROM kanas WHERE character = 'ハ'), 'バ', 'ba', 'dakuten'),
((SELECT kana_id FROM kanas WHERE character = 'ヒ'), 'ビ', 'bi', 'dakuten'),
((SELECT kana_id FROM kanas WHERE character = 'フ'), 'ブ', 'bu', 'dakuten'),
((SELECT kana_id FROM kanas WHERE character = 'ヘ'), 'ベ', 'be', 'dakuten'),
((SELECT kana_id FROM kanas WHERE character = 'ホ'), 'ボ', 'bo', 'dakuten');

-- Groupe H (handakuten)
INSERT INTO kana_variants (base_kana_id, character, romaji, variant_type) VALUES
((SELECT kana_id FROM kanas WHERE character = 'ハ'), 'パ', 'pa', 'handakuten'),
((SELECT kana_id FROM kanas WHERE character = 'ヒ'), 'ピ', 'pi', 'handakuten'),
((SELECT kana_id FROM kanas WHERE character = 'フ'), 'プ', 'pu', 'handakuten'),
((SELECT kana_id FROM kanas WHERE character = 'ヘ'), 'ペ', 'pe', 'handakuten'),
((SELECT kana_id FROM kanas WHERE character = 'ホ'), 'ポ', 'po', 'handakuten');

-- Insertion des variantes handakuten (sons semi-vocalisés)
INSERT INTO kana_variants (base_kana_id, character, romaji, variant_type) VALUES
(26, 'ぱ', 'pa', 'handakuten'), -- は → ぱ
(27, 'ぴ', 'pi', 'handakuten'), -- ひ → ぴ
(28, 'ぷ', 'pu', 'handakuten'), -- ふ → ぷ
(29, 'ぺ', 'pe', 'handakuten'), -- へ → ぺ
(30, 'ぽ', 'po', 'handakuten'); -- ほ → ぽ

-- Combinaisons yoon pour les katakana
-- KI + small Y
INSERT INTO kana_variants (base_kana_id, character, romaji, variant_type) VALUES
((SELECT kana_id FROM kanas WHERE character = 'キ'), 'キャ', 'kya', 'yoon'),
((SELECT kana_id FROM kanas WHERE character = 'キ'), 'キュ', 'kyu', 'yoon'),
((SELECT kana_id FROM kanas WHERE character = 'キ'), 'キョ', 'kyo', 'yoon');

-- SHI + small Y
INSERT INTO kana_variants (base_kana_id, character, romaji, variant_type) VALUES
((SELECT kana_id FROM kanas WHERE character = 'シ'), 'シャ', 'sha', 'yoon'),
((SELECT kana_id FROM kanas WHERE character = 'シ'), 'シュ', 'shu', 'yoon'),
((SELECT kana_id FROM kanas WHERE character = 'シ'), 'ショ', 'sho', 'yoon');

-- CHI + small Y
INSERT INTO kana_variants (base_kana_id, character, romaji, variant_type) VALUES
((SELECT kana_id FROM kanas WHERE character = 'チ'), 'チャ', 'cha', 'yoon'),
((SELECT kana_id FROM kanas WHERE character = 'チ'), 'チュ', 'chu', 'yoon'),
((SELECT kana_id FROM kanas WHERE character = 'チ'), 'チョ', 'cho', 'yoon');

-- NI + small Y
INSERT INTO kana_variants (base_kana_id, character, romaji, variant_type) VALUES
((SELECT kana_id FROM kanas WHERE character = 'ニ'), 'ニャ', 'nya', 'yoon'),
((SELECT kana_id FROM kanas WHERE character = 'ニ'), 'ニュ', 'nyu', 'yoon'),
((SELECT kana_id FROM kanas WHERE character = 'ニ'), 'ニョ', 'nyo', 'yoon');

-- HI + small Y
INSERT INTO kana_variants (base_kana_id, character, romaji, variant_type) VALUES
((SELECT kana_id FROM kanas WHERE character = 'ヒ'), 'ヒャ', 'hya', 'yoon'),
((SELECT kana_id FROM kanas WHERE character = 'ヒ'), 'ヒュ', 'hyu', 'yoon'),
((SELECT kana_id FROM kanas WHERE character = 'ヒ'), 'ヒョ', 'hyo', 'yoon');

-- MI + small Y
INSERT INTO kana_variants (base_kana_id, character, romaji, variant_type) VALUES
((SELECT kana_id FROM kanas WHERE character = 'ミ'), 'ミャ', 'mya', 'yoon'),
((SELECT kana_id FROM kanas WHERE character = 'ミ'), 'ミュ', 'myu', 'yoon'),
((SELECT kana_id FROM kanas WHERE character = 'ミ'), 'ミョ', 'myo', 'yoon');

-- RI + small Y
INSERT INTO kana_variants (base_kana_id, character, romaji, variant_type) VALUES
((SELECT kana_id FROM kanas WHERE character = 'リ'), 'リャ', 'rya', 'yoon'),
((SELECT kana_id FROM kanas WHERE character = 'リ'), 'リュ', 'ryu', 'yoon'),
((SELECT kana_id FROM kanas WHERE character = 'リ'), 'リョ', 'ryo', 'yoon');

-- GI + small Y (dakuten-yoon)
INSERT INTO kana_variants (base_kana_id, character, romaji, variant_type) VALUES
((SELECT kana_id FROM kanas WHERE character = 'キ'), 'ギャ', 'gya', 'dakuten-yoon'),
((SELECT kana_id FROM kanas WHERE character = 'キ'), 'ギュ', 'gyu', 'dakuten-yoon'),
((SELECT kana_id FROM kanas WHERE character = 'キ'), 'ギョ', 'gyo', 'dakuten-yoon');

-- JI + small Y (dakuten-yoon)
INSERT INTO kana_variants (base_kana_id, character, romaji, variant_type) VALUES
((SELECT kana_id FROM kanas WHERE character = 'シ'), 'ジャ', 'ja', 'dakuten-yoon'),
((SELECT kana_id FROM kanas WHERE character = 'シ'), 'ジュ', 'ju', 'dakuten-yoon'),
((SELECT kana_id FROM kanas WHERE character = 'シ'), 'ジョ', 'jo', 'dakuten-yoon');

-- BI + small Y (dakuten-yoon)
INSERT INTO kana_variants (base_kana_id, character, romaji, variant_type) VALUES
((SELECT kana_id FROM kanas WHERE character = 'ヒ'), 'ビャ', 'bya', 'dakuten-yoon'),
((SELECT kana_id FROM kanas WHERE character = 'ヒ'), 'ビュ', 'byu', 'dakuten-yoon'),
((SELECT kana_id FROM kanas WHERE character = 'ヒ'), 'ビョ', 'byo', 'dakuten-yoon');

-- PI + small Y (handakuten-yoon)
INSERT INTO kana_variants (base_kana_id, character, romaji, variant_type) VALUES
((SELECT kana_id FROM kanas WHERE character = 'ヒ'), 'ピャ', 'pya', 'handakuten-yoon'),
((SELECT kana_id FROM kanas WHERE character = 'ヒ'), 'ピュ', 'pyu', 'handakuten-yoon'),
((SELECT kana_id FROM kanas WHERE character = 'ヒ'), 'ピョ', 'pyo', 'handakuten-yoon');

-- Katakana spéciaux (sons étrangers)
INSERT INTO kana_variants (base_kana_id, character, romaji, variant_type) VALUES
-- V sounds
((SELECT kana_id FROM kanas WHERE character = 'ウ'), 'ヴ', 'vu', 'foreign'),
-- F sounds
((SELECT kana_id FROM kanas WHERE character = 'フ'), 'ファ', 'fa', 'foreign-combo'),
((SELECT kana_id FROM kanas WHERE character = 'フ'), 'フィ', 'fi', 'foreign-combo'),
((SELECT kana_id FROM kanas WHERE character = 'フ'), 'フェ', 'fe', 'foreign-combo'),
((SELECT kana_id FROM kanas WHERE character = 'フ'), 'フォ', 'fo', 'foreign-combo'),
-- T sounds
((SELECT kana_id FROM kanas WHERE character = 'テ'), 'ティ', 'ti', 'foreign-combo'),
((SELECT kana_id FROM kanas WHERE character = 'ト'), 'トゥ', 'tu', 'foreign-combo'),
-- D sounds
((SELECT kana_id FROM kanas WHERE character = 'デ'), 'ディ', 'di', 'foreign-combo'),
((SELECT kana_id FROM kanas WHERE character = 'ド'), 'ドゥ', 'du', 'foreign-combo'),
-- W sounds
((SELECT kana_id FROM kanas WHERE character = 'ウ'), 'ウィ', 'wi', 'foreign-combo'),
((SELECT kana_id FROM kanas WHERE character = 'ウ'), 'ウェ', 'we', 'foreign-combo'),
((SELECT kana_id FROM kanas WHERE character = 'ウ'), 'ウォ', 'wo', 'foreign-combo'),
-- Other sounds
((SELECT kana_id FROM kanas WHERE character = 'チ'), 'チェ', 'che', 'foreign-combo'),
((SELECT kana_id FROM kanas WHERE character = 'シ'), 'シェ', 'she', 'foreign-combo'),
((SELECT kana_id FROM kanas WHERE character = 'ジ'), 'ジェ', 'je', 'foreign-combo');

-- Signe spéciaux katakana
INSERT INTO kanas (character, romaji, group_id, display_order) VALUES
('ー', '-', 22, 2),  -- Le signe d'allongement
('・', '·', 22, 3),  -- Le point milieu pour séparer des mots
('゛', '″', 22, 4),  -- Le signe dakuten
('゜', '°', 22, 5);  -- Le signe handakuten

-- Petit kana spéciaux (utilisés pour former des sons composés)
INSERT INTO kanas (character, romaji, group_id, display_order) VALUES
('ッ', 'small tsu', 22, 6),  -- Petit tsu (gémination)
('ャ', 'small ya', 22, 7),   -- Petit ya
('ュ', 'small yu', 22, 8),   -- Petit yu
('ョ', 'small yo', 22, 9),   -- Petit yo
('ァ', 'small a', 22, 10),   -- Petit a
('ィ', 'small i', 22, 11),   -- Petit i
('ゥ', 'small u', 22, 12),   -- Petit u
('ェ', 'small e', 22, 13),   -- Petit e
('ォ', 'small o', 22, 14);   -- Petit o

-- Créer des index pour améliorer les performances
CREATE INDEX idx_kanas_group_id ON kanas(group_id);
CREATE INDEX idx_variants_base_kana_id ON kana_variants(base_kana_id);
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_kana_id ON user_progress(kana_id);
CREATE INDEX idx_session_logs_user_id ON session_logs(user_id);
CREATE INDEX idx_achievements_user_id ON achievements(user_id);