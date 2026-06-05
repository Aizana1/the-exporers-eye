// The Explorer's Eye — game data
// Built on real British Museum Collection Online records for eight chosen objects,
// two from each of four regions. Sir Richard Burton is the narrative guide.

const SCORES = { firstTry: 3, afterHint: 2, afterStudy: 1, skip: 0 };

const REGIONS = [
  {
    id: "americas",
    name: "The Americas",
    blurb: "Burton sails for the Northwest Coast, where the Thunderbird lives.",
    icon: "&#127758;", // globe americas
    accent: "#22d3ee",
    map: { x: 235, y: 215 }, // position on the world map (viewBox 1000x500)
    objects: [
      {
        id: "potlatch-mask",
        image: "images/potlatch-mask.jpg",
        title: "Potlatch Transformation Mask",
        museumId: "E_Am1944-02-146",
        culture: "Kwakwaka'wakw people, Northwest Coast",
        plate: "Carved & painted transformation mask",
        emoji: "&#129466;",
        link: "https://www.britishmuseum.org/collection/object/E_Am1944-02-146",
        questions: [
          {
            prompt: "This mask was used in a potlatch. What is the central purpose of a potlatch ceremony among Northwest Coast peoples?",
            options: [
              "A competitive auction where families bid wealth to purchase the right to perform certain dances",
              "A ceremonial feast where a host gives away large amounts of wealth to guests, who in turn witness and validate the host's status, names, and inherited rights",
              "A seasonal festival thanking the sun for a successful salmon run",
              "A private mourning rite, held in secret, to honour a deceased chief"
            ],
            answer: 1,
            hint: "Burton: \"Think of the host as giver, not receiver — and of the guests as witnesses to something important.\"",
            study: "The potlatch is a ceremonial feast at which the host gives away great quantities of wealth. Guests witness and thereby validate the host's status, inherited names, and rights — a form of living record in an oral culture."
          },
          {
            prompt: "This mask was made by the Kwakwaka'wakw of the Northwest Coast and collected for a foreign museum. During much of the period when masks like this were being gathered, the ceremony they belonged to was:",
            options: [
              "Actively promoted by the Canadian government as a tourist attraction",
              "Banned by the Canadian government for decades — a suppression that is part of why so many of these masks ended up in museums far from their communities",
              "Permitted, but restricted by Indigenous law to the summer months only",
              "Performed only for European traders, in exchange for goods"
            ],
            answer: 1,
            hint: "Burton: \"Consider why a people's own ceremonial objects might travel so far from home.\"",
            study: "Canada banned the potlatch from 1885 to 1951. During this period authorities confiscated ceremonial objects, many of which entered museum collections abroad — which is why so many masks are now far from their communities of origin."
          }
        ]
      },
      {
        id: "americas-second",
        image: "images/americas-second.jpg",
        title: "La Muerte Enramada (Papier Mâché Skeleton)",
        museumId: "E_Am1990-08-2",
        culture: "Mexico, Day of the Dead tradition",
        plate: "Papier mâché skeleton figure",
        emoji: "&#128128;",
        link: "https://www.britishmuseum.org/collection/object/E_Am1990-08-2",
        questions: [
          {
            prompt: "This papier mâché skeleton figure comes from which region of the world?",
            options: [
              "Mexico / Central America",
              "Ancient Mesopotamia",
              "Imperial Japan",
              "The Sahara"
            ],
            answer: 0,
            hint: "Burton: \"Think of the Day of the Dead festival and the land of marigolds and sugar skulls.\"",
            study: "This figure comes from Mexico, where the Day of the Dead (Día de los Muertos) is celebrated each November. The tradition blends Indigenous Mesoamerican beliefs about death with Catholic influences introduced after the Spanish conquest."
          },
          {
            prompt: "La Muerte Enramada shows a skeleton with flowers, branches, and live creatures — a bird, lizard, scorpion, snake, butterfly — sprouting from its bones. In the context of the Day of the Dead festival it was made for, what idea is this fusion of skeleton and living things most meant to express?",
            options: [
              "That death is a punishment, and the creeping plants and animals show the body being reclaimed and consumed by nature",
              "That life and death are not opposites but a single continuous cycle, with death itself giving rise to new living things",
              "That the dead person was a gardener or naturalist, identified by the plants and animals they cared for in life",
              "That the soul must be protected from dangerous creatures — scorpion, snake, spider — on its journey through the underworld"
            ],
            answer: 1,
            hint: "Burton: \"The creature does not end — it transforms. What does a skeleton in full bloom suggest to you?\"",
            study: "La Muerte Enramada embodies the core Day of the Dead idea that life and death form one unbroken cycle. The skeleton is not a symbol of ending but of regeneration — death is the seed from which new life grows."
          }
        ]
      }
    ]
  },
  {
    id: "china",
    name: "China",
    blurb: "Burton follows the trade roads east to the kilns of Ming China.",
    icon: "&#127757;", // globe asia
    accent: "#c9a227",
    map: { x: 790, y: 165 },
    objects: [
      {
        id: "dragon-tiles",
        image: "images/dragon-tiles.jpg",
        title: "Twenty Glazed Ceramic Dragon Tiles",
        museumId: "A_2006-0503-1-1-20",
        culture: "Ming dynasty China",
        plate: "Glazed ceramic dragon tiles",
        emoji: "&#128009;",
        link: "https://www.britishmuseum.org/collection/object/A_2006-0503-1-1-20",
        questions: [
          {
            prompt: "These twenty curved glazed tiles from Ming-dynasty China show four vigorous dragons twisting among flowers, with one dragon chasing a small flaming pearl. What does this scene most likely symbolise?",
            options: [
              "A dangerous sea storm that sailors tried to avoid at all costs",
              "The emperor's power, good fortune, and cosmic protection over a building",
              "A garden party where nobles watched dragons as entertainment",
              "A warning sign that the house belongs to a warrior family"
            ],
            answer: 1,
            hint: "Burton: \"In China the dragon does not terrorise — it protects and bestows blessings from above.\"",
            study: "The dragon in Chinese tradition is a symbol of imperial authority, cosmic power, and good fortune. The flaming pearl it chases represents wisdom and enlightenment. Such tiles adorned important buildings to signal imperial favour and divine protection."
          },
          {
            prompt: "These Ming-dynasty roof tiles are made of stoneware and described as \"glazed\" with fahua-type decoration, giving the dragons and flowers their bright colours and shiny surface. What does \"glazed\" mean in this context?",
            options: [
              "The tiles were carved from a single block of coloured stone, so their colours are natural and not fired",
              "The tiles were covered with a layer of coloured glass-like material that was melted onto the surface in the kiln to make them shiny and waterproof",
              "The tiles were painted with watercolour paint after firing, so the colours could easily be washed off",
              "The tiles were wrapped in silk cloth, which gave them a soft, smooth texture instead of a hard surface"
            ],
            answer: 1,
            hint: "Burton: \"A kiln's heat is the key — the surface is transformed into something glassy and enduring.\"",
            study: "Glazing means applying a layer of glass-forming minerals to the clay surface, which fuses in the kiln to create a hard, shiny, waterproof coating. The fahua technique uses raised clay outlines to contain separate pools of coloured glaze, like stained glass."
          }
        ]
      },
      {
        id: "china-second",
        image: "images/china-second.jpg",
        title: "Large Cloisonné Enamel Jar",
        museumId: "A_1957-0501-1",
        culture: "Ming dynasty China, Xuande reign (1426–1435)",
        plate: "Cloisonné enamel jar and cover",
        emoji: "&#127994;",
        link: "https://www.britishmuseum.org/collection/object/A_1957-0501-1",
        questions: [
          {
            prompt: "What was this large cloisonné enamel jar most likely used for?",
            options: [
              "As a cooking pot in the palace kitchens, used every day to prepare food",
              "As a ceremonial or decorative container in the imperial palace, displayed to show wealth and status",
              "As a travelling water jar carried by soldiers on long campaigns",
              "As a storage jar buried underground to hide money and jewellery"
            ],
            answer: 1,
            hint: "Burton: \"Its elaborate craftsmanship would be wasted in a kitchen — think of where fine things are displayed.\"",
            study: "Cloisonné enamel was among the most prized luxury arts of imperial China. Objects like this jar were made for the palace as ceremonial vessels or display pieces, broadcasting the wealth, taste, and power of the imperial court."
          },
          {
            prompt: "This large cloisonné enamel jar and cover was made in the Xuande reign of the Ming dynasty in China (1426–1435). Which of the following is true about this period?",
            options: [
              "It is part of the Ming dynasty and is known for some of the earliest dated high-quality imperial cloisonné pieces",
              "It belongs to the Qing dynasty and marks the very first invention of cloisonné enamel in China",
              "It is a republican-era period when the imperial court had already been abolished",
              "It is a modern 20th-century period named after the first president of China"
            ],
            answer: 0,
            hint: "Burton: \"The Ming dynasty and the Xuande reign — this is the era of refinement, not revolution.\"",
            study: "The Xuande reign (1426–1435) falls within the Ming dynasty and is celebrated as a golden age for imperial craft. Some of the earliest securely dated high-quality cloisonné enamel pieces survive from this period, making them especially important for art historians."
          }
        ]
      }
    ]
  },
  {
    id: "egypt",
    name: "Egypt",
    blurb: "Burton journeys up the Nile to stand before the pharaohs.",
    icon: "&#127963;", // classical building
    accent: "#c9a227",
    map: { x: 565, y: 212 },
    objects: [
      {
        id: "younger-memnon",
        image: "images/younger-memnon.jpg",
        title: "The Younger Memnon",
        museumId: "Y_EA19",
        culture: "Ancient Egypt, reign of Ramesses II",
        plate: "Colossal granite bust of a pharaoh",
        emoji: "&#128081;",
        link: "https://www.britishmuseum.org/collection/object/Y_EA19",
        questions: [
          {
            prompt: "Who is depicted by the statue \"The Younger Memnon\"?",
            options: [
              "Tutankhamun",
              "Ramesses II",
              "Ptolemy V",
              "Akhenaten"
            ],
            answer: 1,
            hint: "Burton: \"He called himself 'the Great' and reigned for an astonishing sixty-six years.\"",
            study: "The Younger Memnon depicts Ramesses II ('the Great'), who ruled ancient Egypt for 66 years. It was carved from a single piece of two-coloured granite and once stood at his memorial temple, the Ramesseum, on the west bank of the Nile at Thebes."
          },
          {
            prompt: "By examining the head of \"The Younger Memnon\", which feature helps identify the figure as a pharaoh, and what does it suggest about the way Ramesses II wanted to be represented?",
            options: [
              "He wears the nemes headcloth, a royal headdress associated with Egyptian kingship, suggesting that the statue presents him not as an ordinary man but as a powerful and legitimate ruler",
              "He wears the khepresh crown, a blue crown often connected with warfare, suggesting that the statue mainly presents him as a military commander",
              "He wears the hedjet crown, the white crown of Upper Egypt, suggesting that the statue emphasizes his control over southern Egypt only",
              "He wears the deshret crown, the red crown of Lower Egypt, suggesting that the statue represents him mainly as a regional ruler of the Nile Delta"
            ],
            answer: 0,
            hint: "Burton: \"Look at the striped cloth falling from the head — it is one of the most ancient signs of Egyptian royalty.\"",
            study: "The nemes headcloth — the striped linen cloth pulled tight across the forehead and falling in front over the shoulders — is one of the most recognisable emblems of Egyptian kingship. Its presence signals that the statue presents Ramesses not merely as a man but as the embodiment of legitimate royal power."
          }
        ]
      },
      {
        id: "egypt-second",
        image: "images/egypt-second.jpg",
        title: "The Rosetta Stone",
        museumId: "Y_EA24",
        culture: "Ptolemaic Egypt, 196 BC",
        plate: "Granodiorite stele with trilingual decree",
        emoji: "&#128083;",
        link: "https://www.britishmuseum.org/collection/object/Y_EA24",
        questions: [
          {
            prompt: "Why is the Rosetta Stone considered such a crucial object for the development of Egyptology, rather than simply an important ancient inscription?",
            options: [
              "Because it preserves the same decree in hieroglyphic, Demotic, and Greek scripts, allowing scholars to compare the texts and use the Greek version to help decipher Egyptian hieroglyphs",
              "Because it is the oldest surviving Egyptian monument and therefore provides the first known example of Egyptian writing",
              "Because it contains a complete biography of Tutankhamun, which allowed historians to reconstruct the history of the Eighteenth Dynasty",
              "Because it was discovered inside a royal pyramid, proving that Egyptian pyramids were used mainly as archives for political documents"
            ],
            answer: 0,
            hint: "Burton: \"Three scripts, one text — and scholars could read one of the three. The rest followed from there.\"",
            study: "The Rosetta Stone carries the same priestly decree in three scripts: hieroglyphic (for temple use), Demotic (for everyday Egyptian readers), and Greek (for the Ptolemaic administration). Because Greek was already understood, scholars — most famously Thomas Young and Jean-François Champollion — used it as a key to decipher hieroglyphs, unlocking thousands of years of Egyptian written culture."
          },
          {
            prompt: "What does the use of three scripts on the Rosetta Stone reveal about society and power in Ptolemaic Egypt?",
            options: [
              "It shows that the decree was intended for different audiences: Egyptian priests, local Egyptian readers, and the Greek-speaking administration",
              "It shows that all Egyptians spoke three languages fluently in everyday life",
              "It proves that Greek had completely replaced Egyptian culture and religion by 196 BC",
              "It suggests that the stone was mainly a language-learning exercise for young scribes"
            ],
            answer: 0,
            hint: "Burton: \"Each script served a different group — think of who needed to read what, and why.\"",
            study: "Ptolemaic Egypt was a multilingual society ruled by a Greek-speaking dynasty over an Egyptian-speaking population. The three scripts addressed three distinct groups: hieroglyphic for the priestly elite, Demotic for literate Egyptian speakers, and Greek for the ruling administration — revealing a layered society in which power and religion operated in different languages."
          }
        ]
      }
    ]
  },
  {
    id: "africa",
    name: "Africa",
    blurb: "Burton's last leg leads to the great city of Ife.",
    icon: "&#127757;", // globe
    accent: "#c9a227",
    map: { x: 535, y: 305 },
    objects: [
      {
        id: "ife-head",
        image: "images/ife-head.jpg",
        title: "Cast of an Ife Crowned Head",
        museumId: "E_CRS-12",
        culture: "Yoruba, Kingdom of Ife (Nigeria)",
        plate: "Cast of a crowned brass head",
        emoji: "&#128081;",
        link: "https://www.britishmuseum.org/collection/object/E_CRS-12",
        questions: [
          {
            prompt: "Who is most likely represented by this Ife head?",
            options: [
              "A ruler or high-status figure from Ife, suggested by the elaborate crown and formal style of the head",
              "An ordinary farmer from Ife, shown with tools and clothing used for agricultural work",
              "A Benin court official from southern Nigeria, identified by coral regalia and palace-style bronze plaques",
              "A Nok terracotta figure from central Nigeria, recognized by its ancient clay material and distinctive geometric facial features"
            ],
            answer: 0,
            hint: "Burton: \"The serene face and beaded crown suggest someone of the very highest rank — not a common subject.\"",
            study: "The Ife heads are thought to portray rulers (the Ooni) or other high-status individuals from the ancient city of Ife, the spiritual heartland of the Yoruba people. The elaborate crowns and formal naturalism identify them as portraits of power, not ordinary citizens."
          },
          {
            prompt: "Why is this Ife head historically significant?",
            options: [
              "It shows the high level of artistic skill in Ife, Nigeria, and challenges the old European idea that complex naturalistic sculpture was mainly a feature of ancient Greece or Rome",
              "It is important because it proves that Ife artists copied Egyptian royal portraits during the reign of Ramesses II",
              "It is significant because it was supposedly the first African object ever collected by the British Museum, making it a starting point for the museum's engagement with African art and material culture",
              "It matters mainly because it was supposedly used as a modern theatrical mask in Britain, which would connect it more to performance history than to Ife's artistic and cultural traditions"
            ],
            answer: 0,
            hint: "Burton: \"When European scholars first saw these heads, they refused to believe Africans had made them — what does that tell you?\"",
            study: "When Ife heads became known to the wider world in the early 20th century, their naturalism was so remarkable that some Europeans falsely attributed them to outside influences. In fact they are the product of a sophisticated West African artistic tradition, and they powerfully challenge Eurocentric assumptions about where complex naturalistic sculpture could be created."
          }
        ]
      },
      {
        id: "africa-second",
        image: "images/africa-second.jpg",
        title: "African Mask",
        museumId: "E_Af1979-01-2397",
        culture: "African art",
        plate: "African ceremonial mask",
        emoji: "&#127753;",
        link: "https://www.britishmuseum.org/collection/object/E_Af1979-01-2397",
        questions: [
          {
            prompt: "What was one possible function of this mask?",
            options: [
              "It may have been used to discourage unruly behaviour and was associated with a society that exercised judicial powers",
              "It may have been used as a public symbol during harvest festivals to celebrate agricultural abundance",
              "It may have been used in initiation ceremonies to teach young members about social rules and community responsibilities",
              "It may have been worn by warriors during victory ceremonies to display courage and military success"
            ],
            answer: 0,
            hint: "Burton: \"Think of authority — not military, but the kind that keeps order within a community.\"",
            study: "Masks of this type are associated with societies that wielded judicial authority in their communities. Worn during ceremonies, they could be used to sanction, warn, or punish those who disrupted social order — combining spectacle with enforcement."
          },
          {
            prompt: "Who would have worn this mask?",
            options: [
              "A wichi, a ritual specialist who put on and removed the mask in complete secrecy",
              "A senior member of a local ritual association during ceremonies connected with authority and social order",
              "A community elder during public ceremonies marking important transitions in village life",
              "A trained performer during masked events connected with moral instruction and community discipline"
            ],
            answer: 0,
            hint: "Burton: \"The identity of the wearer was part of the mask's power — secrecy was essential.\"",
            study: "The wichi — a ritual specialist — wore this type of mask, and the act of donning and removing it was carried out in secrecy. This concealment was integral to the mask's authority: the wearer disappeared behind it, allowing the mask itself to represent a force beyond any individual."
          }
        ]
      }
    ]
  }
];
