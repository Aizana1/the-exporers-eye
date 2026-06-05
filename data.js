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
    accent: "#3b6b4f",
    objects: [
      {
        id: "potlatch-mask",
        title: "Potlatch Transformation Mask",
        museumId: "E_Am1944-02-146",
        culture: "Kwakwaka'wakw people, Northwest Coast",
        plate: "Carved & painted transformation mask",
        emoji: "&#129466;",
        link: "https://www.britishmuseum.org/collection/object/E_Am1944-02-146",
        questions: [
          {
            prompt: "Where in the world does this carved transformation mask come from?",
            options: ["The Pacific Northwest Coast of North America", "The Andes of South America", "Central Australia", "Coastal West Africa"],
            answer: 0,
            hint: "Burton: \"Think of cedar forests, totem poles and the sea — this is where the Thunderbird is said to live.\"",
            study: "This mask was made by the Kwakwaka'wakw people of the Pacific Northwest Coast (today British Columbia, Canada), a region famous for cedar carving and the ceremonial feast called the potlatch."
          },
          {
            prompt: "What can this kind of mask dramatically do during a ceremony?",
            options: ["Open up to reveal a second face or creature inside", "Light up using small candles", "Float on water", "Change its painted colour with heat"],
            answer: 0,
            hint: "Burton: \"It is called a *transformation* mask for a reason — the dancer pulls hidden strings.\"",
            study: "Transformation masks open with strings to reveal an inner face, showing a being changing form. They are danced at the potlatch, a ceremony of feasting, gift-giving and story-telling."
          }
        ]
      },
      {
        id: "americas-second",
        title: "Northwest Coast Carving",
        museumId: "E_Am1990-08-2",
        culture: "Northwest Coast peoples",
        plate: "Carved wooden object, Northwest Coast",
        emoji: "&#128056;",
        link: "https://www.britishmuseum.org/collection/object/E_Am1990-08-2",
        questions: [
          {
            prompt: "This object also belongs to the art of which region?",
            options: ["The Northwest Coast of North America", "Ancient Mesopotamia", "Imperial Japan", "The Sahara"],
            answer: 0,
            hint: "Burton: \"We have not left the land of cedar and salmon yet.\"",
            study: "Like the transformation mask, this object comes from the Northwest Coast peoples, whose art is known for bold formline design and crest animals such as the raven, bear and orca."
          },
          {
            prompt: "Crest animals in this art usually represent what?",
            options: ["A family's lineage and history", "The weather forecast", "Numbers for counting", "Foreign trade routes"],
            answer: 0,
            hint: "Burton: \"A crest is worn with pride — it tells others *who your people are*.\"",
            study: "Crest animals record a family's ancestry and rights, passed down and displayed at the potlatch and on totem poles."
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
    accent: "#a8412b",
    objects: [
      {
        id: "dragon-tiles",
        title: "Fahua Glazed Dragon Tiles",
        museumId: "A_2006-0503-1-1-20",
        culture: "Ming dynasty China",
        plate: "Glazed ceramic dragon tiles",
        emoji: "&#128009;",
        link: "https://www.britishmuseum.org/collection/object/A_2006-0503-1-1-20",
        questions: [
          {
            prompt: "These brightly glazed dragon tiles were made in which country?",
            options: ["China", "Greece", "Mexico", "Norway"],
            answer: 0,
            hint: "Burton: \"The dragon here is a noble, benevolent beast — a clue to the empire that made it.\"",
            study: "These tiles were made in China during the Ming dynasty using the *fahua* technique, in which raised clay outlines hold pools of coloured glaze in place."
          },
          {
            prompt: "In Chinese tradition, the dragon is mainly a symbol of what?",
            options: ["Imperial power and good fortune", "Danger and evil", "Winter and death", "Poverty"],
            answer: 0,
            hint: "Burton: \"In the East the dragon does not hoard gold — it brings rain and blessings.\"",
            study: "Unlike the fire-breathing villains of European tales, the Chinese dragon is auspicious: a bringer of water and prosperity, and an emblem of the emperor himself."
          }
        ]
      },
      {
        id: "china-second",
        title: "Chinese Ceramic Work",
        museumId: "A_1957-0501-1",
        culture: "Imperial China",
        plate: "Chinese ceramic object",
        emoji: "&#127881;",
        link: "https://www.britishmuseum.org/collection/object/A_1957-0501-1",
        questions: [
          {
            prompt: "This object comes from which part of the world?",
            options: ["East Asia (China)", "Northern Europe", "The Caribbean", "The Arabian Peninsula"],
            answer: 0,
            hint: "Burton: \"We are still among the kilns and silks of the East.\"",
            study: "This piece is part of China's long ceramic tradition, an art so renowned that fine porcelain became known in English simply as 'china'."
          },
          {
            prompt: "Chinese porcelain was so prized that it was sometimes called what?",
            options: ["White gold", "Cold iron", "Sea glass", "Red clay"],
            answer: 0,
            hint: "Burton: \"Merchants paid fortunes for it across the seas — it was treasured like a precious metal.\"",
            study: "Chinese porcelain was a major export along the Silk Road and sea routes, so valuable that Europeans nicknamed it 'white gold' and spent centuries trying to copy it."
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
    accent: "#c79a3a",
    objects: [
      {
        id: "younger-memnon",
        title: "The Younger Memnon",
        museumId: "Y_EA19",
        culture: "Ancient Egypt, reign of Ramesses II",
        plate: "Colossal granite bust of a pharaoh",
        emoji: "&#128081;",
        link: "https://www.britishmuseum.org/collection/object/Y_EA19",
        questions: [
          {
            prompt: "Which ancient civilisation created this colossal stone bust?",
            options: ["Ancient Egypt", "Ancient Rome", "The Aztec Empire", "Viking Scandinavia"],
            answer: 0,
            hint: "Burton: \"Think of the Nile, the desert and the great pharaohs.\"",
            study: "The Younger Memnon is part of a colossal statue from ancient Egypt, carved over 3,000 years ago for a temple on the west bank of the Nile at Thebes."
          },
          {
            prompt: "The bust portrays which famous pharaoh?",
            options: ["Ramesses II", "Tutankhamun", "Cleopatra", "Hatshepsut"],
            answer: 0,
            hint: "Burton: \"He called himself 'the Great' and reigned for an astonishing sixty-six years.\"",
            study: "The statue shows Ramesses II ('the Great'), who ruled for 66 years. It once stood at his memorial temple, the Ramesseum."
          },
          {
            prompt: "How did this giant bust finally reach London?",
            options: ["It was moved by Giovanni Belzoni and shipped to Britain in the 1800s", "It was carried by Roman soldiers", "It was a gift from Napoleon", "It was found buried under London"],
            answer: 0,
            hint: "Burton: \"A former circus strongman turned engineer hauled it from the sand — no small feat!\"",
            study: "In 1816 the showman-engineer Giovanni Belzoni used levers, rollers and many workers to move the seven-tonne bust to the Nile, from where it was shipped to the British Museum."
          }
        ]
      },
      {
        id: "egypt-second",
        title: "Egyptian Sculpture",
        museumId: "Y_EA24",
        culture: "Ancient Egypt",
        plate: "Ancient Egyptian stone sculpture",
        emoji: "&#128083;",
        link: "https://www.britishmuseum.org/collection/object/Y_EA24",
        questions: [
          {
            prompt: "This sculpture also comes from which ancient civilisation?",
            options: ["Ancient Egypt", "Ancient China", "The Inca Empire", "Ancient Greece"],
            answer: 0,
            hint: "Burton: \"We remain in the shadow of the pyramids and the Nile.\"",
            study: "This is another work of ancient Egyptian sculpture, an art that prized permanence — hard stone was used so that kings and gods would last for eternity."
          },
          {
            prompt: "Egyptian royal sculpture was carved in hard stone mainly to achieve what?",
            options: ["To last forever", "To be easy to move", "To float on the Nile", "To change shape over time"],
            answer: 0,
            hint: "Burton: \"The Egyptians built for eternity, not for a season.\"",
            study: "Granite and other hard stones were chosen so that statues of pharaohs and gods would endure for eternity, ensuring the ruler's memory never died."
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
    accent: "#8a5a2b",
    objects: [
      {
        id: "ife-head",
        title: "Cast of an Ife Crowned Head",
        museumId: "E_CRS-12",
        culture: "Yoruba, Kingdom of Ife (Nigeria)",
        plate: "Cast of a crowned brass head",
        emoji: "&#128081;",
        link: "https://www.britishmuseum.org/collection/object/E_CRS-12",
        questions: [
          {
            prompt: "The original of this crowned head was made in which part of the world?",
            options: ["West Africa (Ife, Nigeria)", "Eastern Europe", "Southeast Asia", "The South Pacific"],
            answer: 0,
            hint: "Burton: \"Look to the great Yoruba city of Ife, in what is now Nigeria.\"",
            study: "The original head was made in the city of Ife in West Africa (modern Nigeria), the spiritual heartland of the Yoruba people."
          },
          {
            prompt: "What did these remarkably lifelike heads most likely represent?",
            options: ["Rulers (the Ooni) of Ife", "Foreign traders", "Imaginary monsters", "Ordinary farmers"],
            answer: 0,
            hint: "Burton: \"The serene faces and beaded crowns suggest people of the very highest rank.\"",
            study: "Made around 700 years ago, the Ife heads are thought to portray rulers (the Ooni) and were cast in brass with extraordinary naturalism that astonished the wider world when rediscovered."
          }
        ]
      },
      {
        id: "africa-second",
        title: "African Artwork",
        museumId: "E_Af1979-01-2397",
        culture: "African art",
        plate: "African sculptural object",
        emoji: "&#127753;",
        link: "https://www.britishmuseum.org/collection/object/E_Af1979-01-2397",
        questions: [
          {
            prompt: "This object belongs to the art of which continent?",
            options: ["Africa", "Antarctica", "Europe", "South America"],
            answer: 0,
            hint: "Burton: \"We have not yet left this great continent of many kingdoms.\"",
            study: "This work is part of Africa's vast and varied artistic traditions, spanning many peoples, kingdoms and materials across the continent."
          },
          {
            prompt: "Casting heads and figures in brass at Ife shows that the artists had mastered what?",
            options: ["Advanced metalworking", "Modern photography", "Steam engines", "Glass blowing"],
            answer: 0,
            hint: "Burton: \"To pour molten metal into so fine a form takes great skill and knowledge.\"",
            study: "The brass casting of Ife used the demanding lost-wax technique, proof of a sophisticated metalworking tradition flourishing in West Africa centuries ago."
          }
        ]
      }
    ]
  }
];
