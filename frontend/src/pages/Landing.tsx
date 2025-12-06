import { Link } from 'react-router-dom';
import { Button } from '../components/ui';
import ThemeToggle from '../components/ThemeToggle';
import {
  Briefcase,
  Sparkles,
  BarChart3,
  Mail,
  FileText,
  CheckCircle2,
  ArrowRight,
  Star,
  Users,
} from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: Sparkles,
      title: 'AI Resume Feedback',
      description: 'Get instant, targeted suggestions to improve your resume score for any job listing.',
    },
    {
      icon: BarChart3,
      title: 'Pipeline Visualization',
      description: 'Drag-and-drop Kanban board view of every application status: Applied, Interview, Offer, Rejected.',
    },
    {
      icon: Mail,
      title: 'Automated Follow-ups',
      description: 'Schedule and send personalized follow-up emails right from the app, ensuring you never miss a touchpoint.',
    },
    {
      icon: FileText,
      title: 'Interview Prep Hub',
      description: 'Dedicated space to store notes, common questions, and company research for upcoming interviews.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer',
      content: 'Tracker Pro transformed my job search. The AI feedback helped me land 3 interviews in one week!',
      rating: 5,
    },
    {
      name: 'Marcus Johnson',
      role: 'Product Manager',
      content: 'The pipeline view is a game-changer. I can see exactly where I am with each application at a glance.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director',
      content: 'Automated follow-ups saved me hours. I never miss a touchpoint anymore, and my response rate doubled.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold">
              <Briefcase className="h-6 w-6" />
              JobPath
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors link-hover">
                Features
              </a>
              <a href="#pricing" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors link-hover">
                Pricing
              </a>
              <a href="#testimonials" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors link-hover">
                Testimonials
              </a>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="hidden sm:flex items-center gap-3">
                <Button asChild variant="ghost" size="sm">
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/register">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 py-20 sm:py-32">
        <div className="container mx-auto">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Job Search Platform</span>
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
              <span className="block">Master Your Job Search.</span>
              <span className="block text-gray-600 dark:text-gray-400">Land the Perfect Job.</span>
            </h1>

            <p className="mb-12 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The definitive, AI-powered tool to organize, track, and optimize every stage of your job application journey.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="px-8 btn-hover">
                <Link to="/register">
                  Start Tracking Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 interactive-hover">
                <Link to="/login">Book a Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything You Need
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Powerful features designed to transform your job search into a strategic, organized process.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="text-center card-hover p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 mx-auto scale-hover">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section id="testimonials" className="px-4 py-20">
        <div className="container mx-auto">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-6 py-3">
                <Users className="h-5 w-5" />
                <span className="text-lg font-semibold">
                  Over <span className="font-bold">50,000</span> successful job hunters use JobPath
                </span>
              </div>
              <h2 className="mb-4 text-3xl font-bold">Why Trust Us?</h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 interactive-hover">
                  <div className="mb-4 flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400 scale-hover" />
                    ))}
                  </div>
                  <p className="mb-4 text-gray-600 dark:text-gray-400 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-4 py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Choose the plan that fits your job search journey
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 card-hover">
              <div className="mb-6">
                <h3 className="mb-2 text-2xl font-bold">Free</h3>
                <p className="text-gray-600 dark:text-gray-400">Perfect for getting started</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-600 dark:text-gray-400">/forever</span>
              </div>
              <ul className="mb-8 space-y-3">
                {['Track up to 10 jobs', 'Basic pipeline view', 'Email reminders', 'Mobile app access', 'Community support'].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 scale-hover" />
                    <span className="text-gray-600 dark:text-gray-400 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild fullWidth variant="outline" className="interactive-hover">
                <Link to="/register">Get Started</Link>
              </Button>
            </div>

            <div className="rounded-lg border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black p-8 relative glow-primary">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black px-3 py-1 text-sm font-medium rounded magnetic">
                Most Popular
              </div>
              <div className="mb-6">
                <h3 className="mb-2 text-2xl font-bold">Pro</h3>
                <p className="text-gray-300 dark:text-gray-600">For serious job hunters</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$19</span>
                <span className="text-gray-300 dark:text-gray-600">/month</span>
              </div>
              <ul className="mb-8 space-y-3">
                {['Unlimited job tracking', 'AI Resume Feedback', 'Automated Follow-ups', 'Interview Prep Hub', 'Advanced analytics', 'Priority support'].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 scale-hover" />
                    <span className="text-gray-300 dark:text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild fullWidth className="bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 btn-hover">
                <Link to="/register">Start Free Trial</Link>
              </Button>
            </div>

            <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 card-hover">
              <div className="mb-6">
                <h3 className="mb-2 text-2xl font-bold">Business</h3>
                <p className="text-gray-600 dark:text-gray-400">For teams and agencies</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$49</span>
                <span className="text-gray-600 dark:text-gray-400">/month</span>
              </div>
              <ul className="mb-8 space-y-3">
                {['Everything in Pro', 'Team collaboration', 'Shared pipelines', 'Custom workflows', 'Dedicated support', 'API access'].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 scale-hover" />
                    <span className="text-gray-600 dark:text-gray-400 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild fullWidth variant="outline" className="interactive-hover">
                <Link to="/register">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Stop Guessing. Start Organizing.
            </h2>
            <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">
              Join thousands who turned chaos into career success.
            </p>
            <Button asChild size="lg" className="px-8 btn-hover">
              <Link to="/register">
                Sign Up for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                <span className="text-lg font-bold">JobPath</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                The modern way to track and manage your job applications.
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <a href="#features" className="hover:text-black dark:hover:text-white transition-colors link-hover">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-black dark:hover:text-white transition-colors link-hover">
                    Pricing
                  </a>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-black dark:hover:text-white transition-colors link-hover">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <a href="#about" className="hover:text-black dark:hover:text-white transition-colors link-hover">
                    About
                  </a>
                </li>
                <li>
                  <a href="#blog" className="hover:text-black dark:hover:text-white transition-colors link-hover">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-black dark:hover:text-white transition-colors link-hover">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold">Get Started</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <Link to="/register" className="hover:text-black dark:hover:text-white transition-colors link-hover">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-black dark:hover:text-white transition-colors link-hover">
                    Sign In
                  </Link>
                </li>
                <li>
                  <a href="#docs" className="hover:text-black dark:hover:text-white transition-colors link-hover">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} JobPath. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                <a href="#privacy" className="hover:text-black dark:hover:text-white transition-colors link-hover">
                  Privacy
                </a>
                <a href="#terms" className="hover:text-black dark:hover:text-white transition-colors link-hover">
                  Terms
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
