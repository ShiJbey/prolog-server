:- set_prolog_flag(double_quotes, atom).
current_prolog_flag(character_escapes, true).

%%%%%%%%%%%% SCENE INFO %%%%%%%%%%%%%

:- dynamic(scene/1).
scene(sadies_sob_story).
scene(fullers_electrical_repair).

:- dynamic(scene_name/3).
scene_name(1, sadies_sob_story, "Sadie’s Sob Story").
scene_name(2, fullers_electrical_repair, "Fuller’s Electrical Repair").

:- dynamic(clue/4).
clue(1, sadies_sob_story, "Someone in George’s apartment building was murdered the day before he disappeared. She gives an address and third-story apartment number near the Brooklyn Navy Yard.", false).
clue(2, sadies_sob_story, "George went to work the next day, but no one’s seen him since. That was Thursday. He didn’t come to work Friday and wasn’t in his building.", false).
clue(3, sadies_sob_story, "She didn’t learn any of this until the police tore her place apart on Saturday, then came to her work and grilled her about George and where he might have gone. She’s been looking for him ever since.", false).
clue(4, sadies_sob_story, "As “nobody important, just a garment worker... or I was until the police told the floor manager my fiancé was a murderer” Sadie doesn’t have the money to hire one of those private investigators.", false).
clue(5, sadies_sob_story, "She met George at the New York Public Library. She loves George because she found him entirely different from your ordinary Joe. He read books about the human brain and the spirit world and all kinds of things. He thought a lot. George would have gone to college, only his family couldn’t afford it.", false).
clue(6, sadies_sob_story, "[Core, Fuller’s Electrical Repair] George works as an electrical repairman at Fuller’s Electrical Repair, just a couple blocks north of Fulton Street in downtown Brooklyn.", false).
clue(7, sadies_sob_story, "Sadie admits she doesn’t see George every night, which the police took to mean he two- times her. They just don’t understand George. Someday you’ll hear about him as a famous inventor. At night, he works on building his machine and Mr. Fuller lets him use the workbench. Some nights, he comes by her place but others he works so late that he just sleeps at the shop. She mostly sees him on weekends.", false).
clue(1, fullers_electrical_repair, "She always thought George different from the other boys. Bit of a dreamer. Sometimes used to just stare off into space. Why, one time she thought she saw him squinting as though he were trying to see something just out of view.", false).
clue(2, fullers_electrical_repair, "Yes, George worked on a machine after hours. Several of the boys have pet projects, and Mr. Fuller kindly lets them use his space.", false).
