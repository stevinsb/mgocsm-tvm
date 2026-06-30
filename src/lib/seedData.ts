export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  isFeatured?: boolean;
  isPast?: boolean;
  registrationOpen?: boolean;
  countdownTarget?: string; // ISO string
  registrationUrl?: string;  // ← add this line
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: "Reflections" | "News" | "Faith Stories" | "Events";
  date: string;
  author: string;
  image: string;
  readTime: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  url: string;
  type: "image" | "video";
  category: "Camp" | "Retreat" | "Conference" | "Sports" | "Charity" | "Prayer" | "Inauguration" | "Bulletin Release" | "Interaction" | "Session" | "Worship" | "Guest Session" | "Felicitation" | "Event";}

export interface LeadershipMember {
  id: string;
  name: string;
  position: string;
  photo: string;
  linkedin?: string;
  order: number;
}

export interface ResourceItem {
  id: string;
  title: string;
  type: "Circular" | "Magazine" | "Notes" | "Prayer Book" | "Document";
  downloadUrl: string;
  date: string;
  description: string;
  size?: string;
}

export interface Registration {
  id: string;
  eventId?: string;
  eventTitle?: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userParish: string;
  type: "member" | "volunteer" | "event";
  status: "Pending" | "Approved" | "Rejected";
  date: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  content: string;
  isFeast?: boolean;
}

export const initialEvents: EventItem[] = [
  {
    id: "evt-1",
    title: "FIFA World Cup 2026 – Predict the Finalists",
    description:
      "Think you know who will reach the FIFA World Cup 2026 Final? Predict both finalists correctly and stand a chance to win an exciting Football-Themed Gift Hamper! Follow @mgocsmtrivandrum on Instagram and submit your prediction before the quarterfinals begin.",
    date: "2026-07-08",
    time: "11:59 PM (IST) - Submission Deadline",
    location: "Online (Instagram DM @mgocsmtrivandrum)",
    image: "/prediction.jpeg",
    isFeatured: true,
    registrationOpen: true,
    countdownTarget: "2026-07-08T23:59:00",
    registrationUrl: "https://www.instagram.com/mgocsmtrivandrum",
  },
  {
    id: "evt-2",
    title: "Zimra Season 1 – Geevarghese Mar Dioscoros Syriac Group Song Competition",
    description:
      "A diocesan Syriac Group Song Competition celebrating the sacred musical heritage of the Malankara Orthodox Church. Teams of 2–4 members will perform Orthodox Syriac liturgical hymns for a chance to win the Ever Rolling Memorial Trophy and other awards.",
    date: "2026-07-18",
    time: "2:00 PM",
    location: "VMDM Centre, Edamulakkal",
    image: "/zimra.jpeg",
    isFeatured: true,
    registrationOpen: true,
    countdownTarget: "2026-07-18T14:00:00",
    registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdcldiRON6IfRZxtdMBYgYx-daLw8FY8Ex37huJG4rDtQP9ag/viewform",

  },
  {
    id: "evt-4",
    title: "En Arche — A New Beginning, Rooted in Christ",
    description: "\"For such a time as this…\" (Esther 4:14). En Arche was a day of worship, fellowship, music, reflection, and renewal — a sacred gathering that called every heart back to its first love in Christ. Students from across the diocese gathered at the beautiful Holy Trinity Chapel for a Spirit-filled experience of prayer and community.",
    date: "2026-06-20",
    time: "All Day",
    location: "Holy Trinity Chapel, Ulloor, Trivandrum",
    image: "/mgocsm-group.jpg",
    isPast: true,
  }
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "Walking in Light: Being a Christian Student in a Secular Campus",
    excerpt: "Discover practical tips to maintain your Orthodox identity, practice regular prayer, and share Christ's love in the middle of academic stress and social pressures.",
    content: `<p>Entering college life is one of the most exciting transitions for a young Christian. It represents independence, intellectual growth, and new social circles. However, it also brings significant challenges to one's spiritual life. The secular environment of a modern campus can sometimes feel indifferent or even hostile to traditional Christian values.</p>
    <p>How do we navigate this environment while staying true to our Malankara Orthodox identity? Here are four cornerstones for every student:</p>
    <h3>1. Begin with Morning Prayer</h3>
    <p>The spiritual battle of the day is won in the morning. Dedicate just 5 to 10 minutes to standard prayers (from the Shehimo or a youth prayer book) before checking your phone. It anchors your heart in Christ before the world throws noise at you.</p>
    <h3>2. Seek Fellowship in MGOCSM</h3>
    <p>You cannot walk the Christian path alone. Surrounding yourself with peers who share your values and struggles is vital. Attend your weekly unit prayer meetings, contribute to discussions, and participate in service projects. We sharpen each other as iron sharpens iron.</p>
    <h3>3. Practice 'Sacrament of the Present Moment'</h3>
    <p>Your studies are not separate from your spiritual life. Work diligently, treat your professors and classmates with love and respect, and view your academic achievements as a way to glorify God. St. Paul writes, 'Whatever you do, work at it with all your heart, as working for the Lord.'</p>
    <h3>4. Regular Sacramental Life</h3>
    <p>Make Holy Confession a regular habit—at least once during the major fasts. Receiving the Holy Qurbana with preparation and reverence provides the divine grace necessary to withstand the currents of peer pressure and intellectual skepticism.</p>
    <p>Remember, being a witness doesn't mean being self-righteous. Let your integrity, kindness, and joy be your primary testimony. Your campus is not a desert; it is your mission field.</p>`,
    category: "Reflections",
    date: "2026-06-25",
    author: "Rev. Fr. Philip Mathew",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
    readTime: "5 min read",
  },
  {
    id: "blog-2",
    title: "St. Gregorios of Parumala: The Patron Saint's Vision for Youth",
    excerpt: "Reflecting on the life and teachings of Mar Gregorios of Parumala, our patron saint, and his enduring message on prayer, holiness, and academic dedication.",
    content: `<p>Mar Gregorios of Parumala (Parumala Thirumeni) remains a guiding beacon for millions, especially for students. He was a pioneer of education, setting up schools in rural areas, and he had an immense love for children and youth.</p>
    <p>His message to the young generation can be summarized in three key concepts:</p>
    <h3>1. Prayer is the Basis of Education</h3>
    <p>Thirumeni famously said: 'Prayer is the key to knowledge. A student without prayer is like a ship without a rudder.' He taught us that intellectual pursuits, when separated from spiritual wisdom, can lead to pride and ruin. True education is that which brings us closer to God and teaches us to serve humanity.</p>
    <h3>2. Purity of Character</h3>
    <p>In a world where compromise is common, Thirumeni lived a life of absolute purity, fasting, and continuous prayer. He encouraged the youth to stand firm against immoral influences, noting that the habits formed during student days will shape the rest of our lives.</p>
    <h3>3. Compassion and Charity</h3>
    <p>Thirumeni did not live in isolation; he was intensely responsive to the suffering of others. During cholera outbreaks, he walked among the sick, comforting them and feeding them. MGOCSM's motto of 'Service' is direct reflection of this compassion.</p>
    <p>Let us pray for the intercession of our Patron Saint that we may study with dedication and live with holiness.</p>`,
    category: "Faith Stories",
    date: "2026-06-15",
    author: "Rev. Dn. Basil Thomas",
    image: "https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&q=80&w=800",
    readTime: "4 min read",
  },
  {
    id: "blog-3",
    title: "Trivandrum Diocese Hosts Successful Inter-Parish Sports Meet",
    excerpt: "Over 500 students gathered for a day of spirited competition, unity, and fellowship at the annual diocesan sports fest. Read the complete roundup.",
    content: `<p>The MGOCSM Trivandrum Diocese successfully hosted its annual Inter-Parish Sports Meet, the 'Agape Cup 2026'. The event witnessed enthusiastic participation from over 50 parish units across the diocese.</p>
    <p>The sports meet started with the raising of the MGOCSM flag by Diocesan Metropolitan His Grace Dr. Gabriel Mar Gregorios. In his inaugural address, Thirumeni emphasized the importance of teamwork, sportsmanship, and physical wellness in developing a balanced Christian character.</p>
    <p>St. George Orthodox Cathedral Unit emerged as the overall champions, winning the coveted Agape Cup after a thrilling final football match against St. Mary's Orthodox Church, Kowdiar unit.</p>
    <p>We extend our heartfelt gratitude to the sports committee, referees, volunteers, and all participants who made this day a memorable celebration of Christian fellowship and athletic talent.</p>`,
    category: "News",
    date: "2026-05-30",
    author: "Stevin Santhosh Baby",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800",
    readTime: "3 min read",
  }
];

// export const initialGalleryItems: GalleryItem[] = [
//   {
//     id: "gal-1",
//     title: "Inauguration of En Arche 2026",
//     description:
//       "His Grace Dr. Abraham Mar Seraphim Metropolitan officially inaugurating En Arche 2026 with the ceremonial lamp lighting.",
//     url: "/en-arche-1.jpg",
//     type: "image",
//     category: "Inauguration",
//   },
//   {
//     id: "gal-2",
//     title: "Release of MGOCSM Monthly Bulletin – Theoria",
//     description:
//       "His Grace Dr. Abraham Mar Seraphim Metropolitan releasing the MGOCSM Monthly Bulletin 'Theoria' by presenting the first copy to the Diocesan Secretary.",
//     url: "/en-arche-2.jpg",
//     type: "image",
//     category: "Bulletin Release",
//   },
//   {
//     id: "gal-3",
//     title: "Interactive Session with H.G. Dr. Abraham Mar Seraphim Metropolitan",
//     description:
//       "His Grace engaging in an interactive discussion with students, answering questions and sharing spiritual guidance.",
//     url: "/en-arche-4.JPG",
//     type: "image",
//     category: "Interaction",
//   },
//   {
//     id: "gal-4",
//     title: '"Such A Time As This" – Session by Fr. Dr. Vivek Varghese',
//     description:
//       "An inspiring and thought-provoking session by Fr. Dr. Vivek Varghese challenging students to live faithfully and courageously in today's world.",
//     url: "/en-arche-3.jpg",
//     type: "image",
//     category: "Session",
//   },
//   {
//     id: "gal-5",
//     title: "Gen Z Worship Session by Ivano MGOCSM Team",
//     description:
//       "A vibrant worship experience led by the Ivano MGOCSM Team, filling the gathering with worship, joy, music, and youthful energy.",
//     url: "/en-arche-5.JPG",
//     type: "image",
//     category: "Worship",
//   },
//   {
//     id: "gal-6",
//     title: "Creative Session with RJ Mobin Varghese Thomas",
//     description:
//       "RJ Mobin Varghese Thomas (Radio Mango) inspired participants with creative ideas, encouraging innovation, collaboration, and teamwork.",
//     url: "/rjmobin.jpeg",
//     type: "image",
//     category: "Guest Session",
//   },
//   {
//     id: "gal-7",
//     title: "Token of Love Presented to H.G. Dr. Abraham Mar Seraphim Metropolitan",
//     description:
//       "MGOCSM Trivandrum Diocese presenting a token of love and gratitude to His Grace Dr. Abraham Mar Seraphim Metropolitan.",
//     url: "/en-arche-6.JPG",
//     type: "image",
//     category: "Felicitation",
//   },
//   {
//     id: "gal-8",
//     title: "Token of Love Presented to Fr. Dr. Vivek Varghese",
//     description:
//       "MGOCSM Trivandrum Diocese honouring Fr. Dr. Vivek Varghese with a token of appreciation for his inspiring ministry and guidance.",
//     url: "/en-arche-7.JPG",
//     type: "image",
//     category: "Felicitation",
//   },
//   {
//     id: "gal-9",
//     title: "En Arche 2026 — The Gathering at Holy Trinity Chapel",
//     description:
//       "A memorable gathering of MGOCSM members, clergy, and delegates during En Arche 2026 at Holy Trinity Chapel, Ulloor.",
//     url: "/mgocsm-group.jpg",
//     type: "image",
//     category: "Event",
//   },
// ];

export const initialLeadership: LeadershipMember[] = [
  {
    id: "lead-1",
    name: "H. G. DR. ABRAHAM MAR SERAPHIM METROPOLITAN",
    position: "President of MGOCSM",
    photo: "/seraphim_thirumeni.png",
    order: 1,
  },
  {
    id: "lead-2",
    name: "Rev. Fr. Dr. Vivek Varghese",
    position: "General Secretary",
    photo: "/vivek_achan.jpg",
    order: 2,
  },
  {
    id: "lead-3",
    name: "Fr. Jacob Thomas",
    position: "Diocesan Vice President",
    photo: "/jacobachan.jpeg",
    order: 3,
  },
  {
    id: "lead-4",
    name: "Dr. Merlin George",
    position: "Diocesan Secretary",
    photo: "/merlin.jpeg",
    order: 4,
  },
  {
    id: "lead-5",
    name: "Fr. John K Thankachan",
    position: "Anchal District President",
    photo: "\Johnachan.jpg",
    order: 5,
  },
  {
    id: "lead-6",
    name: "Albin Biju",
    position: "Anchal District Coordinator",
    photo: "\albin.jpg",
    order: 6,
  },
  {
    id: "lead-7",
    name: "Fr. Shino K Thomas",
    position: "Ayoor District President",
    photo: "shinoachan.jpg",
    order: 7,
  },
  {
    id: "lead-8",
    name: "Helana Elsa Prince",
    position: "Ayoor District Coordinator",
    photo: "helana.jpg",
    order: 8,
  },
  {
    id: "lead-9",
    name: "Fr. Philip Issac",
    position: "Chathannoor District President",
    photo: "philipachan.jpg",
    order: 9,
  },
  {
    id: "lead-10",
    name: "Mekha B S",
    position: "Chathannoor District Coordinator",
    photo: "mekha.jpg",
    order: 10,
  },
  {
    id: "lead-11",
    name: "Fr. Rony Varghese",
    position: "Kulasekharam District President",
    photo: "ronyachan.jpg",
    order: 11,
  },
  {
    id: "lead-12",
    name: "Ajna A J",
    position: "Kulasekharam District Coordinator",
    photo: "ajna.jpg",
    order: 12,
  },
  {
    id: "lead-13",
    name: "Fr. Abraham Thomas",
    position: "Kulathupuzha District President",
    photo: "abraham.jpg",
    order: 13,
  },
  {
    id: "lead-14",
    name: "Elsa Marium Sibi",
    position: "Kulathupuzha District Coordinator",
    photo: "elsa.png",
    order: 14,
  },
  {
    id: "lead-15",
    name: "Fr. Joshua K. Koshy",
    position: "Thiruvananthapuram District President",
    photo: "joshuvachan.jpg",
    order: 15,
  },
  {
    id: "lead-16",
    name: "Johan Shinu",
    position: "Thiruvananthapuram District Coordinator",
    photo: "johan.jpg",
    order: 16,
  }

  


];

export const initialResources: ResourceItem[] = [
  {
    id: "res-1",
    title: "Holy Confession Preparation Guide",
    type: "Prayer Book",
    downloadUrl: "#",
    date: "2026-04-12",
    description: "A comprehensive guide on self-examination, prayers before confession, and spiritual advice for students.",
    size: "1.2 MB",
  },
  {
    id: "res-2",
    title: "MGOCSM Diocesan Circular - June 2026",
    type: "Circular",
    downloadUrl: "#",
    date: "2026-06-01",
    description: "Official circular regarding upcoming activities, membership registrations, and the diocesan calendar.",
    size: "450 KB",
  },
  {
    id: "res-3",
    title: "Daily Shehimo (Orthodox Common Prayers)",
    type: "Prayer Book",
    downloadUrl: "#",
    date: "2025-08-20",
    description: "English translation of the daily canonical prayers of the Malankara Orthodox Syrian Church.",
    size: "3.4 MB",
  },
  {
    id: "res-4",
    title: "GREGORIAN Youth Magazine - Spring 2026",
    type: "Magazine",
    downloadUrl: "#",
    date: "2026-05-15",
    description: "The quarterly student publication featuring articles, poems, and art from our diocesan members.",
    size: "5.8 MB",
  },
  {
    id: "res-5",
    title: "Bible Study Outline: Epistle to the Ephesians",
    type: "Notes",
    downloadUrl: "#",
    date: "2026-06-10",
    description: "Study outlines, historical contexts, and study questions for parish unit bible study groups.",
    size: "820 KB",
  }
];

export const initialAnnouncements: Announcement[] = [
  {
    id: "ann-1",
    title: "Feast of Saints Peter & Paul",
    date: "2026-06-29",
    content: "We celebrate the martyrdom of the Holy Apostles St. Peter and St. Paul. Special Holy Qurbana at all parishes. Let us pray for apostolic strength in our faith.",
    isFeast: true,
  },
  {
    id: "ann-2",
    title: "Upcoming Feast: St. Thomas (Apostle of India)",
    date: "2026-07-03",
    content: "Observing the martyrdom of St. Thomas, the Apostle of India and Patron of our Church. Special youth meetings and retreats scheduled.",
    isFeast: true,
  },
  {
    id: "ann-3",
    title: "Membership Registrations Open for 2026-27",
    date: "2026-06-20",
    content: "New student registrations for the academic year 2026-27 are now open. Register online or contact your unit secretary.",
  }
];

export const bibleVerses = [
  { text: "Don't let anyone look down on you because you are young, but set an example for the believers in speech, in conduct, in love, in faith and in purity.", reference: "1 Timothy 4:12" },
  { text: "The fear of the Lord is the beginning of wisdom, and knowledge of the Holy One is understanding.", reference: "Proverbs 9:10" },
  { text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.", reference: "Isaiah 40:31" },
  { text: "Your word is a lamp for my feet, a light on my path.", reference: "Psalm 119:105" }
];

export const dailyPrayers = [
  { title: "Student's Morning Dedication", text: "O Lord Jesus Christ, my Teacher and my God, enlighten my mind with the grace of Your Holy Spirit. Give me wisdom to understand my studies, diligence to perform my duties, and strength to serve my fellow students. May my life this day be an offering of worship to You. Amen." },
  { title: "Prayer of St. Basil the Great", text: "We bless You, O God most high and Lord of mercy, Who always work great and mysterious deeds for us. You have given us sleep for the relief of our frailty, and to refresh our tired limbs. We thank You that You have not destroyed us in our transgressions, but have raised us up to glorify Your power. Amen." }
];
