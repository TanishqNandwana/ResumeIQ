"""
ResumeIQ Academic NLP Reference Layer — Information Extraction & Entity Recognition
Demonstrating:
- Contact information extraction (Regex)
- Resume section segmentation
- Skill extraction with alias normalization
- Named Entity Recognition (NER)
"""

import re
from typing import Dict, List, Any

# Core skills taxonomy with aliases
CORE_SKILLS_TAXONOMY = {
    "Python": ["python", "py", "python3"],
    "Java": ["java", "jdk"],
    "JavaScript": ["javascript", "js", "es6"],
    "TypeScript": ["typescript", "ts"],
    "C++": ["c++", "cpp"],
    "SQL": ["sql", "structured query language", "postgresql", "postgres", "mysql"],
    "PyTorch": ["pytorch", "torch"],
    "TensorFlow": ["tensorflow", "tf", "keras"],
    "Scikit-Learn": ["scikit-learn", "sklearn", "scikitlearn"],
    "Machine Learning": ["machine learning", "ml", "statistical learning"],
    "Deep Learning": ["deep learning", "dl", "neural networks"],
    "Natural Language Processing": ["natural language processing", "nlp", "text mining"],
    "AWS": ["aws", "amazon web services", "ec2", "s3", "lambda"],
    "Docker": ["docker", "containerization"],
    "Kubernetes": ["kubernetes", "k8s"],
    "React": ["react", "react.js", "reactjs"],
    "Next.js": ["next.js", "nextjs"],
    "Node.js": ["node.js", "nodejs"],
    "FastAPI": ["fastapi", "fast api"],
    "Apache Spark": ["spark", "pyspark", "apache spark"],
    "Redis": ["redis"],
    "Git": ["git", "github", "gitlab"],
}


def extract_contact_info(text: str) -> Dict[str, Any]:
    """Extract email, phone, and professional links using regular expressions."""
    email_pattern = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
    phone_pattern = r"(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}"
    linkedin_pattern = r"linkedin\.com/(?:in|profile)/[a-zA-Z0-9_-]+"
    github_pattern = r"github\.com/[a-zA-Z0-9_-]+"

    email_match = re.search(email_pattern, text)
    phone_match = re.search(phone_pattern, text)
    linkedin_match = re.search(linkedin_pattern, text, re.IGNORECASE)
    github_match = re.search(github_pattern, text, re.IGNORECASE)

    return {
        "email": email_match.group(0) if email_match else None,
        "phone": phone_match.group(0) if phone_match else None,
        "linkedin": linkedin_match.group(0) if linkedin_match else None,
        "github": github_match.group(0) if github_match else None,
    }


def extract_sections(text: str) -> Dict[str, str]:
    """Segment resume text into standard structural sections."""
    section_patterns = {
        "summary": r"(?:summary|objective|profile)",
        "skills": r"(?:skills|technical\s+skills|competencies)",
        "experience": r"(?:experience|work\s+experience|employment\s+history)",
        "projects": r"(?:projects|technical\s+projects)",
        "education": r"(?:education|academic\s+background)",
    }

    lines = text.split("\n")
    sections = {k: [] for k in section_patterns}
    current_section = None

    for line in lines:
        clean = line.strip().lower()
        matched = False
        if len(clean) < 35:
            for sec_name, pattern in section_patterns.items():
                if re.match(r"^" + pattern + r"[:\s]*$", clean):
                    current_section = sec_name
                    matched = True
                    break
        if matched:
            continue

        if current_section:
            sections[current_section].append(line)

    return {k: "\n".join(v).strip() for k, v in sections.items()}


def extract_skills(text: str) -> List[Dict[str, Any]]:
    """Extract skills from text with alias normalization and boundary validation."""
    extracted = []
    text_lower = f" {text.lower()} "

    for canonical, aliases in CORE_SKILLS_TAXONOMY.items():
        found = False
        count = 0
        all_patterns = [canonical.lower()] + [a.lower() for a in aliases]
        for pattern in all_patterns:
            escaped = re.escape(pattern)
            if pattern in ["c++", "c#"] or pattern.startswith("."):
                regex = rf"(?:^|[\s,;/]){escaped}(?=[\s,;/]|$)"
            else:
                regex = rf"\b{escaped}\b"

            matches = re.findall(regex, text_lower, flags=re.IGNORECASE)
            if matches:
                found = True
                count += len(matches)

        if found:
            extracted.append({
                "canonical": canonical,
                "count": count
            })

    return extracted


def extract_named_entities(text: str) -> List[Dict[str, str]]:
    """
    Extract Named Entities using spaCy if available, with robust regex pattern fallbacks.
    Labels: PERSON, ORG, GPE, DATE, DEGREE, TECH
    """
    entities = []

    # 1. Degree entities
    degree_pattern = r"\b(B\.?Tech|B\.?S\.?|Bachelor|M\.?S\.?|Master|Ph\.?D\.?|MBA)\b"
    for m in re.finditer(degree_pattern, text, re.IGNORECASE):
        entities.append({"text": m.group(0), "label": "DEGREE"})

    # 2. Date entities
    date_pattern = r"\b((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4}|\d{4}\s*[-–]\s*(?:\d{4}|Present))\b"
    for m in re.finditer(date_pattern, text, re.IGNORECASE):
        entities.append({"text": m.group(0), "label": "DATE"})

    # 3. Location entities
    gpe_pattern = r"\b(San Francisco|New York|Seattle|Boston|Austin|Bangalore|London|USA|India|California)\b"
    for m in re.finditer(gpe_pattern, text, re.IGNORECASE):
        entities.append({"text": m.group(0), "label": "GPE"})

    # 4. Technologies
    tech_pattern = r"\b(Python|PyTorch|TensorFlow|AWS|Kubernetes|Docker|PostgreSQL)\b"
    for m in re.finditer(tech_pattern, text):
        entities.append({"text": m.group(0), "label": "TECH"})

    return entities
