const fs = require('fs');
const pdfParse = require('pdf-parse');
const Sentiment = require('sentiment');
const sentiment = new Sentiment();

// === Predefined Data ===
const technicalSkills = ['javascript', 'react', 'node.js', 'mongodb', 'express', 'html', 'css', 'sql', 'nosql', 'rest', 'api', 'git', 'github', 'mern', 'dsa'];
const softSkills = ['leadership', 'communication', 'teamwork', 'problem solving', 'adaptability', 'creativity'];
const tools = ['vs code', 'postman', 'jira', 'docker', 'figma', 'firebase'];
const actionVerbs = ['developed', 'designed', 'created', 'led', 'managed', 'collaborated', 'analyzed', 'implemented', 'built'];
const requiredSections = ['experience', 'education', 'skills', 'projects', 'contact', 'summary', 'objective'];

exports.analyzeResume = async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    const fileBuffer = fs.readFileSync(file.path);
    const parsed = await pdfParse(fileBuffer);
    const resumeText = parsed.text.toLowerCase();

    const sentimentScore = sentiment.analyze(resumeText).score;

    const getMatches = (arr) => arr.filter(item => resumeText.includes(item.toLowerCase()));

    const techMatches = getMatches(technicalSkills);
    const softMatches = getMatches(softSkills);
    const toolMatches = getMatches(tools);
    const verbMatches = getMatches(actionVerbs);
    const matchedSections = getMatches(requiredSections);

    const experienceLevel = detectExperienceLevel(resumeText);

    // === Dynamic ATS Score Based on Experience ===
    const atsScore = calculateATSScore({
      experienceLevel,
      matchedSections,
      techMatches,
      softMatches,
      toolMatches,
      verbMatches
    });

    const weaknesses = extractWeaknesses(resumeText, {
      techMatches,
      softMatches,
      toolMatches,
      verbMatches,
      matchedSections
    });

    const suggestions = generateSuggestions(weaknesses, resumeText);
    const strengths = [...new Set([...techMatches, ...softMatches])];
    const jobRoles = suggestJobRoles(resumeText, strengths, experienceLevel);
    const summary = getResumeSummary(parsed.text);

    return res.status(200).json({
      success: true,
      atsScore,
      sentimentScore,
      resumeSummary: summary,
      strengths,
      weaknesses,
      experienceLevel,
      suggestedJobRoles: jobRoles,
      matchedSections,
      matchedKeywords: {
        technicalSkills: techMatches,
        softSkills: softMatches,
        tools: toolMatches,
        actionVerbs: verbMatches
      },
      suggestions
    });

  } catch (err) {
    console.error('Resume analysis failed:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// === Helpers ===

const getResumeSummary = (text) => {
  const sentences = text.split('. ');
  return sentences.slice(0, 3).join('. ') + (sentences.length > 3 ? '...' : '.');
};

const detectExperienceLevel = (text) => {
  if (text.includes('senior')) return 'Senior';
  if (text.includes('mid-level')) return 'Mid-level';
  if (text.includes('junior') || text.includes('entry-level') || text.includes('beginner')) return 'Entry-level';
  return 'Fresher';
};

const calculateATSScore = ({ experienceLevel, matchedSections, techMatches, softMatches, toolMatches, verbMatches }) => {
  if (experienceLevel === 'Fresher' || experienceLevel === 'Entry-level') {
    return Math.round(
      (matchedSections.length / requiredSections.length) * 30 +
      (techMatches.length / technicalSkills.length) * 30 +
      (softMatches.length / softSkills.length) * 20 +
      (verbMatches.length / actionVerbs.length) * 10 +
      (toolMatches.length / tools.length) * 10
    );
  } else {
    return Math.round(
      (matchedSections.length / requiredSections.length) * 20 +
      (techMatches.length / technicalSkills.length) * 25 +
      (softMatches.length / softSkills.length) * 15 +
      (verbMatches.length / actionVerbs.length) * 25 +
      (toolMatches.length / tools.length) * 15
    );
  }
};

const extractWeaknesses = (text, matchData) => {
  const weaknesses = [];

  if (matchData.techMatches.length < 5) weaknesses.push('Insufficient technical keywords');
  if (matchData.softMatches.length < 2) weaknesses.push('Lack of soft skills');
  if (matchData.toolMatches.length < 2) weaknesses.push('Missing tool references');
  if (matchData.verbMatches.length < 5) weaknesses.push('Weak use of action verbs');
  if (matchData.matchedSections.length < requiredSections.length - 2) weaknesses.push('Resume structure is missing key sections');

  if (/responsible for|duties included/.test(text)) {
    weaknesses.push('Uses passive language like "responsible for" instead of action verbs');
  }

  if (!/intern|project|worked on/.test(text)) {
    weaknesses.push('Lacks hands-on project or internship experience');
  }

  return weaknesses;
};

const generateSuggestions = (weaknesses, text) => {
  const suggestions = [];

  weaknesses.forEach((w) => {
    switch (w) {
      case 'Insufficient technical keywords':
        suggestions.push('Add more specific technologies and frameworks relevant to your field.');
        break;
      case 'Lack of soft skills':
        suggestions.push('Include soft skills like communication, leadership, or teamwork.');
        break;
      case 'Missing tool references':
        suggestions.push('Mention tools you have used, like Postman, Git, or Figma.');
        break;
      case 'Weak use of action verbs':
        suggestions.push('Use strong action verbs to describe responsibilities and achievements.');
        break;
      case 'Resume structure is missing key sections':
        suggestions.push('Ensure your resume includes sections like education, skills, experience, and summary.');
        break;
      case 'Uses passive language like "responsible for" instead of action verbs':
        suggestions.push('Rewrite bullet points using action verbs instead of passive phrases.');
        break;
      case 'Lacks hands-on project or internship experience':
        suggestions.push('Mention any internships, major projects, or freelance work.');
        break;
      default:
        suggestions.push(`Review area: ${w}`);
    }
  });

  if (!text.includes('objective')) {
    suggestions.push('Include a brief objective section at the beginning to set the tone.');
  }

  return suggestions;
};

const suggestJobRoles = (text, strengths, level) => {
  const roleBank = {
    'Fresher': ['Web Developer Intern', 'Frontend Trainee', 'Software Trainee', 'Support Engineer'],
    'Entry-level': ['Junior Developer', 'Associate Software Engineer', 'Trainee Engineer'],
    'Mid-level': ['Software Engineer', 'Full Stack Developer', 'Backend Developer', 'Frontend Engineer'],
    'Senior': ['Senior Developer', 'Engineering Manager', 'Team Lead', 'Tech Lead']
  };

  let roles = roleBank[level] || ['Developer'];

  // Skill-based specialization
  if (strengths.includes('react')) roles.push('Frontend Developer');
  if (strengths.includes('node.js')) roles.push('Backend Developer');
  if (strengths.includes('mongodb') && strengths.includes('express')) roles.push('MERN Stack Developer');
  if (strengths.includes('communication')) roles.push('Client Coordinator');

  return [...new Set(roles)];
};
