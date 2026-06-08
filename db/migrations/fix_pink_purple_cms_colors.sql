-- Remplace toutes les couleurs rose/violet restantes dans le CMS

-- Section Concept
UPDATE cms SET value = '#FFC857' WHERE content_key = 'card1_title_color' AND value IN ('#8780ff', '#8780FF');
UPDATE cms SET value = '#00D492' WHERE content_key = 'card2_title_color' AND value IN ('#c94bd4', '#C94BD4');
UPDATE cms SET value = '#FF8C42' WHERE content_key = 'card3_title_color' AND value IN ('#8780ff', '#8780FF');
UPDATE cms SET value = '#51A2FF' WHERE content_key = 'card4_title_color' AND value IN ('#e045b1', '#E045B1');

-- Section Award
UPDATE cms SET value = 'rgba(255, 200, 87, 0.52)' WHERE content_key = 'ctaSeeMore_color' AND value IN ('#E1BDFF', '#e1bdff', 'rgba(194, 122, 255, 0.52)');

-- Section Chiffres projetés
UPDATE cms SET value = '#FF8C42' WHERE content_key = 'heading_title_accent_color' AND value IN ('#F6339A', '#f6339a');
UPDATE cms SET value = '#FFB020' WHERE content_key = 'stat1_label_color' AND value IN ('#AD46FF', '#ad46ff');
UPDATE cms SET value = '#FF8C42' WHERE content_key = 'stat2_label_color' AND value IN ('#F6339A', '#f6339a');

-- Section Soirée de clôture
UPDATE cms SET value = '#FF8C42' WHERE content_key = 'title_accent_color' AND section = 'closingEvent' AND value IN ('#F6339A', '#f6339a');
UPDATE cms SET value = '#FFC857' WHERE content_key = 'eyebrow_text_color' AND value IN ('#C27AFF', '#c27aff');
UPDATE cms SET value = 'rgba(255, 176, 32, 0.2)' WHERE content_key = 'eyebrow_bg_color' AND value LIKE '%173, 70, 255%';

-- Section Localisation
UPDATE cms SET value = '#FF8C42' WHERE content_key = 'space2_color' AND value IN ('#C27AFF', '#c27aff');

-- Section Events
UPDATE cms SET value = '#FFB020' WHERE content_key = 'title_accent_color' AND section = 'events' AND value IN ('#AD46FF', '#ad46ff');

-- Hero : icône + blanche
UPDATE cms SET value = '/uploads/icons/plus-white.svg' WHERE content_key = 'ctaLearnMore_signe';
