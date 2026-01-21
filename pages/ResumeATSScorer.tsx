
import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import { getResumeScore } from '../services/geminiService';
import { Bot, Clipboard, FileText } from 'lucide-react';

const ResumeATSScorer: React.FC = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!jobDescription || !resumeText) {
      setResult('Please provide both a job description and your resume text.');
      return;
    }
    setIsLoading(true);
    setResult('');
    try {
      const score = await getResumeScore(jobDescription, resumeText);
      setResult(score);
    } catch (error) {
      setResult('An error occurred while analyzing your resume.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold flex items-center justify-center">
          <Bot className="mr-3 text-accent" size={32} /> AI-Powered Resume Scorer
        </h1>
        <p className="text-text-secondary mt-2">
          See how your resume stacks up against a job description. Powered by Gemini.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <label className="flex items-center text-xl font-semibold mb-2">
            <Clipboard className="mr-2 text-accent" /> Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            className="w-full h-64 p-3 bg-gray-700 border border-border rounded-md resize-none"
          />
        </Card>
        <Card>
          <label className="flex items-center text-xl font-semibold mb-2">
            <FileText className="mr-2 text-accent" /> Your Resume
          </label>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume text here..."
            className="w-full h-64 p-3 bg-gray-700 border border-border rounded-md resize-none"
          />
        </Card>
      </div>
      <div className="text-center">
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? <Spinner /> : 'Analyze My Resume'}
        </Button>
      </div>
      {result && (
        <Card>
          <h2 className="text-2xl font-bold mb-4">Analysis Result</h2>
          <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, '<br />') }} />
        </Card>
      )}
    </div>
  );
};

export default ResumeATSScorer;
