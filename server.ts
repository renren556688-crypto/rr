import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import multer from "multer";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECTS_FILE = path.join(process.cwd(), "projects.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Initial data if file doesn't exist
if (!fs.existsSync(PROJECTS_FILE)) {
  const initialProjects = [
    {
      id: "1",
      title: "港口 AI 业务平台",
      category: "B端业务平台 / AI 视觉",
      image: "https://picsum.photos/seed/port/800/600",
      description: "基于 AI 视觉识别技术的港口自动化业务管理系统，提升作业效率 40%。",
      tags: ["Figma", "AI", "Dashboard"]
    },
    {
      id: "2",
      title: "数字人助手 - 智能交互",
      category: "AI 交互 / 移动端",
      image: "https://picsum.photos/seed/ai/800/600",
      description: "多模态交互数字人助手，集成语音识别与情感化视觉反馈。",
      tags: ["MasterGo", "AE", "AI"]
    },
    {
      id: "3",
      title: "钓鱼台·美高梅官网改版",
      category: "品牌官网 / 响应式设计",
      image: "https://picsum.photos/seed/hotel/800/600",
      description: "高端酒店品牌数字化重塑，通过极简主义设计传达品牌奢华调性。",
      tags: ["Figma", "Web", "Luxury"]
    }
  ];
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(initialProjects, null, 2));
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/projects", (req, res) => {
    const data = fs.readFileSync(PROJECTS_FILE, "utf-8");
    res.json(JSON.parse(data));
  });

  app.post("/api/projects", upload.array("images", 10), (req, res) => {
    const { title, category, description, details, detailImages, tags } = req.body;
    const projects = JSON.parse(fs.readFileSync(PROJECTS_FILE, "utf-8"));
    
    const files = req.files as Express.Multer.File[];
    const uploadedImages = files ? files.map(f => `/uploads/${f.filename}`) : [];
    
    const newProject = {
      id: Date.now().toString(),
      title,
      category,
      description,
      details: details || "",
      detailImages: Array.isArray(detailImages) ? detailImages : (detailImages ? [detailImages] : []),
      tags: typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : tags,
      images: uploadedImages.length > 0 ? uploadedImages : (Array.isArray(req.body.images) ? req.body.images : [req.body.images].filter(Boolean))
    };

    projects.push(newProject);
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2));
    res.status(201).json(newProject);
  });

  app.put("/api/projects/:id", upload.array("images", 10), (req, res) => {
    const { id } = req.params;
    const { title, category, description, details, detailImages, tags } = req.body;
    let projects = JSON.parse(fs.readFileSync(PROJECTS_FILE, "utf-8"));
    
    const index = projects.findIndex((p: any) => p.id === id);
    if (index === -1) return res.status(404).send("Project not found");

    const files = req.files as Express.Multer.File[];
    const uploadedImages = files ? files.map(f => `/uploads/${f.filename}`) : [];

    const updatedProject = {
      ...projects[index],
      title,
      category,
      description,
      details: details !== undefined ? details : projects[index].details,
      detailImages: detailImages !== undefined ? (Array.isArray(detailImages) ? detailImages : [detailImages]) : projects[index].detailImages,
      tags: typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : tags,
      images: uploadedImages.length > 0 ? uploadedImages : (projects[index].images || [projects[index].image])
    };

    projects[index] = updatedProject;
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2));
    res.json(updatedProject);
  });

  app.delete("/api/projects/:id", (req, res) => {
    const { id } = req.params;
    let projects = JSON.parse(fs.readFileSync(PROJECTS_FILE, "utf-8"));
    projects = projects.filter((p: any) => p.id !== id);
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2));
    res.status(204).send();
  });

  app.post("/api/upload", upload.array("images", 10), (req, res) => {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) return res.status(400).send("No files uploaded");
    const urls = files.map(f => `/uploads/${f.filename}`);
    res.json({ urls });
  });

  app.use("/uploads", express.static(UPLOADS_DIR));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, {
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".js") || filePath.endsWith(".mjs")) {
          res.setHeader("Content-Type", "application/javascript; charset=utf-8");
        } else if (filePath.endsWith(".css")) {
          res.setHeader("Content-Type", "text/css; charset=utf-8");
        } else if (filePath.endsWith(".html")) {
          res.setHeader("Content-Type", "text/html; charset=utf-8");
        } else if (filePath.endsWith(".json")) {
          res.setHeader("Content-Type", "application/json; charset=utf-8");
        }
      }
    }));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
