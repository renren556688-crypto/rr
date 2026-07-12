/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowRight, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronDown,
  Menu,
  X,
  Plus,
  Trash2,
  Edit2,
  Save,
  XCircle,
  Upload
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// --- Types ---

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  details: string;
  images: string[];
  detailImages: string[];
  tags: string[];
  link: string;
  layout?: string;
}

// --- Data ---

const EXPERIENCE = [
  {
    role: "UI 设计师",
    company: "中易造价咨询（吉林) 有限公司",
    period: "2023.05 - 2026.04",
    description: "负责工程报价相关外包视觉物料设计，制作业务宣传 H5、投标画册、线下宣传展板；日常维护视觉更新，统一全品类对外物料视觉标准，配合业务完成各类宣传素材迭代输出。"
  },
  {
    role: "视觉设计",
    company: "北京网赢时代科技有限公司",
    period: "2013.08 - 2023.03",
    description: "负责电商与企业官网页面设计、日常视觉维护及 Banner 物料输出；承接诺基亚 EDM、易拉宝、宣传册、台历等线下宣传物料设计，统筹渠道平台全案视觉策划落地。熟练使用 Dreamweaver 兼顾视觉设计与简易前端制作，融合视觉规范与前端代码优化页面呈现，服务蒙牛、中石化、长安汽车、诺基亚、中航工业等大型企业客户。"
  },
  {
    role: "设计师",
    company: "中企动力科技股份有限公司（设计部）",
    period: "2011.04 - 2013.07",
    description: "全权负责数十家企业 PC 官网创意设计，同步把控移动端界面视觉统一，涵盖引导页、首页、列表及详情页全流程设计。对接客户需求定制专属视觉方案，讲解设计逻辑与体验思路，跟进项目验收上线，保障交付质量与效率；参与内部设计分享，输出设计方法论与实操技巧，项目客户验收满意度 100%。"
  },
  {
    role: "设计师",
    company: "北京清大万博科技有限公司（设计部）",
    period: "2009.11 - 2011.03",
    description: "承接门户、商城、企业官网、品牌引导页全链路设计，从前期客户沟通、风格提案评审，到页面视觉输出、ecshop 简易程序制作，跟进项目上线及长期视觉维护，全程把控项目交付效率与设计品质，服务曹雪芹学会、金夫人、千县网等政企与商业客户。"
  }
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "关于我", href: "#about-me" },
    { name: "设计作品", href: "#design" },
    { name: "联系我", href: "#contact" }
  ];

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl">
      <motion.div 
        className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl px-6 py-3 flex justify-between items-center shadow-[0_8px_32_0_rgba(0,0,0,0.8)]"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex items-center space-x-8">
          <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
             <img src="/avatar.png" alt="Logo" className="w-full h-full object-cover" />
          </a>
          <div className="hidden md:flex space-x-8 text-sm font-bold text-gray-400">
            {navLinks.map((item) => (
              <a key={item.name} href={item.href} className="hover:text-white transition-colors tracking-tight">
                {item.name}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 space-y-4 text-lg font-medium shadow-2xl"
          >
            {navLinks.map((item) => (
              <a key={item.name} href={item.href} className="block text-gray-400 hover:text-white" onClick={() => setIsOpen(false)}>
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const leftSkills = ["Figma", "MasterGo", "AE"];
  const rightSkills = ["剪映", "Photoshop", "Illustrator"];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 text-center relative overflow-hidden">
      <div className="grid-bg absolute inset-0 z-0 pointer-events-none" />
      <div className="spotlight absolute inset-0 z-0 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto w-full relative z-10">
        <div className="relative inline-block mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="w-[180px] h-[180px] rounded-full overflow-hidden relative z-10 border border-white/10 shadow-2xl">
              <img 
                src="/avatar.png" 
                alt="任利颖" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Left Skills */}
          <div className="absolute top-[-20px] bottom-[-20px] right-full mr-6 md:mr-12 flex flex-col justify-around py-2 hidden md:flex">
            {leftSkills.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-3 self-end"
              >
                <div className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-[10px] md:text-xs font-bold tracking-widest text-white/70 whitespace-nowrap shadow-2xl">
                  {skill}
                </div>
                <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-white/20 border-b-[4px] border-b-transparent" />
              </motion.div>
            ))}
          </div>

          {/* Right Skills */}
          <div className="absolute top-[-20px] bottom-[-20px] left-full ml-6 md:ml-12 flex flex-col justify-around py-2 hidden md:flex">
            {rightSkills.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-0 h-0 border-t-[4px] border-t-transparent border-r-[6px] border-r-white/20 border-b-[4px] border-b-transparent" />
                <div className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-[10px] md:text-xs font-bold tracking-widest text-white/70 whitespace-nowrap shadow-2xl">
                  {skill}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-lg md:text-xl font-medium mb-6 tracking-tight">
            你好，我是 任利颖
          </p>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-widest leading-[1.2] mb-8 bg-gradient-to-b from-gray-300 to-white bg-clip-text text-transparent">
            用细节定义品质 <br />
            用体验打动用户
          </h1>
          
          <p className="text-accent font-bold text-lg md:text-xl mb-8 tracking-tight">
            16 年资深 UI 设计师 | 全平台视觉与体验设计
          </p>
          
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-12">
            我是一名UI设计师，专注于 APP、小程序、官网全平台数字体验。以用户体验为核心，沉淀标准化组件与落地规范；善用 AI 工具辅助创意与方案梳理，平衡视觉美感与落地实用性，用设计传递产品价值。
          </p>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={32} className="text-white/20" />
      </motion.div>
    </section>
  );
};

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-[#121212] w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[32px] border border-white/10 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-12">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4 block">
              {project.category}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">{project.title}</h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed mb-8">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              {project.tags.map(tag => (
                <span key={tag} className="px-4 py-2 bg-white/5 rounded-full text-sm font-medium text-gray-300 border border-white/5">
                  {tag}
                </span>
              ))}
            </div>
            
            {project.details || (project.detailImages && project.detailImages.length > 0) ? (
              <div className="mt-12 mb-16">
                {project.details && (
                  <div className="text-gray-300 text-lg leading-relaxed prose prose-invert max-w-none mb-12">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {project.details}
                    </ReactMarkdown>
                  </div>
                )}

                {project.detailImages && project.detailImages.length > 0 && (
                  project.layout === "single" ? (
                    <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
                      {project.detailImages.map((img, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * i }}
                          className="rounded-2xl overflow-hidden border border-white/5 bg-white/5"
                        >
                          <img src={img} alt={`Detail ${i + 1}`} className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
                        </motion.div>
                      ))}
                    </div>
                  ) : project.layout === "mixed" ? (
                    <div className="flex flex-col gap-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
                        <div className="flex flex-col gap-8">
                          {project.detailImages.slice(0, 4).filter((_, i) => i % 2 === 0).map((img, idx) => {
                            const originalIndex = idx * 2;
                            return (
                              <motion.div 
                                key={originalIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * originalIndex }}
                                className="rounded-2xl overflow-hidden border border-white/5 bg-white/5"
                              >
                                <img src={img} alt={`Detail ${originalIndex + 1}`} className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
                              </motion.div>
                            );
                          })}
                        </div>
                        <div className="flex flex-col gap-8">
                          {project.detailImages.slice(0, 4).filter((_, i) => i % 2 === 1).map((img, idx) => {
                            const originalIndex = idx * 2 + 1;
                            return (
                              <motion.div 
                                key={originalIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * originalIndex }}
                                className="rounded-2xl overflow-hidden border border-white/5 bg-white/5"
                              >
                                <img src={img} alt={`Detail ${originalIndex + 1}`} className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : project.layout === "right-report" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-8 items-start">
                      <div className="flex flex-col gap-8">
                        {project.detailImages.filter(img => img !== "https://i.ibb.co/YTkWXN9g/image.png").map((img, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            className="rounded-2xl overflow-hidden border border-white/5 bg-white/5"
                          >
                            <img src={img} alt={`Detail ${idx + 1}`} className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
                          </motion.div>
                        ))}
                      </div>
                      <div className="flex flex-col gap-8">
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="rounded-2xl overflow-hidden border border-white/5 bg-white/5 sticky top-28"
                        >
                          <img src="https://i.ibb.co/YTkWXN9g/image.png" alt="Home Page" className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
                        </motion.div>
                      </div>
                    </div>
                  ) : project.layout === "right-bottom" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-8 items-start">
                      <div className="flex flex-col gap-8">
                        {project.detailImages.slice(0, -1).filter((_, i) => i % 2 === 0).map((img, idx) => {
                          const originalIndex = idx * 2;
                          return (
                            <motion.div 
                              key={originalIndex}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * originalIndex }}
                              className="rounded-2xl overflow-hidden border border-white/5 bg-white/5"
                            >
                              <img src={img} alt={`Detail ${originalIndex + 1}`} className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
                            </motion.div>
                          );
                        })}
                      </div>
                      <div className="flex flex-col gap-8">
                        {project.detailImages.slice(0, -1).filter((_, i) => i % 2 === 1).map((img, idx) => {
                          const originalIndex = idx * 2 + 1;
                          return (
                            <motion.div 
                              key={originalIndex}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * originalIndex }}
                              className="rounded-2xl overflow-hidden border border-white/5 bg-white/5"
                            >
                              <img src={img} alt={`Detail ${originalIndex + 1}`} className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
                            </motion.div>
                          );
                        })}
                        {project.detailImages.length > 0 && (() => {
                          const lastIdx = project.detailImages.length - 1;
                          const img = project.detailImages[lastIdx];
                          return (
                            <motion.div 
                              key={lastIdx}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * lastIdx }}
                              className="rounded-2xl overflow-hidden border border-white/5 bg-white/5"
                            >
                              <img src={img} alt={`Detail ${lastIdx + 1}`} className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
                            </motion.div>
                          );
                        })()}
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-8 items-start">
                      <div className="flex flex-col gap-8">
                        {project.detailImages.filter((_, i) => i % 2 === 0).map((img, idx) => {
                          const originalIndex = idx * 2;
                          return (
                            <motion.div 
                              key={originalIndex}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * originalIndex }}
                              className="rounded-2xl overflow-hidden border border-white/5 bg-white/5"
                            >
                              <img src={img} alt={`Detail ${originalIndex + 1}`} className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
                            </motion.div>
                          );
                        })}
                      </div>
                      <div className="flex flex-col gap-8">
                        {project.detailImages.filter((_, i) => i % 2 === 1).map((img, idx) => {
                          const originalIndex = idx * 2 + 1;
                          return (
                            <motion.div 
                              key={originalIndex}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * originalIndex }}
                              className="rounded-2xl overflow-hidden border border-white/5 bg-white/5"
                            >
                              <img src={img} alt={`Detail ${originalIndex + 1}`} className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : null}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard: React.FC<{ project: Project; index: number; onClick: () => void }> = ({ project, index, onClick }) => {
  return (
    <motion.div
      className="group relative cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onClick={onClick}
    >
      <div className="aspect-[4/3] overflow-hidden bg-[#1A1A1A] rounded-3xl mb-6 border border-white/5 group-hover:border-white/20 transition-all duration-500 shadow-2xl">
        <motion.img
          src={project.images[0]}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-all duration-700"
          whileHover={{ scale: 1.05 }}
        />
      </div>
      <div className="px-2">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags?.map((tag, i) => (
            <span key={i} className="text-[10px] font-bold uppercase tracking-widest text-accent/80 border border-accent/20 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-2xl font-bold tracking-tight text-white/90 group-hover:text-accent transition-colors mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
};

const Work = ({ projects }: { projects: Project[] }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="design" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-bold tracking-wide mb-6">设计作品</h2>
            <p className="text-gray-400 text-lg">
              一系列展示我解决问题能力和视觉叙事方式的项目。
            </p>
          </div>
          <div className="mt-8 md:mt-0">
            <span className="text-8xl font-bold text-white/5 select-none font-serif italic">01</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onClick={() => { setSelectedProject(project); }} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

const About = () => {
  return (
    <section id="about-me" className="py-32 px-6 bg-[#0D0D0D] relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-wide mb-12">关于我</h2>
            <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
              <p>
                16 年资深 UI 设计师，覆盖 APP、小程序、H5、可视化数据大屏、官网、电商全品类产品设计，具备扎实视觉审美与用户体验思维，精通界面、交互、品牌调性把控。
              </p>
              <p>
                擅长搭建标准化组件库，遵循 8pt 栅格规范，保障产品落地一致性；服务过蒙牛、中石化、钓鱼台·美高梅、长安汽车等知名企业，高效输出落地设计方案。
              </p>
              <p>
                熟练使用 Galileo AI、Pixso、Midjourney、ChatGPT 等多款 AI 设计工具，利用 AI 完成创意出图、需求梳理、文案、方案整理，显著提升设计效率。
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold uppercase tracking-widest text-xs text-accent mb-4">核心优势</h4>
                <ul className="space-y-2 text-sm font-medium text-gray-300">
                  <li>APP & 小程序设计</li>
                  <li>AI 赋能设计</li>
                  <li>组件库搭建</li>
                  <li>8pt 栅格规范</li>
                  <li>品牌调性把控</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-widest text-xs text-accent mb-4">教育背景</h4>
                <ul className="space-y-2 text-sm font-medium text-gray-300">
                  <li>首都师范大学｜软件技术专业</li>
                  <li>2010 - 2012</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <h3 className="text-2xl font-bold tracking-tight border-b border-white/10 pb-4">工作经验</h3>
            {EXPERIENCE.map((exp, i) => (
              <motion.div 
                key={i}
                className="relative pl-8 border-l border-white/10"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] bg-accent rounded-full shadow-[0_0_10px_rgba(255,77,0,0.5)]" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 block">
                  {exp.period}
                </span>
                <h4 className="text-xl font-bold text-white/90">{exp.role}</h4>
                <p className="text-accent font-medium mb-4">{exp.company}</p>
                <p className="text-gray-400 leading-relaxed">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 px-6 bg-black text-white relative overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-20" />
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-12">
            准备好 <br /> <span className="font-serif italic font-normal">开始了吗？</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-xl mx-auto mb-12">
            无论您有新项目合作、创意构思交流，或是单纯想打个招呼，我都十分欢迎。
          </p>
          
          <a 
            href="mailto:935903933@qq.com" 
            className="text-3xl md:text-5xl font-bold underline underline-offset-8 decoration-accent hover:text-accent transition-colors duration-300"
          >
            935903933@qq.com
          </a>


        </motion.div>
      </div>
    </section>
  );
};

const Footer = ({ onAdminClick }: { onAdminClick: () => void }) => {
  const [clickCount, setClickCount] = useState(0);
  const [showAdminLink, setShowAdminLink] = useState(false);

  const handleCopyrightClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 5) {
      setShowAdminLink(true);
      setClickCount(0);
    }
    
    // Reset count after 3 seconds of inactivity
    setTimeout(() => {
      setClickCount(0);
    }, 3000);
  };

  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 font-medium">
        <p 
          className="cursor-default select-none"
          onClick={handleCopyrightClick}
        >
          © 2026 任利颖。保留所有权利。
        </p>
        <div className="flex items-center space-x-8 mt-4 md:mt-0">
          {showAdminLink && (
            <button 
              onClick={onAdminClick}
              className="text-accent hover:underline transition-all font-bold"
            >
              管理后台
            </button>
          )}
          <a href="#" className="hover:text-white transition-colors">隐私政策</a>
          <a href="#" className="hover:text-white transition-colors">服务条款</a>
        </div>
      </div>
    </footer>
  );
};

// --- Admin Panel ---

const AdminPanel = ({ 
  projects, 
  onClose, 
  onSave, 
  onDelete 
}: { 
  projects: Project[], 
  onClose: () => void,
  onSave: (project: Partial<Project>, files?: FileList) => void,
  onDelete: (id: string) => void
}) => {
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const detailImageInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsAdding(false);
    setSelectedFiles(null);
  };

  const handleAdd = () => {
    setEditingProject({
      title: "",
      category: "",
      description: "",
      details: "",
      tags: [],
      images: [],
      detailImages: []
    });
    setIsAdding(true);
    setSelectedFiles(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      onSave(editingProject, selectedFiles || undefined);
      setEditingProject(null);
      setIsAdding(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#0A0A0A] flex flex-col font-sans">
      <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50 backdrop-blur-xl">
        <h2 className="text-2xl font-bold tracking-tighter">作品管理后台</h2>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <XCircle size={32} />
        </button>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
        {/* Project List */}
        <div className="w-full md:w-1/3 border-r border-white/10 overflow-y-auto p-6 space-y-4">
          <button 
            onClick={handleAdd}
            className="w-full py-4 bg-accent text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-accent/80 transition-all"
          >
            <Plus size={20} /> 新增作品
          </button>
          
          {projects.map(project => (
            <div 
              key={project.id}
              className={`p-4 rounded-2xl border transition-all cursor-pointer group ${editingProject?.id === project.id ? "bg-white/10 border-accent" : "bg-white/5 border-white/5 hover:border-white/20"}`}
              onClick={() => handleEdit(project)}
            >
              <div className="flex gap-4">
                <img src={project.images[0]} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold truncate">{project.title}</h4>
                  <p className="text-xs text-gray-500 truncate">{project.category}</p>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); onDelete(project.id); }}
                  className="p-2 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Editor */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 bg-[#050505]">
          {editingProject ? (
            <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
              <h3 className="text-3xl font-bold">{isAdding ? "新增作品" : "编辑作品"}</h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">作品标题</label>
                  <input 
                    type="text" 
                    value={editingProject.title}
                    onChange={e => setEditingProject({...editingProject, title: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-colors"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">分类</label>
                  <input 
                    type="text" 
                    value={editingProject.category}
                    onChange={e => setEditingProject({...editingProject, category: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-colors"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">作品图片 (支持多选)</label>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-4">
                      {selectedFiles ? (
                        Array.from(selectedFiles as FileList).map((file: File, idx) => (
                          <div key={idx} className="w-24 h-24 rounded-xl overflow-hidden bg-gray-900 border border-white/10">
                            <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" />
                          </div>
                        ))
                      ) : (
                        editingProject.images?.map((img, idx) => (
                          <div key={idx} className="w-24 h-24 rounded-xl overflow-hidden bg-gray-900 border border-white/10">
                            <img src={img} className="w-full h-full object-cover" />
                          </div>
                        ))
                      )}
                    </div>
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all font-bold text-sm"
                    >
                      <Upload size={18} /> 上传图片
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      className="hidden" 
                      accept="image/*"
                      multiple
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">简短描述</label>
                  <textarea 
                    value={editingProject.description}
                    onChange={e => setEditingProject({...editingProject, description: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-colors min-h-[80px]"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500">图片展示 (支持 Markdown)</label>
                    </div>
                    <button 
                      type="button"
                      onClick={() => detailImageInputRef.current?.click()}
                      className="text-xs font-bold text-accent hover:underline flex items-center gap-1"
                    >
                      <Plus size={12} /> 上传详情图片
                    </button>
                    <input 
                      type="file" 
                      ref={detailImageInputRef}
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={async (e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          const formData = new FormData();
                          Array.from(e.target.files).forEach(file => {
                            formData.append('images', file);
                          });
                          try {
                            const res = await fetch('/api/upload', { method: 'POST', body: formData });
                            const data = await res.json();
                            const imageUrls = data.urls;
                            
                            // Add to detailImages array
                            const currentDetailImages = editingProject.detailImages || [];
                            setEditingProject({
                              ...editingProject,
                              detailImages: [...currentDetailImages, ...imageUrls]
                            });
                            
                          } catch (err) {
                            console.error("Failed to upload detail images:", err);
                          }
                        }
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                    {editingProject.detailImages?.map((img, idx) => (
                      <div key={idx} className="aspect-square rounded-xl overflow-hidden bg-gray-900 border border-white/10 relative group">
                        <img src={img} className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={() => {
                            const newImages = [...(editingProject.detailImages || [])];
                            newImages.splice(idx, 1);
                            setEditingProject({ ...editingProject, detailImages: newImages });
                          }}
                          className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <textarea 
                    value={editingProject.details}
                    onChange={e => setEditingProject({...editingProject, details: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-colors min-h-[150px] font-mono text-sm"
                    placeholder="在这里输入项目的详细设计思路、过程、成果等... 支持 Markdown 语法。"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">标签 (逗号分隔)</label>
                  <input 
                    type="text" 
                    value={Array.isArray(editingProject.tags) ? editingProject.tags.join(", ") : ""}
                    onChange={e => setEditingProject({...editingProject, tags: e.target.value.split(",").map(t => t.trim())})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-8">
                <button 
                  type="submit"
                  className="px-10 py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent/80 transition-all flex items-center gap-2"
                >
                  <Save size={20} /> 保存修改
                </button>
                <button 
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-10 py-4 bg-white/5 text-gray-400 font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-all"
                >
                  取消
                </button>
              </div>
            </form>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-600 space-y-4">
              <Edit2 size={64} strokeWidth={1} />
              <p className="text-xl">选择一个作品开始编辑，或点击左侧新增作品</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const saved = localStorage.getItem("custom_projects");
      if (saved) {
        setProjects(JSON.parse(saved));
        setLoading(false);
        return;
      }
      const res = await fetch("/projects.json");
      const data = await res.json();
      // Map images to the correct format if they are strings
      const formattedData = data.map((p: any) => ({
        ...p,
        images: Array.isArray(p.images) ? p.images : [p.image],
        detailImages: Array.isArray(p.detailImages) ? p.detailImages : []
      }));
      setProjects(formattedData);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSaveProject = async (project: Partial<Project>, files?: FileList) => {
    const processFiles = async (): Promise<string[]> => {
      if (!files || files.length === 0) return project.images || [];
      return Array.from(files).map(file => URL.createObjectURL(file));
    };

    const newImages = await processFiles();
    const updatedProject: Project = {
      id: project.id || String(Date.now()),
      title: project.title || "",
      category: project.category || "",
      description: project.description || "",
      details: project.details || "",
      images: newImages.length > 0 ? newImages : (project.images || []),
      detailImages: project.detailImages || [],
      tags: project.tags || [],
      link: project.link || "",
      layout: project.layout || ""
    };

    let updatedProjects: Project[];
    if (project.id) {
      updatedProjects = projects.map(p => p.id === project.id ? updatedProject : p);
    } else {
      updatedProjects = [updatedProject, ...projects];
    }
    setProjects(updatedProjects);
    localStorage.setItem("custom_projects", JSON.stringify(updatedProjects));
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("确定要删除这个作品吗？")) return;
    const updatedProjects = projects.filter(p => p.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem("custom_projects", JSON.stringify(updatedProjects));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="font-sans text-white bg-[#0A0A0A] selection:bg-accent selection:text-white">
      <Navbar />
      
      <AnimatePresence>
        {isAdminOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5, ease: "circOut" }}
          >
            <AdminPanel 
              projects={projects} 
              onClose={() => setIsAdminOpen(false)}
              onSave={handleSaveProject}
              onDelete={handleDeleteProject}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <Hero />
        <Work projects={projects} />
        <About />
        <Contact />
      </main>
      <Footer onAdminClick={() => setIsAdminOpen(true)} />
    </div>
  );
}
