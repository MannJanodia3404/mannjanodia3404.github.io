# Mann Janodia: Personal Portfolio

My personal robotics engineering portfolio, built from scratch with vanilla HTML, CSS, and JavaScript.

Live at: **https://mannjanodia3404.github.io**

---

## What's in here

A single-page portfolio covering my robotics projects, CAD work, skills, experience, and contact info. Projects are expandable rows with full technical detail, the CAD section has a selectable model viewer, and everything is driven from one data file so content is easy to edit.

```
├── index.html          # Page structure (the static shell)
├── css/
│   └── style.css       # All styling
├── js/
│   ├── data.js         # ALL content: projects, CAD, skills, experience
│   └── main.js         # Rendering + interactions (accordion, CAD, reveal)
├── images/
│   └── photo.jpg       # My photo in the About section  ← add this
└── resume.pdf          # Downloadable resume             ← add this
```

> **Note:** `images/photo.jpg` and `resume.pdf` are the two files you carry over
> from the old repo. Delete the two `*.README.txt` placeholder files once the
> real photo and PDF are in place.

---

## Projects covered

- **Gesture Multi-Drone Control**: Three simulated DJI Mavic2Pro drones in Webots, controlled by two NumPy-from-scratch neural networks reading MediaPipe hand landmarks. 94.2% accuracy, <50ms latency.
- **Camera Servo Tracking (RPi)**: YOLOv8 NCNN on a Raspberry Pi 4 with Picamera2, pan-tilt tracking via two MG996R servos and pigpio PWM at 30fps.
- **TurtleBot4 Occupancy Navigation**: ROS2 Jazzy + Nav2 with live per-waypoint occupancy detection and auto-rerouting, deployed on a real TurtleBot4 in the H101 lab.
- **Autonomous Mapping Robot**: Dual-Arduino (Master/Slave) mapping robot using HC-SR04 ultrasonics and encoder odometry down to ~7µm, with automatic bridge-detection slowdown.
- **Niryo NED2 Tube Sorting**: NED2 arm + TurtleBot4 + ESP32/PN532 RFID, coordinated over a Flask REST API and threading events. Zero human intervention.
- **Mjolnir / Robotic Arm / 4-Wheel LiDAR Robot**: Parametric Fusion 360 CAD builds, FDM-ready.

---

## Making changes

**All content lives in `js/data.js`.** You don't touch HTML to change words.

- **Edit a project**: find its object in the `PROJECTS` array in `data.js` and change `title`, `overview`, `bullets`, `stats`, `metric`, `media` or `github`.
- **Add a project**: copy an existing object in `PROJECTS`, give it a new `id` and `num`, and it appears automatically.
- **CAD models**: edit the `CAD_MODELS` array.
- **Skills / Experience**: edit the `SKILL_GROUPS` and `EXPERIENCE` arrays.

Images use raw GitHub URLs (`raw.githubusercontent.com/...`) so they pull straight from each project's own repo, so there's no need to copy them in.

---

## Deploying changes

Hosted on GitHub Pages from the `main` branch. Any push to `main` redeploys automatically, usually live within 1–2 minutes.

```bash
git add .
git commit -m "Your message here"
git push origin main
```

After pushing, open the site in an **incognito window** (`Ctrl+Shift+N`) or hard-refresh (`Ctrl+Shift+R`) to bypass cache.

---

## Tech stack

| What          | How                                   |
| ------------- | ------------------------------------- |
| Structure     | Vanilla HTML5                         |
| Styling       | CSS3 with custom properties           |
| Interactivity | Vanilla JavaScript (ES6+)             |
| Rendering     | Data-driven from `js/data.js`         |
| Hosting       | GitHub Pages                          |
| Fonts         | Archivo, IBM Plex Mono (Google Fonts) |

---

## Contact

- Email: mannjanodiauk@gmail.com
- GitHub: https://github.com/MannJanodia3404
- LinkedIn: https://www.linkedin.com/in/mann-janodia/
