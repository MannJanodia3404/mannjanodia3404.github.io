/* ============================================================
   main.js , Language toggle, scroll reveal, smooth scroll
   ============================================================ */

/* ─── SCROLL REVEAL ─── */
const ro = new IntersectionObserver(
  es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('go'); }),
  { threshold: .1 }
);
document.querySelectorAll('.rev').forEach(el => ro.observe(el));

/* ─── SMOOTH SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(a =>
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  })
);

/* ─── TRANSLATIONS ─── */
window.currentLang = 'en';

const T = {
  en: {
    /* Nav */
    'nav-home': 'Home',
    'nav-proj': 'Projects',
    'nav-cont': 'Contact',

    /* Hero */
    'hero-tag':    'MSc ROBOTICS ENGINEER',
    'h1a':         'Building robots that',
    'h1b':         'bridge imagination & reality',
    'hero-sub':    'Mann Janodia \u00a0\u2022\u00a0 MSc Robotics',
    'hero-desc':   'Full-stack robotics specialist building systems that perform. From tuning PID loops to training neural networks, I develop the "brain" and "body" in tandem.',
    'hero-goal':   'My goal: make robotics smarter and more accessible.',
    'hero-resume': 'Connect With Me',

    /* About */
    'about-tag':    'About Me',
    'about-title':  'Why I Build Robots',
    'about-h3':     'From Curiosity to Engineering',
    'about-p1':     "I am a robotics engineer specializing in full-stack architecture, focusing on the seamless integration of mechanical hardware, control software, and artificial intelligence. I am driven by the moment these disciplines converge, whether it's developing autonomous navigation systems or designing custom neural networks for adaptive flight simulations. I don't just write code; I build complete systems that turn complex technical challenges into functional, real-world solutions.",
    'about-p2':     'I am currently pursuing my MSc in Robotics Engineering at Middlesex University, building upon my BEng in Mechatronics with a minor specialization in AI and Machine Learning. My background includes developing award-winning, patent-pending self-balancing systems and vision-based specimen handling platforms using high-precision depth sensing. I am particularly interested in narrowing the gap between "what robots can do" and "what we need them to do" through rigorous validation and system optimization.',
    'about-p3':     "When I'm not in the lab, you can find me on the field playing competitive cricket, football, or volleyball. I also enjoy the strategic challenge of a chess match and reading new books.",
    'about-strong': 'What drives me?',
    'about-p4':     'The moment hardware, software, and intelligence converge perfectly.',

    /* Projects header */
    'proj-tag':  'Featured Work',
    'proj-title':'Projects',
    'proj-desc': 'Click any project card to see full details',

    /* Project cards */
    'p1-name':  'Gesture Multi-Drone Control',
    'p1-short': 'Two-hand gesture control of 3 drones using a custom 5-layer neural network in Webots.',
    'p2-name':  'Camera Servo Tracking (RPi)',
    'p2-short': 'YOLO + Picamera2 real-time object tracking with MG996R pan-tilt servos on Raspberry Pi 4.',
    'p3-name':  'TurtleBot4 Occupancy Navigation',
    'p3-short': 'Dynamic waypoint scheduling with occupancy detection for autonomous navigation in real indoor environments.',
    'p4-name':  'Autonomous Mapping Robot',
    'p4-short': 'Dual-Arduino robot that autonomously maps a room and executes a planned return journey with equally-spaced scheduled stops.',
    'p5-name':  'Niryo NED2 Test Tube Sorting System',
    'p5-short': 'Fully autonomous lab system combining Niryo NED2 arm, TurtleBot4, and ESP32 RFID to pick, scan, and sort test tubes into bins with zero human intervention.',
    'p6-name':  'Mjolnir CAD Design',
    'p6-short': "Fully detailed 3D CAD replica of Thor's Mjolnir, designed in Fusion 360. Precise geometry, fillets, and surface detail, ready for 3D printing.",
    'p7-name':  'Robotic Arm CAD Design',
    'p7-short': 'Multi-DOF robotic arm designed from scratch in Fusion 360. Full assembly with joint definitions and clearance tolerances for servo actuation.',
    'p8-name':  '4-Wheel LiDAR Robot CAD',
    'p8-short': 'Full chassis CAD for a 4-wheeled differential drive robot with integrated LiDAR mount, sensor housing, and electronics bay. ROS2-ready.',
    'p9-name':  'More Projects Coming Soon',
    'p9-short': 'Currently in development. Check back soon or visit my GitHub for the latest work.',
    'click':    'Click to expand \u2192',

    /* CAD section */
    'cad-tag':   '3D Designs',
    'cad-title': 'CAD Models',

    /* Skills */
    'sk-tag':   'Technical Arsenal',
    'sk-title': 'Skills',
    'sk1-cat':  'Programming Languages',
    'sk2-cat':  'Robotics & ROS2',
    'sk3-cat':  'AI & Computer Vision',
    'sk4-cat':  'Hardware',
    'sk5-cat':  'Tools & Platforms',
    'sk6-cat':  'Engineering',

    /* Experience */
    'exp-tag':  'Work History',
    'exp-title':'Experience',
    'exp-desc': 'Internships and roles that shaped my engineering journey',
    'e1-role':  'Radio Frequency Engineer',
    'e1-co':    'Optimized Solutions Limited',
    'e1-desc':  'Developed and validated RF-enabled embedded systems through rigorous signal analysis, environmental stress testing, and systematic hardware debugging to ensure reliability and compliance.',
    'e2-role':  'Electrical Engineer',
    'e2-co':    'Bosch Rexroth',
    'e2-desc':  'Conducted fault diagnosis and sensor calibration for hydraulic and electromechanical systems within cross-functional validation and verification teams.',
    'e3-role':  'Firmware Lead',
    'e3-co':    'Robofest',
    'e3-desc':  'Led firmware development and oversaw full hardware and electronics integration for a competitive robotics platform. Responsible for embedded software architecture, sensor interfacing, motor control pipelines, and ensuring reliable communication between all electronic subsystems.',

    /* Contact */
    'ct-title': 'Contact',
    'ct-tag':   "Let's chat about robots!",
    'soc-gh':   'GitHub',
    'soc-li':   'LinkedIn',
    'soc-cv':   'Resume',

    /* Footer */
    'footer': 'Made by Mann Janodia',

    /* Modal labels */
    'm-overview':    'Overview',
    'm-challenges':  'Key Achievements',
    'm-skills-used': 'Skills & Tools',
    'm-sk-context':  'Context',
    'lnk-gh':        'GitHub',

    /* Modal overviews */
    'm-drone-ov': "A fully gesture-driven system to control 3 simulated DJI Mavic2Pro drones in Webots using only hand gestures captured by a laptop webcam. Two separate neural networks, both built from scratch in NumPy, classify left-hand pose (which drone to select) and right-hand pose (what action to perform), with results written to a shared JSON file that each drone's controller reads every 8ms.",
    'm-cam-ov':   'Real-time multi-object detection and tracking on Raspberry Pi 4 using YOLOv8 (NCNN-exported) with two MG996R servos for pan-tilt camera control.',
    'm-tb4-ov':   'Dynamic waypoint scheduling with occupancy detection for autonomous mobile robot navigation using Nav2 and SLAM on TurtleBot 4. Deployed in a real indoor environment (H101 lab map at Coventry University).',

    /* Skill modal context */
    'sk1-desc': 'Python primary for robotics. C++ for performance-critical nodes. Bash for system scripting.',
    'sk2-desc': 'Full ROS2 Jazzy systems on Ubuntu 24.04: Nav2, SLAM, MoveIt2 for real robot deployment.',
    'sk3-desc': 'Custom 5-layer NNs from scratch. MediaPipe HandLandmarker. OpenCV ArUco pose estimation. YOLOv8 NCNN for RPi.',
    'sk4-desc': 'Hands-on with real robots. Debugged I2C, WiFi, TCP, serial comm. Solved mechanical offset issues.',
    'sk5-desc': 'Webots and Gazebo for simulation. Flask REST APIs for multi-system coordination. CAD in Fusion 360. All on GitHub.',
    'sk6-desc': 'Applied thermodynamics, exergy analysis. Familiar with ISO 31000 risk and ISO 10218 robot safety.',


    /* Modal overviews , remaining projects */
    'm-p4-ov':    'A dual-Arduino autonomous robot that maps a room using HC-SR04 ultrasonic sensors and encoder odometry, then executes a planned return journey with 5 equally-spaced scheduled stops.',
    'm-p5-ov':    'A fully autonomous three-component lab robotics system combining mobile navigation, 6-DOF manipulation, and RFID identification to sort test tubes without human intervention.',
    'm-mjol-ov':  "Fully detailed 3D CAD replica of Thor's Mjolnir, designed in Fusion 360. Precise geometry, fillets, surface detail, and material assignments, ready for 3D printing or CNC machining.",
    'm-arm-ov':   'Multi-DOF robotic arm designed from scratch in CAD. Full assembly with joint definitions, link geometry, and clearance tolerances designed for servo-driven actuation.',
    'm-lidar-ov': 'Full chassis CAD for a 4-wheeled differential drive robot with integrated LiDAR mount, sensor housing, and electronics bay, designed to be deployed with ROS2.',
    'm-key-details': 'Key Details',
    /* Showcase labels */
    'sc0': 'Gesture Multi-Drone (3\u00d7 UAV)',
    'sc1': 'Camera Servo Tracking (RPi)',
    'sc2': 'TurtleBot4 Occupancy Queuing',
  },

  hi: {
    /* Nav */
    'nav-home': 'होम',
    'nav-proj': 'प्रोजेक्ट्स',
    'nav-cont': 'संपर्क',

    /* Hero */
    'hero-tag':    'एमएससी रोबोटिक्स इंजीनियर',
    'h1a':         'ऐसे रोबोट बनाता हूं जो',
    'h1b':         'कल्पना और वास्तविकता को जोड़ें',
    'hero-sub':    'मन जनोदिया \u00a0\u2022\u00a0 एमएससी रोबोटिक्स',
    'hero-desc':   'ऐसे सिस्टम बनाने वाला फुल-स्टैक रोबोटिक्स विशेषज्ञ जो काम करते हैं। PID लूप ट्यूनिंग से लेकर न्यूरल नेटवर्क ट्रेनिंग तक, मैं "दिमाग" और "शरीर" दोनों को साथ विकसित करता हूं।',
    'hero-goal':   'मेरा लक्ष्य: रोबोटिक्स को स्मार्ट और सुलभ बनाना।',
    'hero-resume': 'मुझसे जुड़ें',

    /* About */
    'about-tag':    'मेरे बारे में',
    'about-title':  'मैं रोबोट क्यों बनाता हूं',
    'about-h3':     'जिज्ञासा से इंजीनियरिंग तक',
    'about-p1':     'मैं एक रोबोटिक्स इंजीनियर हूं जो फुल-स्टैक आर्किटेक्चर में विशेषज्ञता रखता हूं , मैकेनिकल हार्डवेयर, कंट्रोल सॉफ्टवेयर और आर्टिफिशियल इंटेलिजेंस के निर्बाध एकीकरण पर ध्यान केंद्रित करता हूं। मैं उस पल से प्रेरित होता हूं जब ये विषय एक साथ आते हैं। मैं सिर्फ कोड नहीं लिखता; मैं पूरे सिस्टम बनाता हूं।',
    'about-p2':     'मैं वर्तमान में Middlesex University में रोबोटिक्स इंजीनियरिंग में MSc कर रहा हूं, Mechatronics में BEng और AI/ML में माइनर के आधार पर।',
    'about-p3':     'जब मैं लैब में नहीं होता, तो मैं क्रिकेट, फुटबॉल या वॉलीबॉल खेलता हूं। मुझे शतरंज और किताबें भी पसंद हैं।',
    'about-strong': 'मुझे क्या प्रेरित करता है?',
    'about-p4':     'वह पल जब हार्डवेयर, सॉफ्टवेयर और बुद्धिमत्ता एकदम सही तरीके से मिलते हैं।',

    /* Projects header */
    'proj-tag':  'विशेष कार्य',
    'proj-title':'प्रोजेक्ट्स',
    'proj-desc': 'पूरा विवरण देखने के लिए किसी भी कार्ड पर क्लिक करें',

    /* Project cards */
    'p1-name':  'इशारा मल्टी-ड्रोन नियंत्रण',
    'p1-short': 'Webots में 3 ड्रोन को दो-हाथ इशारों और कस्टम 5-लेयर न्यूरल नेटवर्क से नियंत्रित करना।',
    'p2-name':  'कैमरा सर्वो ट्रैकिंग (RPi)',
    'p2-short': 'Raspberry Pi 4 पर YOLO + Picamera2 से MG996R pan-tilt servos के साथ रियल-टाइम ऑब्जेक्ट ट्रैकिंग।',
    'p3-name':  'TurtleBot4 अधिभोग नेविगेशन',
    'p3-short': 'वास्तविक इनडोर वातावरण में स्वायत्त नेविगेशन के लिए गतिशील वेपॉइंट शेड्यूलिंग।',
    'p4-name':  'स्वायत्त मैपिंग रोबोट',
    'p4-short': 'दो-Arduino रोबोट जो कमरे को स्वचालित रूप से मैप करता है और समान दूरी वाले स्टॉप के साथ वापस आता है।',
    'p5-name':  'Niryo NED2 टेस्ट ट्यूब छंटाई प्रणाली',
    'p5-short': 'Niryo NED2 आर्म, TurtleBot4 और ESP32 RFID को मिलाकर बिना मानव हस्तक्षेप के टेस्ट ट्यूब छांटने की पूर्ण स्वचालित प्रयोगशाला प्रणाली।',
    'p6-name':  'म्जोल्निर CAD डिज़ाइन',
    'p6-short': 'Fusion 360 में डिज़ाइन किया गया Thor के Mjolnir का पूर्ण 3D CAD रेप्लिका। सटीक ज्यामिति, 3D प्रिंटिंग के लिए तैयार।',
    'p7-name':  'रोबोटिक आर्म CAD डिज़ाइन',
    'p7-short': 'Fusion 360 में खरोंच से डिज़ाइन किया गया मल्टी-DOF रोबोटिक आर्म। सर्वो एक्चुएशन के लिए पूर्ण असेंबली।',
    'p8-name':  '4-पहिया LiDAR रोबोट CAD',
    'p8-short': 'LiDAR माउंट और इलेक्ट्रॉनिक्स बे के साथ 4-पहिया डिफरेंशियल ड्राइव रोबोट का पूर्ण चेसिस CAD। ROS2-तैयार।',
    'p9-name':  'और प्रोजेक्ट जल्द आ रहे हैं',
    'p9-short': 'वर्तमान में विकास में है। जल्द वापस जांचें या नवीनतम कार्य के लिए GitHub देखें।',
    'click':    'विवरण देखने के लिए क्लिक करें \u2192',

    /* CAD section */
    'cad-tag':   '3D डिज़ाइन',
    'cad-title': 'CAD मॉडल',

    /* Skills */
    'sk-tag':   'तकनीकी दक्षता',
    'sk-title': 'कौशल',
    'sk1-cat':  'प्रोग्रामिंग भाषाएं',
    'sk2-cat':  'रोबोटिक्स और ROS2',
    'sk3-cat':  'AI और कंप्यूटर विज़न',
    'sk4-cat':  'हार्डवेयर',
    'sk5-cat':  'टूल्स और प्लेटफॉर्म',
    'sk6-cat':  'इंजीनियरिंग',

    /* Experience */
    'exp-tag':  'कार्य इतिहास',
    'exp-title':'अनुभव',
    'exp-desc': 'भूमिकाएं और इंटर्नशिप जिन्होंने मेरी यात्रा को आकार दिया',
    'e1-role':  'रेडियो फ्रीक्वेंसी इंजीनियर',
    'e1-co':    'Optimized Solutions Limited',
    'e1-desc':  'कठोर सिग्नल विश्लेषण, पर्यावरणीय तनाव परीक्षण और व्यवस्थित हार्डवेयर डीबगिंग के माध्यम से RF-सक्षम एम्बेडेड सिस्टम विकसित और मान्य किए।',
    'e2-role':  'इलेक्ट्रिकल इंजीनियर',
    'e2-co':    'Bosch Rexroth',
    'e2-desc':  'हाइड्रोलिक और इलेक्ट्रोमैकेनिकल सिस्टम के लिए क्रॉस-फंक्शनल वेरिफिकेशन टीमों में फॉल्ट डायग्नोसिस और सेंसर कैलिब्रेशन किया।',
    'e3-role':  'फर्मवेयर लीड',
    'e3-co':    'Robofest',
    'e3-desc':  'प्रतिस्पर्धी रोबोटिक्स प्लेटफॉर्म के लिए फर्मवेयर विकास का नेतृत्व किया। एम्बेडेड सॉफ्टवेयर आर्किटेक्चर, सेंसर इंटरफेसिंग, मोटर कंट्रोल और इलेक्ट्रॉनिक सबसिस्टम के बीच संचार जिम्मेदारी।',

    /* Contact */
    'ct-title': 'संपर्क',
    'ct-tag':   'रोबोट के बारे में बात करते हैं!',
    'soc-gh':   'गिटहब',
    'soc-li':   'लिंक्डइन',
    'soc-cv':   'रिज्यूमे',

    /* Footer */
    'footer': 'मन जनोदिया द्वारा बनाया गया',

    /* Modal labels */
    'm-overview':    'सारांश',
    'm-challenges':  'मुख्य उपलब्धियां',
    'm-skills-used': 'कौशल और टूल्स',
    'm-sk-context':  'संदर्भ',
    'lnk-gh':        'गिटहब',

    /* Modal overviews */
    'm-drone-ov': 'Webots में 3 DJI Mavic2Pro ड्रोन को लैपटॉप वेबकैम के सामने हाथ के इशारों से नियंत्रित करने की प्रणाली। NumPy में खरोंच से बने दो अलग न्यूरल नेटवर्क बाएं हाथ की मुद्रा और दाएं हाथ की क्रिया का वर्गीकरण करते हैं।',
    'm-cam-ov':   'Raspberry Pi 4 पर YOLOv8 (NCNN) और Picamera2 का उपयोग करके pan-tilt कैमरा नियंत्रण के लिए दो MG996R servos के साथ रियल-टाइम ऑब्जेक्ट डिटेक्शन।',
    'm-tb4-ov':   'Nav2 और SLAM का उपयोग करके TurtleBot 4 के लिए स्वायत्त नेविगेशन में गतिशील वेपॉइंट शेड्यूलिंग। वास्तविक इनडोर वातावरण (H101 lab, Coventry University) में तैनात।',

    /* Skill modal context */
    'sk1-desc': 'Python रोबोटिक्स के लिए प्राथमिक। C++ performance nodes के लिए। Bash scripting के लिए।',
    'sk2-desc': 'Ubuntu 24.04 पर पूर्ण ROS2 Jazzy: Nav2, SLAM, MoveIt2 वास्तविक रोबोट तैनाती के लिए।',
    'sk3-desc': 'खरोंच से 5-लेयर NN। MediaPipe HandLandmarker। OpenCV ArUco पोज़ एस्टिमेशन। YOLOv8 NCNN।',
    'sk4-desc': 'वास्तविक रोबोट के साथ हाथों-हाथ अनुभव। I2C, WiFi, TCP, serial comm डीबग किया।',
    'sk5-desc': 'Webots और Gazebo सिमुलेशन के लिए। Flask REST APIs। सभी GitHub पर।',
    'sk6-desc': 'व्यावहारिक थर्मोडायनामिक्स, एक्सर्जी विश्लेषण। ISO 31000 जोखिम और ISO 10218 रोबोट सुरक्षा से परिचित।',
    /* CAD modal list items */
    'mjol-li1': 'पूर्ण पैरामेट्रिक मॉडल, सभी आयाम निर्दिष्ट',
    'mjol-li2': 'हैंडल, हेड, कैप और स्ट्रैप अलग-अलग बॉडी के रूप में मॉडल किए गए',
    'mjol-li3': 'FDM 3D प्रिंटिंग के लिए सतह गुणवत्ता अनुकूलित',
    'arm-li1':  'प्रत्येक जोड़ के लिए सब-असेंबली के साथ पूर्ण असेंबली',
    'arm-li2':  'सुचारू सर्वो रोटेशन के लिए क्लीयरेंस टॉलरेंस',
    'arm-li3':  'मॉड्यूलर डिज़ाइन, जोड़ों को व्यक्तिगत रूप से बदला जा सकता है',
    'lidar-li1':'मोटर माउंट के साथ 4-पहिया डिफरेंशियल ड्राइव चेसिस',
    'lidar-li2':'केबल प्रबंधन के साथ एकीकृत LiDAR माउंटिंग प्लेट',
    'lidar-li3':'RPi और मोटर ड्राइवर माउंटिंग पॉइंट के साथ इलेक्ट्रॉनिक्स बे',
    'lidar-li4':'FDM प्रिंटिंग और लेजर-कट बेस प्लेट के लिए डिज़ाइन किया गया',

    /* CAD modal overviews */
    'm-mjol-ov': 'Fusion 360 में डिज़ाइन किया गया Thor के Mjolnir का पूर्ण 3D CAD रेप्लिका। सभी घटक , हैंडल, हेड, कैप और स्ट्रैप , अलग-अलग बॉडी के रूप में, FDM 3D प्रिंटिंग के लिए सटीक ज्यामिति के साथ।',
    'm-arm-ov':  'Fusion 360 में खरोंच से डिज़ाइन किया गया मल्टी-DOF रोबोटिक आर्म। प्रति-जोड़ सब-असेंबली, लिंक ज्यामिति और सर्वो-चालित एक्चुएशन के लिए इंजीनियर क्लीयरेंस टॉलरेंस के साथ पूर्ण असेंबली।',
    'm-lidar-ov':'Fusion 360 में डिज़ाइन किया गया 4-पहिया डिफरेंशियल ड्राइव रोबोट का पूर्ण चेसिस CAD। एकीकृत LiDAR माउंटिंग प्लेट, सेंसर हाउसिंग और RPi 4 और मोटर ड्राइवर के लिए समर्पित इलेक्ट्रॉनिक्स बे।',
    'm-p4-ov':   'HC-SR04 अल्ट्रासोनिक सेंसर और एनकोडर ओडोमेट्री का उपयोग करके कमरे को मैप करने वाला दोहरा-Arduino स्वायत्त रोबोट, जो 5 समान दूरी वाले स्टॉप के साथ नियोजित वापसी यात्रा करता है।',
    'm-p5-ov':   'मोबाइल नेविगेशन, 6-DOF मैनिपुलेशन और RFID पहचान को मिलाकर मानव हस्तक्षेप के बिना टेस्ट ट्यूब छांटने की पूरी तरह से स्वायत्त तीन-घटक प्रयोगशाला रोबोटिक्स प्रणाली।',
    'm-key-details': 'मुख्य विवरण',
    /* ── Project 1: Gesture Drone bullet points ── */
    'drone-li1': '<strong>दो-हाथ नियंत्रण:</strong> बायां हाथ ड्रोन चुनता है (1/2/3 उंगलियां या खुली हथेली सभी के लिए)। दायां हाथ कमांड देता है: टेकऑफ, लैंड, ऊंचाई, फ्लिप, होवर।',
    'drone-li2': '<strong>खरोंच से कस्टम 5-लेयर FC-NN:</strong> 35 &rarr; 64(ReLU) &rarr; 32(ReLU) &rarr; 16(Tanh) &rarr; N(Softmax), L2 रेगुलराइज़ेशन, क्रॉस-एंट्रॉपी लॉस। कोई PyTorch नहीं, कोई TensorFlow नहीं।',
    'drone-li3': '<strong>तीन ऑप्टिमाइज़र:</strong> Adam, L-BFGS और Nelder-Mead का 5-fold क्रॉस-वैलिडेशन से तुलनात्मक अध्ययन।',
    'drone-li4': '<strong>35-फीचर हाथ वेक्टर</strong> MediaPipe HandLandmarker से: 10 उंगलियों की स्थिति, 5 विस्तार कोण, 3 कलाई अभिविन्यास, 2 हथेली ऑफसेट।',
    'drone-li5': '<strong>फ्लिप स्टेट मशीन:</strong> Windup 160ms &rarr; Rotate 320ms &rarr; Recover 240ms, 1.5m से अधिक ऊंचाई पर सुरक्षित फॉरवर्ड फ्लिप।',
    'drone-li6': '<strong>फेल-सेफ:</strong> 2 सेकंड से अधिक कोई इशारा नहीं होने पर सभी ड्रोन स्वचालित रूप से स्थिति पकड़ते हैं।',
    'drone-li7': 'व्यक्तिगत रूप से 10 जेस्चर क्लास में 800 से 1,200 ट्रेनिंग सैंपल रिकॉर्ड किए।',

    /* ── Project 2: Camera Tracking bullet points ── */
    'cam-li1': 'Picamera2 और YOLOv8n NCNN मॉडल: GPU के बिना RPi पर कम-विलंबता ऑन-डिवाइस इनफेरेंस।',
    'cam-li2': 'प्रोपोर्शनल कंट्रोल से चुनी गई क्लास को फ्रेम के केंद्र में रखता है। कॉन्फ़िगर करने योग्य डेडबैंड, मैक्स स्टेप एंगल और गेन।',
    'cam-li3': 'बाहरी 5V सर्वो पावर सप्लाई Pi को ओवरलोड से बचाती है।',
    'cam-li4': 'pigpio PWM: GPIO17 पैन के लिए, GPIO18 टिल्ट के लिए।',

    /* ── Project 3: TurtleBot4 bullet points ── */
    'tb4-li1': '<code>dynamic_occupancy.py</code>: रियल-टाइम में प्रत्येक वेपॉइंट की FREE और OCCUPIED स्थिति ट्रैक करता है।',
    'tb4-li2': '<code>interactive_navigator.py</code>: Nav2 गोल भेजता है और वेपॉइंट भरा होने पर स्वचालित रूप से रीरूट करता है।',
    'tb4-li3': 'प्री-डॉक स्थिति और पूर्ण स्वायत्त डॉकिंग सीक्वेंस सहित 6-वेपॉइंट सिस्टम।',
    'tb4-li4': 'Ubuntu 24.04 पर ROS2 Jazzy और AMCL लोकलाइज़ेशन के साथ TurtleBot4 पर तैनात।',
    'tb4-li5': '5-टर्मिनल लॉन्च: लोकलाइज़ेशन, Nav2, RViz2, अधिभोग सर्वर, इंटरैक्टिव नेविगेटर।',

    /* ── Project 4: Arduino Mapping bullet points ── */
    'ard-li1': 'मास्टर बोर्ड सीरियल के माध्यम से स्लेव मोटर बोर्ड को MAP, RUN, STOP, SLOW कमांड भेजता है।',
    'ard-li2': 'एनकोडर ओडोमेट्री: प्रति चक्कर 850 काउंट, न्यूनतम पता लगाने योग्य गतिविधि लगभग 7 माइक्रोमीटर।',
    'ard-li3': 'ऊपर की ओर HC-SR04 से ब्रिज डिटेक्शन: संकरे रास्ते में स्वचालित रूप से 50% गति।',
    'ard-li4': 'पीछे की बाधा सुरक्षा: अप्रत्याशित बाधा पर लाल LED के साथ आपातकालीन स्टॉप।',
    'ard-li5': 'DRV8833 मोटर ड्राइवर के साथ ड्रिफ्ट मुआवजे के लिए LEFT_SPEED_CORRECTION स्थिरांक।',
    'ard-li6': 'NUM_INTERVALS स्थिरांक के माध्यम से कॉन्फ़िगर करने योग्य स्टॉप संख्या, कोई री-वायरिंग नहीं।',

    /* ── Project 5: Niryo bullet points ── */
    'niryo-li1': '<strong>तीन-स्तरीय आर्किटेक्चर:</strong> हार्डवेयर (NED2 + TurtleBot4 + ESP32), सॉफ्टवेयर (ROS2 + PyNiryo + Flask), इंटीग्रेशन (HTTP REST API + थ्रेडिंग)।',
    'niryo-li2': '<strong>Flask REST API 6 एंडपॉइंट:</strong> /start_niryo, /rfid, /niryo_done, /status, /emergency_stop, /reset।',
    'niryo-li3': '<strong>इवेंट-ड्रिवन RFID सिंक:</strong> threading.Event() Niryo को तब तक रोकता है जब तक ESP32 WiFi HTTP GET के माध्यम से टैग UID नहीं भेजता।',
    'niryo-li4': '<strong>4-बिन कार्टेशियन सॉर्टिंग</strong> SLOW_SPEED (20%) पर सुरक्षित ट्यूब इंसर्शन के साथ।',
    'niryo-li5': '<strong>ESP32 + PN532 RFID:</strong> GPIO21/22 पर I2C, MIFARE ISO14443A, 5cm से कम रेंज।',
    'niryo-li6': '<strong>TurtleBot4 समन्वयक:</strong> नेविगेट, डॉक, Niryo ट्रिगर, स्थिति पोल, अनडॉक, दोहराएं।',




    /* Modal overviews , remaining projects */
    'm-p4-ov':    'A dual-Arduino autonomous robot that maps a room using HC-SR04 ultrasonic sensors and encoder odometry, then executes a planned return journey with 5 equally-spaced scheduled stops.',
    'm-p5-ov':    'A fully autonomous three-component lab robotics system combining mobile navigation, 6-DOF manipulation, and RFID identification to sort test tubes without human intervention.',
    'm-mjol-ov':  "Fully detailed 3D CAD replica of Thor's Mjolnir, designed in Fusion 360. Precise geometry, fillets, surface detail, and material assignments, ready for 3D printing or CNC machining.",
    'm-arm-ov':   'Multi-DOF robotic arm designed from scratch in CAD. Full assembly with joint definitions, link geometry, and clearance tolerances designed for servo-driven actuation.',
    'm-lidar-ov': 'Full chassis CAD for a 4-wheeled differential drive robot with integrated LiDAR mount, sensor housing, and electronics bay, designed to be deployed with ROS2.',
    'm-key-details': 'Key Details',

    /* Modal overviews , all projects */
    'm-cam-ov':   'Raspberry Pi 4 पर YOLOv8 (NCNN) और Picamera2 का उपयोग करके pan-tilt कैमरा नियंत्रण के लिए दो MG996R servos के साथ रियल-टाइम ऑब्जेक्ट डिटेक्शन और ट्रैकिंग।',
    'm-tb4-ov':   'Nav2 और SLAM का उपयोग करके TurtleBot 4 के लिए स्वायत्त नेविगेशन में गतिशील वेपॉइंट शेड्यूलिंग। वास्तविक इनडोर वातावरण (H101 lab, Coventry University) में तैनात।',
    'm-p4-ov':    'HC-SR04 अल्ट्रासोनिक सेंसर और एनकोडर ओडोमेट्री का उपयोग करके कमरा मैप करने वाला दोहरा-Arduino स्वायत्त रोबोट, फिर 5 समान दूरी वाले स्टॉप के साथ वापस आता है।',
    'm-p5-ov':    'मोबाइल नेविगेशन, 6-DOF मैनिपुलेशन और RFID पहचान को मिलाकर बिना मानव हस्तक्षेप के टेस्ट ट्यूब छांटने वाली पूर्ण स्वचालित तीन-घटक प्रयोगशाला प्रणाली।',
    'm-mjol-ov':  'Fusion 360 में डिज़ाइन किया गया Thor के Mjolnir का पूर्ण विस्तृत 3D CAD रेप्लिका। सटीक ज्यामिति, फ़िलेट्स, सतह विवरण और सामग्री असाइनमेंट, 3D प्रिंटिंग या CNC मशीनिंग के लिए तैयार।',
    'm-arm-ov':   'CAD में खरोंच से डिज़ाइन किया गया मल्टी-DOF रोबोटिक आर्म। सर्वो-चालित एक्चुएशन के लिए जोड़ परिभाषाओं, लिंक ज्यामिति और क्लीयरेंस टॉलरेंस के साथ पूर्ण असेंबली।',
    'm-lidar-ov': 'ROS2 के साथ तैनात करने के लिए डिज़ाइन किए गए एकीकृत LiDAR माउंट, सेंसर हाउसिंग और इलेक्ट्रॉनिक्स बे के साथ 4-पहिया डिफरेंशियल ड्राइव रोबोट के लिए पूर्ण चेसिस CAD।',
    'm-key-details': 'मुख्य विवरण',
    /* ── Project 1: Gesture Drone bullet points ── */
    'drone-li1': '<strong>दो-हाथ नियंत्रण:</strong> बायां हाथ ड्रोन चुनता है (1/2/3 उंगलियां या खुली हथेली सभी के लिए)। दायां हाथ कमांड देता है: टेकऑफ, लैंड, ऊंचाई, फ्लिप, होवर।',
    'drone-li2': '<strong>खरोंच से कस्टम 5-लेयर FC-NN:</strong> 35 &rarr; 64(ReLU) &rarr; 32(ReLU) &rarr; 16(Tanh) &rarr; N(Softmax), L2 रेगुलराइज़ेशन, क्रॉस-एंट्रॉपी लॉस। कोई PyTorch नहीं, कोई TensorFlow नहीं।',
    'drone-li3': '<strong>तीन ऑप्टिमाइज़र:</strong> Adam, L-BFGS और Nelder-Mead का 5-fold क्रॉस-वैलिडेशन से तुलनात्मक अध्ययन।',
    'drone-li4': '<strong>35-फीचर हाथ वेक्टर</strong> MediaPipe HandLandmarker से: 10 उंगलियों की स्थिति, 5 विस्तार कोण, 3 कलाई अभिविन्यास, 2 हथेली ऑफसेट।',
    'drone-li5': '<strong>फ्लिप स्टेट मशीन:</strong> Windup 160ms &rarr; Rotate 320ms &rarr; Recover 240ms, 1.5m से अधिक ऊंचाई पर सुरक्षित फॉरवर्ड फ्लिप।',
    'drone-li6': '<strong>फेल-सेफ:</strong> 2 सेकंड से अधिक कोई इशारा नहीं होने पर सभी ड्रोन स्वचालित रूप से स्थिति पकड़ते हैं।',
    'drone-li7': 'व्यक्तिगत रूप से 10 जेस्चर क्लास में 800 से 1,200 ट्रेनिंग सैंपल रिकॉर्ड किए।',

    /* ── Project 2: Camera Tracking bullet points ── */
    'cam-li1': 'Picamera2 और YOLOv8n NCNN मॉडल: GPU के बिना RPi पर कम-विलंबता ऑन-डिवाइस इनफेरेंस।',
    'cam-li2': 'प्रोपोर्शनल कंट्रोल से चुनी गई क्लास को फ्रेम के केंद्र में रखता है। कॉन्फ़िगर करने योग्य डेडबैंड, मैक्स स्टेप एंगल और गेन।',
    'cam-li3': 'बाहरी 5V सर्वो पावर सप्लाई Pi को ओवरलोड से बचाती है।',
    'cam-li4': 'pigpio PWM: GPIO17 पैन के लिए, GPIO18 टिल्ट के लिए।',

    /* ── Project 3: TurtleBot4 bullet points ── */
    'tb4-li1': '<code>dynamic_occupancy.py</code>: रियल-टाइम में प्रत्येक वेपॉइंट की FREE और OCCUPIED स्थिति ट्रैक करता है।',
    'tb4-li2': '<code>interactive_navigator.py</code>: Nav2 गोल भेजता है और वेपॉइंट भरा होने पर स्वचालित रूप से रीरूट करता है।',
    'tb4-li3': 'प्री-डॉक स्थिति और पूर्ण स्वायत्त डॉकिंग सीक्वेंस सहित 6-वेपॉइंट सिस्टम।',
    'tb4-li4': 'Ubuntu 24.04 पर ROS2 Jazzy और AMCL लोकलाइज़ेशन के साथ TurtleBot4 पर तैनात।',
    'tb4-li5': '5-टर्मिनल लॉन्च: लोकलाइज़ेशन, Nav2, RViz2, अधिभोग सर्वर, इंटरैक्टिव नेविगेटर।',

    /* ── Project 4: Arduino Mapping bullet points ── */
    'ard-li1': 'मास्टर बोर्ड सीरियल के माध्यम से स्लेव मोटर बोर्ड को MAP, RUN, STOP, SLOW कमांड भेजता है।',
    'ard-li2': 'एनकोडर ओडोमेट्री: प्रति चक्कर 850 काउंट, न्यूनतम पता लगाने योग्य गतिविधि लगभग 7 माइक्रोमीटर।',
    'ard-li3': 'ऊपर की ओर HC-SR04 से ब्रिज डिटेक्शन: संकरे रास्ते में स्वचालित रूप से 50% गति।',
    'ard-li4': 'पीछे की बाधा सुरक्षा: अप्रत्याशित बाधा पर लाल LED के साथ आपातकालीन स्टॉप।',
    'ard-li5': 'DRV8833 मोटर ड्राइवर के साथ ड्रिफ्ट मुआवजे के लिए LEFT_SPEED_CORRECTION स्थिरांक।',
    'ard-li6': 'NUM_INTERVALS स्थिरांक के माध्यम से कॉन्फ़िगर करने योग्य स्टॉप संख्या, कोई री-वायरिंग नहीं।',

    /* ── Project 5: Niryo bullet points ── */
    'niryo-li1': '<strong>तीन-स्तरीय आर्किटेक्चर:</strong> हार्डवेयर (NED2 + TurtleBot4 + ESP32), सॉफ्टवेयर (ROS2 + PyNiryo + Flask), इंटीग्रेशन (HTTP REST API + थ्रेडिंग)।',
    'niryo-li2': '<strong>Flask REST API 6 एंडपॉइंट:</strong> /start_niryo, /rfid, /niryo_done, /status, /emergency_stop, /reset।',
    'niryo-li3': '<strong>इवेंट-ड्रिवन RFID सिंक:</strong> threading.Event() Niryo को तब तक रोकता है जब तक ESP32 WiFi HTTP GET के माध्यम से टैग UID नहीं भेजता।',
    'niryo-li4': '<strong>4-बिन कार्टेशियन सॉर्टिंग</strong> SLOW_SPEED (20%) पर सुरक्षित ट्यूब इंसर्शन के साथ।',
    'niryo-li5': '<strong>ESP32 + PN532 RFID:</strong> GPIO21/22 पर I2C, MIFARE ISO14443A, 5cm से कम रेंज।',
    'niryo-li6': '<strong>TurtleBot4 समन्वयक:</strong> नेविगेट, डॉक, Niryo ट्रिगर, स्थिति पोल, अनडॉक, दोहराएं।',

    /* Showcase labels */
    'sc0': 'इशारा मल्टी-ड्रोन (3\u00d7 UAV)',
    'sc1': 'कैमरा सर्वो ट्रैकिंग (RPi)',
    'sc2': 'TurtleBot4 अधिभोग कतार',
  }
};

window.toggleLang = function () {
  const isHi = (window.currentLang !== 'hi');
  window.currentLang = isHi ? 'hi' : 'en';
  const btn = document.getElementById('lang-toggle');
  btn.textContent = isHi ? 'EN' : 'हिं';
  btn.classList.toggle('on', isHi);
  document.body.classList.toggle('hi', isHi);
  document.documentElement.lang = window.currentLang;

  const d = T[window.currentLang];
  document.querySelectorAll('[data-t]').forEach(el => {
    const v = d[el.dataset.t];
    if (v !== undefined) el.textContent = v;
  });

  /* update showcase label */
  const i = window.getCurrentScene ? window.getCurrentScene() : 0;
  const scTxt = document.getElementById('sc-txt');
  if (scTxt) {
    const labels = isHi
      ? [d['sc0']||'इशारा मल्टी-ड्रोन (3× UAV)', d['sc1']||'कैमरा सर्वो ट्रैकिंग', d['sc2']||'TurtleBot4 अधिभोग कतार']
      : [d['sc0']||'Gesture Multi-Drone (3× UAV)', d['sc1']||'Camera Servo Tracking (RPi)', d['sc2']||'TurtleBot4 Occupancy Queuing'];
    scTxt.textContent = labels[i] || labels[0];
    window._scLabels = labels;
  }

  /* re-boot JARVIS in new language if panel is open */
  const jvSys = document.getElementById('jv-sys-mode');
  if(jvSys) jvSys.textContent = isHi ? 'सक्रिय मोड' : 'ACTIVE MODE';
  if(typeof jvUpdateShortcuts === 'function') jvUpdateShortcuts(isHi);
  if(window.jvOpen && typeof jvBoot === 'function'){
    const msgsEl = document.getElementById('jv-msgs');
    if(msgsEl){
      Array.from(msgsEl.querySelectorAll('.jvline')).forEach(el=>el.remove());
    }
    jvBoot();  }
};