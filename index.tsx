// Sử dụng React từ global scope (đã load qua CDN)
declare const React: any;
declare const ReactDOM: any;

const { useState, useEffect, useRef, StrictMode } = React;
const { createRoot } = ReactDOM;

// Data structure types
interface Task {
  skill: string;
  items: string[];
}

interface Day {
  day_label: string;
  tasks: Task[];
}

interface Week {
  week_label: string;
  days: Day[];
}

interface LearningPlanSection {
  title: string;
  goal: string;
  weeks: Week[];
}

// Quiz related interfaces
interface QuizQuestion {
  id: number;
  word: string;
  meaning: string;
  options: string[];
  correctAnswer: number;
  userAnswer?: number;
  isCorrect?: boolean;
}

interface QuizSettings {
  topic: string;
  questionType: 'en-to-vi' | 'vi-to-en' | 'mixed';
  questionCount: number;
}

interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  questions: QuizQuestion[];
}

// Vocabulary data for quizzes
const vocabularyData = {
  "Công nghệ": [
    { word: "software", meaning: "phần mềm" },
    { word: "hardware", meaning: "phần cứng" },
    { word: "database", meaning: "cơ sở dữ liệu" },
    { word: "algorithm", meaning: "thuật toán" },
    { word: "interface", meaning: "giao diện" },
    { word: "server", meaning: "máy chủ" },
    { word: "network", meaning: "mạng" },
    { word: "protocol", meaning: "giao thức" },
    { word: "encryption", meaning: "mã hóa" },
    { word: "firewall", meaning: "tường lửa" },
    { word: "cloud", meaning: "đám mây" },
    { word: "API", meaning: "giao diện lập trình ứng dụng" },
    { word: "framework", meaning: "khung làm việc" },
    { word: "debug", meaning: "gỡ lỗi" },
    { word: "deploy", meaning: "triển khai" }
  ],
  "Kinh doanh": [
    { word: "stakeholder", meaning: "bên liên quan" },
    { word: "strategy", meaning: "chiến lược" },
    { word: "revenue", meaning: "doanh thu" },
    { word: "profit", meaning: "lợi nhuận" },
    { word: "budget", meaning: "ngân sách" },
    { word: "investment", meaning: "đầu tư" },
    { word: "market", meaning: "thị trường" },
    { word: "competition", meaning: "cạnh tranh" },
    { word: "partnership", meaning: "đối tác" },
    { word: "negotiation", meaning: "đàm phán" },
    { word: "contract", meaning: "hợp đồng" },
    { word: "brand", meaning: "thương hiệu" },
    { word: "marketing", meaning: "tiếp thị" },
    { word: "sales", meaning: "bán hàng" },
    { word: "customer", meaning: "khách hàng" }
  ],
  "Du lịch": [
    { word: "destination", meaning: "điểm đến" },
    { word: "itinerary", meaning: "lịch trình" },
    { word: "accommodation", meaning: "chỗ ở" },
    { word: "booking", meaning: "đặt chỗ" },
    { word: "reservation", meaning: "đặt trước" },
    { word: "tourist", meaning: "du khách" },
    { word: "guide", meaning: "hướng dẫn viên" },
    { word: "sightseeing", meaning: "tham quan" },
    { word: "landmark", meaning: "địa danh" },
    { word: "passport", meaning: "hộ chiếu" },
    { word: "visa", meaning: "thị thực" },
    { word: "luggage", meaning: "hành lý" },
    { word: "boarding", meaning: "lên máy bay" },
    { word: "departure", meaning: "khởi hành" },
    { word: "arrival", meaning: "đến nơi" }
  ],
  "Y tế": [
    { word: "diagnosis", meaning: "chẩn đoán" },
    { word: "treatment", meaning: "điều trị" },
    { word: "symptom", meaning: "triệu chứng" },
    { word: "prescription", meaning: "đơn thuốc" },
    { word: "medication", meaning: "thuốc" },
    { word: "surgery", meaning: "phẫu thuật" },
    { word: "recovery", meaning: "hồi phục" },
    { word: "patient", meaning: "bệnh nhân" },
    { word: "doctor", meaning: "bác sĩ" },
    { word: "nurse", meaning: "y tá" },
    { word: "hospital", meaning: "bệnh viện" },
    { word: "clinic", meaning: "phòng khám" },
    { word: "emergency", meaning: "khẩn cấp" },
    { word: "appointment", meaning: "cuộc hẹn" },
    { word: "checkup", meaning: "kiểm tra sức khỏe" }
  ]
};

const learningPlan: LearningPlanSection[] = [
  {
    title: "Tuần 1-4: Nền tảng & Giao tiếp thực chiến",
    goal: "Luyện tập các tình huống giao tiếp công việc và phỏng vấn. Xây dựng từ vựng, ngữ pháp cốt lõi và hoàn thành nền tảng nghe.",
    weeks: [
      {
        week_label: "Tuần 1: General Business & Interview Basics",
        days: [
          { day_label: "Thứ 2", tasks: [
              { skill: "Từ vựng 📚", items: ["colleague", "agenda", "minutes (of meeting)", "follow-up", "client", "stakeholder", "project", "task", "objective", "goal", "strategy", "tactic", "resource", "budget", "schedule", "milestone", "deadline", "deliverable", "outcome", "scope"] },
              { skill: "Ngữ pháp ✍️", items: ["Ôn tập các thì Đơn (Hiện tại, Quá khứ, Tương lai)"] },
              { skill: "Nghe 🎧", items: ["Học Unit 1 & 2 - Tactics for Listening: Developing"] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Tự giới thiệu'. Role-play: Bạn là Ứng viên, AI là Nhà tuyển dụng. Tình huống: Bạn giới thiệu bản thân ngắn gọn trong buổi phỏng vấn."] },
          ]},
          { day_label: "Thứ 3", tasks: [
              { skill: "Từ vựng 📚", items: ["communicate", "collaborate", "coordinate", "delegate", "manage", "lead", "innovate", "improve", "analyze", "solve", "present", "report", "document", "research", "develop", "implement", "test", "deploy", "support", "maintain"] },
              { skill: "Ngữ pháp ✍️", items: ["Ôn tập các thì Tiếp diễn (Hiện tại, Quá khứ, Tương lai)"] },
              { skill: "Nghe 🎧", items: ["Học Unit 3 & 4 - Tactics for Listening: Developing"] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Mô tả dự án gần nhất'. Role-play: Bạn là Ứng viên, AI là Nhà tuyển dụng. Tình huống: Bạn chia sẻ thông tin về dự án gần đây bạn tham gia."] },
          ]},
          { day_label: "Thứ 4", tasks: [
              { skill: "Từ vựng 📚", items: ["software", "hardware", "application", "server", "database", "network", "interface", "feature", "bug", "user", "developer", "administrator", "system", "platform", "version", "update", "upgrade", "backup", "data", "security"] },
              { skill: "Viết 📝", items: ["Viết một email ngắn cho đồng nghiệp để yêu cầu thông tin, sử dụng các từ 'follow-up', 'deadline'."] },
              { skill: "Nghe 🎧", items: ["Học Unit 5 & 6 - Tactics for Listening: Developing"] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Nói về kỹ năng chính'. Role-play: Bạn là Ứng viên, AI là Nhà tuyển dụng. Tình huống: Bạn trình bày kỹ năng nổi bật nhất của mình."] },
          ]},
          { day_label: "Thứ 5", tasks: [
              { skill: "Từ vựng 📚", items: ["meeting", "presentation", "workshop", "brainstorming", "discussion", "feedback", "proposal", "agreement", "contract", "negotiation", "issue", "risk", "assumption", "constraint", "dependency", "priority", "status", "progress", "blocker", "escalate"] },
              { skill: "Ngữ pháp ✍️", items: ["Ôn tập các thì Hoàn thành (Hiện tại, Quá khứ, Tương lai)"] },
              { skill: "Nghe 🎧", items: ["Học Unit 7 & 8 - Tactics for Listening: Developing"] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Giới thiệu công cụ bạn thường dùng'. Role-play: Bạn là Ứng viên, AI là Nhà tuyển dụng. Tình huống: Bạn nói về các công cụ như Jira, Confluence, Figma bạn thường dùng."] },
          ]},
          { day_label: "Thứ 6", tasks: [
              { skill: "Từ vựng 📚", items: ["efficient", "effective", "reliable", "scalable", "flexible", "user-friendly", "intuitive", "robust", "secure", "confidential", "transparent", "consistent", "accurate", "compliant", "innovative", "agile", "lean", "impact", "value", "benefit"] },
              { skill: "Viết 📝", items: ["Viết 3-4 câu mô tả một ứng dụng 'user-friendly', sử dụng các tính từ đã học."] },
              { skill: "Nghe 🎧", items: ["Học Unit 9 & 10 - Tactics for Listening: Developing"] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Mô tả cách bạn làm việc'. Role-play: Bạn là Ứng viên, AI là Nhà tuyển dụng. Tình huống: Bạn chia sẻ quy trình làm việc thường ngày."] },
          ]},
          { day_label: "Thứ 7", tasks: [
              { skill: "Ôn tập Từ vựng 📚", items: ["Ôn tập 100 từ vựng đã học trong tuần.", "Sử dụng flashcards (Quizlet, Anki) để kiểm tra."] },
              { skill: "Nghe 🎧", items: ["Học Unit 11 & 12 - Tactics for Listening: Developing", "Ôn tập nhanh Unit 1-12."] },
              { skill: "Nói 🗣️", items: ["Chọn 2 prompts bạn thấy khó nhất trong tuần và thực hành lại."] },
          ]},
          { day_label: "Chủ nhật", tasks: [
              { skill: "Nghe 🎧", items: ["Nghe lại và chép chính tả một đoạn hội thoại từ 1-2 unit bạn cảm thấy khó nhất trong tuần."] },
              { skill: "Nói 🗣️", items: ["Thực hành lại prompt 'Tự giới thiệu' và 'Mô tả dự án gần nhất'. Tự ghi âm và nghe lại để cải thiện."] },
              { skill: "Ôn tập ✍️", items: ["Xem lại các thì đã học. Viết 5 câu về công việc của bạn, mỗi câu dùng một thì khác nhau."] },
          ]},
        ]
      },
      {
        week_label: "Tuần 2: Client & Business Communication",
        days: [
           { day_label: "Thứ 2", tasks: [
              { skill: "Từ vựng 📚", items: ["SDLC (Software Development Life Cycle)", "phase", "planning", "requirement", "analysis", "design", "implementation", "coding", "testing", "deployment", "maintenance", "Waterfall model", "iterative", "V-Model", "stakeholder analysis", "feasibility study", "project plan", "architecture", "module", "integration"] },
              { skill: "Ngữ pháp ✍️", items: ["Câu so sánh (Comparative & Superlative)"] },
              { skill: "Nghe 🎧", items: ["Học Unit 13 & 14 - Tactics for Listening: Developing"] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Đặt lịch demo'. Role-play: Bạn là Business Analyst, AI là Client. Tình huống: Bạn gọi điện/nhắn khách để mời họ tham gia buổi demo."] },
          ]},
          { day_label: "Thứ 3", tasks: [
              { skill: "Từ vựng 📚", items: ["Agile", "Scrum", "Kanban", "Sprint", "backlog", "user story", "epic", "theme", "Product Owner", "Scrum Master", "Development Team", "daily stand-up", "Sprint Planning", "Sprint Review", "Sprint Retrospective", "velocity", "burndown chart", "increment", "definition of done", "MVP (Minimum Viable Product)"] },
              { skill: "Ngữ pháp ✍️", items: ["Modal Verbs (can, could, may, might) - Khả năng, sự cho phép"] },
              { skill: "Nghe 🎧", items: ["Học Unit 15 & 16 - Tactics for Listening: Developing"] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Giới thiệu hệ thống'. Role-play: Bạn là Business Analyst, AI là New Client. Tình huống: Bạn giải thích tổng quan hệ thống cho khách hàng mới."] },
          ]},
          { day_label: "Thứ 4", tasks: [
              { skill: "Từ vựng 📚", items: ["gather", "elicit", "specify", "validate", "verify", "document", "prioritize", "manage", "trace", "ambiguous", "unambiguous", "clear", "concise", "complete", "consistent", "testable", "functional requirement", "non-functional requirement", "business rule", "constraint"] },
              { skill: "Viết 📝", items: ["Viết một user story đơn giản cho chức năng 'Login' theo format: \"As a [user], I want to [action], so that [benefit].\""] },
              { skill: "Nghe 🎧", items: ["Học Unit 17 & 18 - Tactics for Listening: Developing"] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Hỏi tính năng khách cần nhất'. Role-play: Bạn là Business Analyst, AI là Client. Tình huống: Bạn hỏi khách đâu là chức năng quan trọng nhất với họ."] },
          ]},
          { day_label: "Thứ 5", tasks: [
              { skill: "Từ vựng 📚", items: ["prototype", "wireframe", "mockup", "UI (User Interface)", "UX (User Experience)", "usability", "accessibility", "workflow", "use case", "diagram", "flowchart", "sequence diagram", "activity diagram", "state machine diagram", "data flow diagram", "BPMN", "UML", "model", "notation", "component"] },
              { skill: "Ngữ pháp ✍️", items: ["Modal Verbs (should, must, have to) - Lời khuyên, sự bắt buộc"] },
              { skill: "Nghe 🎧", items: ["Học Unit 19 & 20 - Tactics for Listening: Developing"] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Hỏi cảm nhận sau khi dùng thử'. Role-play: Bạn là Business Analyst, AI là Client. Tình huống: Bạn hỏi cảm nhận của khách hàng sau khi test bản beta."] },
          ]},
          { day_label: "Thứ 6", tasks: [
              { skill: "Từ vựng 📚", items: ["quality assurance (QA)", "quality control (QC)", "unit testing", "integration testing", "system testing", "acceptance testing (UAT)", "regression testing", "performance testing", "test case", "test script", "test plan", "bug report", "defect", "severity", "priority", "fix", "patch", "hotfix", "release", "version control"] },
              { skill: "Viết 📝", items: ["Viết 3 'acceptance criteria' cho user story 'Login' đã viết hôm T4."] },
              { skill: "Nghe 🎧", items: ["Học Unit 21 & 22 - Tactics for Listening: Developing"] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Hỏi về yêu cầu API'. Role-play: Bạn là Business Analyst, AI là Technical Partner. Tình huống: Bạn hỏi đối tác về format dữ liệu API họ cung cấp."] },
          ]},
          { day_label: "Thứ 7", tasks: [
              { skill: "Ôn tập Từ vựng 📚", items: ["Ôn tập 100 từ vựng đã học trong tuần.", "Nhóm các từ theo chủ đề (SDLC, Agile, Testing) để dễ nhớ."] },
              { skill: "Nghe 🎧", items: ["Học Unit 23 & 24. HOÀN THÀNH SÁCH!", "Ôn tập nhanh Unit 13-24."] },
              { skill: "Nói 🗣️", items: ["Thực hành lại 2-3 prompt về 'Gặp khách hàng' mà bạn thấy cần cải thiện."] },
          ]},
          { day_label: "Chủ nhật", tasks: [
              { skill: "Nghe 🎧", items: ["Nghe lại toàn bộ 24 unit ở tốc độ 1.25x hoặc 1.5x để thử thách.", "Ghi lại 10 cấu trúc câu hay nhất bạn học được từ cuốn sách."] },
              { skill: "Nói 🗣️", items: ["Thực hành lại 2-3 prompt về 'Gặp khách hàng' với vai trò ngược lại (bạn là khách hàng)."] },
              { skill: "Ôn tập ✍️", items: ["Viết một đoạn văn ngắn so sánh 2 phương pháp testing, ví dụ 'unit testing' và 'system testing'."] },
          ]},
        ]
      },
      {
        week_label: "Tuần 3: Internal & Business Communication",
        days: [
           { day_label: "Thứ 2", tasks: [
              { skill: "Từ vựng 📚", items: ["bank", "financial institution", "central bank", "commercial bank", "investment bank", "retail banking", "corporate banking", "account", "savings account", "checking account (current account)", "deposit", "withdrawal", "transfer", "transaction", "balance", "statement", "interest rate", "credit", "debit", "overdraft"] },
              { skill: "Ngữ pháp ✍️", items: ["Câu bị động (Passive Voice) - Hiện tại đơn & Quá khứ đơn"] },
              { skill: "Nghe 🎧", items: ["Nghe podcast 'Fintech Insider' hoặc 'Breaking Banks' về một chủ đề core banking."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Trả lời điện thoại khách hàng'. Role-play: Bạn là Business Analyst, AI là Customer. Tình huống: Bạn nghe máy và hỏi khách cần giúp gì."] },
          ]},
          { day_label: "Thứ 3", tasks: [
              { skill: "Từ vựng 📚", items: ["loan", "mortgage", "debt", "asset", "liability", "collateral", "credit score", "credit history", "interest", "principal", "investment", "stock", "bond", "share", "portfolio", "dividend", "capital", "revenue", "profit", "loss"] },
              { skill: "Ngữ pháp ✍️", items: ["Passive Voice - Hiện tại hoàn thành & Tương lai đơn"] },
              { skill: "Nghe 🎧", items: ["Nghe 1 tập '6 Minute English' của BBC về chủ đề tiền bạc/kinh doanh."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Nhắn tin chào hỏi'. Role-play: Bạn là Business Analyst, AI là Colleague. Tình huống: Bạn mở đầu cuộc trò chuyện với đồng nghiệp bằng lời chào xã giao."] },
          ]},
          { day_label: "Thứ 4", tasks: [
              { skill: "Từ vựng 📚", items: ["payment", "digital payment", "e-wallet (digital wallet)", "mobile payment", "contactless payment", "QR code", "payment gateway", "processor", "acquirer", "issuer", "merchant", "customer", "authentication", "authorization", "settlement", "clearing", "remittance", "cross-border payment", "P2P (peer-to-peer)", "B2C (business-to-consumer)"] },
              { skill: "Viết 📝", items: ["Mô tả các bước để thực hiện một thanh toán bằng mã QR, sử dụng 5-7 từ vựng mới."] },
              { skill: "Nghe 🎧", items: ["Xem video trên Youtube giải thích 'How Digital Payments Work'."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Báo lỗi hệ thống'. Role-play: Bạn là Business Analyst, AI là IT Support. Tình huống: Bạn báo với team kỹ thuật về một lỗi hệ thống khẩn cấp."] },
          ]},
          { day_label: "Thứ 5", tasks: [
              { skill: "Từ vựng 📚", items: ["Fintech", "startup", "disruption", "incumbent", "regulator", "RegTech", "InsurTech", "WealthTech", "blockchain", "cryptocurrency", "Bitcoin", "Ethereum", "smart contract", "DeFi (Decentralized Finance)", "NFT (Non-Fungible Token)", "tokenization", "AI (Artificial Intelligence)", "machine learning", "big data", "robo-advisor"] },
              { skill: "Ngữ pháp ✍️", items: ["Câu điều kiện loại 1 (Real condition)"] },
              { skill: "Nghe 🎧", items: ["Xem 1 video TED-Ed về một khái niệm Fintech (VD: Blockchain)."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Thảo luận công tác'. Role-play: Bạn là Business Analyst, AI là Team Member. Tình huống: Bạn cùng đồng nghiệp lên lịch trình đi công tác."] },
          ]},
          { day_label: "Thứ 6", tasks: [
              { skill: "Từ vựng 📚", items: ["security", "fraud", "cybersecurity", "encryption", "decryption", "firewall", "malware", "phishing", "two-factor authentication (2FA)", "biometrics", "KYC (Know Your Customer)", "AML (Anti-Money Laundering)", "compliance", "regulation", "data privacy", "GDPR", "vulnerability", "threat", "risk assessment", "mitigation"] },
              { skill: "Viết 📝", items: ["Viết một cảnh báo ngắn cho người dùng về một email 'phishing', giải thích các dấu hiệu nhận biết."] },
              { skill: "Nghe 🎧", items: ["Nghe podcast 'Security Now' hoặc 'Darknet Diaries' về một vụ việc an ninh mạng."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Cảm ơn sau khi làm việc cùng nhau'. Role-play: Bạn là Business Analyst, AI là Developer. Tình huống: Bạn cảm ơn dev đã giúp đỡ trong dự án vừa rồi."] },
          ]},
          { day_label: "Thứ 7", tasks: [
              { skill: "Ôn tập Từ vựng 📚", items: ["Ôn tập 100 từ vựng đã học trong tuần.", "Vẽ sơ đồ tư duy liên kết các từ về Banking và Fintech."] },
              { skill: "Nghe 🎧", items: ["Nghe lại một bài podcast/video trong tuần và tóm tắt ý chính."] },
              { skill: "Nói 🗣️", items: ["Thực hành lại 2-3 prompt về 'Business Communication' bạn thấy cần cải thiện."] },
          ]},
          { day_label: "Chủ nhật", tasks: [
              { skill: "Nghe 🎧", items: ["Xem 1 video TED Talk về chủ đề công nghệ và tương lai."] },
              { skill: "Nói 🗣️", items: ["Tổng hợp và thực hành lại 5 prompt 'Business Communication' của tuần."] },
              { skill: "Ôn tập ✍️", items: ["Viết một đoạn văn (100-150 từ) giải thích một khái niệm Fintech bạn thấy thú vị nhất (VD: blockchain, robo-advisor)."] },
          ]},
        ]
      },
      {
        week_label: "Tuần 4: Advanced Interview Skills",
        days: [
           { day_label: "Thứ 2", tasks: [
              { skill: "Từ vựng 📚", items: ["elicitation", "technique", "interview", "JAD session (Joint Application Design)", "observation", "shadowing", "survey", "questionnaire", "document analysis", "interface analysis", "workshop", "facilitator", "scribe", "open-ended question", "closed-ended question", "probing question", "scope creep", "gold plating", "root cause analysis", "5 Whys"] },
              { skill: "Ngữ pháp ✍️", items: ["Câu điều kiện loại 2 (Unreal condition)"] },
              { skill: "Nghe 🎧", items: ["Nghe 1 tập '6 Minute English' của BBC và ghi lại 5 từ/cụm từ mới."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Kể về tình huống khó'. Role-play: Bạn là Ứng viên, AI là Nhà tuyển dụng. Tình huống: Bạn kể lại một lần xử lý tình huống khó trong công việc."] },
          ]},
          { day_label: "Thứ 3", tasks: [
              { skill: "Từ vựng 📚", items: ["BRD (Business Requirement Document)", "FRD (Functional Requirement Document)", "SRS (Software Requirement Specification)", "template", "glossary", "executive summary", "vision", "objective", "business process", "as-is process", "to-be process", "gap analysis", "impact analysis", "dependencies", "assumptions", "constraints", "acceptance criteria", "sign-off", "version history", "appendix"] },
              { skill: "Ngữ pháp ✍️", items: ["Mệnh đề quan hệ (Relative Clauses) với 'who', 'which', 'that'"] },
              { skill: "Nghe 🎧", items: ["Nghe podcast 'BA-Blocks' về chủ đề 'What is a BRD?'."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Chia sẻ thành tựu'. Role-play: Bạn là Ứng viên, AI là Nhà tuyển dụng. Tình huống: Bạn nói về một thành tựu bạn tự hào."] },
          ]},
          { day_label: "Thứ 4", tasks: [
              { skill: "Từ vựng 📚", items: ["visual model", "diagramming", "readability", "clarity", "context diagram", "use case diagram", "actor", "system boundary", "relationship", "include", "extend", "generalization", "process flow", "swimlane", "decision point", "start event", "end event", "activity", "gateway", "notation"] },
              { skill: "Viết 📝", items: ["Viết một email mời các stakeholders tham gia một 'requirements workshop', nêu rõ mục tiêu và agenda."] },
              { skill: "Nghe 🎧", items: ["Xem video trên Youtube giải thích 'Use Case Diagrams for Beginners'."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Mục tiêu nghề nghiệp'. Role-play: Bạn là Ứng viên, AI là Nhà tuyển dụng. Tình huống: Bạn chia sẻ mong muốn phát triển nghề nghiệp trong 2–3 năm tới."] },
          ]},
          { day_label: "Thứ 5", tasks: [
              { skill: "Từ vựng 📚", items: ["data dictionary", "data modeling", "entity", "attribute", "relationship", "ERD (Entity Relationship Diagram)", "cardinality", "one-to-one", "one-to-many", "many-to-many", "primary key", "foreign key", "data type", "data validation", "CRUD (Create, Read, Update, Delete)", "data mapping", "source", "target", "transformation", "data migration"] },
              { skill: "Ngữ pháp ✍️", items: ["Mệnh đề quan hệ (Relative Clauses) với 'whose', 'where', 'when', 'why'"] },
              { skill: "Nghe 🎧", items: ["Nghe podcast 'Data Engineering Podcast' về một chủ đề data modeling cơ bản."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Đàm phán lương'. Role-play: Bạn là Ứng viên, AI là HR. Tình huống: Bạn nói về mức lương mong muốn phù hợp với kinh nghiệm."] },
          ]},
          { day_label: "Thứ 6", tasks: [
              { skill: "Từ vựng 📚", items: ["review", "walkthrough", "inspection", "peer review", "formal review", "informal review", "feedback loop", "constructive criticism", "ambiguity review", "validation", "verification", "traceability matrix", "baseline", "change request", "change control", "impact assessment", "approval", "rework", " stakeholder consensus", "finalization"] },
              { skill: "Viết 📝", items: ["Viết 5 câu hỏi (3 open-ended, 2 closed-ended) bạn sẽ hỏi stakeholder để làm rõ yêu cầu cho một tính năng báo cáo."] },
              { skill: "Nghe 🎧", items: ["Nghe 1 tập 'Espresso English' về chủ đề Business English."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Đặt câu hỏi ngược cho nhà tuyển dụng'. Role-play: Bạn là Ứng viên, AI là Nhà tuyển dụng. Tình huống: Bạn hỏi về môi trường làm việc, cơ hội thăng tiến trong công ty."] },
          ]},
          { day_label: "Thứ 7", tasks: [
              { skill: "Ôn tập Từ vựng 📚", items: ["Ôn tập 100 từ vựng đã học trong tuần.", "Tạo các câu chuyện nhỏ sử dụng các nhóm từ vựng (elicitation, documentation, modeling)."] },
              { skill: "Nghe 🎧", items: ["Nghe lại một bài podcast/video trong tuần và tóm tắt ý chính bằng 3-5 câu."] },
              { skill: "Nói 🗣️", items: ["Tổng ôn 10 prompt 'Phỏng vấn xin việc'. Chọn 3 cái bạn yếu nhất để thực hành lại."] },
          ]},
          { day_label: "Chủ nhật", tasks: [
              { skill: "Nghe 🎧", items: ["Xem 1 video TED-Ed về chủ đề giao tiếp hoặc tâm lý học."] },
              { skill: "Nói 🗣️", items: ["Thực hành một buổi phỏng vấn giả định ngắn (khoảng 10 phút) bao gồm: giới thiệu, nói về dự án, trả lời 1-2 câu hỏi khó, và đặt câu hỏi ngược."] },
              { skill: "Ôn tập ✍️", items: ["Viết một phần 'Executive Summary' giả định cho một dự án xây dựng app e-wallet."] },
          ]},
        ]
      },
    ]
  },
  {
    title: "Tuần 5-8: Kỹ năng nâng cao & Ứng dụng",
    goal: "Nắm vững kỹ thuật nâng cao, giao tiếp phức tạp. Áp dụng kiến thức vào các case study thực tế và chuẩn bị cho môi trường làm việc chuyên nghiệp.",
    weeks: [
      {
        week_label: "Tuần 5: API, Microservices & System Integration",
        days: [
          { day_label: "Thứ 2", tasks: [
              { skill: "Từ vựng 📚", items: ["API", "endpoint", "request", "response", "payload", "JSON", "XML", "REST", "SOAP", "HTTP methods (GET, POST, PUT, DELETE)", "status code", "authentication token", "API key", "rate limiting", "SDK", "API documentation", "Swagger", "Postman", "integration", "third-party"] },
              { skill: "Ngữ pháp ✍️", items: ["Reported Speech (Statements) - Câu tường thuật"] },
              { skill: "Nghe 🎧", items: ["Xem video 'What is an API?' trên kênh 'MuleSoft Videos' Youtube."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Hỏi về yêu cầu dự án mới'. Role-play: Bạn là Business Analyst, AI là Client. Tình huống: Bạn cần hỏi khách hàng vài câu để hiểu mục tiêu dự án mới."] },
          ]},
          { day_label: "Thứ 3", tasks: [
              { skill: "Từ vựng 📚", items: ["architecture", "monolith", "microservices", "service", "decoupled", "independent", "scalable", "resilient", "API Gateway", "service discovery", "container", "Docker", "Kubernetes", "orchestration", "event-driven", "message queue", "publish-subscribe", "synchronous", "asynchronous", "latency"] },
              { skill: "Ngữ pháp ✍️", items: ["Reported Speech (Questions)"] },
              { skill: "Nghe 🎧", items: ["Xem video 'Microservices vs Monolith' trên Youtube."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Làm rõ yêu cầu tính năng đăng nhập'. Role-play: Bạn là Business Analyst, AI là Developer. Tình huống: Bạn muốn xác nhận lại logic của tính năng đăng nhập với dev."] },
          ]},
          { day_label: "Thứ 4", tasks: [
              { skill: "Từ vựng 📚", items: ["database", "relational (SQL)", "non-relational (NoSQL)", "schema", "table", "query", "SELECT", "JOIN", "data warehouse", "ETL", "data lake", "analytics", "business intelligence (BI)", "dashboard", "visualization", "data migration", "data mapping", "CRUD", "primary key", "foreign key"] },
              { skill: "Viết 📝", items: ["Viết một yêu cầu đơn giản cho một API endpoint mới: mô tả request, response và mục đích."] },
              { skill: "Nghe 🎧", items: ["Nghe podcast 'Software Engineering Daily' về chủ đề database."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Thảo luận tính năng lọc kết quả'. Role-play: Bạn là Business Analyst, AI là Tester. Tình huống: Bạn cùng tester làm rõ cách hoạt động của tính năng lọc."] },
          ]},
          { day_label: "Thứ 5", tasks: [
              { skill: "Từ vựng 📚", items: ["cloud computing", "IaaS", "PaaS", "SaaS", "public cloud", "private cloud", "hybrid cloud", "AWS", "Azure", "GCP", "serverless", "lambda", "virtual machine (VM)", "load balancer", "auto-scaling", "CDN", "CI/CD", "pipeline", "DevOps", "infrastructure"] },
              { skill: "Ngữ pháp ✍️", items: ["Câu điều kiện loại 3 (Unreal past condition)"] },
              { skill: "Nghe 🎧", items: ["Xem video 'What is Cloud Computing?' của IBM Technology trên Youtube."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Hỏi khách về hành vi người dùng'. Role-play: Bạn là Business Analyst, AI là Client. Tình huống: Bạn hỏi khách mô tả lại người dùng mục tiêu của sản phẩm."] },
          ]},
          { day_label: "Thứ 6", tasks: [
              { skill: "Từ vựng 📚", items: ["OAuth", "OpenID Connect", "SSO", "JWT", "encryption", "hashing", "SSL/TLS", "certificate", "VPN", "firewall", "WAF", "penetration testing", "vulnerability scan", "data breach", "incident response", "MFA", "role-based access control (RBAC)", "least privilege principle", "data privacy"] },
              { skill: "Viết 📝", items: ["Viết một vài dòng tài liệu giải thích chức năng của 2-3 status code thường gặp (200, 404, 500)."] },
              { skill: "Nghe 🎧", items: ["Nghe podcast 'Security Now' về một chủ đề bảo mật gần đây."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Giải thích task trong backlog'. Role-play: Bạn là Business Analyst, AI là Junior Developer. Tình huống: Bạn hướng dẫn developer mới hiểu một task cụ thể trong backlog."] },
          ]},
          { day_label: "Thứ 7", tasks: [
              { skill: "Ôn tập Từ vựng 📚", items: ["Ôn tập 100 từ vựng đã học trong tuần.", "Vẽ sơ đồ mô tả cách một request API hoạt động, điền các từ vựng liên quan."] },
              { skill: "Nghe 🎧", items: ["Nghe lại bài nghe về API và tóm tắt các bước hoạt động của nó."] },
              { skill: "Nói 🗣️", items: ["Ôn lại 5 prompt đã học trong tuần."] },
          ]},
          { day_label: "Chủ nhật", tasks: [
              { skill: "Nghe 🎧", items: ["Xem một video hội thảo công nghệ (VD: từ AWS re:Invent) về một dịch vụ bất kỳ."] },
              { skill: "Nói 🗣️", items: ["Chọn 1 prompt trong tuần, thực hành với vai trò ngược lại (bạn là Client/Developer/Tester...)."] },
              { skill: "Viết 📝", items: ["Viết một đoạn văn ngắn so sánh kiến trúc Monolith và Microservices."] },
          ]},
        ]
      },
      {
        week_label: "Tuần 6: Team Collaboration & Conflict Resolution",
        days: [
          { day_label: "Thứ 2", tasks: [
              { skill: "Từ vựng 📚", items: ["active listening", "paraphrasing", "summarizing", "clarifying question", "empathy", "rapport", "body language", "tone of voice", "assertiveness", "confidence", "conciseness", "clarity", "persuasion", "influence", "facilitation", "presentation skills", "public speaking", "storytelling", "feedback", "criticism"] },
              { skill: "Ngữ pháp ✍️", items: ["Gerunds and Infinitives (V-ing vs to V)"] },
              { skill: "Nghe 🎧", items: ["Xem một TED Talk về 'Active Listening' hoặc 'How to speak so that people want to listen'."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Hỏi tiến độ tính năng mới'. Role-play: Bạn là Business Analyst, AI là Developer. Tình huống: Bạn hỏi dev về tiến độ làm phần upload tài liệu."] },
          ]},
          { day_label: "Thứ 3", tasks: [
              { skill: "Từ vựng 📚", items: ["negotiation", "bargaining", "compromise", "win-win", "win-lose", "BATNA", "concession", "objective", "position", "interest", "trade-off", "leverage", "counter-offer", "agreement", "deadlock", "common ground", "mutual benefit", "term", "stake", "escalation"] },
              { skill: "Ngữ pháp ✍️", items: ["Phrasal Verbs thông dụng trong công việc (e.g., follow up, bring up, call off, figure out)"] },
              { skill: "Nghe 🎧", items: ["Nghe podcast 'Negotiate Anything' về một tình huống đàm phán cơ bản."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Kiểm tra lỗi đăng nhập với tester'. Role-play: Bạn là Business Analyst, AI là QA Tester. Tình huống: Bạn phối hợp với QA để xác định nguyên nhân lỗi đăng nhập."] },
          ]},
          { day_label: "Thứ 4", tasks: [
              { skill: "Từ vựng 📚", items: ["conflict resolution", "disagreement", "dispute", "mediation", "arbitration", "collaboration", "avoidance", "accommodation", "competition", "de-escalate", "find a middle ground", "agree to disagree", "objective criteria", "perspective", "viewpoint", "misunderstanding", "clarification", "apology", "resolution", "constructive"] },
              { skill: "Viết 📝", items: ["Viết một email để từ chối một yêu cầu thay đổi scope một cách lịch sự, giải thích lý do và đề xuất giải pháp."] },
              { skill: "Nghe 🎧", items: ["Xem video trên Youtube về các phong cách giải quyết xung đột (Thomas-Kilmann model)."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Hỏi về cách xử lý nhập liệu'. Role-play: Bạn là Business Analyst, AI là Developer. Tình huống: Bạn muốn biết form nhập sẽ xử lý lỗi như thế nào."] },
          ]},
          { day_label: "Thứ 5", tasks: [
              { skill: "Từ vựng 📚", items: ["stakeholder management", "power/interest grid", "keep satisfied", "manage closely", "monitor", "keep informed", "communication plan", "engagement", "buy-in", "alignment", "expectation management", "reporting", "influencer", "decision-maker", "champion", "skeptic", "gatekeeper", "project sponsor", "sign-off", "approval"] },
              { skill: "Ngữ pháp ✍️", items: ["Cleft Sentences (It is/was... that...; What... is/was...) để nhấn mạnh"] },
              { skill: "Nghe 🎧", items: ["Xem video giải thích về 'Stakeholder Power/Interest Grid' trên Youtube."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Góp ý giao diện trang chủ'. Role-play: Bạn là Business Analyst, AI là UI Designer. Tình huống: Bạn góp ý về bố cục và màu sắc trang chủ."] },
          ]},
          { day_label: "Thứ 6", tasks: [
              { skill: "Từ vựng 📚", items: ["meeting facilitation", "icebreaker", "parking lot", "timeboxing", "ground rules", "action item", "decision log", "retrospective", "root cause", "fishbone diagram (Ishikawa)", "brainwriting", "round-robin", "vote", "consensus", "majority", "diverse perspectives", "inclusive", "outcome-oriented", "follow-through", "accountability"] },
              { skill: "Viết 📝", items: ["Viết một đoạn cập nhật tiến độ dự án ngắn gọn cho nhóm 'keep informed' stakeholders."] },
              { skill: "Nghe 🎧", items: ["Nghe podcast 'HBR IdeaCast' tập về 'Running Effective Meetings'."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Kiểm thử tính năng gửi mail'. Role-play: Bạn là Business Analyst, AI là Tester. Tình huống: Bạn cùng tester xác nhận cách test tính năng gửi mail tự động."] },
          ]},
          { day_label: "Thứ 7", tasks: [
              { skill: "Ôn tập Từ vựng 📚", items: ["Ôn tập 100 từ vựng đã học trong tuần.", "Nhóm các từ vào các kịch bản: giving feedback, negotiation, conflict resolution."] },
              { skill: "Nghe 🎧", items: ["Nghe lại TED talk trong tuần và ghi lại các cách diễn đạt gây ảnh hưởng."] },
              { skill: "Nói 🗣️", items: ["Ôn lại 5 prompt đã học trong tuần."] },
          ]},
          { day_label: "Chủ nhật", tasks: [
              { skill: "Nghe 🎧", items: ["Nghe một tập podcast dài hơn như 'How I Built This' và chú ý cách người phỏng vấn đặt câu hỏi."] },
              { skill: "Nói 🗣️", items: ["Chọn 1 prompt trong tuần, thực hành với vai trò ngược lại (bạn là Developer/Tester/Designer...)."] },
              { skill: "Viết 📝", items: ["Bạn không đồng ý với một quyết định của Product Owner. Viết một email để trình bày quan điểm của bạn một cách xây dựng."] },
          ]},
        ]
      },
       {
        week_label: "Tuần 7: Advanced BA & Agile Practices",
        days: [
          { day_label: "Thứ 2", tasks: [
              { skill: "Từ vựng 📚", items: ["user story mapping", "backbone", "walking skeleton", "persona", "user journey", "empathy map", "pain point", "gain", "release planning", "sprint goal", "capacity", "story point", "estimation", "planning poker", "relative sizing", "theme", "initiative", "roadmap", "feature toggle", "A/B testing"] },
              { skill: "Ngữ pháp ✍️", items: ["Review câu điều kiện hỗn hợp (Mixed Conditionals)"] },
              { skill: "Nghe 🎧", items: ["Xem video 'User Story Mapping' của Jeff Patton trên Youtube."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Báo cáo tiến độ sprint'. Role-play: Bạn là Business Analyst, AI là Project Manager. Tình huống: Bạn trình bày ngắn gọn tiến độ các task trong sprint hiện tại."] },
          ]},
          { day_label: "Thứ 3", tasks: [
              { skill: "Từ vựng 📚", items: ["MoSCoW (Must, Should, Could, Won't)", "Kano Model (Basic, Performance, Excitement)", "Weighted Shortest Job First (WSJF)", "Cost of Delay", "Value vs. Effort matrix", "prioritization framework", "trade-off slider", "dot voting", "business value", "user value", "risk", "dependency", "constraint", "opportunity", "quick win", "strategic fit", "compliance", "stakeholder preference", "resource allocation"] },
              { skill: "Ngữ pháp ✍️", items: ["Inversion (đảo ngữ) để nhấn mạnh (e.g., Not only... but also...)"] },
              { skill: "Nghe 🎧", items: ["Nghe podcast 'This is Product Management' tập về 'Prioritization'."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Hỏi xin hỗ trợ thêm nhân lực'. Role-play: Bạn là Business Analyst, AI là Tech Lead. Tình huống: Bạn đề xuất cần thêm 1 dev để xử lý backlog."] },
          ]},
          { day_label: "Thứ 4", tasks: [
              { skill: "Từ vựng 📚", items: ["decision table", "decision tree", "logic", "condition", "action", "rule", "state diagram", "state", "transition", "event", "guard", "entry action", "exit action", "complex logic", "business rule engine (BRE)", "configuration", "parameter", "edge case", "exception handling", "workflow automation"] },
              { skill: "Viết 📝", items: ["Tạo một bảng 'decision table' đơn giản cho logic giảm giá: nếu khách hàng là VIP và đơn hàng > 100$, giảm giá 15%..."] },
              { skill: "Nghe 🎧", items: ["Xem video giải thích 'When to use a Decision Table' trên Youtube."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Xin dời deadline task'. Role-play: Bạn là Business Analyst, AI là Manager. Tình huống: Bạn thông báo không kịp deadline và xin dời sang ngày khác."] },
          ]},
          { day_label: "Thứ 5", tasks: [
              { skill: "Từ vựng 📚", items: ["business process modeling (BPM)", "BPMN 2.0", "event", "task", "gateway (exclusive, inclusive, parallel)", "pool", "lane", "sequence flow", "message flow", "sub-process", "optimization", "bottleneck", "streamlining", "automation", "efficiency", "cycle time", "hand-off", "as-is", "to-be", "process improvement"] },
              { skill: "Ngữ pháp ✍️", items: ["Cấu trúc 'The more..., the more...'"] },
              { skill: "Nghe 🎧", items: ["Xem video 'BPMN 2.0 Tutorial' trên Youtube."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Góp ý nhẹ nhàng với dev cùng nhóm'. Role-play: Bạn là Business Analyst, AI là Developer. Tình huống: Bạn nói chuyện riêng với dev để góp ý cách ghi chú trong task."] },
          ]},
          { day_label: "Thứ 6", tasks: [
              { skill: "Từ vựng 📚", items: ["product backlog refinement (grooming)", "DEEP (Detailed, Estimated, Emergent, Prioritized)", "INVEST (Independent, Negotiable, Valuable, Estimable, Small, Testable)", "acceptance criteria", "Gherkin syntax (Given, When, Then)", "Behavior-Driven Development (BDD)", "specification by example", "scenario", "user acceptance", "definition of ready", "cross-functional team", "shared understanding", "clarity", "scope management", "feature creep", "sprint commitment"] },
              { skill: "Viết 📝", items: ["Viết một 'acceptance criteria' sử dụng cú pháp Gherkin cho một user story bất kỳ."] },
              { skill: "Nghe 🎧", items: ["Nghe podcast 'Agile for Humans' tập về 'Backlog Refinement'."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Hỏi mentor về kỹ thuật phân tích'. Role-play: Bạn là Business Analyst, AI là Senior BA. Tình huống: Bạn hỏi anh/chị mentor cách viết tài liệu phân tích hiệu quả hơn."] },
          ]},
          { day_label: "Thứ 7", tasks: [
              { skill: "Ôn tập Từ vựng 📚", items: ["Ôn tập 100 từ vựng đã học trong tuần.", "Chọn một kỹ thuật (story mapping, decision table...) và giải thích nó bằng các từ đã học."] },
              { skill: "Nghe 🎧", items: ["Nghe lại một video kỹ thuật trong tuần và thử giải thích lại khái niệm đó."] },
              { skill: "Nói 🗣️", items: ["Ôn lại 5 prompt đã học trong tuần."] },
          ]},
          { day_label: "Chủ nhật", tasks: [
              { skill: "Nghe 🎧", items: ["Nghe 1 tập podcast 'Masters of Scale' để học về chiến lược sản phẩm."] },
              { skill: "Nói 🗣️", items: ["Chọn 1 prompt trong tuần, thực hành với vai trò ngược lại (bạn là PM/Tech Lead/Manager...)."] },
              { skill: "Viết 📝", items: ["Vẽ một sơ đồ BPMN đơn giản cho quy trình 'xin nghỉ phép'."] },
          ]},
        ]
      },
       {
        week_label: "Tuần 8: Fintech & Banking Deep Dive",
        days: [
          { day_label: "Thứ 2", tasks: [
              { skill: "Từ vựng 📚", items: ["digital onboarding", "eKYC", "identity verification", "document OCR", "liveness detection", "facial recognition", "customer due diligence (CDD)", "enhanced due diligence (EDD)", "risk profile", "sanction list screening", "PEP (Politically Exposed Person)", "fraud detection", "user experience", "conversion rate", "drop-off rate", "seamless", "frictionless", "regulatory compliance", "data security", "customer lifecycle"] },
              { skill: "Ngữ pháp ✍️", items: ["Review các loại mệnh đề danh từ (Noun Clauses)"] },
              { skill: "Nghe 🎧", items: ["Xem video 'How eKYC is changing banking' trên Youtube."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Hỏi Fintech là gì'. Role-play: Bạn là Business Analyst, AI là Expert. Tình huống: Bạn hỏi AI định nghĩa đơn giản về Fintech."] },
          ]},
          { day_label: "Thứ 3", tasks: [
              { skill: "Từ vựng 📚", items: ["lending", "credit", "underwriting", "credit scoring model", "alternative data", "loan origination system (LOS)", "loan management system (LMS)", "peer-to-peer (P2P) lending", "BNPL (Buy Now, Pay Later)", "collateral", "default rate", "collection", "interest rate", "APR (Annual Percentage Rate)", "loan term", "amortization schedule", "fintech lender", "risk assessment", "credit bureau", "unsecured loan"] },
              { skill: "Ngữ pháp ✍️", items: ["Review các loại mệnh đề trạng ngữ (Adverbial Clauses)"] },
              { skill: "Nghe 🎧", items: ["Nghe podcast 'Fintech Nexus' về chủ đề 'Digital Lending'."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Hỏi về ngân hàng số'. Role-play: Bạn là Business Analyst, AI là Expert. Tình huống: Bạn muốn hiểu ngân hàng số khác gì với ngân hàng truyền thống."] },
          ]},
          { day_label: "Thứ 4", tasks: [
              { skill: "Từ vựng 📚", items: ["wealth management", "WealthTech", "robo-advisor", "asset allocation", "diversification", "portfolio rebalancing", "ETF (Exchange-Traded Fund)", "mutual fund", "stock trading", "fractional shares", "goal-based investing", "risk tolerance", "financial planning", "retirement", "brokerage", "custody", "fiduciary", "advisory fee", "micro-investing", "passive investing"] },
              { skill: "Viết 📝", items: ["Viết một user story cho tính năng 'mở tài khoản đầu tư' trên một app WealthTech."] },
              { skill: "Nghe 🎧", items: ["Xem video giải thích 'How Robo-advisors work' trên Youtube."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Hỏi về ví điện tử'. Role-play: Bạn là Business Analyst, AI là Expert. Tình huống: Bạn hỏi ví điện tử hoạt động như thế nào."] },
          ]},
          { day_label: "Thứ 5", tasks: [
              { skill: "Từ vựng 📚", items: ["open banking", "API economy", "PSD2 (Payment Services Directive 2)", "AISP (Account Information Service Provider)", "PISP (Payment Initiation Service Provider)", "data aggregation", "third-party provider (TPP)", "customer consent", "data sharing", "ecosystem", "BaaS (Banking as a Service)", "embedded finance", "marketplace", "platformification", "standardization", "interoperability", "security concern", "privacy issue", "revenue stream", "value proposition"] },
              { skill: "Ngữ pháp ✍️", items: ["Review các loại mệnh đề tính từ (Adjective Clauses - Relative Clauses)"] },
              { skill: "Nghe 🎧", items: ["Nghe podcast '11:FS' về 'What is Open Banking?'."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Hỏi về OTP'. Role-play: Bạn là Business Analyst, AI là Expert. Tình huống: Bạn hỏi OTP dùng để làm gì và tại sao quan trọng."] },
          ]},
          { day_label: "Thứ 6", tasks: [
              { skill: "Từ vựng 📚", items: ["payment rail", "card network (Visa, Mastercard)", "ACH (Automated Clearing House)", "wire transfer", "real-time payment (RTP)", "ISO 20022", "cross-border payment", "correspondent bank", "SWIFT", "remittance", "foreign exchange (FX) rate", "settlement risk", "liquidity", "payment hub", "digital currency", "CBDC (Central Bank Digital Currency)", "stablecoin", "blockchain settlement", "transaction fee", "intermediary"] },
              { skill: "Viết 📝", items: ["So sánh ưu và nhược điểm của chuyển khoản nhanh (RTP) và chuyển khoản thường (ACH) trong 2-3 gạch đầu dòng."] },
              { skill: "Nghe 🎧", items: ["Xem video 'The Global Payment System Explained' trên Youtube."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Hỏi chuyển khoản online hoạt động ra sao'. Role-play: Bạn là Business Analyst, AI là Expert. Tình huống: Bạn tìm hiểu về nguyên lý chuyển tiền qua app ngân hàng."] },
          ]},
          { day_label: "Thứ 7", tasks: [
              { skill: "Ôn tập Từ vựng 📚", items: ["Ôn tập 100 từ vựng đã học trong tuần.", "Vẽ sơ đồ kết nối các khái niệm: Open Banking, P2P Lending, WealthTech."] },
              { skill: "Nghe 🎧", items: ["Nghe lại 1 podcast trong tuần, chú ý các từ vựng chuyên ngành được sử dụng."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Hỏi về bảo mật trong ngân hàng'. Role-play: Bạn là Business Analyst, AI là Security Officer. Tình huống: Bạn hỏi các cách phổ biến ngân hàng dùng để bảo mật."] },
          ]},
          { day_label: "Chủ nhật", tasks: [
              { skill: "Nghe 🎧", items: ["Nghe 1 tập podcast 'Bankless' để tìm hiểu về DeFi và crypto."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Phân biệt ví điện tử và tài khoản ngân hàng'. Role-play: Bạn là Business Analyst, AI là Expert. Tình huống: Bạn hỏi sự khác nhau giữa ví điện tử và tài khoản ngân hàng."] },
              { skill: "Viết 📝", items: ["Viết một đoạn ngắn giải thích rủi ro và lợi ích của Open Banking từ góc nhìn của người dùng."] },
          ]},
        ]
      },
    ]
  },
   {
    title: "Tuần 9-12: Săn việc & Luyện phỏng vấn",
    goal: "Hoàn thiện hồ sơ, luyện tập phỏng vấn chuyên sâu, và sẵn sàng chinh phục nhà tuyển dụng cho vị trí IT BA.",
    weeks: [
       {
        week_label: "Tuần 9: Building Your Professional Brand",
        days: [
          { day_label: "Thứ 2", tasks: [
              { skill: "Từ vựng 📚", items: ["resume/CV", "cover letter", "professional summary", "core competencies", "work experience", "achievements", "quantifiable results", "action verbs", "keywords", "ATS (Applicant Tracking System)", "tailor", "customize", "template", "format", "readability", "proofread", "edit", "portfolio", "case study", "personal brand"] },
              { skill: "Viết 📝", items: ["Liệt kê 5-7 'quantifiable results' (kết quả có thể đong đếm) từ các dự án bạn đã làm.", "Bắt đầu viết nháp phần 'Professional Summary' cho CV của bạn."] },
              { skill: "Nghe 🎧", items: ["Xem video 'How to write a great resume' trên kênh 'Jeff Su' Youtube."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Hỏi về user story chưa rõ'. Role-play: Bạn là Business Analyst, AI là Developer. Tình huống: Bạn nhờ dev làm rõ user story viết chưa cụ thể."] },
          ]},
          { day_label: "Thứ 3", tasks: [
              { skill: "Từ vựng 📚", items: ["LinkedIn", "profile", "headline", "summary section", "recommendation", "endorsement", "skill assessment", "networking", "connection", "cold message", "informational interview", "recruiter", "hiring manager", "job board", "job alert", "company research", "industry trend", "thought leader", "content creation", "engagement"] },
              { skill: "Viết 📝", items: ["Cập nhật phần 'Headline' và 'Summary' trên LinkedIn của bạn để tối ưu cho vị trí IT BA.", "Viết một tin nhắn mẫu để kết nối với một recruiter trên LinkedIn."] },
              { skill: "Nghe 🎧", items: ["Nghe podcast 'Find Your Dream Job' tập về 'Optimizing your LinkedIn profile'."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Chuẩn bị Sprint Planning'. Role-play: Bạn là Business Analyst, AI là Product Owner. Tình huống: Bạn và PO thảo luận xem nên đưa task nào vào sprint sắp tới."] },
          ]},
          { day_label: "Thứ 4", tasks: [
              { skill: "Từ vựng 📚", items: ["job description (JD)", "responsibilities", "qualifications", "requirements", "preferred skills", "company culture", "mission", "vision", "values", "job application", "online form", "screening question", "assessment", "portfolio submission", "referral", "follow-up email", "thank-you note", "job offer", "negotiation", "onboarding"] },
              { skill: "Viết 📝", items: ["Chọn 1 JD vị trí IT BA và 'tailor' CV của bạn cho JD đó. Viết một cover letter ngắn gọn cho ứng tuyển này."] },
              { skill: "Nghe 🎧", items: ["Xem video 'How to Read a Job Description' trên Youtube."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Nhận feedback sau Sprint Review'. Role-play: Bạn là Business Analyst, AI là Stakeholder. Tình huống: Bạn hỏi sếp xem có phản hồi nào sau buổi review sprint không."] },
          ]},
          { day_label: "Thứ 5", tasks: [
              { skill: "Từ vựng 📚", items: ["STAR method (Situation, Task, Action, Result)", "behavioral question", "tell me about a time...", "conflict", "failure", "success", "teamwork", "leadership", "problem-solving", "initiative", "adaptability", "communication skill", "strength", "weakness", "career goal", "motivation", "learning from mistakes", "handling pressure", "prioritization", "achieve a goal"] },
              { skill: "Viết 📝", items: ["Chuẩn bị 2 câu chuyện theo phương pháp STAR: một về 'conflict resolution', một về 'handling pressure'."] },
              { skill: "Nghe 🎧", items: ["Xem video giải thích chi tiết về STAR method trên Youtube."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Thảo luận backlog'. Role-play: Bạn là Business Analyst, AI là Developer. Tình huống: Bạn cùng dev review một số task cũ trong backlog."] },
          ]},
          { day_label: "Thứ 6", tasks: [
              { skill: "Từ vựng 📚", items: ["case study interview", "problem statement", "clarifying questions", "framework", "structure", "assumptions", "hypothesis", "data analysis", "solution design", "trade-offs", "recommendation", "implementation plan", "metrics for success", "whiteboarding", "presentation", "business acumen", "critical thinking", "structured communication", "creativity", "feasibility"] },
              { skill: "Viết 📝", items: ["Nghĩ về một vấn đề trong một app bạn hay dùng. Viết ra các 'clarifying questions' bạn sẽ hỏi để hiểu rõ vấn đề đó."] },
              { skill: "Nghe 🎧", items: ["Xem một video 'mock case study interview' cho vị trí Product/Business Analyst."] },
              { skill: "Nói 🗣️", items: ["Prompt: 'Hỏi thời gian cho task'. Role-play: Bạn là Business Analyst, AI là Developer. Tình huống: Bạn hỏi ước lượng thời gian cho một task mới."] },
          ]},
          { day_label: "Thứ 7", tasks: [
              { skill: "Nói 🗣️", items: ["Thực hành lại prompt 'Tự giới thiệu' (elevator pitch - 30-60 giây).", "Thực hành kể lại 2 câu chuyện STAR bạn đã chuẩn bị."] },
              { skill: "Viết 📝", items: ["Hoàn thiện CV và Cover Letter mẫu của bạn. Nhờ một người bạn hoặc mentor review."] },
          ]},
          { day_label: "Chủ nhật", tasks: [
              { skill: "Nói 🗣️", items: ["Thực hành lại các prompt của tuần 9.", "Prompt: 'Hỏi điểm tín dụng là gì'. Role-play: Bạn là Business Analyst, AI là Expert. Tình huống: Bạn tìm hiểu điểm tín dụng và ảnh hưởng của nó."] },
              { skill: "Viết 📝", items: ["Hoàn thiện profile LinkedIn của bạn."] },
          ]},
        ]
      },
       {
        week_label: "Tuần 10, 11, 12: Intensive Interview Practice",
        days: [
          { day_label: "Thứ 2 - Tuần 10 (Behavioral)", tasks: [
              { skill: "Nói 🗣️", items: ["Thực hành prompt 'Tự giới thiệu' và 'Mô tả dự án gần nhất' theo phương pháp STAR."] },
              { skill: "Viết 📝", items: ["Chuẩn bị thêm 2 câu chuyện STAR: một về 'a time you failed' và một về 'a successful project'."] },
          ]},
          { day_label: "Thứ 3 - Tuần 10 (Skills & Tools)", tasks: [
              { skill: "Nói 🗣️", items: ["Thực hành prompt 'Nói về kỹ năng chính' và 'Giới thiệu công cụ bạn thường dùng'."] },
              { skill: "Viết 📝", items: ["Liệt kê các kỹ năng và công cụ trong CV, chuẩn bị 1-2 câu giải thích cho mỗi cái."] },
          ]},
           { day_label: "Thứ 4 - Tuần 10 (Process & Teamwork)", tasks: [
              { skill: "Nói 🗣️", items: ["Thực hành prompt 'Mô tả cách bạn làm việc' và 'Kể về tình huống khó' (về teamwork)."] },
              { skill: "Viết 📝", items: ["Viết ra quy trình làm việc lý tưởng của bạn với team (dev, tester, PO)."] },
          ]},
           { day_label: "Thứ 5 - Tuần 10 (Accomplishments)", tasks: [
              { skill: "Nói 🗣️", items: ["Thực hành prompt 'Chia sẻ thành tựu' và 'Mục tiêu nghề nghiệp'."] },
              { skill: "Viết 📝", items: ["Viết ra 3 thành tựu bạn tự hào nhất và tại sao."] },
          ]},
           { day_label: "Thứ 6 - Tuần 10 (Closing)", tasks: [
              { skill: "Nói 🗣️", items: ["Thực hành prompt 'Đàm phán lương' và 'Đặt câu hỏi ngược cho nhà tuyển dụng'."] },
              { skill: "Viết 📝", items: ["Chuẩn bị một danh sách 5-7 câu hỏi thông minh để hỏi nhà tuyển dụng."] },
          ]},
          { day_label: "Thứ 7 & CN - Tuần 10 (Mock Interview 1)", tasks: [
              { skill: "Nói 🗣️", items: ["Thực hiện một buổi phỏng vấn giả định đầy đủ (30 phút) với AI hoặc bạn bè, bao gồm tất cả các phần đã luyện tập."] },
              { skill: "Ôn tập ✍️", items: ["Xem lại bản ghi âm/ghi chú từ mock interview, xác định 2-3 điểm cần cải thiện."] },
          ]},
          { day_label: "Thứ 2 - Tuần 11 (Client Facing)", tasks: [
              { skill: "Nói 🗣️", items: ["Thực hành lại các prompt 'Gặp khách hàng': 'Đặt lịch demo', 'Giới thiệu hệ thống', 'Hỏi tính năng khách cần nhất'."] },
          ]},
          { day_label: "Thứ 3 - Tuần 11 (Technical Discussion)", tasks: [
              { skill: "Nói 🗣️", items: ["Thực hành lại các prompt 'Phát triển phần mềm': 'Làm rõ yêu cầu tính năng đăng nhập', 'Góp ý giao diện trang chủ'."] },
          ]},
          { day_label: "Thứ 4 - Tuần 11 (Agile Ceremonies)", tasks: [
              { skill: "Nói 🗣️", items: ["Thực hành lại các prompt 'Họp Agile / Scrum': 'Chuẩn bị Sprint Planning', 'Nhận feedback sau Sprint Review'."] },
          ]},
          { day_label: "Thứ 5 - Tuần 11 (Fintech Concepts)", tasks: [
              { skill: "Nói 🗣️", items: ["Thực hành lại các prompt 'Fintech / Banking': 'Hỏi về KYC', 'Phân biệt ví điện tử và tài khoản ngân hàng'."] },
          ]},
          { day_label: "Thứ 6 - Tuần 11 (Problem Solving)", tasks: [
              { skill: "Nói 🗣️", items: ["Thực hành một case study nhỏ: 'Một app ngân hàng có tỷ lệ người dùng đăng ký nhưng không giao dịch cao. Hãy phân tích nguyên nhân và đề xuất giải pháp'."] },
          ]},
          { day_label: "Thứ 7 & CN - Tuần 11 (Mock Interview 2)", tasks: [
              { skill: "Nói 🗣️", items: ["Thực hiện một buổi phỏng vấn giả định thứ hai, tập trung vào các câu hỏi tình huống và case study."] },
              { skill: "Ôn tập ✍️", items: ["So sánh kết quả với lần 1, xem bạn đã cải thiện được những gì."] },
          ]},
          { day_label: "Thứ 2 - Tuần 12 (Final Polish)", tasks: [
              { skill: "Nói 🗣️", items: ["Review và thực hành lại những prompt bạn cảm thấy yếu nhất trong 11 tuần qua."] },
          ]},
          { day_label: "Thứ 3 - Tuần 12 (Final Polish)", tasks: [
              { skill: "Nói 🗣️", items: ["Tự tin thực hành lại prompt 'Tự giới thiệu' và 'Mục tiêu nghề nghiệp'."] },
          ]},
          { day_label: "Thứ 4 - Tuần 12 (Final Polish)", tasks: [
              { skill: "Nói 🗣️", items: ["Thực hành lại prompt 'Kể về tình huống khó' với một câu chuyện mới."] },
          ]},
          { day_label: "Thứ 5 - Tuần 12 (Final Polish)", tasks: [
              { skill: "Nói 🗣️", items: ["Thực hành lại prompt 'Đặt câu hỏi ngược cho nhà tuyển dụng' với các câu hỏi sắc sảo hơn."] },
          ]},
          { day_label: "Thứ 6 - Tuần 12 (Final Mock Interview)", tasks: [
              { skill: "Nói 🗣️", items: ["Thực hiện buổi phỏng vấn giả định cuối cùng. Hãy thể hiện hết mình!"] },
          ]},
          { day_label: "Thứ 7 & CN - Tuần 12 (Relax & Prepare)", tasks: [
              { skill: "Chúc mừng! 🎉", items: ["Bạn đã hoàn thành một chặng đường dài. Hãy nghỉ ngơi, giữ tinh thần thoải mái.", "Review nhẹ nhàng lại các ghi chú quan trọng.", "Chuẩn bị trang phục, kiểm tra thiết bị cho các buổi phỏng vấn thật.", "Sẵn sàng chinh phục công việc mơ ước!"] },
          ]},
        ]
      },
    ]
  }
];

const styles: { [key: string]: React.CSSProperties } = {
  appContainer: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: 'var(--primary-color)',
  },
  mainTitle: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: 'var(--dark-gray)',
    fontWeight: 'normal',
  },
  tabsContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem',
    borderBottom: '2px solid var(--light-gray)',
    flexWrap: 'wrap',
  },
  tab: {
    padding: '1rem 1.5rem',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '1.1rem',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    color: 'var(--dark-gray)',
    position: 'relative',
    transition: 'color 0.3s ease',
  },
  activeTab: {
    color: 'var(--secondary-color)',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: '-2px',
    left: 0,
    right: 0,
    height: '3px',
    backgroundColor: 'var(--secondary-color)',
    borderRadius: '3px 3px 0 0',
  },
  contentContainer: {
    padding: '1rem 0',
  },
  monthGoal: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: 'var(--dark-gray)',
    marginBottom: '2rem',
    fontSize: '1.1rem',
    padding: '0 1rem',
  },
  weekCard: {
    backgroundColor: 'var(--card-background)',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '2rem',
    boxShadow: '0 4px 12px rgba(0, 95, 115, 0.1)',
  },
  weekHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    borderBottom: '2px solid var(--light-gray)',
    paddingBottom: '0.5rem',
  },
  weekLabel: {
    fontSize: '1.2rem',
    color: 'var(--primary-color)',
    margin: 0,
    flex: 1,
  },
  weekProgress: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    minWidth: '120px',
  },
  daysGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  dayCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    padding: '1rem 1.5rem',
    borderLeft: '4px solid var(--secondary-color)',
  },
  dayLabel: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: 'var(--heading-color)',
    marginBottom: '1rem',
  },
  taskSkill: {
    fontWeight: 'bold',
    color: 'var(--primary-color)',
    marginBottom: '0.5rem',
  },
  taskItem: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '0.5rem',
    fontSize: '0.95rem',
  },
  checkbox: {
    marginRight: '0.75rem',
    marginTop: '4px',
    accentColor: 'var(--accent-color)',
    cursor: 'pointer',
    width: '16px',
    height: '16px',
    flexShrink: 0,
  },
  taskText: {
    flex: 1,
  },
  checkedTask: {
    textDecoration: 'line-through',
    color: 'var(--dark-gray)',
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  progressBarOuter: {
    flex: 1,
    height: '12px',
    backgroundColor: 'var(--light-gray)',
    borderRadius: '6px',
    overflow: 'hidden',
  },
  progressBarInner: {
    height: '100%',
    backgroundColor: 'var(--secondary-color)',
    borderRadius: '6px',
    transition: 'width 0.4s ease-in-out',
  },
  progressText: {
    fontWeight: 'bold',
    color: 'var(--primary-color)',
    fontSize: '0.9rem',
    minWidth: '90px', // to prevent layout shift
    textAlign: 'right',
  },
  weekTabsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
    flexWrap: 'wrap',
    marginTop: '1rem',
  },
  weekTab: {
    padding: '0.5rem',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'white',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    color: 'var(--dark-gray)',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.25rem',
    minWidth: '50px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  activeWeekTab: {
    backgroundColor: '#3b82f6',
    color: 'white',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(59, 130, 246, 0.3)',
  },
  weekNumber: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
  },
  weekProgress: {
    fontSize: '0.7rem',
    opacity: 0.8,
  },
  // Quiz styles
  quizContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: 'var(--card-background)',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 95, 115, 0.1)',
  },
  quizTitle: {
    textAlign: 'center',
    color: 'var(--primary-color)',
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
  },
  topicGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  topicButton: {
    padding: '1.5rem',
    border: '2px solid var(--primary-color)',
    borderRadius: '12px',
    backgroundColor: 'white',
    color: 'var(--primary-color)',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  setupForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  setupItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  setupLabel: {
    fontSize: '1rem',
    fontWeight: '600',
    color: 'var(--text-color)',
  },
  setupSelect: {
    padding: '0.75rem',
    border: '2px solid var(--light-gray)',
    borderRadius: '8px',
    fontSize: '1rem',
    backgroundColor: 'white',
  },
  setupInput: {
    padding: '0.75rem',
    border: '2px solid var(--light-gray)',
    borderRadius: '8px',
    fontSize: '1rem',
    backgroundColor: 'white',
  },
  startButton: {
    padding: '1rem 2rem',
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '1rem',
  },
  quizHeader: {
    marginBottom: '2rem',
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: 'var(--light-gray)',
    borderRadius: '4px',
    overflow: 'hidden',
    marginTop: '1rem',
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'var(--secondary-color)',
    transition: 'width 0.3s ease',
  },
  questionCard: {
    backgroundColor: '#f8f9fa',
    padding: '2rem',
    borderRadius: '12px',
    marginBottom: '2rem',
  },
  questionText: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'var(--primary-color)',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  questionPrompt: {
    fontSize: '1.1rem',
    color: 'var(--text-color)',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  optionButton: {
    padding: '1rem 1.5rem',
    border: '2px solid var(--light-gray)',
    borderRadius: '8px',
    backgroundColor: 'white',
    color: 'var(--text-color)',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'left',
  },
  selectedOption: {
    borderColor: 'var(--primary-color)',
    backgroundColor: 'var(--primary-color)',
    color: 'white',
  },
  answeredOption: {
    pointerEvents: 'none',
  },
  navigationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
  },
  navButton: {
    padding: '0.75rem 1.5rem',
    border: '2px solid var(--primary-color)',
    borderRadius: '8px',
    backgroundColor: 'white',
    color: 'var(--primary-color)',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  questionNumbers: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  questionNumber: {
    width: '40px',
    height: '40px',
    border: '2px solid var(--light-gray)',
    borderRadius: '50%',
    backgroundColor: 'white',
    color: 'var(--text-color)',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  currentQuestion: {
    borderColor: 'var(--primary-color)',
    backgroundColor: 'var(--primary-color)',
    color: 'white',
  },
  answeredQuestion: {
    borderColor: 'var(--secondary-color)',
    backgroundColor: 'var(--secondary-color)',
    color: 'white',
  },
  finishButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: 'var(--secondary-color)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  resultSummary: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  scoreCard: {
    backgroundColor: '#f8f9fa',
    padding: '2rem',
    borderRadius: '12px',
    display: 'inline-block',
  },
  scoreTitle: {
    fontSize: '1.2rem',
    color: 'var(--text-color)',
    marginBottom: '1rem',
  },
  scoreValue: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: 'var(--primary-color)',
    marginBottom: '0.5rem',
  },
  scoreText: {
    fontSize: '1rem',
    color: 'var(--text-color)',
  },
  resultsList: {
    marginBottom: '2rem',
  },
  resultsTitle: {
    fontSize: '1.3rem',
    color: 'var(--primary-color)',
    marginBottom: '1rem',
  },
  resultItem: {
    border: '1px solid var(--light-gray)',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
  },
  resultQuestion: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem',
  },
  questionNumber: {
    fontWeight: 'bold',
    color: 'var(--primary-color)',
  },
  questionWord: {
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  resultAnswers: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  answerRow: {
    display: 'flex',
    gap: '0.5rem',
  },
  answerLabel: {
    fontWeight: '600',
    minWidth: '120px',
  },
  answerText: {
    fontWeight: '500',
  },
  correctAnswer: {
    color: '#10b981',
    fontWeight: '600',
  },
  wrongAnswer: {
    color: '#ef4444',
    fontWeight: '600',
  },
  resultActions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
  retryButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  backButton: {
    padding: '0.75rem 1.5rem',
    border: '2px solid var(--primary-color)',
    borderRadius: '8px',
    backgroundColor: 'white',
    color: 'var(--primary-color)',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  quizButton: {
    padding: '0.5rem 1rem',
    backgroundColor: 'var(--secondary-color)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginLeft: '1rem',
  },
};

// Component Props Interfaces
interface TaskItemProps {
  item: string;
  isChecked: boolean;
  onCheck: () => void;
}

interface DayCardProps {
    day: Day;
    weekLabel: string;
    checkedItems: { [key: string]: boolean };
    onCheck: (id: string) => void;
}

interface WeekCardProps {
  week: Week;
  checkedItems: { [key: string]: boolean };
  onCheck: (id: string) => void;
  weekIndex?: number;
  weekRef?: (el: HTMLDivElement | null) => void;
}

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

// Quiz Components
const TopicSelection = ({ onTopicSelect }: { onTopicSelect: (topic: string) => void }) => (
  <div style={styles.quizContainer}>
    <h2 style={styles.quizTitle}>Chọn chủ đề từ vựng</h2>
    <div style={styles.topicGrid}>
      {Object.keys(vocabularyData).map(topic => (
        <button
          key={topic}
          onClick={() => onTopicSelect(topic)}
          style={styles.topicButton}
        >
          {topic}
        </button>
      ))}
    </div>
  </div>
);

const QuizSetup = ({ topic, onStartQuiz }: { topic: string; onStartQuiz: (settings: QuizSettings) => void }) => {
  const [questionType, setQuestionType] = useState<'en-to-vi' | 'vi-to-en' | 'mixed'>('en-to-vi');
  const [questionCount, setQuestionCount] = useState(10);

  const handleStart = () => {
    onStartQuiz({
      topic,
      questionType,
      questionCount: Math.min(questionCount, vocabularyData[topic as keyof typeof vocabularyData].length)
    });
  };

  return (
    <div style={styles.quizContainer}>
      <h2 style={styles.quizTitle}>Thiết lập bài kiểm tra</h2>
      <div style={styles.setupForm}>
        <div style={styles.setupItem}>
          <label style={styles.setupLabel}>Chủ đề: {topic}</label>
        </div>
        <div style={styles.setupItem}>
          <label style={styles.setupLabel}>Loại câu hỏi:</label>
          <select 
            value={questionType} 
            onChange={(e) => setQuestionType(e.target.value as any)}
            style={styles.setupSelect}
          >
            <option value="en-to-vi">Tiếng Anh → Tiếng Việt</option>
            <option value="vi-to-en">Tiếng Việt → Tiếng Anh</option>
            <option value="mixed">Trộn ngẫu nhiên</option>
          </select>
        </div>
        <div style={styles.setupItem}>
          <label style={styles.setupLabel}>Số câu hỏi:</label>
          <input
            type="number"
            min="1"
            max={vocabularyData[topic as keyof typeof vocabularyData].length}
            value={questionCount}
            onChange={(e) => setQuestionCount(parseInt(e.target.value) || 1)}
            style={styles.setupInput}
          />
        </div>
        <button onClick={handleStart} style={styles.startButton}>
          Bắt đầu kiểm tra
        </button>
      </div>
    </div>
  );
};

const QuizInterface = ({ 
  questions, 
  currentQuestion, 
  onAnswer, 
  onNext, 
  onPrevious, 
  onFinish,
  userAnswers 
}: { 
  questions: QuizQuestion[]; 
  currentQuestion: number; 
  onAnswer: (questionId: number, answerIndex: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onFinish: () => void;
  userAnswers: { [key: number]: number };
}) => {
  const question = questions[currentQuestion];
  const userAnswer = userAnswers[question.id];

  return (
    <div style={styles.quizContainer}>
      <div style={styles.quizHeader}>
        <h2 style={styles.quizTitle}>Câu hỏi {currentQuestion + 1} / {questions.length}</h2>
        <div style={styles.progressBar}>
          <div 
            style={{ 
              ...styles.progressFill, 
              width: `${((currentQuestion + 1) / questions.length) * 100}%` 
            }} 
          />
        </div>
      </div>

      <div style={styles.questionCard}>
        <h3 style={styles.questionText}>{question.word}</h3>
        <p style={styles.questionPrompt}>Chọn nghĩa đúng:</p>
        
        <div style={styles.optionsContainer}>
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswer(question.id, index)}
              style={{
                ...styles.optionButton,
                ...(userAnswer === index ? styles.selectedOption : {}),
                ...(userAnswer !== undefined ? styles.answeredOption : {})
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.navigationContainer}>
        <button 
          onClick={onPrevious} 
          disabled={currentQuestion === 0}
          style={styles.navButton}
        >
          ← Câu trước
        </button>
        
        <div style={styles.questionNumbers}>
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => {/* TODO: Jump to question */}}
              style={{
                ...styles.questionNumber,
                ...(index === currentQuestion ? styles.currentQuestion : {}),
                ...(userAnswers[index] !== undefined ? styles.answeredQuestion : {})
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {currentQuestion === questions.length - 1 ? (
          <button onClick={onFinish} style={styles.finishButton}>
            Nộp bài
          </button>
        ) : (
          <button onClick={onNext} style={styles.navButton}>
            Câu tiếp theo →
          </button>
        )}
      </div>
    </div>
  );
};

const QuizResults = ({ result, onRetry, onBackToTopics }: { 
  result: QuizResult; 
  onRetry: () => void;
  onBackToTopics: () => void;
}) => {
  return (
    <div style={styles.quizContainer}>
      <h2 style={styles.quizTitle}>Kết quả bài kiểm tra</h2>
      
      <div style={styles.resultSummary}>
        <div style={styles.scoreCard}>
          <h3 style={styles.scoreTitle}>Điểm số</h3>
          <div style={styles.scoreValue}>{result.score}%</div>
          <p style={styles.scoreText}>
            {result.correctAnswers} / {result.totalQuestions} câu đúng
          </p>
        </div>
      </div>

      <div style={styles.resultsList}>
        <h3 style={styles.resultsTitle}>Chi tiết từng câu hỏi:</h3>
        {result.questions.map((question, index) => (
          <div key={question.id} style={styles.resultItem}>
            <div style={styles.resultQuestion}>
              <span style={styles.questionNumber}>{index + 1}.</span>
              <span style={styles.questionWord}>{question.word}</span>
            </div>
            <div style={styles.resultAnswers}>
              <div style={styles.answerRow}>
                <span style={styles.answerLabel}>Đáp án của bạn:</span>
                <span style={{
                  ...styles.answerText,
                  ...(question.isCorrect ? styles.correctAnswer : styles.wrongAnswer)
                }}>
                  {question.userAnswer !== undefined ? question.options[question.userAnswer] : 'Chưa trả lời'}
                </span>
              </div>
              <div style={styles.answerRow}>
                <span style={styles.answerLabel}>Đáp án đúng:</span>
                <span style={styles.correctAnswer}>
                  {question.options[question.correctAnswer]}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.resultActions}>
        <button onClick={onRetry} style={styles.retryButton}>
          Làm lại
        </button>
        <button onClick={onBackToTopics} style={styles.backButton}>
          Về chọn chủ đề
        </button>
      </div>
    </div>
  );
};

const TaskItem = ({ item, isChecked, onCheck, skill, onQuizClick }: TaskItemProps & { skill?: string; onQuizClick?: () => void }) => {
    // Generate a simple, stable ID from the item text itself for the checkbox
    const checkboxId = `task-${item.replace(/\s+/g, '-').slice(0, 20)}`;
    const isVocabularyTask = skill?.includes('Từ vựng');
    
    return (
        <div style={styles.taskItem}>
            <input
                type="checkbox"
                id={checkboxId}
                name={checkboxId}
                checked={isChecked}
                onChange={onCheck}
                style={styles.checkbox}
                aria-label={`Mark task as complete: ${item}`}
            />
            <label htmlFor={checkboxId} style={{ ...styles.taskText, ...(isChecked ? styles.checkedTask : {}) }}>
                {item}
            </label>
            {isVocabularyTask && onQuizClick && (
                <button onClick={onQuizClick} style={styles.quizButton}>
                    🧠 Kiểm tra
                </button>
            )}
        </div>
    );
};


const DayCard = ({ day, weekLabel, checkedItems, onCheck, onQuizClick }: DayCardProps & { onQuizClick?: () => void }) => (
  <div style={styles.dayCard}>
    <h4 style={styles.dayLabel}>{day.day_label}</h4>
    {day.tasks.map((task, taskIndex) => (
      <div key={taskIndex} style={{ marginBottom: '1rem' }}>
        <p style={styles.taskSkill}>{task.skill}</p>
        {task.items.map((item, itemIndex) => {
          const uniqueId = `${weekLabel}-${day.day_label}-${task.skill}-${itemIndex}`;
          return (
            <TaskItem
              key={uniqueId}
              item={item}
              isChecked={checkedItems[uniqueId] || false}
              onCheck={() => onCheck(uniqueId)}
              skill={task.skill}
              onQuizClick={onQuizClick}
            />
          );
        })}
      </div>
    ))}
  </div>
);

const WeekCard = ({ week, checkedItems, onCheck, onQuizClick, weekIndex, weekRef }: WeekCardProps & { onQuizClick?: () => void }) => {
  let totalTasks = 0;
  let completedTasks = 0;

  week.days.forEach(day => {
    day.tasks.forEach(task => {
      task.items.forEach((item, itemIndex) => {
        totalTasks++;
        const uniqueId = `${week.week_label}-${day.day_label}-${task.skill}-${itemIndex}`;
        if (checkedItems[uniqueId]) {
          completedTasks++;
        }
      });
    });
  });

  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div ref={weekRef} style={styles.weekCard}>
      <div style={styles.weekHeader}>
        <h3 style={styles.weekLabel}>{week.week_label}</h3>
        <div style={styles.weekProgress}>
          <div style={styles.progressBarOuter}>
            <div style={{ ...styles.progressBarInner, width: `${progress}%` }}></div>
          </div>
          <div style={styles.progressText}>
            {Math.round(progress)}%
          </div>
        </div>
      </div>
      <div style={styles.daysGrid}>
        {week.days.map((day, index) => (
          <DayCard key={index} day={day} weekLabel={week.week_label} checkedItems={checkedItems} onCheck={onCheck} onQuizClick={onQuizClick} />
        ))}
      </div>
    </div>
  );
};


const Tab = ({ label, isActive, onClick }: TabProps) => (
  <button onClick={onClick} style={{ ...styles.tab, ...(isActive ? styles.activeTab : {}) }} aria-selected={isActive}>
    {label}
    {isActive && <div style={styles.tabIndicator}></div>}
  </button>
);

const WeekTab = ({ weekNumber, weekTitle, isActive, onClick, progress }: { 
  weekNumber: number; 
  weekTitle: string; 
  isActive: boolean; 
  onClick: () => void; 
  progress: number; 
}) => (
  <button 
    onClick={onClick} 
    style={{ 
      ...styles.weekTab, 
      ...(isActive ? styles.activeWeekTab : {}) 
    }} 
    aria-selected={isActive}
    title={weekTitle}
  >
    <span style={styles.weekNumber}>{weekNumber}</span>
    <span style={styles.weekProgress}>{progress}%</span>
  </button>
);

const App = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [activeWeek, setActiveWeek] = useState(0);
  const weekRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  
  // Quiz state
  const [quizMode, setQuizMode] = useState<'main' | 'topic-selection' | 'setup' | 'quiz' | 'results'>('main');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [quizSettings, setQuizSettings] = useState<QuizSettings | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem('learningProgress');
      if (savedProgress) {
        setCheckedItems(JSON.parse(savedProgress));
      }
    } catch (error) {
      console.error("Could not load progress from localStorage", error);
    }
  }, []);

  // Bỏ scroll tracking để đơn giản hóa

  const handleCheck = (id: string) => {
    const newCheckedItems = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(newCheckedItems);
    try {
      localStorage.setItem('learningProgress', JSON.stringify(newCheckedItems));
    } catch (error) {
      console.error("Could not save progress to localStorage", error);
    }
  };

  // Quiz functions
  const generateQuizQuestions = (settings: QuizSettings): QuizQuestion[] => {
    const topicWords = vocabularyData[settings.topic as keyof typeof vocabularyData];
    const shuffledWords = [...topicWords].sort(() => Math.random() - 0.5);
    const selectedWords = shuffledWords.slice(0, settings.questionCount);
    
    return selectedWords.map((wordData, index) => {
      const isEnglishToVietnamese = settings.questionType === 'en-to-vi' || 
        (settings.questionType === 'mixed' && Math.random() > 0.5);
      
      const question = isEnglishToVietnamese ? wordData.word : wordData.meaning;
      const correctAnswer = isEnglishToVietnamese ? wordData.meaning : wordData.word;
      
      // Generate wrong options
      const allMeanings = topicWords.map(w => isEnglishToVietnamese ? w.meaning : w.word);
      const wrongOptions = allMeanings
        .filter(m => m !== correctAnswer)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      
      const options = [...wrongOptions, correctAnswer].sort(() => Math.random() - 0.5);
      const correctAnswerIndex = options.indexOf(correctAnswer);
      
      return {
        id: index,
        word: question,
        meaning: correctAnswer,
        options,
        correctAnswer: correctAnswerIndex,
      };
    });
  };

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    setQuizMode('setup');
  };

  const handleStartQuiz = (settings: QuizSettings) => {
    setQuizSettings(settings);
    const questions = generateQuizQuestions(settings);
    setQuizQuestions(questions);
    setCurrentQuestion(0);
    setUserAnswers({});
    setQuizMode('quiz');
  };

  const handleAnswer = (questionId: number, answerIndex: number) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinish = () => {
    const correctAnswers = quizQuestions.filter(q => 
      userAnswers[q.id] === q.correctAnswer
    ).length;
    
    const result: QuizResult = {
      totalQuestions: quizQuestions.length,
      correctAnswers,
      score: Math.round((correctAnswers / quizQuestions.length) * 100),
      questions: quizQuestions.map(q => ({
        ...q,
        userAnswer: userAnswers[q.id],
        isCorrect: userAnswers[q.id] === q.correctAnswer
      }))
    };
    
    setQuizResult(result);
    setQuizMode('results');
  };

  const handleRetry = () => {
    if (quizSettings) {
      handleStartQuiz(quizSettings);
    }
  };

  const handleBackToTopics = () => {
    setQuizMode('topic-selection');
    setSelectedTopic('');
    setQuizSettings(null);
    setQuizQuestions([]);
    setCurrentQuestion(0);
    setUserAnswers({});
    setQuizResult(null);
  };

  const handleBackToMain = () => {
    setQuizMode('main');
    setSelectedTopic('');
    setQuizSettings(null);
    setQuizQuestions([]);
    setCurrentQuestion(0);
    setUserAnswers({});
    setQuizResult(null);
  };

  const scrollToWeek = (weekIndex: number) => {
    const weekRef = weekRefs.current[weekIndex];
    if (weekRef) {
      const headerHeight = 180; // Height of fixed header
      const elementTop = weekRef.offsetTop - headerHeight;
      window.scrollTo({
        top: elementTop,
        behavior: 'smooth'
      });
      setActiveWeek(weekIndex); // Set active week khi click
    }
  };

  const calculateWeekProgress = (weekIndex: number) => {
    const week = currentPlanSection.weeks[weekIndex];
    if (!week) return 0;

    let totalTasks = 0;
    let completedTasks = 0;

    week.days.forEach(day => {
      day.tasks.forEach(task => {
        task.items.forEach((item, itemIndex) => {
          totalTasks++;
          const uniqueId = `${week.week_label}-${day.day_label}-${task.skill}-${itemIndex}`;
          if (checkedItems[uniqueId]) {
            completedTasks++;
          }
        });
      });
    });

    return totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  };

  const currentPlanSection = learningPlan[activeTab];

  // Render quiz components
  if (quizMode === 'topic-selection') {
    return (
      <div style={styles.appContainer}>
        <TopicSelection onTopicSelect={handleTopicSelect} />
        <button onClick={handleBackToMain} style={styles.backButton}>
          ← Về trang chính
        </button>
      </div>
    );
  }

  if (quizMode === 'setup') {
    return (
      <div style={styles.appContainer}>
        <QuizSetup topic={selectedTopic} onStartQuiz={handleStartQuiz} />
        <button onClick={handleBackToTopics} style={styles.backButton}>
          ← Về chọn chủ đề
        </button>
      </div>
    );
  }

  if (quizMode === 'quiz') {
    return (
      <div style={styles.appContainer}>
        <QuizInterface
          questions={quizQuestions}
          currentQuestion={currentQuestion}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onFinish={handleFinish}
          userAnswers={userAnswers}
        />
      </div>
    );
  }

  if (quizMode === 'results') {
    return (
      <div style={styles.appContainer}>
        <QuizResults
          result={quizResult!}
          onRetry={handleRetry}
          onBackToTopics={handleBackToTopics}
        />
      </div>
    );
  }

  return (
    <div style={styles.appContainer}>
      <header style={styles.header}>
        <h1 style={styles.mainTitle}>Lộ trình 3 tháng chinh phục Tiếng Anh cho IT BA</h1>
        <p style={styles.subtitle}>Tự tin ứng tuyển công việc mơ ước!</p>
        <button onClick={() => setQuizMode('topic-selection')} style={styles.quizButton}>
          🧠 Kiểm tra từ vựng
        </button>
      </header>
      
      <nav style={styles.tabsContainer}>
        {learningPlan.map((plan, index) => (
          <Tab 
            key={plan.title} 
            label={plan.title.split(':')[0]} 
            isActive={activeTab === index} 
            onClick={() => {
              setActiveTab(index);
              setActiveWeek(0); // Reset activeWeek khi chuyển tab
            }} 
          />
        ))}
      </nav>

      <div style={styles.weekTabsContainer}>
        {currentPlanSection.weeks.map((week, index) => (
          <WeekTab
            key={index}
            weekNumber={index + 1}
            weekTitle={week.week_label}
            isActive={activeWeek === index}
            onClick={() => scrollToWeek(index)}
            progress={Math.round(calculateWeekProgress(index))}
          />
        ))}
      </div>

      <main style={styles.contentContainer}>
        <p style={styles.monthGoal}>{currentPlanSection.goal}</p>
        {currentPlanSection.weeks.map((week, index) => (
          <WeekCard 
            key={week.week_label + index} 
            week={week} 
            checkedItems={checkedItems} 
            onCheck={handleCheck} 
            onQuizClick={() => setQuizMode('topic-selection')}
            weekIndex={index}
            weekRef={(el) => { weekRefs.current[index] = el; }}
          />
        ))}
      </main>
    </div>
  );
};

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);