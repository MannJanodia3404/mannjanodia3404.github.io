
// Placeholder used where a project photo isn't ready yet.
const PH = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='360' height='200'%3E%3Crect width='100%25' height='100%25' fill='%23ecebe5'/%3E%3Ctext x='50%25' y='52%25' font-family='monospace' font-size='11' fill='%238a8d83' text-anchor='middle'%3E[ photo coming soon ]%3C/text%3E%3C/svg%3E";

const PROJECTS = [
  {
    id: 'p1', num: '001', title: 'Neural Network Based Hand Gesture Control',
    stack: 'MediaPipe · NumPy NN · Webots', metric: '94.2% ACC',
    overview: 'A fully gesture-driven system controlling three simulated DJI Mavic2Pro drones in Webots using only a laptop webcam. Two separate neural networks, both written from scratch in NumPy, classify left-hand pose (drone selection) and right-hand pose (action), with results read by each drone controller every 8ms.',
    bullets: [
      'Custom 5-layer network, 35 → 64 → 32 → 16 → N with L2 regularisation and cross-entropy loss. No PyTorch, no TensorFlow.',
      'Three optimisers compared with 5-fold cross-validation: Adam, L-BFGS and Nelder-Mead.',
      '35-feature hand vector from MediaPipe: fingertip positions, extension angles, wrist orientation, palm offsets.',
      'Flip state machine: windup 160ms, rotate 320ms, recover 240ms, only above 1.5m altitude.',
      'Fail-safe: no gesture for 2 seconds and all drones hold position autonomously.'
    ],
    stats: [{ v: '94.2%', l: 'ACCURACY' }, { v: '<50ms', l: 'LATENCY' }, { v: '5,031', l: 'NN PARAMS' }],
    media: [
      { src: 'https://raw.githubusercontent.com/MannJanodia3404/Neural-Network-Based-Hand-Gesture-Control-for-Multi-Drone-Systems/main/worlds/.multi_drone.jpg', cap: 'WEBOTS SIMULATION' },
      { src: 'https://raw.githubusercontent.com/MannJanodia3404/Neural-Network-Based-Hand-Gesture-Control-for-Multi-Drone-Systems/main/gesture_nn/plots/RIGHT_adam.png', cap: 'TRAINING CURVES' }
    ],
    github: 'https://github.com/MannJanodia3404/Neural-Network-Based-Hand-Gesture-Control-for-Multi-Drone-Systems'
  },
  {
    id: 'p2', num: '002', title: 'Object Detection and Tracking',
    stack: 'YOLOv8 NCNN · RPi 4 · pigpio', metric: '30 FPS',
    overview: 'Real-time multi-object detection and tracking on a Raspberry Pi 4 using an NCNN-exported YOLOv8 model, driving two MG996R servos for pan-tilt camera control.',
    bullets: [
      'Low-latency on-device inference with Picamera2, no GPU required.',
      'Proportional control keeps the selected class centred, with configurable deadband, max step angle and gain.',
      'External 5V servo supply prevents Pi brownout under load.',
      'pigpio PWM: GPIO17 pan, GPIO18 tilt.'
    ],
    stats: [{ v: '30fps', l: 'SPEED' }, { v: '320×240', l: 'RESOLUTION' }, { v: 'P-ctrl', l: 'ALGORITHM' }],
    media: [{ src: PH, cap: 'RPI PAN-TILT RIG' }],
    github: 'https://github.com/MannJanodia3404/Object_Detection_and_Tracking'
  },
  {
    id: 'p3', num: '003', title: 'TurtleBot Dynamic Queue Navigation',
    stack: 'ROS2 Jazzy · Nav2 · SLAM', metric: '6 WAYPOINTS',
    overview: 'Dynamic waypoint scheduling with live occupancy detection on a TurtleBot 4, deployed in a real indoor environment: the H101 lab at Coventry University.',
    bullets: [
      'dynamic_occupancy.py tracks FREE and OCCUPIED state per waypoint in real time.',
      'interactive_navigator.py sends Nav2 goals and auto-reroutes around occupied waypoints.',
      'Six-waypoint system including pre-dock position and a full autonomous docking sequence.',
      'ROS2 Jazzy with AMCL localisation on Ubuntu 24.04, five-terminal launch.'
    ],
    stats: [{ v: '6', l: 'WAYPOINTS' }, { v: 'Nav2', l: 'FRAMEWORK' }, { v: 'SLAM', l: 'LOCALISATION' }],
    media: [{ src: 'https://raw.githubusercontent.com/MannJanodia3404/Turtlebot4_dynamic_queue_navigation/main/H101_map_by_mann.png', cap: 'H101 SLAM MAP' }],
    github: 'https://github.com/MannJanodia3404/Turtlebot4_dynamic_queue_navigation'
  },
  {
    id: 'p4', num: '004', title: 'Autonomous Mapping Robot',
    stack: 'C++ · 2× Arduino · HC-SR04', metric: '~7µm ODOM',
    overview: 'A dual-Arduino robot that maps a room with ultrasonic sensors and encoder odometry, then executes a planned return journey with equally spaced scheduled stops. Master/Slave architecture separates sensing from motor control.',
    bullets: [
      'Master board sends MAP, RUN, STOP and SLOW commands to the Slave motor board over serial.',
      'Encoder odometry at 850 counts per revolution, minimum detectable movement around 7 micrometres.',
      'Bridge detection via upward HC-SR04 auto-slows to 50% through narrow passages.',
      'Rear obstacle safety with emergency stop, DRV8833 driver with tunable drift compensation.'
    ],
    stats: [{ v: '~7µm', l: 'PRECISION' }, { v: '36.6', l: 'CM/S MAX' }, { v: '2× Uno', l: 'BOARDS' }],
    media: [
      { src: 'https://raw.githubusercontent.com/MannJanodia3404/Autonomous_Mapping_Robot_Arduino/main/Image/1.jpg', cap: 'ROBOT BUILD' },
      { src: 'https://raw.githubusercontent.com/MannJanodia3404/Autonomous_Mapping_Robot_Arduino/main/Image/Spectacular_Lahdi-Hillar.png', cap: 'WIRING SCHEMATIC' }
    ],
    github: 'https://github.com/MannJanodia3404/Autonomous_Mapping_Robot_Arduino'
  },
  {
    id: 'p5', num: '005', title: 'Autonomous Test Tube Transport and Placement System',
    stack: 'PyNiryo · Flask · ESP32 RFID', metric: '0 HUMANS',
    overview: 'A fully autonomous three-component lab system combining mobile navigation, 6-DOF manipulation and RFID identification to pick, scan and sort test tubes with zero human intervention.',
    bullets: [
      'Three-layer architecture: NED2 + TurtleBot4 + ESP32 hardware, ROS2 + PyNiryo + Flask software, REST + threading integration.',
      'Flask REST API with six endpoints including /rfid, /status and /emergency_stop.',
      'Event-driven RFID sync: threading.Event() blocks the arm at the scanner until the ESP32 sends the tag UID over WiFi.',
      'Four-bin Cartesian sorting at 20% speed for safe tube insertion.'
    ],
    stats: [{ v: '4', l: 'TUBES/CYCLE' }, { v: '6', l: 'API ENDPOINTS' }, { v: '3', l: 'SYSTEMS' }],
    media: [{ src: PH, cap: 'NED2 SORTING CELL' }],
    github: 'https://github.com/MannJanodia3404/Autonomous-Test-Tube-Transport-and-Placement-System'
  },
  {
    id: 'p6', num: '006', title: 'Mjolnir CAD Design',
    stack: 'Fusion 360 · Parametric', metric: 'FDM READY',
    overview: 'Fully detailed 3D CAD replica of Mjolnir designed in Fusion 360. Handle, head, cap and strap modelled as separate bodies with surface quality optimised for FDM printing.',
    bullets: [
      'Full parametric model with all dimensions specified.',
      'Four separate bodies for independent print orientation.',
      'Fillets and surface detail tuned for layer adhesion.'
    ],
    stats: [{ v: '4', l: 'BODIES' }, { v: 'F360', l: 'TOOL' }, { v: 'FDM', l: 'PROCESS' }],
    media: [{ src: 'https://raw.githubusercontent.com/MannJanodia3404/Mj-lnir_Cad/main/Mjolnir%20Render.png', cap: 'FUSION 360 RENDER' }],
    github: 'https://github.com/MannJanodia3404/Mj-lnir_Cad'
  },
  {
    id: 'p7', num: '007', title: 'Robotic Arm CAD Design',
    stack: 'Fusion 360 · Mechanical', metric: 'MULTI-DOF',
    overview: 'Multi-DOF robotic arm designed from scratch in Fusion 360. Full assembly with per-joint sub-assemblies and clearance tolerances engineered for smooth servo-driven actuation.',
    bullets: [
      'Sub-assemblies for each joint, replaceable individually.',
      'Clearance tolerances validated for servo rotation.',
      'Modular link geometry for reconfiguration.'
    ],
    stats: [{ v: '6', l: 'JOINTS' }, { v: 'F360', l: 'TOOL' }, { v: 'SRV', l: 'ACTUATION' }],
    media: [{ src: 'https://raw.githubusercontent.com/MannJanodia3404/Robotic-Arm/main/Robotics_Arm_Render.png', cap: 'ASSEMBLY RENDER' }],
    github: 'https://github.com/MannJanodia3404/Robotic-Arm'
  },
  {
    id: 'p8', num: '008', title: '4-Wheel LiDAR Robot CAD',
    stack: 'Fusion 360 · ROS2 ready', metric: 'DIFF DRIVE',
    overview: 'Full chassis CAD for a 4-wheeled differential drive robot with integrated LiDAR mounting plate, sensor housing and a dedicated electronics bay for an RPi 4 and motor driver.',
    bullets: [
      'LiDAR mounting plate with cable management.',
      'Electronics bay with RPi and driver mounting points.',
      'Designed for FDM printing plus a laser-cut base plate.'
    ],
    stats: [{ v: '4', l: 'WHEELS' }, { v: 'LiDAR', l: 'SENSOR' }, { v: 'ROS2', l: 'TARGET' }],
    media: [{ src: 'https://raw.githubusercontent.com/MannJanodia3404/4-Wheel-LiDAR-Robot/main/images.png', cap: 'CHASSIS RENDER' }],
    github: 'https://github.com/MannJanodia3404/4-Wheel-LiDAR-Robot'
  }
];

const CAD_MODELS = [
  {
    fig: 'FIG. 04', name: 'Mjolnir', sub: 'PARAMETRIC REPLICA',
    label: 'Mjolnir CAD render',
    src: 'https://raw.githubusercontent.com/MannJanodia3404/Mj-lnir_Cad/main/Mjolnir%20Render.png',
    stl: 'https://raw.githubusercontent.com/MannJanodia3404/Mj-lnir_Cad/main/mjolnir.stl',
    meta: '4 BODIES · STL'
  },
  {
    fig: 'FIG. 05', name: 'Robotic Arm', sub: 'MULTI-DOF ASSEMBLY',
    label: 'Robotic arm CAD render',
    src: 'https://raw.githubusercontent.com/MannJanodia3404/Robotic-Arm/main/Robotics_Arm_Render.png',
    stl: 'https://raw.githubusercontent.com/MannJanodia3404/Robotic-Arm/main/Robotics_arm_assembly.stl',
    meta: '6 JOINTS · STEP'
  },
  {
    fig: 'FIG. 06', name: 'LiDAR Robot', sub: 'DIFF DRIVE CHASSIS',
    label: 'LiDAR robot CAD render',
    src: 'https://raw.githubusercontent.com/MannJanodia3404/4-Wheel-LiDAR-Robot/main/images.png',
    stl: 'https://raw.githubusercontent.com/MannJanodia3404/4-Wheel-LiDAR-Robot/main/4-wheel%20robot.stl',
    meta: 'ROS2 READY · STL'
  }
];

const SKILL_GROUPS = [
  { label: 'LANGUAGES', items: ['Python', 'C++', 'JavaScript', 'Bash', 'YAML', 'URDF/XML'], note: 'Python primary for robotics, C++ for performance-critical nodes.' },
  { label: 'ROBOTICS + ROS2', items: ['ROS2 Jazzy', 'Nav2', 'SLAM Toolbox', 'MoveIt2', 'PyNiryo', 'RViz2', 'ros2_control'], note: 'Full ROS2 systems on Ubuntu 24.04, deployed on real robots.' },
  { label: 'AI + VISION', items: ['TensorFlow', 'Keras', 'OpenCV', 'MediaPipe', 'YOLOv8 NCNN', 'NumPy', 'scikit-learn'], note: 'Custom networks from scratch, ArUco pose estimation, edge inference.' },
  { label: 'HARDWARE', items: ['Niryo NED2', 'TurtleBot4', 'Raspberry Pi 4', 'ESP32', 'Arduino Uno', 'RPLIDAR', 'PN532 RFID'], note: 'Debugged I2C, WiFi, TCP and serial on real machines.' },
  { label: 'TOOLS', items: ['Webots', 'Gazebo', 'Flask', 'Docker', 'Ubuntu 24.04', 'Fusion 360', 'Git'], note: 'Simulation first, REST APIs for multi-system coordination.' }
];

const EXPERIENCE = [
  {
    year: '2025', role: 'Radio Frequency Engineer', company: 'OPTIMIZED SOLUTIONS LIMITED',
    desc: 'Developed and validated RF-enabled embedded systems through rigorous signal analysis, environmental stress testing and systematic hardware debugging for reliability and compliance.',
    tags: ['RF SIGNAL ANALYSIS', 'ENVIRONMENTAL TESTING', 'HARDWARE DEBUGGING', 'DOCUMENTATION']
  },
  {
    year: '2024', role: 'Electrical Engineer', company: 'BOSCH REXROTH',
    desc: 'Conducted fault diagnosis and sensor calibration for hydraulic and electromechanical systems within cross-functional validation and verification teams.',
    tags: ['FAULT DIAGNOSIS', 'SENSOR CALIBRATION', 'ELECTROMECHANICAL', 'VERIFICATION']
  },
  {
    year: '2023', role: 'Firmware Lead', company: 'ROBOFEST',
    desc: 'Led firmware development and full hardware integration for a competitive robotics platform: embedded architecture, sensor interfacing, motor control pipelines and inter-subsystem communication.',
    tags: ['FIRMWARE', 'HARDWARE INTEGRATION', 'ELECTRONICS', 'EMBEDDED']
  }
];
