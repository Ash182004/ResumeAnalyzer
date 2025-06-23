// /controllers/atsScoreController.js

export async function calculateATSScore(req, res) {
  try {
    const { resumeText, jobDescription = '' } = req.body;

    if (!resumeText) {
      return res.status(400).json({ error: "Resume text is required" });
    }

    const lowerText = resumeText.toLowerCase();
    const lowerJD = jobDescription.toLowerCase();

    // Keywords based on categories
    const technicalSkills = ['javascript', 'react', 'node.js', 'mongodb', 'express', 'html', 'css', 'sql', 'nosql', 'rest', 'api', 'git', 'github'];
    const softSkills = ['leadership', 'communication', 'teamwork', 'problem solving', 'adaptability', 'creativity'];
    const tools = ['vs code', 'postman', 'jira', 'docker', 'figma', 'firebase'];

    // Action verbs
    const actionVerbs = ['developed', 'designed', 'created', 'led', 'managed', 'collaborated', 'analyzed', 'implemented', 'built'];

    // Important sections
    const requiredSections = ['experience', 'education', 'skills', 'projects', 'contact', 'summary', 'objective'];

    // Score breakdown
    let totalScore = 0;
    let suggestions = [];

    const getMatches = (list) => {
      return list.filter(keyword => lowerText.includes(keyword));
    };

    const techMatches = getMatches(technicalSkills);
    const softMatches = getMatches(softSkills);
    const toolMatches = getMatches(tools);
    const verbMatches = getMatches(actionVerbs);
    const jdMatches = jobDescription ? getMatches(jobDescription.split(/\W+/)) : [];

    const matchedSections = requiredSections.filter(section => lowerText.includes(section));

    // Scores
    const sectionScore = (matchedSections.length / requiredSections.length) * 20;
    const techScore = (techMatches.length / technicalSkills.length) * 20;
    const softScore = (softMatches.length / softSkills.length) * 10;
    const toolsScore = (toolMatches.length / tools.length) * 10;
    const actionVerbScore = (verbMatches.length / actionVerbs.length) * 10;
    const jdScore = jobDescription ? (jdMatches.length / jobDescription.split(/\W+/).length) * 30 : 0;

    totalScore = Math.round(sectionScore + techScore + softScore + toolsScore + actionVerbScore + jdScore);

    // Suggestions
    requiredSections.forEach(section => {
      if (!lowerText.includes(section)) {
        suggestions.push(`Consider adding a ${section.charAt(0).toUpperCase() + section.slice(1)} section.`);
      }
    });

    if (techMatches.length < 5) suggestions.push("Include more technical skills relevant to the job.");
    if (softMatches.length < 3) suggestions.push("Highlight soft skills like teamwork or leadership.");
    if (verbMatches.length < 5) suggestions.push("Use strong action verbs to describe responsibilities.");
    if (jobDescription && jdScore < 10) suggestions.push("Customize your resume to better match the job description.");

    return res.status(200).json({
      score: totalScore,
      breakdown: {
        sectionScore: Math.round(sectionScore),
        technicalSkillsScore: Math.round(techScore),
        softSkillsScore: Math.round(softScore),
        toolsScore: Math.round(toolsScore),
        actionVerbScore: Math.round(actionVerbScore),
        jobDescriptionScore: Math.round(jdScore),
      },
      matchedKeywords: {
        technicalSkills: techMatches,
        softSkills: softMatches,
        tools: toolMatches,
        actionVerbs: verbMatches,
        jobDescriptionMatches: jdMatches,
      },
      matchedSections,
      suggestions,
    });

  } catch (err) {
    console.error("ATS Score Error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}
