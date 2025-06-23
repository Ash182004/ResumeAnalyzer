import { useRef } from 'react';

export default function AnalysisResults({ analysis, onNewAnalysis }) {
  const componentRef = useRef(null);

  const getScoreColor = (score) => {
    if (score >= 75) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const dummyJD =
    'Looking for a developer skilled in React, Node.js, and communication with experience in building REST APIs.';
  const matchWithJD = (jdText) =>
    analysis.strengths.filter((skill) =>
      jdText.toLowerCase().includes(skill.toLowerCase())
    );
  const jdMatch = matchWithJD(dummyJD);

  return (
    <>
      <div className="flex justify-center mb-6 max-w-5xl mx-auto mt-10 px-6">
  <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-500 text-center drop-shadow-md">
    Resume Analysis Report
  </h2>
</div>


      <div
        ref={componentRef}
        className="max-w-5xl mx-auto p-6 rounded-3xl bg-white dark:bg-[#0A1045] text-gray-800 dark:text-gray-100 shadow-xl border border-gray-200 dark:border-gray-700"
      >
        {/* ATS + Sentiment */}
        <div className="text-center py-8">
          <h1 className="text-6xl font-extrabold text-sky-700 dark:text-sky-400 mb-2">
            {analysis.atsScore}/100
          </h1>
          <p className="text-base text-gray-500 dark:text-gray-300 mb-6 font-medium">
            ATS Score
          </p>
          <div className="w-full max-w-xl mx-auto h-4 bg-gray-300 dark:bg-gray-700 rounded-full mb-6">
            <div
              className={`h-4 rounded-full ${getScoreColor(analysis.atsScore)}`}
              style={{ width: `${analysis.atsScore}%` }}
            ></div>
          </div>

          <p className="text-md font-medium text-gray-600 dark:text-gray-300">
            Sentiment Score:{' '}
            <span className="font-semibold">{analysis.sentimentScore}</span>
          </p>
          <div className="w-full max-w-xl mx-auto h-4 bg-gray-300 dark:bg-gray-700 rounded-full mt-2">
            <div
              className={`h-4 rounded-full ${getScoreColor(analysis.sentimentScore)}`}
              style={{ width: `${analysis.sentimentScore}%` }}
            ></div>
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white dark:bg-[#0A1045] rounded-xl p-5 shadow-md border dark:border-gray-700">
            <h3 className="text-xl font-semibold text-green-600 mb-3">
              Strengths
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-200">
              {analysis.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-[#0A1045] rounded-xl p-5 shadow-md border dark:border-gray-700">
            <h3 className="text-xl font-semibold text-red-600 mb-3">
              Areas for Improvement
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-200">
              {analysis.weaknesses.length > 0 ? (
                analysis.weaknesses.map((weakness, index) => (
                  <li key={index}>{weakness}</li>
                ))
              ) : (
                <li>No weaknesses detected 🎉</li>
              )}
            </ul>
          </div>
        </div>

        {/* Job Roles */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-sky-700 dark:text-sky-300 mb-3">
            Suggested Job Roles
          </h3>
          <div className="flex flex-wrap gap-3">
            {analysis.suggestedJobRoles.map((role, index) => (
              <span
                key={index}
                className="bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200 px-4 py-2 rounded-full text-sm font-medium shadow-sm"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* Suggestions */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-sky-700 dark:text-sky-300 mb-3">
            Suggestions to Improve Resume
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-200">
            {analysis.suggestions.map((sug, index) => (
              <li key={index}>{sug}</li>
            ))}
          </ul>
        </div>

        {/* JD Match */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-3">
            Matched with Job Description
          </h3>
          <p className="mb-2 text-gray-700 dark:text-gray-200 italic">
            Sample JD: {dummyJD}
          </p>
          <div className="flex flex-wrap gap-2">
            {jdMatch.map((kw, i) => (
              <span
                key={i}
                className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-8 text-center">
        <button
          onClick={onNewAnalysis}
          className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-medium py-2 px-6 rounded-lg transition duration-200"
        >
          Analyze Another Resume
        </button>
      </div>
    </>
  );
}
