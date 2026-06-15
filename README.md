# CyberGuard 🛡️

## Comprehensive Vulnerability Scanning & AI-Powered Remediation Platform

CyberGuard is a full-stack cybersecurity platform designed to automate vulnerability discovery, simulate phishing assessments, and provide AI-powered remediation recommendations. The platform combines automated scanning, intelligent analysis, and professional reporting to help security teams identify, understand, and mitigate security risks efficiently.

---

## 📸 Platform Screenshots

<details>
  <summary>🌐 Click to expand Frontend Landing Page Screenshots</summary>
  <br>
  <p align="center">
    <img src="/screenshots/landingpage.png" alt="CyberGuard landingpage" width="80%">
    <br>
    <i>Figure 1: CyberGuard Landing Page</i>
  </p>
</details>

<details>
  <summary>🛡️ Click to expand About</summary>
  <br>
  <p align="center">
    <img src="/screenshots/overview.png" alt="overview" width="45%">
    <img src="/screenshots/keycapabilities.png" alt="keycapabilities" width="45%">
    <img src="/screenshots/pricing.png" alt="pricing" width="45%">
    <img src="/screenshots/review.png" alt="review" width="45%">
    <img src="/screenshots/contactus.png" alt="contactus" width="45%">
    <br>
    <i>Figure 2: CyberGuard About</i>
  </p>
</details>

<details>
  <summary>📊 Click to expand Admin Profile</summary>
  <br>
  <p align="center">
    <img src="/screenshots/dashboard.png" alt="dashboard" width="45%">
    <img src="/screenshots/dashboard1.png" alt="dashboard" width="45%">
    <img src="/screenshots/scans.png" alt="scans" width="45%">
    <img src="/screenshots/scans1.png" alt="scans" width="45%">
    <img src="/screenshots/findings.png" alt="findings" width="45%">
    <img src="/screenshots/blueteam.png" alt="blueteam" width="45%">
    <img src="/screenshots/action.png" alt="action" width="45%">
    <img src="/screenshots/logs.png" alt="logs.png" width="45%">
    <br>
    <i>Figure 3: Admin Profile</i>
  </p>
</details>


## 🚀 Features

### Automated Vulnerability Scanning

A Python-based scanning engine capable of identifying common web application vulnerabilities, including:

- Cross-Site Scripting (XSS)
- Configuration weaknesses
- Exposure and misconfiguration issues
- Basic attack surface assessment

### AI-Powered Remediation

An intelligent remediation layer that:

- Analyzes vulnerability findings
- Generates defensive recommendations
- Suggests mitigation strategies
- Assists Blue Teams in prioritizing security actions

### Professional PDF Reporting

Automated report generation using ReportLab, providing:

- Technical vulnerability details
- Executive summaries
- Risk assessments
- Structured remediation guidance

### Phishing Simulation Engine

Security awareness testing modules that allow organizations to:

- Simulate phishing campaigns
- Measure user awareness
- Evaluate security training effectiveness

---

## 🛠️ Technology Stack

### Backend

- Python 3.x
- FastAPI
- Requests
- ReportLab
- Docker SDK
- Pydantic
- Python Dotenv

### Frontend

- React
- TypeScript
- Vite

### Lab Environment

- Docker Desktop
- OWASP Nettacker
- DVWA (Damn Vulnerable Web Application)

---

# ⚙️ Lab Environment Setup

The CyberGuard laboratory environment uses isolated Docker containers to provide a safe and controlled penetration testing environment.

---

## Prerequisites

Install Docker Desktop before continuing.

Docker Installation:

https://www.docker.com/products/docker-desktop/

Verify the installation:

```bash
docker --version
docker compose version
```

---

# Step 1 — Create an Isolated Testing Network

Create a dedicated Docker network for all penetration testing containers.

```bash
docker network create pentest-network
```

Verify the network:

```bash
docker network ls
```

Ensure that `pentest-network` appears in the list.

---

# Step 2 — Deploy the Vulnerable Target (DVWA)

Pull the DVWA image:

```bash
docker pull vulnerables/web-dvwa
```

Run the container:

```bash
docker run -d \
--name dvwa \
--network pentest-network \
-p 8080:80 \
vulnerables/web-dvwa
```

Verify that the container is running:

```bash
docker ps
```

---

# Step 3 — Configure DVWA

Open the application:

```text
http://localhost:8080
```

Default credentials:

```text
Username: admin
Password: password
```

After logging in:

1. Navigate to **Setup / Reset DB**
2. Click **Create / Reset Database**
3. Open **DVWA Security**
4. Set **Security Level** to **Low**
5. Click **Submit**

The vulnerable target is now ready for testing.

---

# Step 4 — Deploy OWASP Nettacker

Pull the official image:

```bash
docker pull owasp/nettacker
```

Start the container:

```bash
docker run -it \
--name nettacker \
--network pentest-network \
owasp/nettacker bash
```

---

# Step 5 — Verify Connectivity

Inside the Nettacker container, test communication with DVWA:

```bash
ping dvwa
```

Expected result:

```text
Successful ICMP replies from the DVWA container.
```

This confirms that both containers are connected to the same isolated network.

---

# 💻 Backend Development Setup

Navigate to the project root directory:

```text
/pentest-platform
```

Create a Python virtual environment:

```bash
python -m venv venv
```

Activate the environment (Windows):

```bash
.\venv\Scripts\activate
```

Upgrade pip and install dependencies:

```bash
pip install --upgrade pip
pip install fastapi uvicorn pydantic requests python-dotenv reportlab docker
```

---

## Start the Backend Server

Run FastAPI using Uvicorn:

```bash
uvicorn main:app --reload --port 8000
```

Backend API:

```text
http://localhost:8000
```

API Documentation:

```text
http://localhost:8000/docs
```

---

# 🎨 Frontend Development Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

---

## Start the Frontend Server

Launch the development environment:

```bash
npm run dev
```

The frontend interface will be available at:

```text
http://localhost:5173
```

(Port may vary depending on your Vite configuration.)

---

# 📁 Project Structure

```text
CyberGuard/
│
├── backend/
│   ├── scanners/
│   ├── ai_remediation/
│   ├── reports/
│   ├── api/
│   └── main.py
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
│
├── docker/
│
├── docs/
│
└── README.md
```

---

# 🎯 Project Objectives

CyberGuard aims to provide:

- Automated vulnerability identification
- AI-assisted remediation guidance
- Professional security reporting
- Security awareness evaluation
- A safe penetration testing laboratory

---

# ⚠️ Disclaimer

CyberGuard is intended for educational purposes, research, and authorized security assessments only.

Users are responsible for ensuring that all scanning and testing activities are performed exclusively on systems they own or have explicit permission to assess.

Unauthorized testing against third-party systems may violate applicable laws and regulations.

---

## License

This project is provided for educational and research purposes.
