export interface ImproveTextRequest {
  text: string;
}

export interface FollowUpEmailRequest {
  companyName: string;
  position: string;
  appliedDate: string;
  contactName?: string;
}

export const improveResumeBullet = async (data: ImproveTextRequest): Promise<string> => {
  const { text } = data;
  
  // Simulated AI improvement - In production, integrate with OpenAI, Anthropic, etc.
  // This is a placeholder that demonstrates the structure
  const improved = `Enhanced: ${text}
  
Key improvements:
- Quantified impact with specific metrics
- Used action verbs (achieved, implemented, optimized)
- Highlighted measurable results
- Focused on outcomes rather than tasks

Example improved version:
"Led cross-functional team of 5 developers to implement microservices architecture, resulting in 40% reduction in deployment time and 99.9% uptime."`;

  return improved;
};

export const generateFollowUpEmail = async (data: FollowUpEmailRequest): Promise<string> => {
  const { companyName, position, appliedDate, contactName } = data;
  
  const greeting = contactName ? `Dear ${contactName},` : 'Dear Hiring Manager,';
  
  const email = `${greeting}

I hope this email finds you well. I wanted to follow up regarding my application for the ${position} position at ${companyName}, which I submitted on ${new Date(appliedDate).toLocaleDateString()}.

I remain very interested in this opportunity and believe my skills and experience align well with the requirements of the role. I would welcome the chance to discuss how I can contribute to your team.

Thank you for your time and consideration. I look forward to hearing from you.

Best regards,
[Your Name]
[Your Email]
[Your Phone Number]`;

  return email;
};

